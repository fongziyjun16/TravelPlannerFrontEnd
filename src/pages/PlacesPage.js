import React, {useEffect, useState} from "react";
import {Button, Space, Row, Col, message, Checkbox} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {Card } from 'antd';
import axios from "axios";

function PlacesPage() {

    const navigate = useNavigate();
    let selectedCategories = [];
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(
            '/search/categories'
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
                            >
                                <Checkbox value={index} />
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
