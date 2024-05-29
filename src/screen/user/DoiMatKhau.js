import React, { Component, useState, useEffect, useRef } from 'react';
import { View, Text,ScrollView,Image,
   SafeAreaView,
   Button,findNodeHandle
   ,DeviceEventEmitter,UIManager
   ,StyleSheet ,Dimensions,NativeMethods,
   TextInput,TouchableOpacity
   ,NativeModules,FlatList,Alert,Keyboard,PermissionsAndroid
   ,Platform,
   ToastAndroid,KeyboardAvoidingView,
   TouchableWithoutFeedback} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

import Entypo from 'react-native-vector-icons/Entypo';



import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Feather from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper'
import ModalRN from 'react-native-modal';

import BackgroundCurve from '../../components/BackgroundCurve'

import * as theme from "../../config/constants/theme.js";

import {HeaderMenu} from './../components/HeaderMenu';
//Lib 3
import * as Animatable from 'react-native-animatable';
import { material,human } from 'react-native-typography'




//Redux
import { useDispatch, useSelector } from "react-redux";
import { LoadingFristAction, LogoutAction } from '../../reducer/auth/authActions';

const {width,height} = Dimensions.get('window')
import { Encrypt,Decrypt, FomatTimeDDMMYYY, saveDataToStorage } from "../../config/utilities/Tool";

var Aes = NativeModules.Aes
import base64 from 'react-native-base64'

import ApiThuaDat from '../../config/utilities/api/ApiThuaDat';
import * as  ListItem from '../../components/ListItem';
import ApiGeneral, { XA } from '../../config/utilities/api/ApiGeneral';
import { Checkbox } from 'react-native-paper';
import APILogin from '../../config/utilities/api/APILogin';
const HEADER_COLLAPSE = 32;
const HEADER_LIST = 60;
const HEADER_HEIGHT = HEADER_LIST + HEADER_COLLAPSE
const isAndroid = Platform.OS === 'android';
const ELEMENT_HEIGHT = 377;
const spaceHeight = 10;
const DoiMatKhau =(props)=> {

    const [IsLoading,setIsLoading]=useState(false);
    const user = useSelector((state) => state.auth.user);
    const [PasswordOld,setPasswordOld]=useState("");
    const [Password,setPassword]=useState("");
    const [Password2,setPassword2]=useState("");

    const dispatch = useDispatch();

  
    const XuLyDoiMatKhau=()=>{
        if(PasswordOld.length<1)
        {
            Alert.alert("Vui lòng nhập mật khẩu")
        }
        else{
          if(Password!=Password2)
          {
           Alert.alert("Mật khẩu không giống nhau")
       
          }
          else 
          {
  
          
            
      
  
          var data={
              Username:user.email,
              Password:PasswordOld,
              PasswordNew:Password,
              Token:user.token
             }
             APILogin.DoiMatKhau(data).then(req=>{
                if(req.KetQua==true)
                {
                 dispatch(LogoutAction());
                    props.navigation.navigate('Login');
                }
                else{
                  Alert.alert(req.Msg)
  
                }
          })
        }
        
      }
  
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:theme.colors.white}}>
                          <BackgroundCurve style={styles.svg} />

        <HeaderMenu navigation={props.navigation}  titleHeader={"ĐỔI MẬT KHẨU"} />
        <View style={styles.formBox}>
       
       <View style={[CommonStyles.textInputField,{marginTop:50}]}>
       <FontAwesome5 style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}} color={theme.colors.Primary} size={20} name="lock-open"/>

         <TextInput
           placeholder='Mật khẩu cũ'
           style={CommonStyles.textInput}
           underlineColorAndroid='transparent'
           onChangeText={value=>setPasswordOld(value)}
           placeholderTextColor={theme.colors.gray}

           secureTextEntry
         />
       </View>
       <View style={CommonStyles.textInputField}>
       
       <FontAwesome5 style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}} color={theme.colors.Primary} size={20} name="lock"/>

         
         <TextInput
           placeholder='Mật khẩu mới'
           style={CommonStyles.textInput}
           placeholderTextColor={theme.colors.gray}
           underlineColorAndroid='transparent'
           onChangeText={value=>setPassword(value)}
           secureTextEntry
         />
       </View>
       <View style={CommonStyles.textInputField}>
       <FontAwesome5 style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}} color={theme.colors.Primary} size={20} name="lock"/>

         <TextInput
           placeholder='Nhập lại mật khẩu'
           style={CommonStyles.textInput}
           placeholderTextColor={theme.colors.gray}

           underlineColorAndroid='transparent'
           onChangeText={value=>setPassword2(value)}
           secureTextEntry
         />
       </View>
       <View style={[CommonStyles.buttonBox]}>

