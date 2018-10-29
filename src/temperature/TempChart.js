import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

const styles = {
  containerStyle: {
    width: '100vh',
    height: '100vh'
  }
}


const chart = (data) => {

  var temps = [];
  var times = [];

  console.log(data);
  console.log(data.temperatures);

  if(data != null && data.temperatures != null){
    console.log("Collecting temperatures: " + data.temperatures)
  data.temperatures.forEach(
    temp => {
        temps.push(temp.temperature);
        times.push(temp.timestamp);
    }
    );
  }
  console.log("Temps: " + temps);


  return {
    temps: temps,
    times: times
  }
}

export class TempChart extends Component {

  constructor(props){
    super(props);
  }


  render(){

    console.log("Got props: " + JSON.stringify(this.props));
    const data = chart(this.props.data);

    const chartData = {
    labels: data.times,
    datasets: [
      {
        label: 'My First dataset',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data.temps
      }
    ]
  };

    return(

      <div style={styles.containerStyle}>
        <Line data={chartData} />
      </div>


    )
  }


}
