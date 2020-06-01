import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes';
import { scale } from '../../common';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  withBorder :{
    borderBottomColor:Colors.DarkGreen,
  
    borderTopLeftRadius:scale(100),
    borderTopRightRadius:scale(100),
    borderBottomLeftRadius:scale(10),
    borderBottomRightRadius:scale(10),
   
  },
  withoutBorder:{

  }
})
