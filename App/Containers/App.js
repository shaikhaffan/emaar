import 'react-native-gesture-handler'
import {  Text,View, KeyboardAvoidingView,ScrollView ,Platform,StatusBar} from 'react-native'
import { enableScreens } from 'react-native-screens';
enableScreens();
import '../Config'
//import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import AppNavigation from '../Navigation/AppNavigation'
import createStore from '../Redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';


import {Fonts,Colors} from '../Themes/index'

// create our store
const store = createStore()

class App extends Component {
  render () {
    return (
        <Provider store={store}>      
          { Platform.OS == 'android'? <StatusBar translucent={true} backgroundColor={Colors.DarkGreen}  barStyle="dark-content" />:  <StatusBar backgroundColor={Colors.DarkGreen} barStyle="dark-content"/>}     
					<SafeAreaProvider>
							<SafeAreaView style={{ flex:1,}}  forceInset={{ top:"never", bottom:"never" }}  >
                <AppNavigation />
                </SafeAreaView>
						</SafeAreaProvider>
        </Provider>      
   
    )
  }
}


export default  App;
