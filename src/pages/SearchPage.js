import { Component } from "react";
import {Button, Col, Form, Image, Input, Row, Space} from "antd";
import logo from '../assets/images/Logo2.png'
import {SearchOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

class SearchPage extends Component {

    state = {

    };

    handleSearch = (values) => {
        const { searchWord: keyWord } = values;
        console.log("search word: " + keyWord);
        this.props.navigate('/places');
    }

    render() {
        return (
            <>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Space direction="vertical" size="middle">
                            <Image src={logo} preview={false}/>
                            <Form
                                name="searchForm"
                                labelCol={{ span: 0 }}
                                wrapperCol={{ span: 24 }}
                                onFinish={this.handleSearch}>
                                <Form.Item
                                    name="searchWord"
                                    rules={[{required: true, message: 'Please input your search word!'}]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button
                                        typeof="primary"
                                        shape="round"
                                        size="large"
                                        icon={<SearchOutlined  />}
                                        htmlType="submit">
                                        Go
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Space>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </>
        )
    }
}

export default function (props) {
    const navigate = useNavigate();
    return <SearchPage {...props} navigate={navigate} />
};
