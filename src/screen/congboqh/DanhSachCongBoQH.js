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
   TouchableWithoutFeedback,
   ImageBackground} from 'react-native';

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

import {HeaderMenu} from '../components/HeaderMenu';
//Lib 3
import * as Animatable from 'react-native-animatable';
import { material,human } from 'react-native-typography'




//Redux
import { useDispatch, useSelector } from "react-redux";
import { LoadingFristAction, LogoutAction } from '../../reducer/auth/authActions';

const {width,height} = Dimensions.get('window')
import { Encrypt,Decrypt, FomatTimeDDMMYYY } from "../../config/utilities/Tool";

var Aes = NativeModules.Aes
import base64 from 'react-native-base64'

import ApiThuaDat from '../../config/utilities/api/ApiThuaDat';
import * as  ListItem from '../../components/ListItem';
import ApiGeneral, { XA } from '../../config/utilities/api/ApiGeneral';
import { Checkbox } from 'react-native-paper';
import RenderHtml, { RenderHTML } from 'react-native-render-html';
import { LINKDOWLOAD } from '../../config/utilities/config';
import Animated from 'react-native-reanimated';

const DanhSachCongBoQH =(props)=> {

    const [IsLoading,setIsLoading]=useState(false);
    const user = useSelector((state) => state.auth.user);
    const sde = useSelector((state) => state.sde);
    const [IsOpenComment,setIsOpenComment]=useState(false);
    const [dataKVHC,setdataKVHC]=useState(XA);
    const [IsOpenChiTiet,setIsOpenChiTiet]=useState(false);
    const [IDSelect,setIDSelect]=useState('26380');
    const [data,setdata]=useState([]);
    const [checked, setChecked] = useState(true);
    const dispatch = useDispatch();
    const item= props.route.params.data
     useEffect(()=>{
        console.log(data)
        setdata(item)
        console.log(item.LstCongBo)

        //ApiThuaDat.TangView(item.LstYKien.ID,3);
    },[])
    const DowloadFile=(duongdan)=>{

        ApiThuaDat.DowloadFile(duongdan).then(res=>{
          props.navigation.navigate('XemFilePDF',{data:{"url":res}})   
        }
        )
    }
    const ItemCONGBO=({item})=>(
        <View style={[styles.panelBody,styles.itemWhiteBox]}>
     
      
  <View style={{paddingHorizontal:15,paddingBottom:10}}>

      <Image
        style={styles.stretch}
        source={{uri:LINKDOWLOAD+item.LstCongBo.IMG}}
      />
            <Text style={[material.subheading,{textAlign:'center',fontWeight:'bold',color:theme.colors.Primary}]}>{item.LstCongBo.TIEUDE}</Text>
            
            <ListItem.RowItem title={"Xã/Phường: "} noidung={XA.filter(n=>n.maKvhc==item.LstCongBo.MAXA)[0].ten} />

            
            <ListItem.RowItem title={"Phân khu: "} noidung={item.LstCongBo.PHANKHU} />

            <ListItem.RowItem title={"Ngày cập nhật: "} noidung={FomatTimeDDMMYYY(new Date(item.LstCongBo.CREATEDATE))} />

            <ListItem.RowItem title={"File Đính Kèm: "} noidung={""} />
  
            <ScrollView   horizontal={true}
    style={{width:theme.sizes.width-50}}>
  
  
              {
     item.LstFile.map((item,i)=>{
          return(
              <>
               <TouchableOpacity   onPress={()=>{ DowloadFile(item.Link)  }}>
              <View style={{margin:10,borderWidth:1,borderColor:theme.colors.Primary,paddingHorizontal:10}}>
              <Text style={[material.caption,{marginVertical:5,color:theme.colors.blue}]}> <Entypo name="text-document"/> {item.TenFile}</Text>
              </View>
              </TouchableOpacity>
              </>
          )
      })
  }
  </ScrollView>
 
  
  
  
            </View>
  
  
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',margin:10}}>
<FontAwesome5 name="eye" style={{marginHorizontal:5}} color={theme.colors.black} size={15}  >
  <Text> {item.LstCongBo.LUOTXEM}</Text>
</FontAwesome5>

{<TouchableOpacity
    onPress={()=>props.navigation.navigate("ChiTietCongBo",{data:item})}
    style={[material.button,{alignSelf:'flex-end',width:100,borderRadius:15,height:30,right:0,backgroundColor:theme.colors.Primary,flexDirection:'row',justifyContent:'center',alignItems:'center'}]}


>

<Text style={material.buttonWhite}>Chi tiết</Text>
</TouchableOpacity>}
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

        <HeaderMenu navigation={props.navigation}  titleHeader={"CÔNG BỐ QUY HOẠCH"} />
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
        <FlatList
      contentContainerStyle={{padding:10}}
      data={checked?data:data.filter(n=>n.LstCongBo.MAXA==IDSelect)}
       // keyExtractor={item => `${item.ID}`}
        renderItem={ItemCONGBO}
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

export default DanhSachCongBoQH
const screenWidth = Math.round(Dimensions.get('window').width);
const STACK_NAVBAR_HEIGHT = 48
const screenHeight = Math.round(Dimensions.get('window').height);
const FIXED_STATUSBAR_HEIGHT = 44
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
            margin:5
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
        commentContainer: {
            flexDirection: 'row',
            padding: 10,
            borderColor: "red",
            borderStyle: 'dashed',
            flexWrap: 'nowrap'
        },
        commentAvatar: {
            width: 30,
            height: 30,
            borderRadius: 50
        },
        commentInput: {
            borderWidth: 0.5,
            borderRadius: 20,
            marginLeft: 10,
            height: 40,
            width: theme.sizes.width - 15 * 2,
        },
        btnSendComment: {
            width: 30,
            height: 30,
            textAlign: 'center',
            lineHeight: 30
        },
        commentInputWrapper: {
            borderWidth: 1,
            borderBottomWidth: 0,
            borderColor: '#ddd',
            position: 'absolute',
            bottom: 0,
            left: 0,
            paddingHorizontal: 15,
            height: 50,
            backgroundColor: theme.colors.gray2,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 20,


        },
        commentsWrapper: {
            marginBottom: 10,
            padding: 10,
            backgroundColor: '#fff',
            flex:1
        },
        keyboardAvoidingContainer: {
            height: screenHeight,
            zIndex: 2
        },
        wrapper: {
            position: 'absolute',
            left: 0,
            width: '100%',
            height: '100%'
        },
        backdrop: {
            backgroundColor: 'rgba(0,0,0,0)',
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 1
        },
        container: {
            padding: 10,
            marginBottom: FIXED_STATUSBAR_HEIGHT + STACK_NAVBAR_HEIGHT + 50,
            backgroundColor: '#ffffff',
        },
    
        iconItem: {
            width: 30,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center'
        },
        cameraIconWrapper: {
            backgroundColor: '#ddd',
            borderRadius: 50,
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center'
        },
        textInputWrapper: {
            height: 40,
            borderTopLeftRadius: 48,
            borderBottomLeftRadius: 48,
            backgroundColor: '#ddd',
            marginLeft: 10,
            width: screenWidth - 40 - 80 - 30 - 10,
            borderRightWidth: 0
        },
        textInput: {
            width: "100%",
            height: 40,
            paddingHorizontal: 15,
            alignItems: 'center'
        },
        iconWrapper: {
            flexDirection: 'row',
            paddingHorizontal: 10,
            borderTopRightRadius: 48,
            borderBottomRightRadius: 48,
            height: 40,
            backgroundColor: '#ddd',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeftWidth: 0
        },
        navigationStackBar: {
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            paddingHorizontal: 10
        },
        btnBack: {
            zIndex: 99
        },
        stackBarTitle: {
            position: 'absolute',
            width: screenWidth,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            height: 40,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1
        }
  })
  