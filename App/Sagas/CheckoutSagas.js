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
import CheckoutActions from '../Redux/CheckoutRedux'
import CommonActions from '../Redux/CommonRedux'
import Config from '../Config/index';
// import { CheckoutSelectors } from '../Redux/CheckoutRedux'

async function getToken() {
  try {
    console.log("herer")
    let data = await Config.api.adminToken()
    return data;
  } catch (error) {
    console.log('AsyncStorage error during token store:', error);
  }
}


export function * getCheckout (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CheckoutSelectors.getData)
  // make the call to the api
  const apiToken = yield call(getToken)
  console.log(data,"datadatadata")
  const shippinginfo = 
    {  "address": {
          "region":"Qatar",
          "region_id": data.defaultShipping.region_id,
          "region_code": data.defaultShipping.region_code,
          "country_id": data.defaultShipping.country_id,
          "street": data.defaultShipping.street,
          "postcode": data.defaultShipping.postcode,
          "city": data.defaultShipping.city,
          "firstname": data.defaultShipping.firstname,
          "lastname": data.defaultShipping.lastname,
          "email": data.defaultShipping.email,
          "telephone": data.defaultShipping.telephone,
          "same_as_billing": data.defaultShipping.billing_address

      }
    }

 // 
  const responseShippingMethod = yield call(api.getCheckOutShipping,shippinginfo,apiToken);
  const allInfo = 
        {  "addressInformation": {
              "shipping_address": shippinginfo.address,
              "billing_address": {
                "region": "New York",
                  "region_id": 43,
                  "region_code": "NY",
                  "country_id": "US",
                  "street": [
                    "123 Oak Ave"
                  ],
                  "postcode": "10577",
                  "city": "Purchase",
                  "firstname": "Jane",
                  "lastname": "Doe",
                  "email": "jdoetest@mailinator.com",
                  "telephone": "512-555-1111"
                },
                "shipping_carrier_code": "flatrate",
                "shipping_method_code": "flatrate"
          }}
          console.log("allInfo",allInfo)
          const responsePaymentMethod = yield call(api.getCheckOutPayment,allInfo,apiToken)
          console.log(responseShippingMethod,"responseShippingMethod","responsePaymentMethod",responsePaymentMethod);

          // success?
          if (responseShippingMethod.ok) {
            // You might need to change the response here - do this with a 'transform',
            // located in ../Transforms/. Otherwise, just pass the data back from the api.
            yield put(CheckoutActions.checkoutSuccess({"getShipping" :responseShippingMethod.data,"getPaymentMethod" : responsePaymentMethod.data}))
          } else {
            yield put(CheckoutActions.checkoutFailure(false))
          }
}

export function * getPaymentMethod (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(CheckoutSelectors.getData)
  // make the call to the api
  const apiToken = yield call(getToken)
  console.log(data,"datadatadata")
  const shippinginfo = 
    {  "address": {
          "region":"Qatar",
          "region_id": data.defaultShipping.region_id,
          "region_code": data.defaultShipping.region_code,
          "country_id": data.defaultShipping.country_id,
          "street": data.defaultShipping.street,
          "postcode": data.defaultShipping.postcode,
          "city": data.defaultShipping.city,
          "firstname": data.defaultShipping.firstname,
          "lastname": data.defaultShipping.lastname,
          "email": data.defaultShipping.email,
          "telephone": data.defaultShipping.telephone,
          "same_as_billing": data.defaultShipping.billing_address

      }
    }

  const allInfo = 
        {  "addressInformation": {
              "shipping_address": shippinginfo.address,
              "billing_address": {
                "region": "New York",
                  "region_id": 43,
                  "region_code": "NY",
                  "country_id": "US",
                  "street": [
                    "123 Oak Ave"
                  ],
                  "postcode": "10577",
                  "city": "Purchase",
                  "firstname": "Jane",
                  "lastname": "Doe",
                  "email": "jdoetest@mailinator.com",
                  "telephone": "512-555-1111"
                },
                "shipping_carrier_code": data.shippingCode,
                "shipping_method_code":  data.shippingCode,
          }}
          console.log("allInfo",allInfo)
           const responsePaymentMethod = yield call(api.getCheckOutPayment,allInfo,apiToken)
         // console.log(responseShippingMethod,"responseShippingMethod","responsePaymentMethod",responsePaymentMethod);

          // success?
          if (responsePaymentMethod.ok) {
            // You might need to change the response here - do this with a 'transform',
            // located in ../Transforms/. Otherwise, just pass the data back from the api.
            yield put(CheckoutActions.checkoutSuccess({"getPaymentMethod" : responsePaymentMethod.data}))
          } else {
            yield put(CheckoutActions.checkoutFailure(false))
          }
}


export function * placeOrder (api, action) {
        const { data } = action
        const apiToken = yield call(getToken);

          const response = yield call(api.placeOrder,data,apiToken)
          //const responseCart = yield call(api.getCartItem,apiToken);
          console.log(response,"cartresponse")

          // success?
          if (response.ok) {
            // You might need to change the response here - do this with a 'transform',
            // located in ../Transforms/. Otherwise, just pass the data back from the api.
            yield put(CheckoutActions.placeOrderSuccess(response.data))
            yield put(CommonActions.getCartItemSuccess(null))
            
          } else {
            yield put(CheckoutActions.placeOrderFailure(false))
          }
}

      export function * afterPlaceOrder (api, action) {
        const { data } = action
        yield put(CheckoutActions.placeOrderSuccess(null))
        
      }
