import React, { Component } from "react";
import { Layout, Dropdown, Menu, Button, Modal, Form, Input, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons"
import {useNavigate} from "react-router-dom";

const { Header } = Layout;

class AppHeader extends Component {

    state = {
        login: false,
        username: "default",
        isSignInModalVisible: false,
        isSignUpModalVisible: false,
    };

    getUserMenuItem = () => {
        let menuItems = [
            { label: 'Sign In', key: 'userSignIn' },
            { label: 'Sign Up', key: 'userSignUp' },
            { label: 'Profile', key: 'userProfile' },
            { label: 'Logout', key: 'userLogout' }
        ];

        let userMenuItems = [];
        if (!this.state.login) {
            userMenuItems.push(menuItems[0], menuItems[1])
        } else {
            userMenuItems.push(menuItems[2], menuItems[3])
        }

        return userMenuItems;
    }

    userMenuClick = (item) => {
        const { key } = item
        if (key === 'userSignIn') {
            this.setState({
                isSignInModalVisible: true
            });
        } else if (key === 'userSignUp') {
            this.setState({
                isSignUpModalVisible: true
            });
        } else if (key === 'userProfile') {
            this.props.navigate('/profile')
        } else if (key === 'userLogout') {
            this.setState({
                login: false,
                username: "default",
                isSignInModalVisible: false,
                isSignUpModalVisible: false,
            });
            this.props.handleLogout();
            this.props.navigate('/search');
        }
    }

    handleModalCancel = () => {
        this.setState({
            isSignInModalVisible: false,
            isSignUpModalVisible: false,
        });
    }

    handleSignInModalSignUp = () => {
        this.setState({
            isSignInModalVisible: false,
            isSignUpModalVisible: true,
        });
    }

    signInSubmit = (values) => {
        const {username: curUsername, password: curPassword} = values
        console.log(curUsername)
        console.log(curPassword)
        this.setState({
            login: true,
            username: curUsername,
            isSignInModalVisible: false
        })
        this.props.handleLoginSuccess('token');
    }

    signUpSubmit = (values) => {
        const {username: curUsername, password: curPassword} = values
        console.log(curUsername)
        console.log(curPassword)
        this.setState({
            isSignUpModalVisible: false
        });
    }

    render() {
        return (
            <>
                <Header style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
                        Smart Trip
                    </div>
                    <div>
                        <Dropdown overlay={ <Menu items={ this.getUserMenuItem() } onClick= { this.userMenuClick }/> }>
                            <Row>
                                <Col>
                                    <Button icon={ <UserOutlined /> } shape="circle" />
                                </Col>
                                <Col>
                                    {
                                        this.state.login && (
                                            <div style={{ fontSize: 12, fontWeight: 600, color: "white" }}>
                                                <span style={{ fontWeight: "bold" }}>Welcome</span> &nbsp;
                                                { this.state.username }
                                            </div>
                                        )
                                    }
                                </Col>
                            </Row>
                        </Dropdown>
                    </div>
                    <Modal
                        visible={this.state.isSignInModalVisible}
                        title=""
                        closable={false}
                        onCancel={this.handleModalCancel}
                        footer={null}>
                        <Form
                            name="signInForm"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            autoComplete="off"
                            onFinish={this.signInSubmit}>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Row>
                                    <Col span={12}>
                                        <Button typeof="primary" htmlType="submit">
                                            Sign In
                                        </Button>
                                    </Col>
                                    <Col span={12}>
                                        <Button typeof="primary" onClick={this.handleSignInModalSignUp}>
                                            Sign Up
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        visible={this.state.isSignUpModalVisible}
                        title=""
                        closable={false}
                        onCancel={this.handleModalCancel}
                        footer={null}>
                        <Form
                            name="signUpForm"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            autoComplete="off"
                            onFinish={this.signUpSubmit}>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                name="rePassword"
                                rules={[
                                    { required: true, message: 'Please confirm your password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        }
                                    })
                                ]}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button typeof="primary" htmlType="submit">
                                    Sign Up
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Header>
            </>
        )
    }
}

export default function (props) {
    const navigate = useNavigate();
    return <AppHeader {...props} navigate={navigate} />
};
