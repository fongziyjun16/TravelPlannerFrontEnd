import React, { Component } from "react";
import {Button, Form, Space, Row, Col, Radio} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import { Modal, Card } from 'antd';

const { Meta } = Card;

class PlacesPage extends Component {

    state = {
        isModalVisible : false,
        numberOfCard: 8,
        selectedCard: 0,
        selectedCardDescription: "",
        value : 0,
        check : false
    };

    componentDidMount() {
        this.setState({
            numberOfCard: this.getRandomInt(14, 14)
        })
        // console.log(this.state.numberOfCard);
    }

    handleContinue = () => {
        this.props.navigate('/days');
    }
    
    handleCardOnClick = (e) => {
        // console.log(e.currentTarget.getAttribute("flag") * 1);
        const cardIndex = e.currentTarget.getAttribute("flag") * 1;
        this.setState({
            isModalVisible: true,
            selectedCard: cardIndex,
            selectedCardDescription: 'Current Card is ' + cardIndex
        });
    }

    handleModalCancel = () => {
        this.setState({
            isModalVisible: false
        });
    }

    handleOnChange = (e) => {
        //console.log('radio checked', e.target.value);
        if(this.Radio === e){
            this.Radio = ' '
            return
        }
        this.Radio = e
    }
    

    handleOnClickRadio = () => {
        this.setState({
            isModalVisible : false
        });
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); 
        //The maximum is exclusive and the minimum is inclusive
    }

    render() {
        return (
            <>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }} >
                    <h1>Check out some beautiful places in this lovely city!</h1>
                    <Space size={[8, 16]} wrap>
                        {new Array(this.state.numberOfCard).fill(null).map((_, index) => (
                            <Card
                                key={index} 
                                flag={index}
                                onClick={this.handleCardOnClick}
                                title={"Photo " + index}
                                extra={
                                <Radio 
                                    onChange={this.handleOnChange} 
                                    >
                                </Radio>}
                                hoverable
                                style={{ width: 280 }}
                                cover={<img alt="example" src="https://www.california-tour.com/blog/wp-content/uploads/2017/08/Fotolia_LA-downtown-XL.jpg" />}>
                                <Meta title="G" description="This is a beautiful city." />
                            </Card>                                
                        ))}
                    </Space>
                    <Row align="middle" justify="center" gutter={[0, 16]}>
                        <Col>
                            <Button
                                typeof= "primary"
                                shape= "round"
                                size= "large"
                                icon={<CheckCircleOutlined />}
                                onClick={this.handleContinue}>
                                Ready to build your Travel Plan?
                            </Button>
                        </Col>
                    </Row>
                </Space>
                <Modal  
                    title={"Card " + this.state.selectedCard} 
                    visible={this.state.isModalVisible}
                    footer={null}
                    onCancel={this.handleModalCancel}
                    >
                    <span>{"Description: "  + this.state.selectedCardDescription}</span>
                </Modal>
            </>
        )
    }
}

export default function (props) {
    const navigate = useNavigate();
    return <PlacesPage {...props} navigate={navigate} />
};
