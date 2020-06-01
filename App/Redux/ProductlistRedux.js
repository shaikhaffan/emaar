import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productlistRequest: ['data'],
  productlistSuccess: ['payload'],
  productlistFailure: null,
})

export const ProductlistTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
})

/* ------------- Selectors ------------- */

export const ProductlistSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api


  export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: state.payload })
  
  // successful api lookup
  export const success = (state, action) => {
    const { payload } = action
    return state.merge({ fetching: false, error: null, payload })
  }





// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCTLIST_REQUEST]: request,
  [Types.PRODUCTLIST_SUCCESS]: success,
  [Types.PRODUCTLIST_FAILURE]: failure
})
