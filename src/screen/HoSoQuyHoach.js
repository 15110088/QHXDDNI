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

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import Entypo from 'react-native-vector-icons/Entypo';
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
import ApiGeneral, { XA } from '../config/utilities/api/ApiGeneral';
import { LINKDOWLOAD } from '../config/utilities/config';
import { Checkbox } from 'react-native-paper';

const HoSoQuyHoach =(props)=> {

    const [IsLoading,setIsLoading]=useState(false);
    const user = useSelector((state) => state.auth.user);
    const sde = useSelector((state) => state.sde);
    const [data,setdata]=useState([]);
    const [dataKVHC,setdataKVHC]=useState(XA);
    const [IsOpenChiTiet,setIsOpenChiTiet]=useState(false);

    const [IDSelect,setIDSelect]=useState('26380');
    const [checked, setChecked] = useState(true);
    const [Filter,setFilter] = useState([]);
    const dataREF= useRef([])

    const DowloadFile=(duongdan)=>{

      ApiThuaDat.DowloadFile(duongdan).then(res=>{
        console.log("doload link "+res)
        props.navigation.navigate('XemFilePDF',{data:{"url":res}})   
      }
      )
     }
     useEffect(()=>{
        ApiThuaDat.GETHOSOQUYHOACH(user.token).then(res=>{
            //console.log(res.status)
            
              var data = JSON.parse(Decrypt(res.data,sde.KeyApp,sde.IVApp))
              console.log(data)
              if(data!=null&&data!=undefined)
              {
                if(data.KetQua)
                  {
                    dataREF.current=data.Data
                    setdata(data.Data)
                    setFilter(data.Data)

                  }
                  else{
                    if(Platform.OS=="android")
                    {
                      ToastAndroid.showWithGravity(
                        "Không tìm thấy thông tin hồ sơ",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
        
                   
                    }
                  }
               setIsLoading(false)
              }
              else{
              }
              }).catch(err=>{
                setIsLoading(false)
                ToastAndroid.showWithGravity(
                  "Lỗi truy cập máy chủ",
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );
                console.log(err)
              })

          


    },[])
    const Item=({item})=>(
        <View style={[styles.panelBody,styles.itemWhiteBox]}>
     
          {/* <View style={[{padding:0,borderTopLeftRadius:8,borderTopRightRadius:8,justifyContent:'center',alignItems:'center',backgroundColor:theme.colors.white}]}>
          <Text style={[material.subheading,{textAlign:'center',fontWeight:'bold',color:theme.colors.white}]}> </Text>
          </View> */}
  <View style={{paddingHorizontal:15,paddingBottom:10}}>
  <Image
        style={styles.stretch}
        source={{uri:LINKDOWLOAD+item.LstHoSo.IMG}}
      />
      <Text style={[material.subheading,{textAlign:'center',fontWeight:'bold',color:theme.colors.Primary}]}>{item.LstHoSo.TEN}</Text>
      <ListItem.RowItem title={"Xã/Phường: "} noidung={XA.filter(n=>n.maKvhc==item.LstHoSo.MAXA)[0].ten} />
            <ListItem.RowItem title={"Mô tả: "} noidung={item.LstHoSo.MOTA} />

            <ListItem.RowItem title={"Phân khu: "} noidung={item.LstHoSo.PHANKHU} />
            <ListItem.RowItem title={"Ngày tạo: "} noidung={FomatTimeDDMMYYY(new Date(item.LstHoSo.CREATEDATE))} />
            <ListItem.RowItem title={"Danh sách FILE: "} noidung={""} />
<View  style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}
  >


            {
   item.LstFile.map((item,i)=>{
        return(
            <>
             <TouchableOpacity style={{margin:10,borderWidth:1,borderColor:theme.colors.Primary,paddingHorizontal:10}}  onPress={()=>DowloadFile(item.Link)}>

            <Text style={[material.caption,{flexWrap:'wrap',marginVertical:5,color:theme.colors.blue}]}> <Entypo name="text-document"/> {item.TenFile}</Text>
          
            </TouchableOpacity>
            </>
        )
    })
}
</View>
            </View>
  
  
        
          </View>
      )

      const _ItemKhuVuc=({item})=>{
      
        var arrTen=item.ten?.split(" ")
        return(
          <>
          <TouchableOpacity onPress={()=>CHONXA(item)} style={{margin:5,flexDirection:'row'}}>
          <FontAwesome5 name="bookmark" style={{marginHorizontal:5}} color={IDSelect==item.maKvhc?theme.colors.Primary:theme.colors.black} size={20}  />

            {/* <ListItem.RowItem title={arrTen[0]} noidung={item.ten.substr(arrTen[0].length,item.ten.length).trim()} /> */}
              <Text style={[theme.fonts.textBodyTitle,{color:IDSelect==item.maKvhc?theme.colors.Primary:theme.colors.black,fontWeight:'bold'}]}>{item.ten.substr(arrTen[0].length,item.ten.length).trim()}</Text>
          </TouchableOpacity>
          </>
        )

      }
      const CHONXA=(item)=>{
        setIsOpenChiTiet(false)
        setIDSelect(item.maKvhc)
        console.log(item)
      }
      const SearchFilterFC = (searchText) => {
        console.log(dataREF.current)
        const search = dataREF.current.filter((text) =>    
        text.LstHoSo.TEN.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")),
        );
        setFilter(search)
      };
    return (
        <SafeAreaView style={{flex:1,backgroundColor:theme.colors.white}}>
                          <BackgroundCurve style={styles.svg} />

        <HeaderMenu navigation={props.navigation}  titleHeader={"HỒ SƠ QUY HOẠCH"} />
        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
    <TouchableOpacity
          onPress={()=>setIsOpenChiTiet(true)}
         style={{flexDirection:'row',alignItems:'center',marginTop: 10,left:-theme.sizes.width/2+20,paddingLeft:theme.sizes.width/2-20,paddingRight:5,paddingVertical:2,
  marginBottom: 10,
  marginLeft: 10,
  marginRight: 10,
  borderRadius: 8,
  backgroundColor: '#FFFFFF',
  elevation: 6}}>
        <Entypo name="location-pin" color={theme.colors.red} size={28} />
          <Text style={[material.subheading,{flexWrap:'wrap',fontWeight:'bold'}]}>{XA.filter(n=>n.maKvhc==IDSelect)[0].ten}</Text>
         
          <MaterialIcons  name="keyboard-arrow-right" color={theme.colors.gray} size={28} />

        </TouchableOpacity>
        <View style={{flexDirection:'row',alignItems:'center',marginRight:10}}>
        <Text>Tất cả</Text>
        <Checkbox 
        color={theme.colors.Primary}
        
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    />
    </View>
    </View>
        <TextInput
              placeholder=' Tìm theo tên dự án'
              style={[{color:theme.colors.black,borderWidth:1,height:40,margin:10,borderRadius:5,fontSize: 15,borderColor:theme.colors.Primary}]}
              underlineColorAndroid='transparent'
            
              onChangeText={value=>SearchFilterFC(value)}
              placeholderTextColor={theme.colors.gray}
            />
        <FlatList
        contentContainerStyle={{padding:10}}
        data={checked?data:data.filter(n=>n.LstHoSo.MAXA==IDSelect)}

          keyExtractor={item => `${item.id}`}
          renderItem={Item}
        />
            <ModalRN isVisible={IsOpenChiTiet} backdropOpacity={false} style={{justifyContent:'flex-end',alignItems:'center',bottom:0,margin:0}} onBackdropPress={()=>setIsOpenChiTiet(false)}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "position" : "height"}>
                 <SafeAreaView style={{width:theme.sizes.width,height:theme.sizes.height-35,backgroundColor:theme.colors.white,borderTopLeftRadius:theme.sizes.radius,borderTopRightRadius:theme.sizes.radius,padding:0}} >
                 <View style={{justifyContent:'center',alignItems:'center',padding:5,borderTopLeftRadius:theme.sizes.radius,borderTopRightRadius:theme.sizes.radius,backgroundColor:theme.colors.Primary }}>
                      <Text style={{color:theme.colors.white,fontWeight:'bold'}}>XÃ/PHƯỜNG</Text>
            </View>
                 <FlatList contentContainerStyle={{borderWidth:2,borderColor:theme.colors.Primary}}
 data={dataKVHC.filter(n=>n.maKvhcCha=="731")} 
                 keyExtractor = { (item, index) => index.toString() }
                 renderItem={_ItemKhuVuc}/>
                  <MaterialCommunityIcons onPress={()=>setIsOpenChiTiet(false)} style={{backgroundColor:theme.colors.white,position:'absolute',alignSelf:'flex-end',justifyContent:'flex-end',bottom:0}} size={40} color={theme.colors.red} name="close-box"/>

                </SafeAreaView>
                </KeyboardAvoidingView>
        </ModalRN>
        </SafeAreaView>
    )
  
}

export default HoSoQuyHoach


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
            borderWidth: 1,
            borderColor: theme.colors.Primary,
            marginBottom:10


        }
        ,stretch:{
            width: '100%',
            height: 200,
            marginVertical:10,
            resizeMode: 'contain',
        } , svg: {
          position: 'absolute',
          width: Dimensions.get('window').width,
        },
  })
  