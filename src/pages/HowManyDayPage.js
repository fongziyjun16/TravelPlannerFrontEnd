import { Row, Col, Space, Form, Button, DatePicker } from "antd";
import React from "react";
import {useNavigate} from "react-router-dom";

const { RangePicker } = DatePicker;

function HowManyDayPage() {

    const navigate = useNavigate();

    function handleConfirm(values) {
        const { /*days: currDays, */dateRange } = values;
        // console.log(dateRange[0].format('YYYY-MM-DD'));
        let startDate = dateRange[0].format('YYYY-MM-DD');
        let endDate = dateRange[1].format('YYYY-MM-DD');
        navigate("/map", {
            replace: false,
            state: {
                days: Math.abs(new Date(startDate) - new Date(endDate)) / (1000 * 3600 * 24) + 1,
                startDate: startDate,
                endDate: endDate
            }
        });
    }

    return (
        <>
            <Row
                align="middle"
                justify="center"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1518557984649-7b161c230cfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1800px 1000px',
                    height: '100%'
                }}
            >
                <Col>
                    <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                        <h1>
                            <span style={{ color: 'navy' }}>
                                How many days do you want to travel?
                            </span>
                        </h1>
                        <Form
                            name="daysForm"
                            onFinish={handleConfirm}
                            initialValues={{
                                'days': 5
                            }}>
                            <Form.Item name="dateRange" rules={[{ type: 'array', required: true, message: 'Please select time!' }]}>
                                <RangePicker size="large" />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    shape="round"
                                    style={{
                                        border: 'none',
                                        backgroundColor: '#2BBCD6'
                                    }}
                                >
                                    Confirm
                                </Button>
                            </Form.Item>
                        </Form>
                    </Space>
                </Col>
            </Row>
        </>
    )

}

export default HowManyDayPage;