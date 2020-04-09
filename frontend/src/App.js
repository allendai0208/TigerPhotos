import React, { useEffect, useState } from 'react';
import './App.css';
import CreatePage from './components/CreatePage'
import {BrowserRouter, Switch} from "react-router-dom"
import ErrorPage from './components/ErrorPage'
import Navigation from './components/Navigation'
import {Route} from "react-router-dom"
import HomePage from './components/HomePage'
import BrowsePage from './components/BrowsePage'
import AboutUs from './components/AboutUs'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state = {
    fields: {}
  };
  onSubmit = fields => {
    this.setState({fields})
  }

  render() {
    return(
      <div className="App">
        <Navigation/>
        <BrowserRouter>
        <Switch>
          <Route path="/about" component={HomePage} exact/>
          <Route path="/create" component={CreatePage} />
          <Route path="/browse" component={BrowsePage} />
          <Route path="/" component={AboutUs} />
          <Route component={ErrorPage} /> 
        </Switch>
      </BrowserRouter> 
      </div>
    );
  }

}

export default App;