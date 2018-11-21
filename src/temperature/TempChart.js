import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {getSingleTemperatures} from '../api/WeatherServiceApi.js';

import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

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


const chart = (data) => {

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
    const options = {
      success: (json) => {this.setState({tempData: json});},
      error: (err) => {console.log(err);}
    };

    getSingleTemperatures(this.state.data, options);
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

    console.log("Dates: " + JSON.stringify(this.state.data));

    const data = chart(this.state.tempData);

    const labels = data.times.map(time => new Date(time).toLocaleString());

    console.log("Labels: " + JSON.stringify(labels));

    const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Sensor Data',
        fill: true,
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
        data: data.temps,
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
