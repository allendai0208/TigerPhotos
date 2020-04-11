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
import { createMuiTheme } from '@material-ui/core/styles'
import Profile from './components/Profile'

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
            <Route path="/" component={HomePage} exact/>
            <Route path="/create" component={CreatePage} />
            <Route path="/browse" component={BrowsePage} />
            <Route path="/about" component={AboutUs} />
            <Route exact path="/users/:first_name" component={Profile} />
            <Route component={ErrorPage} /> 
          </Switch>
        </BrowserRouter> 
        </div>
      </createMuiTheme>
    );
  }

}

export default App;