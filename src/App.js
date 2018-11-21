import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import {Header} from './components/header/Header.js';
import {MainScreen} from './pages/MainScreen.js';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b71c1c',
    },
    secondary: {
      main: '#ffebee',
    }
  }
});

class App extends Component {








  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <div className="App">

          <div className="header">
            <Header />
          </div>

          <MainScreen />


      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;
