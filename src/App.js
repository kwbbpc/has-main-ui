import React, { Component } from 'react';
import './App.css';
import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import {Header} from './components/header/Header.js';
import {MainScreen} from './pages/MainScreen.js';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b71c1c',
    },
    secondary: {
      main: '#ffebee',
    },
    typography: {
      useNextVariants: true,
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
