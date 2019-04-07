import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { postCreateUser } from '../utils.js'
import './Register.css'

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                postCreateUser(values.name, values.email, values.password, values.surname).then((response) => {
                    localStorage.set('token', response.data);
                    this.props.history.push("/register/newcube");
                }).catch((error) => {
                    console.log(error);
                    this.props.history.push("/register");
                    alert("A username with this email is already registered");
                });

            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="register-form">
                <div className="register-background"/>
                <h1 className="register-title">Create a new account</h1>
                <Form.Item hasFeedback>
                    {getFieldDecorator('email', { rules: [
                            { type: 'email', message: 'The input is not valid e-mail!' },
                            { required: true, message: 'Please input your e-mail!' }],
                    })(
                        <Input prefix={<Icon type="mail" />} placeholder="Email" />
                    )}
                </Form.Item>
                <Form.Item hasFeedback >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
                    })(
                        <Input prefix={<Icon type="user" />} placeholder="Name"  />
                    )}
                </Form.Item>
                <Form.Item hasFeedback >
                    {getFieldDecorator('surname', {
                        rules: [{ required: true, message: 'Please input your surname!', whitespace: true }],
                    })(
                        <Input prefix={<Icon type="user" />} placeholder="Surname"  />
                    )}
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }, { validator: this.validateToNextPassword }],
                    })(
                        <Input prefix={<Icon type="lock"/>} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [{ required: true, message: 'Please confirm your password!' }, { validator: this.compareToFirstPassword }],
                    })(
                        <Input prefix={<Icon type="lock"/>} type="password" onBlur={this.handleConfirmBlur} placeholder="Confirm your password"/>
                    )}
                </Form.Item>
                <Form.Item className="register-button">
                    <Button type="primary" htmlType="submit" className="register-form-button"> Get Started! </Button>
                </Form.Item>
            </Form>
        );
    }
}

const Register = Form.create({ name: 'register' })(RegisterForm);

export default Register;