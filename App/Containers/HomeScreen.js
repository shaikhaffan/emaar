import React, { useState,useEffect } from 'react'

import { PermissionsAndroid,Container,Content,Root,Colors,scale,Fonts,StatusBar,View,Geolocation,Alert, Platform} from '../common'
import {favouritePlacesTab,categoryData,productData,fea} from '../common/custom.js';
import {useDispatch, useSelector} from 'react-redux'
import HeaderComponent from '../Components/Header'
import HomeAction from '../Redux/HomeRedux'
import CommonAction from '../Redux/CommonRedux'
import Categorycard from '../Components/Categorycard'
import Placeholder from '../Components/Placeholder'
import Placeholder2 from '../Components/Placeholder2'
import Searchbox from '../Components/Searchbox'
import Productcard from '../Components/Productcard'
import Featuredcategory from '../Components/Featuredcategory'
import LookingBottomModal from '../Components/LookingBottomModal';
import HocScreen from './HocScreen'


const HomeScreen = props =>{
  const [placeHolder,setIplaceHolder] = useState([...new Array(6).fill({})])
  const [intialCategory,setInitialCategory] = useState(categoryData)
  const [initialProduct,setinitialProduct] = useState(productData)
  const [featuredData,setfeaturedData] = useState(fea)
  const [fetching,setFetching] = useState(true)
  const [fetching1,setFetching1] = useState(true);
  const [listingId,setListingId] = useState(undefined)
  const [lookingModalVisible,setLookingModalVisible] = useState(false)

  const {navigation} = props;
  const {all,homeData,common} = useSelector(state =>({
    all : state.homeData,
    homeData :state.homeData.payload,
    common :state.common
  }));
  const dispatch = useDispatch()
  console.log(homeData,"home--",common,"all--",all);


  const  getHomeData = (data)=>{
   // setFetching(true)
   console.log("gethomeData",data)
    dispatch(HomeAction.homeRequest(data))
   
    
  }

  findCoordinates = () => {
   
    dispatch(CommonAction.commonLatLongRequest());
    
  };
  const callFunctionAfterHomeData = async () =>{
    dispatch(CommonAction.isLoginRequest())
    dispatch(CommonAction.getAuthRequest());
    dispatch(CommonAction.getWishListItemRequest())
  }


    useEffect(() => {
      setFetching(true);
      
      (async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
              'title': 'App Location Permission',
              'message': 'Looking App needs access to your location '
          })
          console.log(granted,"granted",Platform.OS)
          if (granted || Platform.OS == "ios") {
            console.log("findco")
           await findCoordinates()
          

          }
       })();
    
    },[]);

    

   useEffect(() => {
     
    if(common.latlongpayload !=null) {
      
      console.log(common.latlongpayload,"common.latlongpayload")
      const {coords} = common.latlongpayload;
      getHomeData({lat :coords.latitude,long :coords.longitude});
      //callFunctionAfterHomeData()
     
     //
    }
  },[common.latlongpayload]);

  useEffect(() => {
    console.log(common,"beforecall")
   //   callFunctionAfterHomeData()
  },[common.authSuccessPayload]);

 


  useEffect(() => {
    if(all.fetching !=null) {
      console.log(all.fetching,"all.fetching");
      setFetching(all.fetching);
      callFunctionAfterHomeData()
    }
  },[all]);

  
  


  
  

  console.log(homeData,"homeDatahomeData",listingId);
  return(
    <Root>
      <Container style={{marginTop: StatusBar.currentHeight}}>
      <HeaderComponent showBell={true} showHeaderContent={true}/>
        <Content 
        showsVerticalScrollIndicator={false}
        style={{flex:1}} >
       
          {fetching ?
          
          <Placeholder
            categoryData={placeHolder}
          />
          :
          <View>
          <Categorycard 
            navigate={props.navigateTo}
            categoryData={homeData.mainCategories}
          />
          <Searchbox
            placeholder={'Search'}
            inputStyle={{   
              color:Colors.laleBlack, 
              paddingHorizontal:scale(10),
            }}
          />
          </View>
        }
        <View style={[Fonts.style.commonTopContent,{}]}>
           {fetching ?
             <Placeholder2
             categoryData={placeHolder}
             horizontal={true}
             showPlaceHolderMedia={true}
           />
           :
           <View>
            <Productcard
              navigate={props.navigateTo}
            productData={homeData.nearestListings}
            callSavePlaceModal={(listing_id) => {
              console.log(listing_id,"listing_idlisting_id")
              setListingId(listing_id)
              props.callSavePlaceModal(listing_id)
            }} 
            />
            <Featuredcategory 
              navigate={props.navigateTo}
              data={homeData.featuredCategories}/>     
          </View>
           }
           </View>
           <LookingBottomModal
             navigate={props.navigateTo}
             favouritePlacesTab={favouritePlacesTab}
             toggleModal={props.callSavePlaceModal} 
             lookingModalVisible={props.lookingModalVisible}
             addToWishList={(data) =>{props.addToWishList(data)}}
             removeFromWishList={(data) =>{props.removeFromWishList(data)}}
             commonData={common}
             selectedListingId={listingId}
             isLogedIn={props.isLogedIn}
             />
        </Content>
        
      </Container>
    </Root>
  )
}
  






export default HocScreen(HomeScreen)

