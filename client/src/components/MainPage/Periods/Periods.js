import React, { Component } from 'react';
import { Layout, Table } from 'antd';
import { getAllPeriodes } from '../../utils.js';
import './Periods.css';

const { Content } = Layout;

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

export class Periods extends Component {

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let dataInfo = [{}];
        getAllPeriodes().then((response) => {
            dataInfo= response.data.data;
            console.log(dataInfo);
            dataSource = [{ }];

            for (let i = 0; i < dataInfo.length; ++i) {

                if (dataInfo[i].periodes.length > 0) {
                    for (let j = 0; j < dataInfo[i].periodes.length; ++j) {
                        let newline = {
                            title: dataInfo[i].name,
                            startTime: dataInfo[i].periodes[j].inici,
                            endTime: dataInfo[i].periodes[j].fi
                        };
                        dataSource.push(newline);
                    }
                }
            }
            dataSource.shift();
            this.render();
            return dataSource

        }).catch((error) => {
            console.log(error);
        });

    };

    render() {
        return (
            <Content className="content">
                <h1 className="content-title">All your tasks details</h1>
                <Table dataSource={dataSource} columns={columns} />
            </Content>
        );
    }
}