import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './Login.css'

class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="login-background"/>
                <h1 className="login-title">Welcome to TimeCube!</h1>
                <Form.Item>
                    {getFieldDecorator('email', { rules: [
                        { type: 'email', message: 'The input is not valid e-mail!' },
                        { required: true, message: 'Please input your e-mail!' }],
                    })(
                        <Input prefix={<Icon type="user"/>} placeholder="Email" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your password!' }] }
                    )(
                        <Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item className="login-button">
                    <Button type="primary" htmlType="submit" className="login-form-button"> Log in </Button>
                    Don't have an account? <a href="/register">Register now!</a>
                </Form.Item>
            </Form>
        );
    };
}

const Login = Form.create({ name: 'login' })(LoginForm);

export default Login;