import React, {useEffect, useState} from "react";
import {Button, Col, Collapse, Dropdown, Layout, List, Menu, Popover, Row, Input} from "antd";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    DeleteOutlined,
    EnvironmentOutlined,
    InfoCircleOutlined
} from "@ant-design/icons";
import PubSub from 'pubsub-js'

const {Header, Content, Footer} = Layout;
const {Panel} = Collapse;
const {TextArea} = Input;

function PlanBoard(props) {

    const days = props.days;
    let selectedLocation = {};
    const [locations, setLocations] = useState([]);
    const [plans, setPlans] = useState([]);
    const [addItems, setAddItems] = useState([]); // dropdown menu
    let note = '';

    useEffect(() => {
        // console.log(props);
        let currPlans = [];
        for (let i = 1; i <= days; i++) {
            currPlans.push([]);
        }
        setPlans([...currPlans]);

        let placesList = [
            {
                name: 'Orlando, FL',
                description: 'This is a city in Florida',
                lat: 28.538336,
                lng: -81.379234
            },
            {
                name: 'Gainesville, FL',
                description: 'There is a famous university.',
                lat: 29.651634,
                lng: -82.324829
            },
            {
                name: 'Atlanta, GA',
                description: 'There is a famous Air Port',
                lat: 33.748997,
                lng: -84.387985
            },
            {
                name: 'New York, NY',
                description: 'Spider Man is Peter Parker',
                lat: 40.730610,
                lng: -73.935242
            }
        ];
        let currLocations = [];
        for (let i = 1; i <= placesList.length; i++) {
            placesList[i - 1].index = i;
            currLocations.push(placesList[i - 1]);
        }
        setLocations([...currLocations]);

        let currAddItems = [];
        for (let i = 1; i <= days; i++) {
            currAddItems.push({
                label: 'Day ' + i,
                key: i + ''
            });
        }
        setAddItems([...currAddItems])
    }, [])

    function renderLocationDetails(location) {
        return (
            <>
                <span>{location.description}</span>
            </>
        );
    }

    function handleAddLocation(item) {
        const { key: day } = item;
        plans[day - 1].push(selectedLocation);
        setPlans([...plans]);
    }

    function handleLocationUp(day, item) {
        let currDayPlans = plans[day];
        const currPos = currDayPlans.findIndex(location => location.index === item.index);
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
        const currPos = currDayPlans.findIndex(location => location.index === item.index);
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
            if (location.index === item.index) {
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
            PubSub.publish('ShowDirections', data);
        }
    }

    function handleNoteChange(e) {
        // console.log(e.target.value);
        note = e.target.value;
    }
    
    function handleSavePlan() {
        console.log(plans);
        console.log(note);
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
                            backgroundColor: "#e6e6e6",
                            fontSize: 16,
                            fontWeight: 600 }}>
                            <span>Start: {props.startDate}</span>
                            <span>End: {props.endDate}</span>
                        </Header>
                        <Content style={{height: "580px", border: "groove", marginTop: 5, overflow: "auto"}}>
                            <Collapse defaultActiveKey={[1]} style={{margin: "5px"}}>
                                {new Array(days).fill(null).map((_, index) => (
                                    <Panel
                                        header={"Day " + (index + 1)}
                                        key={index + 1}
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
                            <Button type="primary" onClick={handleSavePlan} shape="round" block>
                                Save
                            </Button>
                        </Footer>
                    </Layout>
                </Col>
                <Col span={7}>
                    <Layout style={{height: "100%"}}>
                        <Content style={{height: "0px", border: "groove", overflow: "auto"}}>
                            <List
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
                                            <Popover placement="right" title={item.name} content={renderLocationDetails(item)}>
                                                <a><InfoCircleOutlined /></a>
                                            </Popover>
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
        </>
    );
}

export default PlanBoard;