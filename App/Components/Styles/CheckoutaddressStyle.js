import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters';
import { Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  lineHeight:{
    paddingVertical:scale(2),
    fontSize:Fonts.size.font12,
    fontFamily:Fonts.type.fontMedium
  }
})
