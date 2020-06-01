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
import MyaccountActions from '../Redux/MyaccountRedux'
import CommonActions from '../Redux/CommonRedux'
// import { MyaccountSelectors } from '../Redux/MyaccountRedux'
import Config from '../Config/index';

async function getDefaultBillingAndShipping(addresses){
  let getDefaultShipping =  addresses.filter(x => x.default_shipping == true ).map(x => {return x});
  let getDefaultBilling =   addresses.filter(x => x.default_shipping == true ).map(x => {return x});
  return {
    getDefaultShipping :getDefaultShipping,
    getDefaultBilling :getDefaultBilling
  }
}
async function getToken() {
  try {
    console.log("herer")
    let data = await Config.api.adminToken()
    return data;
  } catch (error) {
    console.log('AsyncStorage error during token store:', error);
  }
}


async function isLogin() {
  try {
    console.log("hererislogin")
    let data = await Config.api.isLogin()
    return data;
  } catch (error) {
    console.log('AsyncStorage error during token store:', error);
  }
}


export function * getMyOrder (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(MyaccountSelectors.getData)
  // make the call to the api
  const apiToken = yield call(getToken); //call user api
  const responseAuth = yield call(api.getAuth,apiToken);
  console.log(responseAuth,"responseAuth")
  
  const apiTokenAdmin = Config.api.adminStaticToken;
  const response = yield call(api.getmyaccount, {"email":responseAuth.data.email},apiTokenAdmin)
  if(data.email == 'logout'){
    yield put(MyaccountActions.myOrderSuccess({'items':[]}))
  }else{
  console.log(response,"responsemyorders");
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(MyaccountActions.myOrderSuccess(response.data))
  } else {
    yield put(MyaccountActions.myOrderFailure())
  }
}
}

export function * changePassword (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(MyaccountSelectors.getData)
  // make the call to the api
  const apiToken = yield call(getToken);
  let customer_id = data.customer_id
  delete data.customer_id;
  const response = yield call(api.changePassword, data,customer_id,apiToken)
  console.log(response,"responsemyorders");
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(MyaccountActions.changePasswordSuccess({flag:true,data:response.data.message}))
  } else {
    yield put(MyaccountActions.changePasswordSuccess({flag:false,data:response.data.message}))
  }
}


export function * updateProfile (api, action) {
  const { data } = action;
  let response
  //let oldData
  // get current data from Store
  // const currentData = yield select(MyaccountSelectors.getData)
  // make the call to the api
  console.log(data,"herer")
  const apiToken = yield call(getToken);
  console.log(apiToken,"myacc")

   response = yield call(api.updateProfile, data,apiToken)
    console.log(response,"profileupdate")
  console.log(response,"responsemyordersmyaccount");
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(MyaccountActions.updateProfileSuccess(response.data))
    yield put(CommonActions.getAuthSuccess(response.data))
  } else {
    yield put(MyaccountActions.updateProfileFailure(false))
  }
}

export function * deleteMyAddress (api, action) {
  const { data } = action;
  let response;
    const apiTokenAdmin = Config.api.adminStaticToken;
    response = yield call(api.deleteMyAddress, data,apiTokenAdmin);

    const apiToken = yield call(getToken); //call user api
    const responseAuth = yield call(api.getAuth,apiToken)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(MyaccountActions.deleteAddressSuccess(response.data))
    yield put(CommonActions.getAuthSuccess(responseAuth.data))
  } else {
    yield put(MyaccountActions.deleteAddressSuccess(false))
  }
}


export function * updateAddress (api, action) {
  const { data } = action;
  const apiTokenAdmin = Config.api.adminStaticToken;
  const response = yield call(api.updateUserAddress,data,apiTokenAdmin)
  console.log(response,"responseresponseupdateAddress");
   const apiToken = yield call(getToken); //call user api
   const responseAuth = yield call(api.getAuth,apiToken)
   const defaultAddress = yield call(getDefaultBillingAndShipping,responseAuth.data.addresses)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(MyaccountActions.setDefaultAddressSuccess(response.data))
    yield put(CommonActions.getAuthSuccess(responseAuth.data))
    yield put(CommonActions.getDefaultAddressSuccess(defaultAddress))
  } else {
    yield put(MyaccountActions.setDefaultAddressSuccess(false))
  }
}


export function * getOrderDetail (api, action) {
  const { data } = action;
  const apiTokenAdmin = Config.api.adminStaticToken;
  const response = yield call(api.getOrderDetails,data,apiTokenAdmin);
  console.log(response,"response");
    
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(MyaccountActions.orderDetailSuccess(response.data))
  } else {
    yield put(MyaccountActions.orderDetailSuccess(false))
  }
}

