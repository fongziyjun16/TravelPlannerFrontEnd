import React, { Component } from "react";
import {Button, Form, Space, Row, Col} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import { Modal, Card } from 'antd';


const { Meta } = Card;



class PlacesPage extends Component {

    
    state = {
        isModalVisible : false,
        setIsModalVisible : false,
    };

    handleContinue = () => {
        this.props.navigate('/days');
    }
    
    
    showModal = () => {

        this.setState({
            setIsModalVisible : true,
        });
        
    } 
        
    handleOk = () => {
        this.setState({
            setIsModalVisible : false,
      });
    }
    
    handleCancel = () => {
        this.setState({
            setIsModalVisible : false,
        });
    }

    render() {
        return (
            <>
                <h1>Check out some beautiful places in this lovely city!</h1>
               
                <Space align = "center" direction = "vertical" size = "large">
                <Row span= {5}>
                <Col span= {6}>
                <Card
                    onClick={this.showModal}
                    hoverable
                    style={{ width: 280 }}
                    cover={<img alt="example" src="https://www.california-tour.com/blog/wp-content/uploads/2017/08/Fotolia_LA-downtown-XL.jpg" />}
                >
                    <Meta title="A" description="This is a beautiful city." />
                    
                </Card>
                <Modal 
                    title="A" 
                    visible = {this.state.setIsModalVisible} 
                    onOk={this.handleOk} 
                    onCancel = {this.handleCancel} 
                    closable={false}>
                    <p></p>
                </Modal>
                </Col>
                <Col span= {6}>
                <Card
                    hoverable
                    style={{ width: 280 }}
                    cover={<img alt="example" src="https://www.california-tour.com/blog/wp-content/uploads/2017/08/Fotolia_LA-downtown-XL.jpg" />}
                >
                    <Meta title="B" description="This is a beautiful city." />
                </Card>
                <Modal 
                    title="B" 
                    visible = {this.state.setIsModalVisible} 
                    onOk={this.handleOk} 
                    onCancel = {this.handleCancel} 
                    closable={false}>
                    <p></p>
                </Modal>
                </Col>
                <Col span= {6}>
                <Card
                    hoverable
                    style={{ width: 280 }}
                    cover={<img alt="example" src="https://www.california-tour.com/blog/wp-content/uploads/2017/08/Fotolia_LA-downtown-XL.jpg" />}
                >
                    <Meta title="C" description="This is a beautiful city." />
                
                </Card>
                </Col>
                <Col span= {6}>
                <Card
                    hoverable
                    style={{ width: 280 }}
                    cover={<img alt="example" src="https://www.california-tour.com/blog/wp-content/uploads/2017/08/Fotolia_LA-downtown-XL.jpg" />}
                >
                    <Meta title="D" description="This is a beautiful city." />
                
                </Card>
                
                </Col>
                <Col span= {6}>
                <Card
                    hoverable
                    style={{ width: 280 }}
                    cover={<img alt="example" src="https://www.california-tour.com/blog/wp-content/uploads/2017/08/Fotolia_LA-downtown-XL.jpg" />}
                >
                    <Meta title="E" description="This is a beautiful city." />
                </Card>
                
                </Col>
                <Col span= {6}>
                <Card
                    hoverable
                    style={{ width: 280 }}
                    cover={<img alt="example" src="https://www.california-tour.com/blog/wp-content/uploads/2017/08/Fotolia_LA-downtown-XL.jpg" />}
                >
                    <Meta title="F" description="This is a beautiful city." />
                </Card>
                
                </Col>
                <Col span= {6}>
                <Card
                    hoverable
                    style={{ width: 280 }}
                    cover={<img alt="example" src="https://www.california-tour.com/blog/wp-content/uploads/2017/08/Fotolia_LA-downtown-XL.jpg" />}
                >
                    <Meta title="G" description="This is a beautiful city." />
                </Card>
                
                </Col>
                <Col span= {6}>
                <Card
                    hoverable
                    style={{ width: 280 }}
                    cover={<img alt="example" src="https://www.california-tour.com/blog/wp-content/uploads/2017/08/Fotolia_LA-downtown-XL.jpg" />}
                >
                    <Meta title="H" description="This is a beautiful city." />
                </Card>
                
                </Col>
                </Row>
                
                </Space>
                       
                        <Form.Item wrapperCol={{ offset: 10, span: 9  }}>
                            <Button
                                typeof= "primary"
                                shape= "round"
                                size= "large"
                                icon={<CheckCircleOutlined />}
                                onClick={this.handleContinue}>
                                Ready to build your Travel Plan?
                            </Button>
                        </Form.Item>  
            </>
        )
    }
}

export default function (props) {
    const navigate = useNavigate();
    return <PlacesPage {...props} navigate={navigate} />
};
