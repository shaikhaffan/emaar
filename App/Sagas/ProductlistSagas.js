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
import ProductlistActions from '../Redux/ProductlistRedux'
// import { ProductlistSelectors } from '../Redux/ProductlistRedux'
import Config from '../Config/index';



export function * getProductByCategory (api, action) {
  const { data } = action;
  console.log(data,"productlistdata--")
  try {
    const response = yield call(api.getProductList, data);
    console.log(response,"response----");
    yield put(ProductlistActions.productlistSuccess(response.data))
  } catch (e) {
    console.log(e,"E")
    yield put(ProductlistActions.productlistFailure())
  }
}

