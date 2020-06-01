import { StyleSheet } from 'react-native'

import { Colors, Fonts } from '../../Themes/index';
import { scale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  filterText :{
    color:Colors.laleBlack,
    fontSize:Fonts.size.font18,
    fontFamily:Fonts.type.fontBold
  },
  shopNowText:{
    color:Colors.white,
    fontSize:Fonts.size.font12,
    fontFamily:Fonts.type.fontMedium,
  },
  bgArrow:{
    backgroundColor:Colors.laleBlack,
    borderRadius:scale(100),
    height:scale(20),
    width:scale(20),
    justifyContent:"center",
    alignItems:"center"
  },
  showNowWrap:{
    marginLeft:scale(5),
  }

})
