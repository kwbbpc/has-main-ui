import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {getSingleTemperatures, getSingleHumidity} from '../api/WeatherServiceApi.js';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import {SensorNameDialog} from '../components/sensorName/SensorNameDialog.js'

const styles = {
  containerStyle: {
    width: '100vh',
    height: '100vh'
  },
  datepickersContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline'
  },
  datepicker:{
    margin: '0px 10px 0px 20px'
  }

}


const chartHumidity = (data) => {

  var humidity = [];
  var times = [];

  if(data != null && data.humidity != null){
  data.humidity.forEach(
    pt => {
        humidity.push(pt.humidity);
        times.push(pt.timestamp);
    }
    );
  }


  return {
    humidity: humidity,
    times: times
  }
}


const chartTemp = (data) => {

  var temps = [];
  var times = [];

  if(data != null && data.temperatures != null){
  data.temperatures.forEach(
    temp => {
        temps.push(temp.temperature);
        times.push(temp.timestamp);
    }
    );
  }


  return {
    temps: temps,
    times: times
  }
}

export class TempChart extends Component {

  constructor(props){
    super(props);

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);

    let defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 7);

    this.state = {
      tempData: "",
      humidityData: "",
      sensorDrawerOpen: false,
      value: 0,
      data: {
        startDate: defaultStartDate.toISOString(),
        endDate: (new Date()).toISOString(),
        nodeId: '0013A200406B8D09'
      }
    };
  }

  componentDidMount(){
    const tempOptions = {
      success: (json) => {this.setState({tempData: json});},
      error: (err) => {console.log(err);}
    };

    getSingleTemperatures(this.state.data, tempOptions);

    const humidityOptions = {
      success: (json) => {this.setState({humidityData: json});},
      error: (err) => {console.log(err);}
    };
    getSingleHumidity(this.state.data, humidityOptions);
  }


  handleStartDateChange = date => {

    var data = {...this.state.data};
    data.startDate = date.toISOString();
    this.setState({data});
    const options = {
      success: (json) => {this.setState({tempData: json});},
      error: (err) => {console.log(err);}
    };
    getSingleTemperatures(this.state.data, options);
  }

  handleEndDateChange = date => {
    var data = {...this.state.data};
    data.endDate = date.toISOString();
    this.setState({data});
    const options = {
      success: (json) => {this.setState({tempData: json});},
      error: (err) => {console.log(err);}
    };
    getSingleTemperatures(this.state.data, options);
  }



  render(){

    const tempData = chartTemp(this.state.tempData);
    const humidityData = chartHumidity(this.state.humidityData);

    const labels = tempData.times.map(time => new Date(time).toLocaleString());

    const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Temperature',
        fill: false,
        lineTension: .5,
        backgroundColor: '#ffcccc',
        borderColor: '#800000',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        pointBorderColor: '#800000',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: '#ff751a',
        pointHoverBorderColor: '#800000',
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: tempData.temps,
        options: {
          animation:{
            duration: 5000,
            easing: 'easeInQuad'
          }
        }
      },
      {
        label: 'Humidity',
        fill: false,
        lineTension: .5,
        backgroundColor: '#e0e0ff',
        borderColor: '#6666FF',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        pointBorderColor: '#000033',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: '#e5e5ff',
        pointHoverBorderColor: '#000033',
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: humidityData.humidity,
        options: {
          animation:{
            duration: 5000,
            easing: 'easeInQuad'
          }
        }
      }
    ]
  };

    return(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>


        <div style={styles.containerStyle}>

          <SensorNameDialog />
          <div style={styles.datepickersContainer}>
            <DateTimePicker style={styles.datepicker} value={this.state.data.startDate} onChange={this.handleStartDateChange} />
            <div> - </div>
            <DateTimePicker style={styles.datepicker} value={this.state.data.endDate} onChange={this.handleEndDateChange} />
          </div>
          <Line data={chartData} />
        </div>
      </MuiPickersUtilsProvider>
    )
  }


}
