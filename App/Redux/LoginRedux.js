import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginSuccess: ['payload'],
  loginFailure: ['payload'],

  logOutRequest: ['data'],
  logOutSuccess: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const loginRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const loginSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}



export const logOutRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })  

  export const logOutSuccess = (state, action) => {
    return state.merge({ fetching: false, error: null, payload:null })
  }

  // Something went wrong somewhere.
    export const failure = (state, action) => {
      console.log(state,action,"failure")
      const { payload } = action
      return state.merge({ fetching: false, error: true, payload })
    }

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: failure,

  [Types.LOG_OUT_REQUEST]: logOutRequest,
  [Types.LOG_OUT_SUCCESS]: logOutSuccess,
})
