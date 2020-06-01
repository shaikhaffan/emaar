import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  checkoutRequest: ['data'],
  checkoutSuccess: ['payload','paymentMethod'],
  checkoutFailure: null,
  PaymentMethodRequest: ['data'],

  placeOrderRequest: ['data'],
  placeOrderSuccess: ['placeOrderPayload'],
  placeOrderFailure: null,

  AfterOrderRequest: ['data'],
})

export const CheckoutTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  paymentMethod:null,
  placeOrderPayload:null,
  
})

/* ------------- Selectors ------------- */

export const CheckoutSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null ,paymentMethod :null})

  // request the data from an api
export const PaymentMethodRequest = (state, { data }) =>{
  console.log(state,"statestate");
return  state.merge({ fetching: true, data,  payload:state.payload,paymentMethod :state.paymentMethod})
}

  

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  console.log(payload,"failurefailure",state)
  return state.merge({ fetching: false, error: null, payload:(payload.getShipping == undefined) ?state.payload :payload.getShipping ,paymentMethod:payload.getPaymentMethod })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })


  // request the data from an api
  export const PlaceOrderRequest = (state, { data }) =>{
    console.log(state,"statestate");
  return  state.merge({ fetching: true, data,  placeOrderPayload:null,})
  }

  // successful api lookup
export const placeOrderSuccess = (state, action) => {
  const { placeOrderPayload } = action
  return state.merge({ fetching: false, error: null, placeOrderPayload:placeOrderPayload })
}

// Something went wrong somewhere.
export const placeOrderFailure = state =>
  state.merge({ fetching: false, error: true, placeOrderPayload: null })

  // request the data from an api
  export const AfterOrderRequest = (state, { data }) =>{
    console.log(state,"statestate");
  return  state.merge({ fetching: true, data,  placeOrderPayload:null,})
  }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHECKOUT_REQUEST]: request,
  [Types.PAYMENT_METHOD_REQUEST]: PaymentMethodRequest,
  [Types.CHECKOUT_SUCCESS]: success,
  [Types.CHECKOUT_FAILURE]: failure,

  [Types.PLACE_ORDER_REQUEST]: PlaceOrderRequest,
  [Types.PLACE_ORDER_SUCCESS]: placeOrderSuccess,
  [Types.PLACE_ORDER_FAILURE]: placeOrderFailure,

  [Types.AFTER_ORDER_REQUEST]: AfterOrderRequest,
})
