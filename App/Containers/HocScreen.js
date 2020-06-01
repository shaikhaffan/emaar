import React, { useState } from 'react'
import {Toast} from '../common'
import {useDispatch, useSelector} from 'react-redux'
import HomeAction from '../Redux/HomeRedux'
import CommonAction from '../Redux/CommonRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HocScreenStyle'

const  HocScreen = OriginalComponent => {
  const NewComponent = (props) =>{


    const params = (props.route.params == undefined) ? undefined : props.route.params;
    
    
    const {navigation} = props;
    const [lookingModalVisible,setLookingModalVisible] = useState(false)
    const [listingId,setListingId] = useState(undefined)
    const [showToast,setshowToast] = useState(false)
    const {common} = useSelector(state =>({
      common :state.common
    }));
    const {isLogedIn} = common
    const dispatch = useDispatch()
    console.log(props,common,"props.commonprops.common123")

    showToastMethod = (text = null, type, duration = 3000, ) =>{
      Toast.show({
        text: text,
        buttonText: "Okay",
        duration: duration,
        type :type
      })
    }

    const navigateTo = (screenName,data) => {
      const {coords} = common.latlongpayload;
      const {navigation} = props;
      navigation.navigate(screenName,{data,coords})
    }
  
    callSavePlaceModal = (listingId)=>{
    setListingId(listingId)
    console.log("savemodal",props,listingId)
      setLookingModalVisible(!lookingModalVisible)
    }
    
    const addToWishList = (listingData) =>{
      console.log(props,common,"props.commonprops.common",listingId,"Addedfromcat")
        const {isLogedIn,authSuccessPayload} = common;
      
        console.log(isLogedIn,"isLogedIn123",common)
        if(isLogedIn == null || isLogedIn == false){
          callSavePlaceModal();
          navigation.navigate('LoginScreen')
        }else{
         
          let data={
            "user_id": common.authSuccessPayload.id,
            "listing_id": listingId,
            "type": listingData.type.toUpperCase()
          }
          dispatch(CommonAction.addWishListItemRequest(data))
 
        }
    }

    const removeFromWishList = (listingData) =>{
          let data={
            "listing_id": listingData,
          }
          console.log(data,'remove',listingData)
          
      
      dispatch(CommonAction.deleteWishListItemRequest(data))
 
        
    }


  goBack = () =>{
    console.log(navigation,"goBack")
    navigation.goBack();

  }

    return (
      <OriginalComponent 
      addToWishList={addToWishList} 
      removeFromWishList={removeFromWishList} 
      navigateTo ={navigateTo}
      callSavePlaceModal = {callSavePlaceModal}
      lookingModalVisible={lookingModalVisible}
      showToastMethod ={showToastMethod}
      goBack ={goBack}
      params ={params}
     isLogedIn={isLogedIn}
      />
    )
  };
    return NewComponent
  }

  export  default HocScreen;

