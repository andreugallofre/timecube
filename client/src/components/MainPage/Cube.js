import React, { Component } from 'react';
import { Layout, Menu, Icon, List, Modal, Button, Input, Form, InputNumber } from 'antd';
import {CubeIcon, putEditCubeFace, getActiveTasks, getAllPeriodes} from "../utils";

import './MainPage.css';

const { Sider, Content } = Layout;

let dataSource = [{}];

const columns = [{
    title: 'Face number',
    dataIndex: 'faceNumber',
    key: 'faceNumber',
}, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
}];

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate} >
                    <Form layout="vertical">
                        <Form.Item label="Face Number (1 to 5)">
                            {getFieldDecorator('id', {
                                rules: [{ required: true, message: 'Please select a face number' }],
                                initialValue: 1
                            })(
                                <InputNumber min={1} max={5} />
                            )}
                        </Form.Item>
                        <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of the task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                rules: [{ required: true, message: 'Please input the description for the task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

export class Cube extends Component {

    state = { visible: false };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            putEditCubeFace(values.id, values.title, values.description).then((response) => {
                form.resetFields();
                this.setState({ visible: false });
                this.props.history.push("/home/cube");
            }).catch((error) => {
                console.log(error);
                alert("Incorrect data");
            });

            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    cubeConfiguration = () => {
        this.props.history.push("/home/cube/configuration");
    };

    componentDidMount() {
        this.getData();
    }


    getData = () => {
        let dataInfo = [{}];
        getActiveTasks().then((response) => {
            dataInfo= response.data.data;
            console.log(dataInfo);
            dataSource = [{ }];

            for (let i = 0; i < dataInfo.cares.length; ++i) {
                let newline =  {
                    faceNumber: dataInfo.cares[i].id,
                    name: dataInfo.cares[i].task.name,
                    description: dataInfo.cares[i].task.desc
                };
                dataSource.push(newline);
            }
            dataSource.shift();
            this.render();
            return dataSource;

        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        const { list } = this.state;

        return (
            <Content className="content">
                <div className="configureButton">
                    <Button type="primary" onClick={this.cubeConfiguration}>Configure all faces</Button>
                    <Button type="default" onClick={this.showModal} style={{marginLeft: 5}}>Configure one face</Button>
                </div>
                <h1 className="content-title">Your cube configuration</h1>
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={list}
                    renderItem={item => (
                        <List.Item actions={[<Button onClick={this.showModal}>Change Task</Button>]}>
                            <List.Item.Meta
                                title={item.name.last}
                            />
                        </List.Item>
                    )}
                />
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </Content>
        );
    }
}