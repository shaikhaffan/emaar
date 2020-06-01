import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  activityIndicator:{
    flex: 1,
        justifyContent: 'center',
        alignItems:'center',position:"absolute",top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',zIndex:9999
  },
  styleNothing :{
    height:0
  }
})
