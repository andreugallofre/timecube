import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import Login from './components/Login/Login.js'
import Register from './components/Register/Register.js'
import MainPage from './components/MainPage/MainPage.js'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={ Login } />
            <Route path="/register" exact component={ Register }/>
              {/* <Route path="/home" exact component={ MainPage }/>*/}
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
