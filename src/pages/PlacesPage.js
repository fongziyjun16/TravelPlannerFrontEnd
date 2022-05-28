import React, {useEffect, useState} from "react";
import {Button, Space, Row, Col, message, Checkbox, Image, Layout} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {Card } from 'antd';
import axios from "axios";
import SearchBackground from "../assets/images/SearchBackground.jpg";

const {Content} = Layout;

function PlacesPage() {

    const navigate = useNavigate();
    let selectedCategories = [];
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const city = JSON.parse(localStorage.getItem('center') === null ? 'null' : localStorage.getItem('center'));
        // console.log(city);
        if (city === null) {
            message.error('Choose A CITY First!!!')
            navigate('/search');
        }

        axios.get(
            '/search/categories?location=' + city.name
        ).then(response => {
            // console.log(response);
            setCategories(response.data);
        }).catch(error => {
            // console.log(error);
            message.error('Categories Request Failure!');
        });
    }, []);

    function handleCheckboxesOnChange(checkedValues) {
        // console.log(checkedValues);
        let categoriesIndexSet = new Set();
        checkedValues.forEach((index) => {
            categoriesIndexSet.add(index);
        })
        selectedCategories = [];
        categories.forEach((category, index) => {
            if (categoriesIndexSet.has(index)) {
                selectedCategories.push(category.type);
            }
        })
    }

    function getPhoto(index) {
        // console.log(index);
        const map = new Map();
        map.set('Classes & Workshops', 'https://images.unsplash.com/photo-1544928147-9e66f653d177?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
        map.set('Concerts & Shows', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
        map.set('Events', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80');
        map.set('Food & Drink', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
        map.set('Museums', 'https://images.unsplash.com/photo-1563292769-4e05b684851a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
        map.set('Nature & Parks', 'https://images.unsplash.com/photo-1541843713287-e0d5de49a384?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
        map.set('Other', 'https://images.unsplash.com/photo-1416397202228-6b2eb5b3bb26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80');
        map.set('Outdoor Activities', 'https://images.unsplash.com/photo-1416397202228-6b2eb5b3bb26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80');
        map.set('Shopping', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
        map.set('Sights & Landmarks', 'https://images.unsplash.com/photo-1492136344046-866c85e0bf04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1164&q=80');
        map.set('Transportation', 'https://images.unsplash.com/photo-1452878964126-81135387b19f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
        map.set('Traveler Resources', 'https://images.unsplash.com/photo-1503221043305-f7498f8b7888?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80');
        map.set('Water & Amusement Parks', 'https://images.unsplash.com/photo-1581003014628-16de2108de2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
        map.set('Zoos & Aquariums', 'https://images.unsplash.com/photo-1540126034813-121bf29033d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80');

        // console.log(map.get(index));
        return map.get(index);
    }

    function handleContinue() {
        localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
        navigate('/days');
    }

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }} >
                        <h1>Check out some beautiful places in this lovely city!</h1>
                        <Checkbox.Group onChange={handleCheckboxesOnChange}>
                            <Space size={[8, 16]} wrap>
                                {categories.map((category, index) => (
                                    <Card
                                        key={index}
                                        flag={index}
                                        title={category.type}
                                        hoverable
                                        extra={<Checkbox value={index} />}
                                    >
                                        <Space direction='vertical' size="middle" style={{ display: 'flex' }}>
                                            <Image
                                                width={200}
                                                src={getPhoto(category.type)}
                                            />
                                        </Space>
                                    </Card>
                                ))}
                            </Space>
                        </Checkbox.Group>
                        <Row align="middle" justify="center" gutter={[0, 16]}>
                            <Col>
                                <Button
                                    typeof= "primary"
                                    shape= "round"
                                    size= "large"
                                    icon={<CheckCircleOutlined />}
                                    onClick={handleContinue}>
                                    Ready to build your Travel Plan?
                                </Button>
                            </Col>
                        </Row>
                    </Space>
        </>
    );

}

export default PlacesPage;
