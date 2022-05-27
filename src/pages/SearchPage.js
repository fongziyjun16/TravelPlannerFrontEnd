import React from "react";
import {Button, Col, Form, Image, Input, Row, Space} from "antd";
import logo from '../assets/images/Logo.png'
import {SearchOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function SearchPage() {

    const navigate = useNavigate();

    function handleSearch(values) {
        const { searchWord: keyWord } = values;
        // console.log("search word: " + keyWord);
        localStorage.setItem('center', keyWord);
        navigate('/places');
    }

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
                            onFinish={handleSearch}>
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
    );
}

export default SearchPage;