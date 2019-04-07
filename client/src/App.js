import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import Login from './components/Login/Login.js'
import Register from './components/Register/Register.js'
import SetCube from './components/Register/SetCube.js'
import MainPage_MyCube from './components/MainPage/MainPage_MyCube.js'
import MainPage_MyTasks from './components/MainPage/MainPage_MyTasks.js'
import Configuration from './components/MainPage/ConfigureFaces.js'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={ Login } />
            <Route path="/register" exact component={ Register }/>
            <Route path="/register/newcube" exact component={ SetCube }/>
            <Route path="/home/cube" exact component={ MainPage_MyCube }/>
            <Route path="/home/cube/configuration" exact component={ Configuration }/>
            <Route path="/home/tasks" exact component={ MainPage_MyTasks }/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
