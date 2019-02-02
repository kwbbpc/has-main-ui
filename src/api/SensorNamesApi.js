import endpoints from './endpoints.js';

/*
 This function requires params and options.
 Params must include:
   - startDate: the start time in ISO8601 string format
   - endDate: the end time in ISO8601 string format
   - nodeId: the node to get temps for
Options must include:
   - success: a function to call with the json resposne
   - error: a function to call to handle the errors if unsuccessful
*/
export const getAllSensorNames = (params, options) => {

  const url = endpoints.sensorNameEndpoint;
  fetch(url)
    .then(response => response.json())
    .then(data => options.success(data))
    .catch(err => options.error(err));

}

export const putUpdateSensor = (params, options) => {

    const url = endpoints.sensorNameEndpoint;

    if(params.nodeId != null){
      const body = {
        "nodeId": params.nodeId,
        "sensorName": params.sensorName,
        "location": params.location,
        "description": params.description,
        "notes": params.notes
      }

      fetch(url, {
          method: 'PUT',
          body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => options.success(data))
      .catch(err => options.error(err));


    }else{
      options.error("No sensor provided in params: " + JSON.stringify(params));
    }


}
