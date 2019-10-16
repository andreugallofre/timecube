import React, { Component } from 'react';
import { Layout, List, Button } from 'antd';
import { putEditCubeFace, getActiveTasks } from '../../utils.js';
import { CollectionCreateForm } from '../../Forms/CollectionCreator.js'

import './Cube.css';

const { Content } = Layout;

let dataSource = [{}];

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
                this.props.history.push("/home");
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