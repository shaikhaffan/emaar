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
import ProductdetailActions from '../Redux/ProductdetailRedux'
// import { ProductdetailSelectors } from '../Redux/ProductdetailRedux'
import Config from '../Config/index';



export function * getProductDetails (api, action) {
  const { data } = action;
  //let  adminApiToken = Config.api.adminStaticToken
  // get current data from Store
  // const currentData = yield select(ProductdetailSelectors.getData)
  // make the call to the api
  const response = yield call(api.getProductDetails, data)
  console.log(response,"productDetails");
  // success?
  if (response.ok) {
    console.log(response,"productDetails123");
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ProductdetailActions.productdetailSuccess(response.data))
  } else {
    yield put(ProductdetailActions.productdetailFailure())
  }
}

