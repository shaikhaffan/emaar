/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the Infinite Red Slack channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import RegisterActions from '../Redux/RegisterRedux'
import Config from '../Config/index';
// import { RegisterSelectors } from '../Redux/RegisterRedux'

async function getToken() {
  try {
    console.log("herer")
    let data = await Config.api.adminToken()
    return data;
  } catch (error) {
    console.log('AsyncStorage error during token store:', error);
  }
}
export function * getRegister (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(RegisterSelectors.getData)
  // make the call to the api
  const apiToken = yield call(getToken);
  console.log("asdfsdf",apiToken)
  const response = yield call(api.getSignUp, data,apiToken)
  console.log(response,"responseregister")
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(RegisterActions.registerSuccess({flag:true,"message" :"success",data : response.data}))
  } else {
    console.log(response.data.error.message,"message");
    yield put(RegisterActions.registerFailure({flag:false,"message" :response.data.error.message }))
  }
} 
