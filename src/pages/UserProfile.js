import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Collapse, Image, Layout, List, message, Modal, Space, Spin, Table} from "antd";
import {useNavigate} from "react-router-dom";
import {InfoCircleOutlined} from "@ant-design/icons";

const {Content} = Layout;
const {Panel} = Collapse;


function UserProfile() {

    const navigate = useNavigate();

    let plans = [];
    let token = '';
    const [data, setData] = useState([]);
    const [dataLoadingStatus, setDataLoadingStatus] = useState(true);
    const [pointInfo, setPointInfo] = useState({});
    const [pointInfoVisible, setPointInfoVisible] = useState(false);
    const [deletePlan, setDeletePlan] = useState({});
    const [deletePlanVisible, setDeletePlanVisible] = useState(false);


    const columns = [
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date'
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date'
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <a
                    onClick={(e) => {
                        // console.log(record);
                        setDeletePlan(record);
                        setDeletePlanVisible(true);
                        e.preventDefault();
                    }}
                >
                    Delete
                </a>
            )
        },
    ];

    const pointsColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Latitude',
            dataIndex: 'latitude',
            key: 'latitude'
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
            key: 'longitude'
        },
        {
            title: 'Details',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <a
                    onClick={(e) => {
                        // console.log(record);
                        setPointInfo(record);
                        setPointInfoVisible(true);
                        e.preventDefault();
                    }}
                >
                    <InfoCircleOutlined />
                </a>
            )
        }
    ];

    useEffect(() => {
        token = localStorage.getItem('token');
        if (token === null || token === '') {
            message.error('Invalid Operation or User Information Error!');
            navigate('/search', { replace: true });
        }
        // console.log(token);

        axios.get(
            '/plan',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(response => {
            plans = response.data;
            // console.log(plans);
            setData(plans.map((plan, index) => {
                plan.key = index + 1;
                return plan;
            }));
            setDataLoadingStatus(false);
        }).catch(error => {
            // console.log(error);
        });
    }, []);

    function handleDeletePlan() {
        token = localStorage.getItem('token');
        // console.log(token);

        // console.log(deletePlan);
        setDataLoadingStatus(true);
        axios.delete(
            '/plan/' + deletePlan.id,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        ).then(response => {
            setDeletePlanVisible(false);
            message.success('Delete One Plan Successfully');
            plans.map((plan, index) => {
                if (plan.id === deletePlan.id) {
                    plans.slice(index, 1);
                }
            })
            setData(plans.map((plan, index) => {
                plan.key = index + 1;
                return plan;
            }));
            setDataLoadingStatus(false);
        }).catch(error => {
            setDataLoadingStatus(false);
            setDeletePlanVisible(false);
            message.error('Delete One Plan Error');
            console.log(error);
        })
    }

    return (
        <>
            <Layout>
                <Content style={{ height: "900px" }}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Button  type="primary" onClick={() => navigate('/search')}>Back to Search Page</Button>
                        <Spin spinning={dataLoadingStatus} size="middle">
                            <Table
                                columns={columns}
                                expandable={{
                                    expandedRowRender: (record) => (
                                        <>
                                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                                <div><span style={{ fontWeight: "bold" }}>Note</span>: {record.note}</div>
                                                <Collapse>
                                                    {record.daily_plans.map((dailyPlan, index) => (
                                                        <Panel
                                                            key={index + 1}
                                                            header={dailyPlan.date}
                                                        >
                                                            <Table
                                                                columns={pointsColumns}
                                                                dataSource={dailyPlan.points.map((point, index) => {
                                                                    point.key = index;
                                                                    return point;
                                                                })}
                                                                pagination={false}
                                                            />
                                                        </Panel>
                                                    ))}
                                                </Collapse>
                                            </Space>
                                        </>
                                    ),
                                    rowExpandable: (record) => true
                                }}
                                dataSource={data}
                                pagination={false}
                            />
                        </Spin>
                    </Space>
                </Content>
            </Layout>
            <Modal
                title="Warning"
                visible={deletePlanVisible}
                onCancel={() => setDeletePlanVisible(false)}
                onOk={handleDeletePlan}
            >
                <span style={{ fontWeight: "bold" }}> Are you sure to DELETE this plan?</span>
            </Modal>
            <Modal
                title={pointInfo.name}
                visible={pointInfoVisible}
                onCancel={() => setPointInfoVisible(false)}
                footer={null}
            >
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div><span style={{ fontWeight: "bold" }}>Description</span>: {pointInfo.description}</div>
                    <Image
                        width={200}
                        src={pointInfo.image}
                        fallback="No Image Resource"
                    />
                </Space>
            </Modal>
        </>
    );

}

export default UserProfile;
