import React, { Component,useContext,useEffect,useMemo,useState,useReducer } from 'react';
import { View, Text, SafeAreaView,Button,ActivityIndicator} from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStackNavigator from "./navigations/Navigator"
import DrawerContent from "./navigations/DrawerContent"

import { createStore, combineReducers, applyMiddleware } from "redux";
import loginReducer from './reducer/loginReducer'
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";

//Reducer
import {
  authReducer,
} from "./reducer/auth/authReducer";

import {
  sdeReducer
} from "./reducer/sde/sdeReducer";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// code push
import codePush from "react-native-code-push";

const codePushOptions = { 
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE 
};

const initialLoginState = {
  isLoading: true,
  userName: null,
  userToken: null,
};

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  sde:sdeReducer

});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

const Drawer = createDrawerNavigator();


const App =()=>{
    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    const authContext = React.useMemo(() => ({
      signIn: async(foundUser) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;
        
        try {
         // await AsyncStorage.setItem('userToken', userToken);
        } catch(e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: async() => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
        //  await AsyncStorage.removeItem('userToken');
        } catch(e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      toggleTheme: () => {
        //setIsDarkTheme( isDarkTheme => !isDarkTheme );
      }
    }), []);


    
  
    useEffect(() => {
      setTimeout(async() => {
        // setIsLoading(false);
        let userToken;
        userToken = null;
        try {
          //userToken = await AsyncStorage.getItem('userToken');
        } catch(e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        //dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      }, 1000);
    
  
    }, []);


    if(!loginState.isLoading ) {
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }

    return (
       <Provider store={store}>

    <NavigationContainer >
      {/* <HomeStackNavigator/> */}
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={HomeStackNavigator} />
       
        </Drawer.Navigator>
    </NavigationContainer>
    </Provider>

    );
  
}
//export default App

export default codePush(codePushOptions)(App)
