import React, {Component} from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';



import {TempChart} from '../temperature/TempChart.js';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};



export class MainScreen extends Component {


   constructor(props){
     super(props);
       this.state = {
         sensorDrawerOpen: false,
         value: 0
       };
   }


   handleChange = (event, value) => {
     this.setState({ value });
   };

   handleChangeIndex = index => {
     this.setState({ value: index });
   };



  render(){
    return (
      <div >
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Sensors" />
            <Tab label="Controls" />
            <Tab label="Garden" />
            <Tab label="Profiles" />
            <Tab label="To Do List" />
            <Tab label="Networks" />
            <Tab label="Alerts" />
          </Tabs>
        </AppBar>
        <SwipeableViews

          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={"test"}>
                    <TempChart />
          </TabContainer>
          <TabContainer  dir={"test"}>Item Two</TabContainer>
          <TabContainer  dir={"test"}>Item Three</TabContainer>

          <TabContainer  dir={"test"}>Item Three</TabContainer>

          <TabContainer  dir={"test"}>Item Three</TabContainer>

          <TabContainer  dir={"test"}>Item Three</TabContainer>

          <TabContainer  dir={"test"}>Item Three</TabContainer>
        </SwipeableViews>
      </div>
    );
  }

}
