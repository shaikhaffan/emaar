
import AsyncStorage from '@react-native-community/async-storage';
import {  Text,View, KeyboardAvoidingView,ScrollView,BackHandler,Alert  } from 'react-native'
const commonMethod = {
    
    alreadySkip: async () => {
        return await AsyncStorage.getItem('alreadySkip');
       
    },
    setHideWrapper : async () => {
        try {
           let data =  await AsyncStorage.setItem('alreadySkip', "true");
         return true;
        } catch (error) {
            // Error retrieving data
            Alert.alert(error)
        }   
    }
}

export default commonMethod;