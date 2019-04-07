import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { postConfigureCube } from '../utils.js';
import {CubeIcon} from "../utils";
import './Register.css'

class SetCubeForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values.name);
                postConfigureCube(values.name).then((response) => {
                    console.log(response.data);
                    this.props.history.push("/home/cube");
                }).catch((error) => {
                    console.log(error);
                    this.props.history.push("/register/newcube");
                    alert("Username or password incorrect");
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="register-form">
                <div className="register-background"/>
                <h1 className="register-title">But first... please register a cube</h1>
                <Form.Item hasFeedback >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your cube identifier!', whitespace: true }],
                    })(
                        <Input prefix={<CubeIcon />} placeholder="Cube Identifier"  />
                    )}
                </Form.Item>

                <Form.Item className="register-button">
                    <Button type="primary" htmlType="submit" className="register-form-button"> Register cube </Button>
                </Form.Item>
            </Form>
        );
    }
}

const CubeSetter = Form.create({ name: 'cubeSetter' })(SetCubeForm);

export default CubeSetter;