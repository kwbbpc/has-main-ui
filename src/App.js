import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto';

import {Header} from './components/header/Header.js';
import {MainScreen} from './pages/MainScreen.js';

class App extends Component {








  render() {
    return (
      <div className="App">

          <div className="header">
            <Header />
          </div>

          <MainScreen />


      </div>
    );
  }
}

export default App;
