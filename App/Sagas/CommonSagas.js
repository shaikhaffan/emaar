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
import CommonActions from '../Redux/CommonRedux'
// import { CommonSelectors } from '../Redux/CommonRedux'
import Config from '../Config/index';
import { Geolocation} from '../common'

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

async function getLatLong() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const location = position;
        console.log(location,"--");
        resolve(location);

      },
      error => console.log(error,"error--"),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
})
}


export function * getCurrentLatLong (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CommonSelectors.getData)
  // make the call to the api
  const location = yield call(getLatLong);
  console.log(location,"location123");
  yield put(CommonActions.commonLatLongSuccess(location))
  
}


export function * isLoginFunction (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CommonSelectors.getData)
  // make the call to the api
  const apiToken = yield call(isLogin);
  const response = yield call(api.getAuth,apiToken);
  console.log("sdawf",response)
  //console.log(apiToken,"islogintoken")
  if(apiToken != null && response.status == 200){
   // console.log(apiToken,"apitokenislogin")
    yield put(CommonActions.isLoginRequestSuccess(true))
  }else{
    yield put(CommonActions.isLoginRequestSuccess(false))
  }

}

export function * getAuth (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CommonSelectors.getData)
  // make the call to the api
  //console.log("getAuth")
  const apiToken = yield call(getToken);
  console.log(apiToken,"getToken")
  const response = yield call(api.getAuth,apiToken)
  console.log(response,"responseAuthgetcart")

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CommonActions.getAuthSuccess(response.data))
  } else {
    yield put(CommonActions.getAuthSuccess([]))
  }
}

export function * getWishList (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CommonSelectors.getData)
  // make the call to the api
  const apiToken = yield call(getToken);
  console.log(apiToken,"apiToken");
  const response = yield call(api.getWishList,apiToken)
  console.log(response,"responsewishlist")
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CommonActions.wishListItemSuccess(response.data))
  } else {
    yield put(CommonActions.wishListItemSuccess([]))
  }
}

export function * deleteWishList (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CommonSelectors.getData)
  // make the call to the api
  const apiToken = yield call(getToken);
  console.log(data,"delete")

 //console.log(data,"responseAuthaddcartdelete")
  const response = yield call(api.deleteWishList,data,apiToken)
 console.log(response,"responseAuthaddcart")

  // success?
  if (response.ok) {
  
    const response = yield call(api.getWishList,apiToken)
    yield put(CommonActions.wishListItemSuccess(response.data))
    
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
   // yield put(CommonActions.deleteWishListItemSuccess(response.data))
  } else {
    yield put(CommonActions.commonFailure())
  }
}
export function * addWishList (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CommonSelectors.getData)
  // make the call to the api
  const apiToken = yield call(getToken);
  //console.log(data,"dataAddWish")
 
  const response = yield call(api.addWishList,data,apiToken)
  console.log(response,"responseaddWishList")

  // success?
  if (response.ok) {
    const response = yield call(api.getWishList,apiToken)
  yield put(CommonActions.wishListItemSuccess(response.data))
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
   // yield put(CommonActions.wishListItemSuccess(response.data))
  } else {
    yield put(CommonActions.commonFailure())
  }
}

