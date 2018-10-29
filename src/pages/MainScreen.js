import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


import {getSingleTemperatures} from '../api/WeatherServiceApi.js';
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

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});


export class MainScreen extends Component {


   constructor(props){
     super(props);
       this.state = {
         tempData: "",
         sensorDrawerOpen: false,
         value: 0
       };
   }

   componentDidMount(){

     const params = {
       startDate: '2018-08-20T15:16:51.524Z',
       endDate: '2018-08-31T15:20:51.524Z',
       nodeId: '0013A200406B8D09'
     };

     const options = {
       success: (json) => {this.setState({tempData: json});},
       error: (err) => {console.log(err);}
     };

     console.log("Getting temps");
     getSingleTemperatures(params, options);


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
          <TabContainer >
                    <TempChart data={this.state.tempData} />
          </TabContainer>
          <TabContainer >Item Two</TabContainer>
          <TabContainer >Item Three</TabContainer>
        </SwipeableViews>
      </div>
    );
  }

}
