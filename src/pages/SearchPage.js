import React from "react";
import {Button, Col, Form, Image, Input, message, Row, Space} from "antd";
import logo from '../assets/images/Logo2.png'
import {SearchOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function SearchPage() {

    const navigate = useNavigate();

    const defaultCities = [
        {
            name: 'Beijing',
            lat: 39.904202,
            lng: 116.407394
        },
        {
            name: 'Shanghai',
            lat: 31.230391,
            lng: 121.473701
        },
        {
            name: 'Los_Angeles',
            lat: 34.052235,
            lng: -118.243683
        },
        {
            name: 'Madrid',
            lat: 40.416775,
            lng: -3.703790
        },
        {
            name: 'Paris',
            lat: 48.856613,
            lng: 2.352222
        },
        {
            name: 'Rome',
            lat: 41.9028,
            lng: 12.4964
        },
    ]

    function handleSearch(values) {
        let { searchWord: keyWord } = values;
        // console.log("search word: " + keyWord);
        keyWord = keyWord.trim();
        const defaultCity = defaultCities.find(city => city.name === keyWord);
        // console.log(defaultCity);
        if (defaultCity === undefined || defaultCity === null) {
            message.warning('Sorry! This City is not supported yet!');
            return;
        }
        localStorage.setItem('center', JSON.stringify(defaultCity));
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
                            <Form.Item>
                                <span>Now Support Cities: Beijing, Shanghai, Los Angeles, Madrid, Paris, Rome</span>
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