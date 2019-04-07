import React, { Component } from 'react';
import { Layout, Menu, Icon, List, Modal, Button, Input } from 'antd';
import { CubeIcon } from "../utils";
import reqwest from 'reqwest';

import './MainPage.css';

const { Sider, Content } = Layout;
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;


class MainPage_MyCube extends Component {

    state = {
        visibleModal: false,
        initLoading: true,
        loading: false,
        title: "",
        description: "",
        data: [],
        list: []
    };

    showModal = () => {
        this.setState({ visibleModal: true });
    };

    handleOk = () => {

        console.log("Title: " + this.state.title + ", Description: " + this.state.description);

        this.setState({ visibleModal: false, title: "", description: "" });
    };

    handleCancel = () => {
        this.setState({ visibleModal: false });
    };

    myTasksScreen = () => {
        this.props.history.push("/home/tasks");
    };

    componentDidMount() {
        this.getData((res) => {
            this.setState({
                initLoading: false,
                data: res.results,
                list: res.results,
            });
        });
    }

    getData = (callback) => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                callback(res);
            },
        });
    };

    render() {
        const { initLoading, list, visibleModal} = this.state;

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
                        <Button type="primary" className="configureButton" >Configure all faces</Button>
                        <h1 className="content-title">Your cube configuration</h1>
                        <List
                            className="demo-loadmore-list"
                            loading={initLoading}
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
                    </Content>
                </Layout>

            </Layout>
        );
    }
}

export default MainPage_MyCube;