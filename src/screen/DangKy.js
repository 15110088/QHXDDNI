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

// import Map   from '../../Map'

// import Map_Android   from '../../Map_Android'
import CustomView   from '../../CustomView'
import { useMemo } from 'react';


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import Feather from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper'
import ModalRN from 'react-native-modal';


import * as theme from "../config/constants/theme.js";
import {HeaderMenu} from './components/HeaderMenu';
//Lib 3
import * as Animatable from 'react-native-animatable';
import { material,human } from 'react-native-typography'




//Redux
import { useDispatch, useSelector } from "react-redux";
import { LoadingFristAction } from '../reducer/auth/authActions';
import BackgroundCurve from '../components/BackgroundCurve';

const {width,height} = Dimensions.get('window')

const HEADER_COLLAPSE = 32;
const HEADER_LIST = 60;
const HEADER_HEIGHT = HEADER_LIST + HEADER_COLLAPSE
const isAndroid = Platform.OS === 'android';

const DangKy =(props)=> {

    const [IsLoading,setIsLoading]=useState(false);
    const user = useSelector((state) => state.auth.user);
    const sde = useSelector((state) => state.sde);
    const [data,setdata]=useState([]);
    const [IsOpenChiTiet,setIsOpenChiTiet]=useState(false);

    const [IDSelect,setIDSelect]=useState('26380');
    const [checked, setChecked] = useState(false);

    //
    const [sdt,setsdt]=useState("");
  const [Username,setUsername]=useState("");
  const [HoTen,setHoTen]=useState("");
  const [Email,setEmail]=useState("");
  const [Password,setPassword]=useState("");
  const [Password2,setPassword2]=useState("");


  const [timeLeft, setTimeLeft] = useState(0);
  let timer = () => {};

  const startTimer = () => {
    timer = setInterval(() => {
      if(timeLeft <= 0){
        clearInterval(timer);
          return false;
      }
  
      setTimeLeft(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(timer)
        return lastTimerCount - 1});
        }, 1000)
   }
     useEffect(()=>{
        startTimer();
        return () => clearInterval(timer);


    },[])

    const handleOpen = () => {

        var nameRegex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{2,}$/g // regex here
          var EmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
         
          if(Username.length==0)
          {
            Alert.alert("Tài khoản không để trống")
            return;
          }

          if (nameRegex.test(Username) === false) {
            Alert.alert("Tài khoản không đúng có ký tự đặt biệt")
            return;
          }

          if (EmailRegex.test(Email) === false) {
            Alert.alert("Email không đúng định dạng")
            return;
          }
          if (Password.length<5) {
            Alert.alert("Mật khẩu 6 ký tự trở lên")
            return;
          }
        if(Password!=Password2)
        {
         Alert.alert("Mật khẩu không giống nhau")
            return
        }
        if(sdt.length>=10)
        {               
            setIsOpenChiTiet(true);

            if(timeLeft==0)
            {
                Alert.alert("Đã gửi mã xác thực")
                start()
 
            }
    

        }
        else{
          Alert.alert("Nhập không đúng số điện thoại")
        }
        
      };
      const start = () => {
        setTimeLeft(60);
        clearInterval(timer);
        startTimer();
    }
      const GuiLaiSMS=()=>{
        if(timeLeft==0)
        {
          start()
          Alert.alert("Đã gửi Mã xác thực")

        }
      }
      const XacThucOTP=()=>{
       
        Alert.alert("Mã xác thực không đúng")

      }
    
    return (
      <SafeAreaView style={{flex:1,backgroundColor:theme.colors.white}}>

             <BackgroundCurve style={styles.svg} />

        <HeaderMenu navigation={props.navigation}  titleHeader={"ĐĂNG KÝ"} />
    
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "position" : "height"}>
            <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={CommonStyles.normalSinglePage}>
              
        <View style={styles.titleBox}>
     
        </View>
        <View style={styles.formBox}>
        <View style={CommonStyles.textInputField}>
            <FontAwesome5 style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}} color={theme.colors.Primary} size={20} name="user"/>
            <TextInput
              placeholder='Họ và Tên'
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
              onChangeText={value=>setHoTen(value)}
              placeholderTextColor={theme.colors.gray}

            />
          </View>
        <View style={CommonStyles.textInputField}>
            <FontAwesome5 style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}} color={theme.colors.Primary} size={20} name="address-card"/>
            <TextInput
              placeholder='Tài khoản'
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
              onChangeText={value=>setUsername(value)}
              placeholderTextColor={theme.colors.gray}

            />
          </View>
         
          <View style={CommonStyles.textInputField}>
          <FontAwesome5 style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}} color={theme.colors.Primary} size={20} name="phone-alt"/>
            <TextInput
              placeholder='Số điện thoại'
              style={CommonStyles.textInput}
              keyboardType='number-pad'
              underlineColorAndroid='transparent'
              onChangeText={value=>setsdt(value)}
              placeholderTextColor={theme.colors.gray}

            //  secureTextEntry          
                />
          </View>
          <View style={CommonStyles.textInputField}>
            <FontAwesome5 style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}} color={theme.colors.Primary} size={20} name="mail-bulk"/>
            <TextInput
              placeholder='Email'
              keyboardType='email-address'
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
              onChangeText={value=>setEmail(value)}
              placeholderTextColor={theme.colors.gray}

            />
          </View>
       
          <View style={CommonStyles.textInputField}>
          
          <FontAwesome5 style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}} color={theme.colors.Primary} size={20} name="lock"/>

            
            <TextInput
              placeholder='Mật khẩu'
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
              underlineColorAndroid='transparent'
              onChangeText={value=>setPassword2(value)}
              secureTextEntry      
              placeholderTextColor={theme.colors.gray}

            />
          </View>
         
        </View>
        <TouchableOpacity onPress={()=>handleOpen()} style={{ marginVertical: 10,alignSelf:'center',flex:1,width:width-50 }}>
                 <View style={[styles.signIn,{backgroundColor:'#1f7cee',flex:1}]}>
                  
                  <View style={[styles.circleIcon,{backgroundColor:theme.colors.white,position:'absolute',left:20}]}>
                  </View>
                  <Text style={material.body2White}>TIẾP TỤC</Text>
                </View>
            </TouchableOpacity>
        <View style={styles.noteBox}>
          <Text style={[
            CommonStyles.regularBold,
            CommonStyles.normalText,
            CommonStyles.lightgreyColor
          ]}>
            Đã có tài khoản
          </Text>
          <TouchableOpacity onPress={()=>props.navigation.goBack()} >
            <View style={{marginLeft: 5}}>
              <Text style={[
                CommonStyles.regularBold,
                CommonStyles.normalText,
                CommonStyles.softBlueColor]}>
                ĐĂNG NHẬP 
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
  
