import {Icon} from "antd";
import React from "react";
import axios from 'axios';

const EmailSVG = () => (
    <svg width="15px" height="15px" viewBox="0 0 32 32" >
        <path d="M28,5H4C1.791,5,0,6.792,0,9v13c0,2.209,1.791,4,4,4h24c2.209,0,4-1.791,4-4V9  C32,6.792,30.209,5,28,5z M2,10.25l6.999,5.25L2,20.75V10.25z M30,22c0,1.104-0.898,2-2,2H4c-1.103,0-2-0.896-2-2l7.832-5.875  l4.368,3.277c0.533,0.398,1.166,0.6,1.8,0.6c0.633,0,1.266-0.201,1.799-0.6l4.369-3.277L30,22L30,22z M30,20.75l-7-5.25l7-5.25  V20.75z M17.199,18.602c-0.349,0.262-0.763,0.4-1.199,0.4c-0.436,0-0.851-0.139-1.2-0.4L10.665,15.5l-0.833-0.625L2,9.001V9  c0-1.103,0.897-2,2-2h24c1.102,0,2,0.897,2,2L17.199,18.602z" fill="#333333" id="mail"/>
    </svg>
);

export const EmailIcon = props => (
    <Icon component={EmailSVG} {...props} />
);

const BASE_URL = "10.105.112.73:8080/api";

export const postCreateUser = (name, email, password) => {
    return axios.post(BASE_URL + 'register', {
        name: name,
        email: email,
        password: password
    });
};

export const postGetUser = (email, password) => {
    return axios.post(BASE_URL + 'user/login', {email: email, password: password});
};

/* GET, POST i PUT d'una tasca */

/* GET periodes (de totes les tasques o d'una tasca en concret (?)) */