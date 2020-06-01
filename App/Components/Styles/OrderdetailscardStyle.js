import { StyleSheet } from 'react-native'
import { Fonts,Colors } from '../../Themes';
import { scale } from 'react-native-size-matters';


export default StyleSheet.create({
  container: {
    flex: 1
  },
  heading:{
    fontFamily:Fonts.type.fontBold,
    fontSize:scale(12)
  },
  mainheading:{
  borderBottomWidth:scale(0.5),
  padding:scale(10)
  },
  detailWrapper:{
    padding:scale(10)
  },
  styleGray:{
    color:Colors.laleRed,
    paddingBottom:scale(5)
  }
})
