import React, {Component} from 'react'


import {getAllSensorNames} from 'api/SensorNamesApi.js';

/**Dialog Imports **/
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
/**Dialog Imports **/

function Transition(props){
  return <Slide direction="up" {...props} />
}

export class SensorNameDialog extends Component{

  constructor(props){
    super(props);

    this.state = {
      open: false,
      sensors: []
    };

  }



  componentDidMount(){

    const options = {
      success: this.onGetAllSensors,
      error: this.onFailGettingAllSensors
    };

    const params = {};


    //get all the Sensors
    getAllSensorNames(params, options);

  }


  onGetAllSensors = (json) =>{
    json.allSensors.forEach( (sensor) => {
      this.state.sensors.push(sensor);
    })
  }

  onFailGettingAllSensors = (err) => {
    console.log("Failed: " + JSON.stringify(err));
  }

  handleClickOpen = () => {
    this.setState({open:true});
  }

  handleClose = () => {
    this.setState({open:false});
  }

  render(){
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Add more sensors</Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
        >
          <DialogContent>
          {
            this.state.sensors.map( sensor =>
              <div key={sensor.nodeId}>{sensor.sensorName}</div>
            )
          }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    )


  }


}
