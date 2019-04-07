import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { CubeIcon } from "../utils";
import './MainPage.css';

const { Sider, Content } = Layout;

class MainPage_MyCube extends Component {

    myCubeScreen = () => {
        this.props.history.push("/home/cube");
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
                            <span> My Tasks </span>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout style={{ marginLeft: 200 }}>
                    <Content className="content">
                        Hola this is tasks
                    </Content>
                </Layout>

            </Layout>
        );
    }
}

export default MainPage_MyCube;