import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  myaccountRequest: ['data'],
  myaccountSuccess: ['payload'],
  myaccountFailure: null,

  myOrderRequest: ['data'],
  myOrderSuccess: ['myOrderPayload'],
  myOrderFailure: null,

  changePasswordRequest: ['data'],
  changePasswordSuccess: ['changePasswordPayload'],

  updateProfileRequest: ['data'],
  updateProfileSuccess: ['updateProfilePayload'],
  updateProfileFailure: null,

  deleteAddressRequest: ['data'],
  deleteAddressSuccess: ['addUpdatePayload'],

  setDefaultAddressRequest: ['data'],
  setDefaultAddressSuccess: ['setDefaultAddressPayload'],

  orderDetailRequest: ['data'],
  orderDetailSuccess: ['orderDetailPayload'],
 
})

export const MyaccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  myOrderPayload: null,
  payload:null,
  error: null,
  changePasswordPayload:null,
  updateProfilePayload :null,
  addUpdatePayload :null,
  setDefaultAddressPayload:null,
  orderDetailPayload:null
})

/* ------------- Selectors ------------- */

export const MyaccountSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

  export const myOrderRequest = (state, { data }) =>
  state.merge({ fetching: true, data, myOrderPayload: null })

// successful api lookup
export const myOrderSuccess = (state, action) => {
  const { myOrderPayload } = action
  return state.merge({ fetching: false, error: null, myOrderPayload })
}

// Something went wrong somewhere.
export const myOrderFailure = state =>
  state.merge({ fetching: false, error: true, myOrderPayload: null })

  export const changePasswordRequest = (state, { data }) =>
  state.merge({ fetching: true, data, changePasswordPayload: null })

// successful api lookup
export const changePasswordSuccess = (state, action) => {
  const { changePasswordPayload } = action
  return state.merge({ fetching: false, error: null, changePasswordPayload })
}


export const updateProfileRequest = (state, { data }) =>
state.merge({ fetching: true, data, updateProfilePayload: null })

// successful api lookup
export const updateProfileSuccess = (state, action) => {
const { updateProfilePayload } = action
return state.merge({ fetching: false, error: null, updateProfilePayload })
}

export const updateProfileFailure = state =>
  state.merge({ fetching: false, error: true, updateProfilePayload: null });


  // request the data from an api
export const deleteAddressRequest = (state, { data }) =>
state.merge({ fetching: true, data, addUpdatePayload: null })

// successful api lookup
export const deleteAddressSuccess = (state, action) => {
const { addUpdatePayload } = action
return state.merge({ fetching: false, error: null, addUpdatePayload })
}


export const setDefaultAddressRequest = (state, { data }) =>
state.merge({ fetching: true, data, setDefaultAddressPayload: null })

// successful api lookup
export const setDefaultAddressSuccess = (state, action) => {
const { setDefaultAddressPayload } = action
return state.merge({ fetching: false, error: null, setDefaultAddressPayload })
}


export const orderDetailRequest = (state, { data }) =>
state.merge({ fetching: true, data, orderDetailPayload: null })

// successful api lookup
export const orderDetailSuccess = (state, action) => {
const { orderDetailPayload } = action
return state.merge({ fetching: false, error: null, orderDetailPayload })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MYACCOUNT_REQUEST]: request,
  [Types.MYACCOUNT_SUCCESS]: success,
  [Types.MYACCOUNT_FAILURE]: failure,

  [Types.MY_ORDER_REQUEST]: myOrderRequest,
  [Types.MY_ORDER_SUCCESS]: myOrderSuccess,
  [Types.MY_ORDER_FAILURE]: myOrderFailure,

  [Types.CHANGE_PASSWORD_REQUEST]: changePasswordRequest,
  [Types.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,

  [Types.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,

  [Types.DELETE_ADDRESS_REQUEST]: deleteAddressRequest,
  [Types.DELETE_ADDRESS_SUCCESS]: deleteAddressSuccess,

  [Types.SET_DEFAULT_ADDRESS_REQUEST]: setDefaultAddressRequest,
  [Types.SET_DEFAULT_ADDRESS_SUCCESS]: setDefaultAddressSuccess,

  [Types.ORDER_DETAIL_REQUEST]: orderDetailRequest,
  [Types.ORDER_DETAIL_SUCCESS]: orderDetailSuccess,
})
