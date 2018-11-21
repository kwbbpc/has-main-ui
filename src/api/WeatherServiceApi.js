import React from 'react';
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
export const getSingleTemperatures = (params, options) => {

  const url = endpoints.weatherServiceEndpoint + 'data/temperatures?nodeId=' + params.nodeId +
  '&startTime=' + params.startDate + '&endTime=' + params.endDate + '&resolution=0';


  fetch(url)
    .then(response => response.json())
    .then(data => options.success(data))
    .catch(err => options.error(err));

}
