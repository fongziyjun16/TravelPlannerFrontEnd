import React, {useEffect, useState} from "react";
import {Button, Col, Collapse, Dropdown, Layout, List, Menu, Popover, Row, Input, Modal, message} from "antd";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    DeleteOutlined,
    EnvironmentOutlined,
    InfoCircleOutlined
} from "@ant-design/icons";
import PubSub from 'pubsub-js'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const {Header, Content, Footer} = Layout;
const {Panel} = Collapse;
const {TextArea} = Input;

function PlanBoard(props) {

    const navigate = useNavigate();
    const days = props.days;
    let city = {};
    const [cityName, setCityName] = useState('');
    const [collapseActiveKeys, setCollapseActiveKeys] = useState([]);
    const selectedCategories = JSON.parse(localStorage.getItem('selectedCategories') === null ? '[]' : localStorage.getItem('selectedCategories'));
    let selectedLocation = {};
    const [listLoading, setListLoading] = useState(true);
    let points = [];
    const [locations, setLocations] = useState([]);
    const [plans, setPlans] = useState([]);
    const [addItems, setAddItems] = useState([]); // dropdown menu
    const [locationInfoVisible, setLocationInfoVisible] = useState(false);
    const [locationInfo, setLocationInfo] = useState({
        name: '',
        description: ''
    });
    let note = '';

    useEffect(() => {
        city = JSON.parse(localStorage.getItem('center') === null ? 'null' : localStorage.getItem('center'));
        if (city === null) {
            message.error('Choose A CITY First!!!')
            navigate('/search');
        }
        // console.log(city);
        setCityName(city.name);

        // console.log(props);
        let currPlans = [];
        for (let i = 1; i <= days; i++) {
            currPlans.push([]);
        }
        setPlans([...currPlans]);

        let currAddItems = [];
        for (let i = 1; i <= days; i++) {
            currAddItems.push({
                label: 'Day ' + i,
                key: i + ''
            });
        }
        setAddItems([...currAddItems]);

        // console.log(selectedCategories);
        points = [];
        if (selectedCategories.length === 0) {
            axios.get(
                '/search/points?location=' + city.name
            ).then(response => {
                // console.log(response);
                points = response.data;
                setLocations(points.map((point) => {
                    point.lat = point.latitude;
                    point.lng = point.longitude;
                    return point;
                }));
                // console.log(points);
                setListLoading(false);
            }).catch(error => {
                console.log(error);
            });
        } else {
            // console.log(selectedCategories);
            let tasks = [];
            selectedCategories.forEach((category) => {
                tasks.push(axios.get(
                    '/search/category?location=' +
                    city.name + '&' +
                    'category_name=' +
                    encodeURIComponent(category)
                ));
            });
            Promise.all(tasks).then(pointSet => {
                points = [];
                pointSet.forEach((sub) => {
                    // console.log(sub);
                    sub.data.forEach((point, index) => {
                        point.lng = point.longitude;
                        point.lat = point.latitude;
                        points.push(point);
                    });
                });
                setLocations([...points])
                setListLoading(false);
            }).catch(reason => {
                message.error('Points Request Error');
                console.log(reason);
            });
        }
    }, [])

    function handleAddLocation(item) {
        const { key: day } = item;
        for (let i = 0; i < plans[day - 1].length; i++) {
            if (plans[day - 1][i].id === selectedLocation.id) {
                message.warning('Cannot Add SAME Location in one day');
                return;
            }
        }
        plans[day - 1].push(selectedLocation);
        setPlans([...plans]);
    }

    function handleLocationUp(day, item) {
        // console.log(item);
        let currDayPlans = plans[day];
        const currPos = currDayPlans.findIndex(location => location.id === item.id);
        // console.log(currPos);
        if (currPos > 0) {
            const lastPos = currPos - 1;
            const temp = currDayPlans[lastPos];
            currDayPlans[lastPos] = currDayPlans[currPos]
            currDayPlans[currPos] = temp;
        }
        plans[day] = currDayPlans;
        setPlans([...plans]);
    }

    function handleLocationDown(day, item) {
        let currDayPlans = plans[day];
        const currPos = currDayPlans.findIndex(location => location.id === item.id);
        if (currPos < currDayPlans.length - 1) {
            const nextPos = currPos + 1;
            const temp = currDayPlans[nextPos];
            currDayPlans[nextPos] = currDayPlans[currPos]
            currDayPlans[currPos] = temp;
        }
        plans[day] = currDayPlans;
        setPlans([...plans]);
    }

    function handleLocationDelete(day, item) {
        let currDayPlans = plans[day];
        currDayPlans.map((location, index) => {
            if (location.id === item.id) {
                currDayPlans.splice(index, 1);
            }
        });
        plans[day] = currDayPlans;
        setPlans([...plans]);
    }

    function handleDisplayDirections(day) {
        const nums = plans[day].length; // the number of locations of current day
        const plan = plans[day];
        if (nums > 1) {
            let data = {};
            data.origin = {
                lat: plan[0].lat,
                lng: plan[0].lng
            };
            if (nums > 2) {
                data.waypoints = [];
                for (let i = 1; i < nums - 1; i++) {
                    data.waypoints.push({
                        location: {
                            lat: plan[i].lat,
                            lng: plan[i].lng
                        },
                        stopover: true
                    });
                }
            }
            data.destination = {
                lat: plan[nums - 1].lat,
                lng: plan[nums - 1].lng
            };
            // console.log(data);
            PubSub.publish('ShowDirections', data);
        }
    }

    function handleNoteChange(e) {
        // console.log(e.target.value);
        note = e.target.value;
    }

    function handleCloseLocationInfo() {
        setLocationInfoVisible(false);
    }

    function handleSavePlan() {
        const token = localStorage.getItem('token');
        if (token === null || token === '') {
            message.error('Please Login before save plan');
            return;
        }

        if (plans.length === 0) {
            message.error('Plan is EMPTY');
            return;
        }

        for (let i = 0; i < plans.length; i++) {
            if (plans[i].length === 0) {
                message.error('Your Plan is not COMPLETE');
                return;
            }
        }

        props.setPageStatus(true);
        let myPlan = {};
        myPlan.note = note;
        myPlan.daily_plans = [];
        const fromDate = new Date(props.startDate);
        plans.forEach((plan, index) => {
            const currDate = new Date(fromDate.setDate(fromDate.getDate() + 1));
            // console.log(currDate.toLocaleDateString());
            const currPlan = plan.map((location) => {
                return {
                    id: location.id
                }
            });
            const year = currDate.getFullYear();
            const month = currDate.getMonth() + 1;
            const date = currDate.getDate();
            myPlan.daily_plans.push({
                date: year + '-' +
                    (month + 1 < 10 ? '0' + month: month) + '-' +
                    (date < 10 ? '0' + date : date),
                points: currPlan
            });
        });

        // console.log(myPlan);
        axios.post(
            '/plan',
            myPlan,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(response => {
            // console.log(response);
            navigate('/success', { replace: true });
            props.setPageStatus(false);
        }).catch(error => {
            console.log(error);
            message.error('Save Your Plan Failure');
            props.setPageStatus(false);
        })

    }

    return (
        <>
            <Row
                justify="space-around"
                style={{height: "100%"}}>
                <Col span={16}>
                    <Layout style={{height: "100%"}}>
                        <Header style={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor: "#F5F5F5",
                            fontSize: 16,
                            fontWeight: 600 }}>
                            <span>{cityName}</span>
                            <span>Start: {props.startDate}</span>
                            <span>End: {props.endDate}</span>
                        </Header>
                        <Content style={{height: "500px", border: "groove", marginTop: 5, overflow: "auto"}}>
                            <Collapse
                                defaultActiveKey={(() => {
                                    let currActiveKeys = [];
                                    for (let i = 1; i <= days; i++) {
                                        currActiveKeys.push(i + '');
                                    }
                                    return currActiveKeys;
                                })()}
                                style={{margin: "5px"}}
                            >
                                {new Array(days).fill(null).map((_, index) => (
                                    <Panel
                                        header={"Day " + (index + 1)}
                                        key={(index + 1) + ''}
                                        extra={
                                            <a onClick={(e) => {
                                                handleDisplayDirections(index);
                                                e.stopPropagation();
                                            }}>
                                                Show Directions
                                            </a>
                                        }>
                                        <Layout>
                                            <Content>
                                                <List
                                                    itemLayout="horizontal"
                                                    dataSource={plans[index]} // index + 1 is day
                                                    renderItem={item => ( // item is one location
                                                        <List.Item
                                                            actions={[
                                                                <a onClick={(e) => {
                                                                    handleLocationUp(index, item);
                                                                    e.preventDefault();
                                                                }}><ArrowUpOutlined /></a>,
                                                                <a onClick={(e) => {
                                                                    handleLocationDown(index, item);
                                                                    e.preventDefault();
                                                                }}><ArrowDownOutlined /></a>,
                                                                <a onClick={(e) => {
                                                                    handleLocationDelete(index, item);
                                                                    e.preventDefault();
                                                                }}><DeleteOutlined /></a>]}>
                                                            <List.Item.Meta
                                                                title={item.name}
                                                            />
                                                        </List.Item>
                                                    )}
                                                />
                                            </Content>
                                        </Layout>
                                    </Panel>
                                ))}
                            </Collapse>
                        </Content>
                        <Content style={{height: "0px", border: "groove", marginTop: 5, overflow: "auto"}}>
                            <TextArea
                                placeholder="Note" allowClear onChange={handleNoteChange}
                                style={{ width: "100%", height: "100%" }}/>
                        </Content>
                        <Footer>
                            <Button
                                type="primary"
                                onClick={handleSavePlan}
                                shape="round" block
                                style={{ border: "none", backgroundColor: "#2BBCD6" }}
                            >
                                Save
                            </Button>
                        </Footer>
                    </Layout>
                </Col>
                <Col span={7}>
                    <Layout style={{height: "100%"}}>
                        <Content style={{height: "0px", border: "groove", overflow: "auto"}}>
                            <List
                                loading={listLoading}
                                itemLayout="horizontal"
                                dataSource={locations}
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <Dropdown
                                                overlay={<Menu flag={item} items={addItems} onClick={handleAddLocation} />}
                                                trigger={['click']}>
                                                <a onClick={(e) => {
                                                    selectedLocation = item;
                                                    e.preventDefault();
                                                }}>
                                                    add
                                                </a>
                                            </Dropdown>,
                                            <a
                                                onClick={(e) => {
                                                    setLocationInfo(item);
                                                    setLocationInfoVisible(true);
                                                    e.preventDefault();
                                                }}
                                            >
                                                <InfoCircleOutlined />
                                            </a>
                                        ]}>
                                        <List.Item.Meta
                                            avatar={<EnvironmentOutlined />}
                                            title={
                                                <a onClick={(e) => {
                                                    PubSub.publish('ShowPoint', item);
                                                    e.preventDefault();
                                                }}>
                                                    {item.name}
                                                </a>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Content>
                    </Layout>
                </Col>
            </Row>
            <Modal
                title={locationInfo.name}
                visible={locationInfoVisible}
                onCancel={handleCloseLocationInfo}
                footer={null}
            >
                <p>{locationInfo.description}</p>
            </Modal>
        </>
    );
}

export default PlanBoard;