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
const Profile =(props)=> {

    const [IsLoading,setIsLoading]=useState(false);
    const user = useSelector((state) => state.auth.user);
    const sde = useSelector((state) => state.sde);
    const [data,setdata]=useState([]);
    const [dataKVHC,setdataKVHC]=useState(XA);
    const [IsOpenChiTiet,setIsOpenChiTiet]=useState(false);

    const [IDSelect,setIDSelect]=useState('26380');
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();

     useEffect(()=>{
       
        console.log(user)

    },[])
    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    const refColor = useRef(randomColor())
    const Logout = () => {
      Alert.alert("Đăng Xuất", "Bạn có chắc muốn đăng xuất?", [
        {
          text: "Hủy",
          style: "cancel",
        },
    
        {
          text: "Đồng ý",
          onPress: () => {
            dispatch(LogoutAction());
          },
        },
      ]);
    };
    const XoaTaiKhoan = () => {
      Alert.alert("Xoá tài khoản", "Tài khoản xoá không thẻ khôi phục?", [
        {
          text: "Hủy",
          style: "cancel",
        },
    
        {
          text: "Đồng ý",
          onPress: () => {
            saveDataToStorage("DeleteAccount",user.email)
            dispatch(LogoutAction());
          },
        },
      ]);
    };
    return (
        <SafeAreaView style={{flex:1,backgroundColor:theme.colors.white}}>
                          <BackgroundCurve style={styles.svg} />

        <HeaderMenu navigation={props.navigation}  titleHeader={"TÀI KHOẢN"} />
        <View  style={{height:200}}>
           <Image
            source={require('../../assets/images/bgProfile3.jpg')}
           style={{flex:1,width: null,height:null,resizeMode:'stretch'}}
          >
         
            </Image>
            <TouchableOpacity onPress={()=>XoaTaiKhoan()} style={{backgroundColor:theme.colors.white,flexDirection:'row',right:0,alignItems:'flex-end',position:'absolute',borderWidth:1,marginVertical:5,padding:5,borderColor:theme.colors.red}} >
           
           <MaterialCommunityIcons  name={"delete"} size={25} color={theme.colors.red}/>
           <Text style={material.body1}></Text>

         </TouchableOpacity>
           </View>
           <View style={{marginTop:-50,alignItems:'center'}}>

<View style={{alignItems:'center',justifyContent:'center',width:100,height:100,borderRadius:60,backgroundColor:refColor.current}}>
  <Text style={[material.display1White,{fontWeight:'bold'}]}>{user.email.substring(0,1).toUpperCase()}</Text>

</View>
    <Text style={material.title}>{user.email}</Text>

    

</View>

<TouchableOpacity onPress={()=>props.navigation.navigate('HoSoQuyHoach')} style={styles.titlebutton} >
           
           <MaterialCommunityIcons  name={"book"} size={25} color={theme.colors.white}/>
           <Text style={material.body1White}> Hồ Sơ Quy Hoạch</Text>

         </TouchableOpacity>
<TouchableOpacity onPress={()=>props.navigation.navigate('DoiMatKhau')} style={styles.titlebutton} >
           
           <MaterialCommunityIcons  name={"key-variant"} size={25} color={theme.colors.white}/>
           <Text style={material.body1White}> Đổi mật khẩu</Text>

         </TouchableOpacity>
         <TouchableOpacity onPress={()=>Logout()} style={styles.titlebutton} >
           
           <MaterialCommunityIcons  name={"logout"} size={25} color={theme.colors.white}/>
           <Text style={material.body1White}> Đăng Xuất</Text>

         </TouchableOpacity>
        </SafeAreaView>
    )
  
}

export default Profile


const styles=StyleSheet.create({
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
        flexDirection:'row',alignItems:'center',borderWidth:1
        ,margin:5,padding:8,backgroundColor:'#458DFF'
        ,borderColor:theme.colors.Primary
        ,marginHorizontal:10,
        borderRadius:8
  
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
            borderWidth: 1,
            borderColor: theme.colors.Primary,
            marginBottom:10


        }
        ,stretch:{
            width: '100%',
            height: 200,
            marginVertical:10,
            resizeMode: 'stretch',
        } , svg: {
          position: 'absolute',
          width: Dimensions.get('window').width,
        },
  })
  