import { StyleSheet } from 'react-native'
import { ApplicationStyles,Colors, Fonts } from '../../Themes';
export default StyleSheet.create({
  container: {
    flex:1,
  },
  activeScreen :{
    width:10,height:10,borderRadius:100,backgroundColor:Colors.laleRed
  },
  nonActiveAcreen :{
    width:10,height:10,borderRadius:100,backgroundColor:Colors.laleGray
  }
})
