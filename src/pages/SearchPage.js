import React from "react";
import {Button, Col, Form, Image, Input, Layout, message, Row, Space} from "antd";
import logo from '../assets/images/logo.png'
import SearchBackground from '../assets/images/SearchBackground.jpg'
import {SearchOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const {Content} = Layout;

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
        {
            name: 'Saint_Petersburg',
            lat: 59.937500,
            lng: 30.308611
        },
    ]

    function handleSearch(values) {
        let { searchWord: keyWord } = values;
        // console.log("search word: " + keyWord);
        if (keyWord === undefined || keyWord === null) {
            message.warning('Sorry! Please input city or This City is not supported yet!');
            return;
        }
        keyWord = keyWord.trim();
        keyWord = keyWord.replace(' ', '_');
        const defaultCity = defaultCities.find(city => city.name === keyWord);
        // console.log(defaultCity);
        localStorage.setItem('center', JSON.stringify(defaultCity));
        navigate('/places');
    }

    return (
        <>
            <Layout>
                <Content
                    style={{
                        backgroundImage: `url(${SearchBackground})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '2060px, 1080px',
                        height: '800px'
                    }}
                >
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8}>
                            <div style={{ marginTop: "15%" }}>
                                <Space direction="vertical" size="middle">
                                    <Image
                                        src={logo}
                                        preview={false}
                                    />
                                    <Form
                                        name="searchForm"
                                        labelCol={{ span: 0 }}
                                        wrapperCol={{ span: 24 }}
                                        onFinish={handleSearch}>
                                        <Form.Item
                                            name="searchWord"
                                            /*rules={[{required: true, message: 'Please input your search word!'}]}*/
                                        >
                                            <Input placeholder="Beijing" style={{ borderRadius: "10px" }} />
                                        </Form.Item>
                                        <Form.Item>
                                            <span
                                                style={{
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                Now Support Cities: Beijing, Shanghai, Los Angeles, Madrid, Paris, Rome, Saint Petersburg
                                            </span>
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ span: 16 }} style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <Button
                                                block type="primary"
                                                shape="round" size="large"
                                                icon={<SearchOutlined  />}
                                                htmlType="submit"
                                                style={{ border: "none", backgroundColor: "#2BBCD6" }}
                                            >
                                                Go
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Space>
                            </div>
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
}

export default SearchPage;