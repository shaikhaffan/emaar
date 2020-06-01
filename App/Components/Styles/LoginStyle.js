import { StyleSheet } from 'react-native'
import { Fonts,Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  inputStyle :{
      fontFamily:Fonts.type.fontMedium,
      color:Colors.DarkGreen,   
      justifyContent:"center",
      marginBottom:scale(15) ,       
      borderColor:Colors.black,borderWidth:1,borderRadius:scale(8),
      backgroundColor:"transparent",
      padding:scale(18),
      
  }
})
