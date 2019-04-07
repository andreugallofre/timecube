import React, { Component } from 'react';
import { Layout, Menu, Icon, List, Modal, Button, Input, Form, InputNumber } from 'antd';
import { CubeIcon, putEditCubeFace, getActiveTasks} from "../utils";

import './MainPage.css';

const { Sider, Content } = Layout;

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



class MainPage_MyCube extends Component {

    state = {
        visible: false,
        visible2: false,
        data: [],
        list: []
    };

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

    myTasksScreen = () => {
        this.props.history.push("/home/tasks");
    };

    periodCharts = () => {
        this.props.history.push("/home/charts");
    };

    cubeConfiguration = () => {
        this.props.history.push("/home/cube/configuration");
    };

    componentDidMount() {
        this.getData((res) => {
            this.setState({
                data: res.results,
                list: res.results,
            });
        });
    }

    getData = (callback) => {
        getActiveTasks().then((response) => {
            callback(response)
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        const { list } = this.state;

        return (
            <Layout>
                <Sider className="sider" >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <CubeIcon />
                            <span> My Cube </span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={this.myTasksScreen}>
                            <Icon type="bars" />
                            <span> All my Tasks </span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={this.periodCharts}>
                            <Icon type="clock-circle" />
                            <span> All my periods </span>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout style={{ marginLeft: 200 }}>

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
                                        title={<a href="https://ant.design">{item.name.last}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
                </Layout>
            </Layout>
        );
    }
}

export default MainPage_MyCube;