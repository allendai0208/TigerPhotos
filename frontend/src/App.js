import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch} from "react-router-dom"
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
import LoginPage from './components/LoginPage'
import NavigationBeforeLogin from './components/NavigationBeforeLogin'

// This defines the main theme of the webpages
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
  typography: {
    fontFamily: [
      'Lato',
      'sans-serif'
    ].join(','),
  }
})

class App extends React.Component {

  state = {
    netid: null,
    go_to_login: false,
    review_added: false
  }

  // This method checks if the user is authenticated or not. 
  componentDidMount = () => {
    let self = this;
    const url = window.location.href     // This method gets the current url
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
    .then(function(result) {        // If the netid is null, then redirect to the login page
      console.log(result.netid)
      if (result.netid === null) {
        self.setState(
          {'go_to_login':true}      
        )
      }
      else {
        self.setState(
          {'netid':result.netid}     // Else update the state and grant the user access to webpages
        )
      }
    })
    .catch(function(error) {
       console.log(error)
    })
  }

  render() {
    // Wait for authentication to finish
    if (this.state.netid === null && !this.state.go_to_login) return null
    
    // If netid is null and user has failed authentication, go to the login page  
    else if (this.state.netid === null && this.state.go_to_login) {
      return(<MuiThemeProvider theme={theme}>
        <div className="App">
          <NavigationBeforeLogin/>
          <Divider />
          <BrowserRouter>
          <Switch>
            <Route path="/about" component={AboutUs} exact/>
            <Route path="/" component={LoginPage} />
          </Switch>
        </BrowserRouter> 
        </div>
        </MuiThemeProvider>
      );
    } 

    // Else the user has been authenticated and they can navigate our website normally
    else {
      return(
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Navigation/>
            <Divider />
            <BrowserRouter>
            <Switch>
              <Route path="/" component={HomePage} exact/>
              <Route path="/create" render = {(props) => <CreatePage netid = {this.state.netid} {...props}/>} exact/>
              <Route path="/browse" render = {(props) => <BrowsePage netid = {this.state.netid} {...props}/>} exact/>
              <Route path="/about" component={AboutUs} exact/>
              <Route path="/logout" component={LogoutPage} exact/>
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

/*  handler2 = {this.handler2.bind(this)} 
  handler2(arg1) {
    console.log("inside handler2")
    this.setState({
      review_added: arg1
    })
    console.log(arg1)
  } */ 

/*
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
*/