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
            <Row align="middle" justify="center" style={{height: '100%'}}>
                <Col>
                    <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                        <h1>How many days do you want to travel?</h1>
                        <Form
                            name="daysForm"
                            onFinish={handleConfirm}
                            initialValues={{
                                'days': 5
                            }}>
                            {/*<Form.Item>*/}
                            {/*    <Form.Item name="days" noStyle>*/}
                            {/*        <InputNumber min={1} max={10}/>*/}
                            {/*    </Form.Item>*/}
                            {/*    <span className="ant-form-text"> days</span>*/}
                            {/*</Form.Item>*/}
                            <Form.Item name="dateRange" rules={[{ type: 'array', required: true, message: 'Please select time!' }]}>
                                <RangePicker />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
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