<TouchableOpacity onPress={()=>XuLyDoiMatKhau()} style={{ alignSelf:'center',justifyContent:'center' }}>
            <View style={[styles.signIn,{backgroundColor:'#1f7cee',flex:1}]}>
             
             <View style={[styles.circleIcon,{backgroundColor:theme.colors.white,position:'absolute',left:20}]}>
             </View>
             <Text style={material.body2White}>Xác nhận</Text>
           </View>
       </TouchableOpacity>
       </View>
     </View>

 
        </SafeAreaView>
    )
  
}

export default DoiMatKhau


const styles=StyleSheet.create({
    signIn: {
        width: "95%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        flexDirection: "row",
    
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    
        elevation: 4,
      }
      , svg: {
        position: 'absolute',
        width: Dimensions.get('window').width,
      },
    titleBox: {
        height: 10,
     
      },
      formBox: {
        height: 450,
        alignItems: 'center',
        marginBottom: spaceHeight * 0.14,
      },
      noteBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        marginBottom: 15,
      },
      underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: theme.colors.Primary,
        color: theme.colors.Primary,
        fontSize:20,
      },
     
      underlineStyleHighLighted: {
        borderColor: theme.colors.Primary,
      },
    });
    
    const s = StyleSheet.create({
      tabbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9000,
    
        height: HEADER_HEIGHT,
    
        overflow: 'hidden',
    
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      },
    
      tabbar__wrapper: {
        position: 'absolute',
    
        width: '100%',
        height: '100%',
      },
    
      tabbar__heading: {
        paddingTop: 9,
    
        height: HEADER_COLLAPSE,
    
        backgroundColor: theme.colors.Primary,
      },
    
      tabbar__headingText: {
        marginLeft: 20,
    
        fontSize: 12,
        letterSpacing: 0.25,
        textTransform: 'uppercase',
    
        color: theme.colors.white,
      },
    
      tabbar__list: {
        height: HEADER_LIST,
    
        borderTopColor: theme.colors.Primary,
        borderTopWidth: 1,
        borderBottomColor: theme.colors.Primary,
        borderBottomWidth: 1,
    
        backgroundColor: theme.colors.white,
      },
    
      tabbar__listContent: {
        flexDirection: 'row',
        alignItems: 'center',
    
        paddingLeft: 20,
      },
    
      item: {
        flexDirection: 'row',
        alignItems: 'center',
    
        marginRight: 25,
    
        height: '100%',
      },
    
      item__emoji: {
        fontSize: 22,
      },
    
      item__copy: {
        marginLeft: 4,
    
        fontSize: 14,
    
        color: '#d1d2d2',
      },
    
      item__line: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
    
        height: 3,
    
        backgroundColor: theme.colors.red,
      },
    
      route: {
        flex: 1,
    
        paddingTop: 12,
        paddingBottom: isAndroid ? 100 : 40,
    
        backgroundColor: theme.colors.white,
      },
    
      row: {
        flexDirection: 'row',
    
        paddingHorizontal: 20,
        paddingVertical: 12,
      },
    
      row__avatar: {
        width: 36,
        height: 36,
    
        borderRadius: 8,
        backgroundColor: '#3b4149',
      },
    
      row__info: {
        marginLeft: 20,
      },
    
      row__name: {
        marginBottom: 2,
    
        fontSize: 16,
        fontWeight: '500',
    
        color: '#d1d2d2',
      },
    
      row__position: {
        fontSize: 14,
    
        color: '#9a9c9d',
      },
    container: {
      flex: 1
    },
      textBodyCard:{
        ...material.body1
      },
      tieude:{
          ...material.button,
          marginVertical:10,
      },
      titlebutton:{
          ...material.button,
          color:theme.colors.primary,
  
      },
      titleBodyCard:{
          marginTop:5,
          ...material.caption,
          
      },
      textline:{
          ...human.caption1,
  
              marginRight:5,
              fontWeight:'bold'      
      },
      textbody:{
          ...human.caption1,
          marginTop:5,
  
      },
      viewline:{
          flexDirection:'row',flexWrap:'wrap',marginVertical:5
      },
      titleLine:{
          
          padding:theme.sizes.padding*2
  
      },
      categoryBox:{
          height:28,
          width:89,
          borderWidth:0.7,
          borderColor:"#2c2c2e",
          borderRadius:10,
          alignItems:'center',
          justifyContent:'center',
          marginRight:10
      
          
        },
        panelHeader: {
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
          paddingHorizontal: 5,
          backgroundColor: 'rgb(243,246,254)'
        },
        panelBody: {
            flex:1,
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: 'rgb(229,229,229)',
        },
        panelFooter: {
          flexDirection: 'row',
          paddingVertical: 16,
        },
        panelFooterCol: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        },
        parentCircle: {
          height: 49,
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'rgb(229,229,229)',
          borderRadius: 50 
        },
        childCircle: {
          height: 30,
          width: (theme.sizes.width - 60)/2,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          backgroundColor: 'transparent'
        },
        activeChildCircle: {
          height: 30,
          width: (theme.sizes.width - 60)/2,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          elevation: 8,
        },
        btnText: {
          ...material.body2White,
          color: 'rgb(150,150,150)',
        },
        activeBtnText: {
          ...material.button,
          color: '#FFFFFF',
        },
        itemWhiteBox:{
          
            borderRadius: 8,
            backgroundColor: '#FFFFFF',
            elevation: 6,
        }
        ,stretch:{
            width: '100%',
            height: 200,
            marginVertical:10,
            resizeMode: 'stretch',
        }
  })
    CommonStyles = StyleSheet.create({
    normalPage: {
      position: 'relative',
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    normalSinglePage: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    wrapperBox: {
      marginTop: 20,
      marginBottom: 20,
    },
   
    smallWrapperBox: {
      marginTop: 20,
      marginBottom: 20,
    },
   
    // Color
    whiteColor: {
      color: '#FFFFFF',
    },
    greyColor: {
      color: 'rgb(105,105,105)',
    },
    lightgreyColor: {
      color: 'rgb(150,150,150)',
    },
    blackColor: {
      color: 'rgb(19,19,19)',
    },
    softBlueColor: {
      color: 'rgb(75,102,234)',
    },
    darkSkyBlueColor: {
      color: 'rgb(63,103,230)',
    },
    periBlueColor: {
      color: 'rgb(79,109,230)',
    },
    // Text 
    extraLargeText: {
      height: 52,
      fontSize: 32,
      fontFamily: 'Poppins-Bold',
    },
    titleText: {
      fontSize: 30,
      lineHeight: 38
    },
    headerText: {
      fontSize: 18,
      lineHeight: 30
    },
    itemHeaderText: {
      fontSize: 17,
      lineHeight: 29 
    },
    mediumText: {
      fontSize: 16,
    },
    normalText: {
      fontSize: 15,
      lineHeight: 23
    },
    smallText: {
      fontSize: 13,
      lineHeight: 30 
    },
    shortSmallText: {
      fontSize: 13,
      lineHeight: 23 
    },

    // Image
    borderRadius: {
      borderRadius: 200,
    },
    // Item box
    itemWhiteBox: {
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 15,
      marginRight: 15,
      borderRadius: 8,
      backgroundColor: '#FFFFFF',
      elevation: 6,
    },
    // Form Styles
    textInputField: {
      flexDirection: 'row',
      width: theme.sizes.width - 55,
      height: 45,
      marginBottom: 25,
      borderColor:'rgb(150,150,150)',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 50,
      backgroundColor:'#FFFFFF',
    },
    textInput: {
      ...material.subheading,
      width: theme.sizes.width - 55,
      height: 45,
      paddingLeft: 50,
      color: 'rgb(150,150,150)',
    },
    selectboxField: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: theme.sizes.width - 55,
      height: 45,
      paddingLeft: 20,
      paddingRight: 20,
      borderColor:'rgb(229,229,229)',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 50,
      backgroundColor:'#FFFFFF',
    },
    selectboxLabel: {
      color: 'rgb(150,150,150)',
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
    },
    // Button Styles
    backButton: {
      flex: 1,
      alignItems: 'center',
      width: 41,
      height: 41 
    },
    nextButton: {
      flex: 1,
      alignItems: 'center',
      width: 60,
      height: 60 
    },
    // Intro pages styles
 
    introPageSubText: {
      width: theme.sizes.width - 75,
      height: 60,
      marginTop: 15,
      color: 'rgb(105,105,105)',
      fontSize: 15,
      fontFamily: 'Poppins-Regular',
      textAlign: 'center',
    },
   
    introPageButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 60,
    },

    pickerBox: {
      position: 'relative',
      height: 402,
      flexDirection: 'row',
      marginBottom: 15,
    },
    
   
    buttonBox: {
        flexDirection: 'row',
        width: theme.sizes.width,
        height: 45,
        marginBottom: 25,
        borderColor:'rgb(150,150,150)',
        borderStyle: 'solid',
        borderRadius: 50,
        backgroundColor:'#FFFFFF',
        justifyContent:'center'

    },
    // Circle edit button
    editButton: {
      position: 'absolute',
      top: 25, 
      right: 15,
      elevation: 12,
    }
    , svg: {
      position: 'absolute',
      width: Dimensions.get('window').width,
    },
  });