</TouchableWithoutFeedback>
</ScrollView>
      </KeyboardAvoidingView>
     
            <ModalRN isVisible={IsOpenChiTiet} backdropOpacity={false} style={{justifyContent:'flex-end',alignItems:'center',bottom:0,margin:0}} onBackdropPress={()=>setIsOpenChiTiet(false)}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "position" : "height"}>
                 <SafeAreaView style={{width:theme.sizes.width,height:theme.sizes.height/2,backgroundColor:theme.colors.white,borderTopLeftRadius:theme.sizes.radius,borderTopRightRadius:theme.sizes.radius,padding:0}} >
                 <View style={{justifyContent:'center',alignItems:'center',padding:5,borderTopLeftRadius:theme.sizes.radius,borderTopRightRadius:theme.sizes.radius,backgroundColor:theme.colors.Primary }}>
                      <Text style={{color:theme.colors.white,fontWeight:'bold'}}>XÁC THỰC OTP</Text>
            </View>
                 <View style={{flex:1,flexDirection:'column' ,alignItems:'center', margin:20}}>
                    <TextInput keyboardType='number-pad' maxLength={6} style={{width:theme.sizes.width*0.6,height:50 ,backgroundColor:theme.colors.gray,textAlign:'center',fontWeight:'bold',color:theme.colors.Primary,fontSize:25}}></TextInput>
                    <TouchableOpacity onPress={()=>XacThucOTP()}  style={{ marginVertical: 10,alignSelf:'center',width:theme.sizes.width*0.6 }}>
                        <View style={[styles.signIn,{backgroundColor:'#1f7cee'}]}>
                        <Text style={material.body2White}>XÁC NHẬN</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>GuiLaiSMS()}>
            <View style={{marginTop:10}}>
            <Text style={[
               material.body1
               ,{right:0,color:timeLeft>0? theme.colors.gray:theme.colors.Primary}]}>
                Lấy mã xác thực {timeLeft>0?timeLeft:""}
              </Text>
            </View>
            </TouchableOpacity>
                 </View>
               
                  <MaterialCommunityIcons onPress={()=>setIsOpenChiTiet(false)} style={{backgroundColor:theme.colors.white,position:'absolute',alignSelf:'flex-end',justifyContent:'flex-end',bottom:10,right:15}} size={40} color={theme.colors.red} name="close-box"/>
             
                </SafeAreaView>
                </KeyboardAvoidingView>
        </ModalRN>
        </SafeAreaView>
    )
  
}

export default DangKy
const ELEMENT_HEIGHT = 377;
const spaceHeight = theme.sizes.height - ELEMENT_HEIGHT;

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
      height: 45,
      alignItems: 'center',
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