/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-community/async-storage'
import { saveDataToStorage } from './src/config/utilities/Tool';

AsyncStorage.getItem("UserUUID").then(req=>{
    console.log("UserUUID***************************")
    console.log(req)
    console.log("User"+Math.floor(Math.random() * 99999999999999))
    if(req==null)
    {
        saveDataToStorage("UserUUID","User"+Math.floor(Math.random() * 99999999999999))
    }
})
AppRegistry.registerComponent(appName, () => App);
