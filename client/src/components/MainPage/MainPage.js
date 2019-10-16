import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { CubeIcon } from "../utils";
import './MainPage.css';
import { Cube } from './Cube/Cube.js'
import { Tasks } from './Tasks/Tasks.js'
import { Periods } from './Periods/Periods.js'

const { Sider } = Layout;

export class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = { cube: true, tasks: false, periods: false };
    };

    toCube = () => {
        this.setState({ cube: true, tasks: false, periods: false })             
    };

    toTasks = () => {
        this.setState({ cube: false, tasks: true, periods: false })             
    };

    toPeriods = () => {
        this.setState({ cube: false, tasks: false, periods: true })             
    };

    render() {
        return (
            <Layout>
                <Sider className="sider" >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" onClick={this.toCube}> <CubeIcon /> <span> My Cube </span> </Menu.Item>
                        <Menu.Item key="2" onClick={this.toTasks}> <Icon type="bars" /> <span> All my Tasks </span> </Menu.Item>
                        <Menu.Item key="3" onClick={this.toPeriods}> <Icon type="clock-circle" /> <span> All my periods </span> </Menu.Item>
                    </Menu>
                </Sider>

                <Layout style={{ marginLeft: 200 }}>
                    { this.state.cube ? <Cube /> : null }
                    { this.state.tasks ? <Tasks /> : null }
                    { this.state.periods ? <Periods /> : null }
                </Layout>
            </Layout>
        );
    }
}