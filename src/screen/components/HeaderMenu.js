
import React from 'react';
// Import react-native components
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Platform,
  StatusBar,
  TextInput,Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Feather from 'react-native-vector-icons/Feather';
//icon
import Ionicons from 'react-native-vector-icons/Ionicons';

//Colors
import * as theme from '../../config/constants/theme';
//Search Item component
import SearchItem from './SearchItem';
import Animated, { Easing } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { Value, timing } = Animated;
// Calculate window size
const { width, height } = Dimensions.get('window');
//Create dataStorage
const saveDataToStorage = (name, data) => {
    AsyncStorage.setItem(
      name,
      JSON.stringify({
        data,
      }),
    );
};

const getDataToStorage = (name, data) => {
    AsyncStorage.getItem(
      name,
      JSON.parse({
        data,
      }),
    );
};

export const HeaderMenu =(props)=> (
    <>
      <SafeAreaView style={styles.navbar} >
      {props.IsMenu?
       <TouchableOpacity
       style={styles.leftCol}

       onPress={() => props.navigation.toggleDrawer()}
     >
       <Ionicons
         name='ios-menu'
         size={30}
         color={theme.colors.white}
       />
     </TouchableOpacity>
      :
      <TouchableOpacity
      style={styles.leftCol}
      onPress={()=>props.navigation.goBack()}
  >
    <Feather name="arrow-left" size={25} color={theme.colors.white} />
  </TouchableOpacity>
    
      }
      <View style={styles.screenTitleCol}>
              <Text style={{color:theme.colors.white,fontWeight:'bold'}} >{props.titleHeader}</Text>
      </View>
      <TouchableOpacity
          style={styles.rightCol}
      >
      </TouchableOpacity>
      </SafeAreaView>
  
    </>
  );
  


 
  


const styles = StyleSheet.create({
    leftCol: {
        width: theme.sizes.width * 1/5,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:10
      },
      leftButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 52,
        height: 45,
      },
      screenTitleCol: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: theme.sizes.width * 3/5,
      },
      rightCol: {
        width: theme.sizes.width * 1/5 - 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      navbar: {
          top: 0,
          flexDirection: 'row',
          alignItems: 'center',
          width: theme.sizes.width,
          height: 45,
          paddingLeft: 15,
          paddingRight: 15,
          elevation: 20,
          backgroundColor: theme.colors.Primary,

        },
  header_safe_area: {
    zIndex: 1000,
    backgroundColor: theme.colors.Primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    position: 'absolute',
    backgroundColor: theme.colors.Primary,
    width,
    height: 50,
    top:
      Platform.OS === 'android'
        ? 0
        : height > 736
        ? 0
        : 0,
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  search_icon_box: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.Primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: theme.colors.white,
    width: width,
  },
  buttonSearch: {
    shadowColor: '#222',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    backgroundColor: '#fff',
    padding: 13,
    marginRight:10,
    borderRadius: 30,
    aspectRatio: 1,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: theme.colors.gray,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    marginHorizontal: 20,
  },
  content: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    zIndex: 999,
  },
  content_safe_area: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 80 : 40,
    paddingBottom: 80,
    backgroundColor: theme.colors.white,
  },
  content_inner: {
    backgroundColor: theme.colors.Primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray,
  },
  image_placeholder_container: {
    flexDirection: 'column',
    marginTop: 100,
  },
  image_placeholder: {
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5,
  },
  search_item: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e4eb',
    marginLeft: 16,
  },
  item_icon: {
    marginRight: 15,
  },
});