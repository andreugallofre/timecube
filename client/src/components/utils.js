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

const BASE_URL = "10.105.112.73:8080/api";

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

export const postConfigureCube = (values) => {
    return axios.post(BASE_URL + '/cube/register', {values})
};

/* GET, POST i PUT d'una tasca */

/* GET periodes (de totes les tasques o d'una tasca en concret (?)) */