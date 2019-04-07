import React, { Component } from 'react';
import { Layout, Menu, Icon, List, Modal, Button, Input, Form, InputNumber } from 'antd';
import { CubeIcon, putEditCubeFace, getActiveTasks, postConfigureAllFaces} from "../utils";

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

/*const AllTasksForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        render() {
            const { visible2, onCancel2, onCreate2, form2 } = this.props;
            const { getFieldDecorator } = form2;
            return (
                <Modal
                    visible={visible2}
                    title="Create a new collection"
                    okText="Create"
                    onCancel={onCancel2}
                    onOk={onCreate2} >
                    <Form layout="vertical">
                        <Form.Item label="Title Face 1">
                            {getFieldDecorator('title1', {
                                rules: [{ required: true, message: 'Please input the title of the first task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Description Face 1">
                            {getFieldDecorator('description1', {
                                rules: [{ required: true, message: 'Please input the description for the first task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Title Face 2">
                            {getFieldDecorator('title2', {
                                rules: [{ required: true, message: 'Please input the title of the second task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Description Face 2">
                            {getFieldDecorator('description2', {
                                rules: [{ required: true, message: 'Please input the description for the second task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Title Face 3">
                            {getFieldDecorator('title3', {
                                rules: [{ required: true, message: 'Please input the title of the third task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Description Face 3">
                            {getFieldDecorator('description3', {
                                rules: [{ required: true, message: 'Please input the description for the third task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Title Face 4">
                            {getFieldDecorator('title4', {
                                rules: [{ required: true, message: 'Please input the title of the fourth task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Description Face 4">
                            {getFieldDecorator('description4', {
                                rules: [{ required: true, message: 'Please input the description for the fourth task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Title Face 5">
                            {getFieldDecorator('title5', {
                                rules: [{ required: true, message: 'Please input the title of the fifth task!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Description Face 5">
                            {getFieldDecorator('description5', {
                                rules: [{ required: true, message: 'Please input the description for the fifth task!' }],
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
*/

class MainPage_MyCube extends Component {

    state = {
        visible: false,
        //visible2: false,
        data: [],
        list: []
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    /*showModal2 = () => {
        this.setState({ visible2: true });
    };*/

    handleCancel = () => {
        this.setState({ visible: false });
    };

    /*handleCancel2 = () => {
        this.setState({ visible2: false });
    };*/

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

    /*handleCreate2 = () => {
        const form2 = this.formRef2.props.form2;
        form2.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            postConfigureAllFaces(values.title1, values.description1, values.title2, values.description2, values.title3, values.description3, values.title4, values.description4, values.title5, values.description5).then((response) => {
                form2.resetFields();
                this.setState({ visible: false });
                this.props.history.push("/home/cube");
            }).catch((error) => {
                console.log(error);
                alert("Incorrect data");
            });

            form2.resetFields();
            this.setState({ visible2: false });
        });
    };*/

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    /*saveFormRef2 = (formRef2) => {
        this.formRef2 = formRef2;
    };*/

    myTasksScreen = () => {
        this.props.history.push("/home/tasks");
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
                            <span> My Tasks </span>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout style={{ marginLeft: 200 }}>

                    <Content className="content">
                        <div className="configureButton">
                            <Button type="primary" onClick={this.showModal2}>Configure all faces</Button>
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

                        {/*<AllTasksForm
                            wrappedComponentRef={this.saveFormRef2}
                            visible={this.state.visible2}
                            onCancel={this.handleCancel2}
                            onCreate={this.handleCreate2}*/}
                        />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default MainPage_MyCube;