import React, {Component} from 'react'


import {getAllSensorNames} from 'api/SensorNamesApi.js';


import {SensorNameEditor} from 'components/sensorName/SensorNameEditor.js';

import Icon from '@material-ui/core/Icon';

/*List Imports*/
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
/*List Imports*/


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
      editDetailsOpen: false,
      sensors: [],
      editSensor: {},
      checkedSensors: []
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

  onSensorDetailChange = (sensor) => {
    var sensorList = this.state.sensors;
    this.state.sensors.forEach( (s) => {
      if(s.nodeId === sensor.nodeId){
        console.log("removing " + JSON.stringify(s))
        sensorList.splice(sensorList.indexOf(s), 1);
          console.log("adding " + JSON.stringify(sensor))
        sensorList.push(sensor);
      }
    })
    this.setState({sensors:sensorList});
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


  handleCheckedSensor = (nodeid) => {
    const { checkedSensors } = this.state;
    const currentIndex = checkedSensors.indexOf(nodeid);
    const newChecked = [...checkedSensors];

    if (currentIndex === -1) {
      newChecked.push(nodeid);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedSensors: newChecked,
    });
  }

  isChecked = (nodeId) => {
    this.state.checkedSensors.some( sensor => {
      if(nodeId === sensor.nodeId)
        return true;

      return false;
    })
  }


  openEditDetails = (sensor) => {
    this.setState({
      editDetailsOpen:true,
      editSensor: sensor
    });
  }

  closeEditDetails = () => {
    this.setState({editDetailsOpen:false});
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

            <List>
                {this.state.sensors.map((sensor, i) => (
                  <ListItem key={sensor.nodeId} role={undefined} dense button onClick={() => {this.handleCheckedSensor(sensor.nodeId)}}>
                    <Checkbox
                      checked={this.isChecked(sensor.nodeId) }
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={sensor.sensorName} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Edit" onClick={()=>{this.openEditDetails(sensor)}}>
                        <Icon>edit</Icon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
        <SensorNameEditor open={this.state.editDetailsOpen} onClose={this.closeEditDetails} onUpdate={this.onSensorDetailChange} sensor={this.state.editSensor}/>


      </div>

    )


  }


}
