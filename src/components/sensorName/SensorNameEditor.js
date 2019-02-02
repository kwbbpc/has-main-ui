import React, {Component} from 'react'


import {putUpdateSensor} from 'api/SensorNamesApi.js';

import debounce from 'debounce';

/**Text Fields**/
import TextField from '@material-ui/core/TextField';
/**Text Fields**/


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


const Styles = {
  wrapper: {
    width: '100%'
  },
  notes: {
    float: 'right'
  },
  nodeId:{
    display: 'block',
    width: '100%'
  },
  leftWrapper:{
    display: 'flex',
    flexDirection: 'column',
    float: 'left',
    marginRight: '20px'
  }
}










export class SensorNameEditor extends Component {

  constructor(props){
    super(props);
    this.sensorUpdate = null;
    this.state = {
      sensor: props.sensor,
      error: null,
      loadingMessage: ""
    }
  }

  componentDidUpdate(){
    if(this.props.sensor.nodeId !== this.state.sensor.nodeId){
      this.setState({
        sensor: this.props.sensor,
        loadingMessage: ""
      })
    }
  }

  handleChange = name => event => {
    this.setState({loadingMessage: "Updating..."});

    if(this.sensorUpdate != null)
      this.sensorUpdate.clear();


    const options = {
      success: this.onSave,
      error: this.onErrorSaving
    }

    var sensor = this.state.sensor;
    sensor[name] = event.target.value;
    this.setState({sensor});

    this.sensorUpdate = debounce( () => {putUpdateSensor(sensor, options)} , 2000);
    this.sensorUpdate();

  }

  onSave = (data) => {
    if(data !== null && data.errorMessage !== undefined){
        this.onErrorSaving(data.errorMessage);
    }else{
      this.setState({loadingMessage: "Saved!"});
    }
  }

  onClose = () => {
      this.props.onUpdate(this.state.sensor);
  }

  onErrorSaving = (err) => {
    console.log(err);
    this.setState({loadingMessage: "Error!"});
    this.setState({error: err});
  }


  render() {

    return(
      <Dialog
        open={this.props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.closeEditDetails}
      >
        <DialogContent>

          <div style={Styles.wrapper}>

            <div style={Styles.leftWrapper}>
              <TextField
                key={this.state.sensor.nodeId + "nodeId"}
                disabled
                id="outlined-nodeId"
                label="Node ID"
                value={this.state.sensor.nodeId}
                style={Styles.nodeId}
                margin="normal"
                variant="outlined"
              />
              <TextField
                key={this.state.sensor.nodeId + "sensorName"}
                id="outlined-name-input"
                label="Name"
                style={Styles.textField}
                type="name"
                value={this.state.sensor.sensorName}
                onChange={this.handleChange('sensorName')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                key={this.state.sensor.nodeId + "location"}
                id="outlined-location-input"
                label="Location"
                style={Styles.textField}
                value={this.state.sensor.location}
                onChange={this.handleChange('location')}
                type="location"
                name="location"
                margin="normal"
                variant="outlined"
              />


              <TextField
                key={this.state.sensor.nodeId + "description"}
                id="outlined-details-flexible"
                label="Description"
                multiline
                rowsMax="4"
                value={this.state.sensor.description}
                onChange={this.handleChange('description')}
                style={Styles.textField}
                margin="normal"
                variant="outlined"
              />
            </div>

            <TextField
              key={this.state.sensor.nodeId + "notes"}
              id="outlined-notes-flexible"
              label="Notes"
              multiline
              rowsMax="10"
              value={this.state.sensor.notes}
              onChange={this.handleChange('notes')}
              style={Styles.notes}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div >
            <div >{this.state.loadingMessage}</div>
          </div>
          {this.state.error}
      </DialogContent>
      <DialogActions>
        <Button onClick={this.props.onClose} color="primary">
          Done
        </Button>
      </DialogActions>
      </Dialog>

  )
}


}
