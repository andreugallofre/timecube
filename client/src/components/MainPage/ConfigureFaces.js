import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import {postConfigureAllFaces} from "../utils";
import './configureFaces.css'

class ConfigureFaces extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                postConfigureAllFaces(values.title1, values.description1, values.title2, values.description2, values.title3, values.description3, values.title4, values.description4, values.title5, values.description5).then((response) => {
                    this.props.history.push("/home/cube");
                }).catch((error) => {
                    console.log(error);
                    alert("Incorrect data");
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="configure-form">
                <h1 >Configure all cube faces</h1>
                <Form.Item label="Title for the first face">
                    {getFieldDecorator('title1', {
                        rules: [{ required: true, message: 'Please input the title of the first task!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Description for the first face">
                    {getFieldDecorator('description1', {
                        rules: [{ required: true, message: 'Please input the description of the first task!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Title for the second face">
                    {getFieldDecorator('title2', {
                        rules: [{ required: true, message: 'Please input the title of the second task!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Description for the second face">
                    {getFieldDecorator('description2', {
                        rules: [{ required: true, message: 'Please input the description of the second task!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Title for the third face">
                    {getFieldDecorator('title3', {
                        rules: [{ required: true, message: 'Please input the title of the third task!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Description for the third face">
                    {getFieldDecorator('description3', {
                        rules: [{ required: true, message: 'Please input the description of the third task!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Title for the fourth face">
                    {getFieldDecorator('title4', {
                        rules: [{ required: true, message: 'Please input the title of the fourth task!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Description for the fourth face">
                    {getFieldDecorator('description4', {
                        rules: [{ required: true, message: 'Please input the description of the fourth task!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Title for the fifth face">
                    {getFieldDecorator('title5', {
                        rules: [{ required: true, message: 'Please input the title of the fifth task!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="Description for the fifth face">
                    {getFieldDecorator('description5', {
                        rules: [{ required: true, message: 'Please input the description of the fifth task!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item className="register-button">
                    <Button type="primary" htmlType="submit" className="register-form-button"> Start Traking </Button>
                </Form.Item>
            </Form>
        );
    }
}

const Configuration = Form.create({ name: 'config' })(ConfigureFaces);

export default Configuration;


