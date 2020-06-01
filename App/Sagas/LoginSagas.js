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
import LoginActions from '../Redux/LoginRedux'
// import { LoginSelectors } from '../Redux/LoginRedux'

import Config from '../Config/index';



async function setToken(token) {
  console.log(token,"en","setTokendata")
  try {
    console.log("herer")
    let data = await Config.api.setToken(token.token);
    console.log("set~TokernSaga",data)
    return data;
  } catch (error) {
    console.log('AsyncStorage error during token store:', error);
  }
}

async function deleteUserToken() {
  return await  Config.api.deleteUserToken();
}

export function * getLogin (api, action) {
  const { data } = action;
  let response;

  // get current data from Store
  // const currentData = yield select(LoginSelectors.getData)
  // make the call to the api

  console.log(data,"data--loginsaga")
  try {
    if(data.type == undefined){
     response = yield call(api.getlogin, data);
    }else{
       response = yield call(api.getSocialLogin, data);
    }
    console.log(response,"responselogin")
    if(response.status == 200 && response.ok){
      if(data.type == undefined)  {
        console.log("nontype")
      let tokenData =  (data.type == undefined) ? response.data : response.data.token;
      //console.log("set~tokendara",tokenData)
        if(tokenData != undefined){
         setTokenData = yield call(setToken,tokenData);
        }
        //console.log("set~TokernInsideSaga",setTokenData)
        yield put(LoginActions.loginSuccess({data : "Login Success",flag:true}))
      }else{
        console.log("type")
        let tokenData =  (data.type == undefined) ? response.data : response.data.token;
        console.log("set~tokendara123",tokenData)
        if(tokenData != undefined){
           setTokenData = yield call(setToken,tokenData);
          }
          console.log("set~TokernInsideSaga123",response.data.status,"-",setTokenData);
          console.log("response.data.status ",response.data.status );
          if(response.data.error != undefined){
              yield put(LoginActions.loginSuccess({data : "Login Success" ,flag:true}))
          }else{
              yield put(LoginActions.loginFailure({data : response.data.error.message ,flag:null}))
          }
      }
  }else{
      console.log("errormessage1",response.data.error.message )
      yield put(LoginActions.loginFailure({data : response.data.error.message ,flag:null}))
    }
  } catch (e) {
    console.log(e,"errormessage",response.data.error.message  )
    yield put(LoginActions.loginFailure({data : response.data.error.message ,flag:null}))
  }
  
}

export function * logOutFunc (api, action) {

  let isDelete = call(deleteUserToken)
  if(isDelete){
    yield put(LoginActions.logOutSuccess(null))
  }else{
    yield put(LoginActions.logOutSuccess(null))
  }
}
