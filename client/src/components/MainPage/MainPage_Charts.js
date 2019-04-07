import React, { Component } from 'react';
import { Layout, Menu, Icon, Table } from 'antd';
import {CubeIcon, getAllPeriodes} from "../utils";
import './MainPage.css';

const { Sider, Content } = Layout;

let dataSource = [{ }];

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
}, {
    title: 'Start time',
    dataIndex: 'startTime',
    key: 'startTime',
}, {
    title: 'End time',
    dataIndex: 'endTime',
    key: 'endTime',
}];

class MainPage_Charts extends Component {

    myCubeScreen = () => {
        this.props.history.push("/home/cube");
    };

    myTasksScreen = () => {
        this.props.history.push("/home/tasks");
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let dataInfo = [{}];
        getAllPeriodes().then((response) => {
            dataInfo= response.data.data;
            console.log(dataInfo)
            dataSource = [{ }];

            for (let i = 0; i < dataInfo.length; ++i) {

                if (dataInfo[i].periodes.length > 0) {
                    for (let j = 0; j < dataInfo[i].periodes.length; ++j) {
                        let newline = {
                            title: dataInfo[i].name,
                            startTime: dataInfo[i].periodes[j].inici,
                            endTime: dataInfo[i].periodes[j].fi
                        }
                        dataSource.push(newline);
                    };
                }
            }
            dataSource.shift()
            this.render()
            return dataSource

        }).catch((error) => {
            console.log(error);
        });

    };

    render() {
        return (
            <Layout>
                <Sider className="sider" >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
                        <Menu.Item key="1" onClick={this.myCubeScreen} >
                            <CubeIcon />
                            <span> My Cube </span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={this.myTasksScreen}>
                            <Icon type="bars" />
                            <span> All my Tasks </span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="clock-circle" />
                            <span> All my periods </span>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout style={{ marginLeft: 200 }}>
                    <Content className="content">
                        <h1 className="content-title">All your tasks details</h1>
                        <Table dataSource={dataSource} columns={columns} />
                    </Content>
                </Layout>

            </Layout>
        );
    }
}

export default MainPage_Charts;