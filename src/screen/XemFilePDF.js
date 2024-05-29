import React, { Component, useState, useEffect, useRef } from 'react';
import { View, Text,ScrollView,Image,
   SafeAreaView,
   Button,findNodeHandle
   ,DeviceEventEmitter,UIManager
   ,StyleSheet ,Dimensions,NativeMethods,
   TextInput,TouchableOpacity
   ,NativeModules,FlatList,Alert,Keyboard,PermissionsAndroid
   ,Platform,
   ToastAndroid,
   TouchableWithoutFeedback,
   ActivityIndicator} from 'react-native';

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

import BackgroundCurve from '../components/BackgroundCurve'

import * as theme from "../config/constants/theme.js";
import SlidingUpPanel from 'rn-sliding-up-panel';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CardThongTinQuyHoach from './components/CardThongTinQuyHoach';
import {HeaderMenu} from './components/HeaderMenu';
//Lib 3
import * as Animatable from 'react-native-animatable';
import { material,human } from 'react-native-typography'




//Redux
import { useDispatch, useSelector } from "react-redux";
import { LoadingFristAction } from '../reducer/auth/authActions';

const {width,height} = Dimensions.get('window')
import { Encrypt,Decrypt, FomatTimeDDMMYYY } from "../config/utilities/Tool";

var Aes = NativeModules.Aes
import base64 from 'react-native-base64'

import ApiThuaDat from '../config/utilities/api/ApiThuaDat';
import Loader from './Loader';
import * as  ListItem from '../components/ListItem';
import { XA } from '../config/utilities/api/ApiGeneral';
import PDFView from 'react-native-view-pdf';

const XemFilePDF =(props)=> {
    const {data} = props.route.params

    const [IsLoading,setIsLoading] = useState(true);
    const user = useSelector((state) => state.auth.user);
    const sde = useSelector((state) => state.sde);
    const [urlVB,setUrlVB] = useState(data.url);
  useEffect(()=>{

  },[])
  console.log(data.url)
 
    return (
        <SafeAreaView style={{flex:1,backgroundColor:theme.colors.white}}>
                                    <BackgroundCurve style={styles.svg} />

        <HeaderMenu navigation={props.navigation}  titleHeader={"FILE SCAN"} />
        {IsLoading&&<>
		<View style={{height:200,backgroundColor:theme.colors.white,justifyContent:'center',alignItems:'center'}}>
		<ActivityIndicator z/>
		<Text>Đang lấy dữ liệu</Text>
		</View>

		</>}
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={urlVB}
          resourceType={"url"}
          onLoad={() => {console.log(`PDF rendered from ${"url"}`);setIsLoading(false)}}
          onError={(error) => {console.log('Cannot render PDF', error);Alert.alert("Thông báo","Không tải được file do dung lượng file >100M vui lòng xem ằng web",[ {
      text: 'OK', 
   
    }]);;setIsLoading(false)}}
        /> 
        </SafeAreaView>
    )
  
}

export default XemFilePDF


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
        },
        svg: {
          position: 'absolute',
          width: Dimensions.get('window').width,
        },
  })
  