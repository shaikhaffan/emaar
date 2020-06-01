// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import Config from '../Config/index';
let token =  (Config.api.token == undefined) ?  null : Config.api.token

console.log(token,"tokennn",Config.api.host)


const create =  (baseURL = Config.api.host) => {
 
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  
   
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    headers:{
      'Cache-Control': 'no-cache'
    },
   
    // here are some default headers
    
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //25.274783, 51.531700

  const getHome = (data) => api.get(`home?lat=${data.lat}&long=${data.long}`);
  const getProductList = (data) => api.get(`listings/category/${data.id}?lat=${data.coords.latitude}&long=${data.coords.longitude}`);
  const getProductDetails = (data) => api.get(`listings/${data.id}`);
  const getlogin = (data) => api.post(`login`,data);
  const getAuth = (apiToken) => api.get("user/me",{},{ headers:{
    'Authorization': 'Bearer ' + apiToken,
   
  }});
  const getSignUp = (data) => api.post(`signup/user`,data);

  const getWishList = (apiToken) => api.get(`wishlists/me`,{},{ headers:{
    'Authorization': 'Bearer ' + apiToken,
   
  }});

  const addWishList = (data,apiToken) => api.post(`wishlists`,data,{ headers: {
    "Content-type": "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + apiToken,
   
  }})

  const deleteWishList = (data,apiToken) => api.delete(`wishlists/${data.listing_id}`,{},{ headers:{
    'Authorization': 'Bearer ' + apiToken,

  }});

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.   Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getHome,
    getProductList,
    getProductDetails,
    getlogin,
    getAuth,
    getSignUp,
    getWishList,
    addWishList,
    deleteWishList
    
  }
}

// let's return back our create method as the default.
export default {
  create,
  
}
