import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  styleLeft:{
    left:scale(10)
  },
  styleRight:{
    right:scale(10)
  }
})
