import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { HomeTypes } from '../Redux/HomeRedux'
import { ProductlistTypes } from '../Redux/ProductlistRedux'
import { ProductdetailTypes } from '../Redux/ProductdetailRedux'
import { CommonTypes } from '../Redux/CommonRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'

/* ------------- Sagas ------------- */


import { getHomeData} from './HomeSagas'
import { getProductByCategory} from './ProductlistSagas'
import { getProductDetails} from './ProductdetailSagas'
import { getCurrentLatLong,getAuth,isLoginFunction,addWishList,deleteWishList,getWishList} from './CommonSagas'
import { getLogin,logOutFunc} from './LoginSagas'
import { getRegister } from './RegisterSagas'



/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
 
    takeLatest(HomeTypes.HOME_REQUEST, getHomeData,api),
    takeLatest(ProductlistTypes.PRODUCTLIST_REQUEST, getProductByCategory,api),
    takeLatest(ProductdetailTypes.PRODUCTDETAIL_REQUEST, getProductDetails,api),


    // Common Types
    takeLatest(CommonTypes.GET_AUTH_REQUEST, getAuth,api),
    takeLatest(CommonTypes.IS_LOGIN_REQUEST, isLoginFunction,api),
    takeLatest(CommonTypes.COMMON_LAT_LONG_REQUEST, getCurrentLatLong,api),
    takeLatest(CommonTypes.ADD_WISH_LIST_ITEM_REQUEST, addWishList,api),
    takeLatest(CommonTypes.DELETE_WISH_LIST_ITEM_REQUEST, deleteWishList,api),
    takeLatest(CommonTypes.GET_WISH_LIST_ITEM_REQUEST, getWishList,api),

    //Login latest
    takeLatest(LoginTypes.LOGIN_REQUEST, getLogin,api),
    takeLatest(LoginTypes.LOG_OUT_REQUEST, logOutFunc,api),

    //Register latest
    takeLatest(RegisterTypes.REGISTER_REQUEST, getRegister,api),

    
  ])
}
