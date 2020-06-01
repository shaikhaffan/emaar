import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  commonLatLongRequest: ['data'],
  commonLatLongSuccess: ['latlongpayload'],
  commonFailure: null,
  getAuthRequest: ['data'],
  getAuthSuccess: ['authSuccessPayload'],
  isLoginRequest :null,
  isLoginRequestSuccess :['isLogedIn'],

  addWishListItemRequest: ['data'],
  wishListItemSuccess: ['wishListItemPayload'],
  getWishListItemRequest: ['data'],
  deleteWishListItemRequest: ['data'],
  deleteWishListItemSuccess: ['wishListItemPayload'],

})

export const CommonTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  latlongpayload: null,
  error: null,
  isLogedIn :null,
  authSuccessPayload :null,
  deleteItemPayload :null,
  wishListItemPayload:null,
  wishlistfetching :null,
  
})

/* ------------- Selectors ------------- */

export const CommonSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */


// request the data from an api
  export const commonLatLongRequest = (state, { data }) =>
  state.merge({ fetching: true, data, latlongpayload: null })

  export const commonLatLongSuccess = (state, action) => {
    const { latlongpayload } = action
    return state.merge({ fetching: false, error: null, latlongpayload })
  }

  // Something went wrong somewhere.
  export const failure = state =>
  state.merge({ fetching: false, error: true,})


  export const isLoginRequest = (state, { data }) =>{
    console.log("isloginreqyestr")
  return state.merge({ fetching: true, data, isLogedIn: null })  
  }

  export const isLoginRequestSuccess = (state, action) => {
    const { isLogedIn } = action
    console.log(isLogedIn,"isloginaction1")
    return state.merge({ fetching: false, error: null, isLogedIn })
  }

  export const isLoginRequestFailure = state => {
  const { isLogedIn } = action
  console.log(action,"isloginaction2")
  state.merge({ fetching: false, error: true,  isLogedIn })
  }

  export const getAuthRequest = (state, { data }) => 
  state.merge({ fetching: true, data, authSuccessPayload: null })

   // successful api lookup
   export const getAuthSuccess = (state, action) => {
    const { authSuccessPayload } = action
    return state.merge({ fetching: false, error: null, authSuccessPayload })
  }

  export const getWishListItemRequest = (state, { data }) =>{
    console.log("dds")
  return state.merge({ wishlistfetching: true, data, wishListItemPayload :state.wishListItemPayload})  
  }

  export const addWishListItemRequest = (state, { data }) =>
  state.merge({ wishlistfetching: true, data, wishListItemPayload: state.wishListItemPayload })  

  export const deleteWishListItemRequest = (state, { data }) => {
    console.log(state,"deletewish");
  return state.merge({ wishlistfetching: true, data, wishListItemPayload: state.wishListItemPayload })  
  }
  

  export const wishListItemSuccess = (state, action) => {
    const { wishListItemPayload } = action;
    console.log(state,"wishsuccess",wishListItemPayload)
    return state.merge({ wishlistfetching: false, error: null, wishListItemPayload })
  }

  export const deleteWishListItemSuccess = (state, action) => {
    return state.merge({ wishlistfetching: false, error: null, wishListItemPayload:state.wishListItemPayload })
  }



  




// Something went wrong somewhere.


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COMMON_LAT_LONG_REQUEST]: commonLatLongRequest,
  [Types.COMMON_LAT_LONG_SUCCESS]: commonLatLongSuccess,
  [Types.COMMON_FAILURE]: failure,

  [Types.IS_LOGIN_REQUEST]: isLoginRequest,
  [Types.IS_LOGIN_REQUEST_SUCCESS]: isLoginRequestSuccess,

  [Types.GET_AUTH_REQUEST]: getAuthRequest,
  [Types.GET_AUTH_SUCCESS]: getAuthSuccess,

  [Types.ADD_WISH_LIST_ITEM_REQUEST]: addWishListItemRequest,
  [Types.GET_WISH_LIST_ITEM_REQUEST]: getWishListItemRequest,
  [Types.DELETE_WISH_LIST_ITEM_REQUEST]: deleteWishListItemRequest,
  [Types.WISH_LIST_ITEM_SUCCESS]: wishListItemSuccess,
  [Types.DELETE_WISH_LIST_ITEM_SUCCESS]: deleteWishListItemSuccess,
})
