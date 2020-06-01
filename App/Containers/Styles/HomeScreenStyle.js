import { StyleSheet } from 'react-native'
import { ApplicationStyles, } from '../../Themes/'
import { scale } from "react-native-size-matters";
export default StyleSheet.create({
  ...ApplicationStyles.screen,

  categoryStyle:{
    marginRight:scale(10)
  }
})
