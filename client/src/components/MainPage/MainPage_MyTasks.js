import React, { Component } from 'react';
import { Layout, Menu, Icon, Table } from 'antd';
import { CubeIcon, getAllTasks } from "../utils";
import './MainPage.css';

const { Sider, Content } = Layout;

const dataSource = [{ }];

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
}, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
}, {
    title: 'Estimated time',
    dataIndex: 'estimatedTime',
    key: 'estimatedTime',
}];


class MainPage_MyCube extends Component {

    myCubeScreen = () => {
        this.props.history.push("/home/cube");
    };

    periodCharts = () => {
        this.props.history.push("/home/charts");
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let dataInfo = [{}];
        getAllTasks().then((response) => {
            dataInfo= response.data.data;
        }).catch((error) => {
            console.log(error);
        });

        for (let i = 0; i < dataInfo.length; ++i) {
            let newline = {
                title: dataInfo[i].title,
                description: dataInfo[i].description,
                estimatedTime: dataInfo[i].estimatedTime
            };
            dataSource.push(newline);
        }
    };

    render() {
        return (
            <Layout>
                <Sider className="sider" >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1" onClick={this.myCubeScreen} >
                            <CubeIcon />
                            <span> My Cube </span>
                        </Menu.Item>
                        <Menu.Item key="2">
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
                        <h1 className="content-title">All your tracked periods</h1>
                        <Table dataSource={dataSource} columns={columns} />
                    </Content>
                </Layout>

            </Layout>
        );
    }
}

export default MainPage_MyCube;