import { View, Text,ImageBackground,StatusBar } from 'react-native'
import { scale } from "react-native-size-matters";
import { strings,isRTL } from '../language/i18n';
import { Colors } from '.';

const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic',
  fontExtraLight : 'Sailec-Medium',
  fontMedium : 'Sailec-Medium',
  fontSemiBold : 'Sailec-Medium',
  fontBold : 'Sailec-Bold',
  fontRegular : 'Sailec-Medium',
  fontBoldArabic :"DINNextLTW23-Bold",
  fontMediumArabic :"DINNextLTW23-Medium",

  customFontLight :{
    fontFamily :'Sailec-Light',
  },
  customFontRegular :{
    fontFamily :'Sailec',
  },
  customFontMedium :{
    fontFamily :'Sailec-Medium',
  },
  customFontBold :{
    fontFamily :'Sailec-Bold',
  }
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
Regular: 14,
  small: 12,
  tiny: 8.5,
  font8 : scale(8),
  font10 : scale(10),
  font11 : scale(11),
  font20 : scale(20),
  font14 : scale(14),
  font15 : scale(15),
  font10 : scale(10),
  font12 : scale(12),
  font16 : scale(16),
  font18 : scale(18),
  font22 : scale(22),
  font24 : scale(24),
  font26 : scale(26),
  font28 : scale(28),
  font32 : scale(32),
  font34 : scale(34),
  font36 : scale(36),
  font38 : scale(38),
  font40 : scale(40),
  font42 : scale(42),
  
}

const style = {

  commonLightColor:{
    color:Colors.lightGreen,
  },
  commonDarkGreenColor:{
    color:Colors.DarkGreen,
  },

  commonAppDarkGrayColor:{
    color:Colors.darkGray
  },

  commonDarkColor:{
    color:Colors.darColor,
  },
  commonTopContent:{
    position:"relative",marginTop:scale(-10),borderTopLeftRadius:scale(8),borderTopRightRadius:scale(10),zIndex:999,backgroundColor:"#fff"
  },
  justifyAlignCenter :{
    justifyContent:"center",
    alignItems:"center"
  },
  directionRow:{
    flexDirection:"row"
  },
  directionRowREverse:{
    flexDirection:"row-reverse"
  },
  spaceBetween:{
    justifyContent:"space-between"
  },
    statusBarMargin :{
     marginTop: StatusBar.currentHeight
    },
  justifyCenter :{
    justifyContent:"center",
  
  },
  alignCenter :{
    alignItems:"center"
  
  },
  contentWidth95:{
    width:"95%",
  },
  contentWidth100:{
    width:"100%",
  },

  contentWidth90:{
    width:"90%",
  },
  
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  inputStyleForAuthForm :{

      color:Colors.DarkGreen,   
      justifyContent:"center",
      marginBottom:scale(15) ,       
      borderColor:Colors.black,borderWidth:1,borderRadius:scale(8),
      backgroundColor:"transparent",
      padding:scale(18),
      
    
  }
}

export default {
  type,
  size,
  style
}
