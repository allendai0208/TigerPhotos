import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch} from "react-router-dom"
import {Route} from "react-router-dom"
import { createMuiTheme } from '@material-ui/core/styles'
import Navigation from './components/Navigation'
import AboutUs from './components/AboutUs'
import Profile from './components/Profile'
import CreatePage from './components/CreatePage'
import ErrorPage from './components/ErrorPage'
import HomePage from './components/HomePage'
import BrowsePage from './components/BrowsePage'
import LandingPage from './components/LandingPage'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffb7df',
      main: '#ff9800',
      dark: '#f57c00',
      contrastTest: '#fff'
    }
  }
})

class App extends React.Component {
  state = {
    fields: {}
  };
  onSubmit = fields => {
    this.setState({fields})
  }

  render() {
    return(
      <createMuiTheme theme={theme}>
        <div className="App">
          <Navigation/>
          <BrowserRouter>
          <Switch>
            <Route path="/landing" component={LandingPage} exact/>
            <Route path="/" component={HomePage} exact/>
            <Route path="/create" component={CreatePage} exact/>
            <Route path="/browse" component={BrowsePage} exact/>
            <Route path="/about" component={AboutUs} exact/>
            <Route exact path="/users/:first_name" component={Profile} />
            <Route path='/login' component={() => { 
                  window.location.href = 'https://example.com/1234'; 
                  return null;
              }}/>
            <Route component={ErrorPage} /> 
          </Switch>
        </BrowserRouter> 
        </div>
      </createMuiTheme>
    );
  }

}

export default App;