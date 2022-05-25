import { Row, Col, Space, Form, InputNumber, Button } from "antd";
import { Component } from "react";
import { useNavigate } from "react-router-dom";

class HowManyDayPage extends Component {

    handleConfirm = (values) => {
        const { days: currDays } = values;
        localStorage.setItem('days', currDays);
        this.props.navigate("/map");
    }

    render() {
        return (
            <>
                <Row align="middle" justify="center" style={{ height: '100%' }}>
                    <Col>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <h1>How many days do you want to travel?</h1>
                            <Form 
                                name="daysForm"
                                onFinish={this.handleConfirm}
                                initialValues={{
                                    'days': 5
                                }}>
                                <Form.Item>
                                    <Form.Item name="days" noStyle>
                                        <InputNumber min={1} max={15} />
                                    </Form.Item>
                                    <span className="ant-form-text"> days</span>
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
}

export default function(props) {
    const navigate = useNavigate();
    return <HowManyDayPage {...props} navigate={navigate} />
};