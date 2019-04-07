import {Icon} from "antd";
import React from "react";
import axios from 'axios';

const CubeSVG = () => (
    <svg height="15px" width="15px" viewBox="0 0 512 512" >
        <path d="m221.703125 0-221.703125 128v256l221.703125 128 221.703125-128v-256zm176.515625 136.652344-176.515625 101.914062-176.515625-101.914062 176.515625-101.910156zm-368.132812 26.027344 176.574218 101.941406v203.953125l-176.574218-101.945313zm206.660156 305.894531v-203.953125l176.574218-101.941406v203.949218zm0 0"/>
    </svg>
);

export const CubeIcon = props => (
    <Icon component={CubeSVG} {...props} />
);

export const postCreateUser = (name, surname, email, password) => {
    return axios({
        method: 'post',
        url: 'http://10.105.112.73:8080/api/user/register',
        data: {
            name: name,
            surname: surname,
            email: email,
            password: password
        }
    });
};

export const postGetUser = (email, password) => {
    return axios({
        method: 'post',
        url: 'http://10.105.112.73:8080/api/user/login',
        data: {
            email: email,
            password: password
        }
    });
};

export const postConfigureCube = (identifier) => {
    return axios({
        method: 'post',
        url: 'http://10.105.112.73:8080/api/cube/register',
        headers: {'Authorization': "bearer " + localStorage.getItem('token')},
        data: {
            code: identifier
        }
    });
};

export const putEditCubeFace = (id, title, description) => {
    return axios({
        method: 'put',
        url: 'http://10.105.112.73:8080/api/cube/cara',
        headers: {'Authorization': "bearer " + localStorage.getItem('token')},
        data: {
            nomTaska: title,
            descTaska: description,
            numCara: id
        }
    });
};

export const getActiveTasks = () => {
    return axios({
        method: 'get',
        url: 'http://10.105.112.73:8080/api/cube/activeTasks',
        headers: {'Authorization': "bearer " + localStorage.getItem('token')}
    })
};

export const postConfigureAllFaces = (title1, desc1, title2, desc2, title3, desc3, title4, desc4, title5, desc5) => {
    return axios({
        method: 'post',
        url:'http://10.105.112.73:8080/api/cube/cares',
        headers: {'Authorization': "bearer " + localStorage.getItem('token')},
        data: [
            {
                nomTaska: title1,
                descTaska: desc1,
                numCara: "1"
            },
            {
                nomTaska: title2,
                descTaska: desc2,
                numCara: "2"
            },
            {
                nomTaska: title3,
                descTaska: desc3,
                numCara: "3"
            },
            {
                nomTaska: title4,
                descTaska: desc4,
                numCara: "4"
            },
            {
                nomTaska: title5,
                descTaska: desc5,
                numCara: "5"
            }
        ]
    })
};

/* GET, POST i PUT d'una tasca */

/* GET periodes (de totes les tasques o d'una tasca en concret (?)) */