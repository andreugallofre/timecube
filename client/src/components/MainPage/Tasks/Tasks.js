import React, { Component } from 'react';
import { Layout, Menu, Icon, Table } from 'antd';
import { CubeIcon, getAllTasks } from '../../utils.js';
import './MainPage.css';

const { Sider, Content } = Layout;

let dataSource = [{ }];

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
}, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
}, {
    title: 'Suma (seconds)',
    dataIndex: 'suma',
    key: 'suma',
}];


export class Tasks extends Component {

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
        dataSource = [{}];
        let dataInfo = [{}];
        getAllTasks().then((response) => {
            dataInfo= response.data.data;
            console.log(dataInfo);

            for (let i = 0; i < dataInfo.length; ++i) {
                let newline = {
                    title: dataInfo[i].name,
                    description: dataInfo[i].desc,
                    suma: dataInfo[i].suma,
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
        return (
            <Content className="content">
                <h1 className="content-title">All your tracked periods</h1>
                <Table dataSource={dataSource} columns={columns} />
            </Content>
        );
    }
}
