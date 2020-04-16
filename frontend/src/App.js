import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Redirect} from "react-router-dom"
import {Route} from "react-router-dom"
import Navigation from './components/Navigation'
import AboutUs from './components/AboutUs'
import Profile from './components/Profile'
import CreatePage from './components/CreatePage'
import ErrorPage from './components/ErrorPage'
import HomePage from './components/HomePage'
import BrowsePage from './components/BrowsePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import LogoutPage from './components/LogoutPage'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffb7df',
      main: '#ff9800',
      dark: '#f57c00',
      contrastTest: '#fff'
    },
    secondary: {
      main: '#9e9e9e'
    }
  },
  Typography: {
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
  }
})

class App extends React.Component {

  state = {
    netid: null
  }

  componentDidMount = () => {
    let self = this;
    const url = window.location.href
    console.log(url)
    fetch("/api/authenticate", {
      method: "POST",
      headers: {
        "content_type":"application/json"
      },
      body: JSON.stringify({url : url})
    })
    .then(function(response) {
      return response.json(); 
    })
    .then(function(result) {        // If the netid is not null, then redirect to homepage
      console.log(result.netid)
      if (result.netid !== null) {
          self.setState(
              {'netid':result.netid}
          )
      }
      else {
        fetch('/api/login')      // else, do CASAuthentication and return to the homepage
        .then(function(response) {
          return response.json();
        })
        .then(function(result) {
          window.location.assign(result.loginUrl)
        })
        .catch(function(error) {
            console.log('Request failed', error)
        })
      }
    })
    .catch(function(error) {
       console.log(error)
    })
  }

  render() {
    if (this.state.netid === null) return null;
    else {
      return(
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Navigation/>
            <Divider />
            <BrowserRouter>
            <Switch>
              <Route path="/" component={HomePage} exact/>
              <Route path="/create" component={CreatePage} exact/>
              <Route path="/browse" component={BrowsePage} exact/>
              <Route path="/about" component={AboutUs} exact/>
              <Route exact path="/users/:first_name" component={Profile} />
              <Route component={ErrorPage} /> 
            </Switch>
          </BrowserRouter> 
          </div>
          </MuiThemeProvider>
      );
    }
  }

}

export default App;

/*
  componentDidMount = () => {
    fetch('/api/authenticate')
    .then(response => response.json())
    .then(function(result) {
      let self = this
      if (result.netid === null)
      self.setState(
        {'netid':result.netid,
         'isAuthenticating':false
        })
        console.log(self.state.netid)
        console.log(self.state.isAuthenticating)
    })
    .catch(e => console.log(e))
  }
*/