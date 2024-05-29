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

const ChiTietYKien =(props)=> {

    const [IsLoading,setIsLoading]=useState(false);
    const user = useSelector((state) => state.auth.user);
    const sde = useSelector((state) => state.sde);
    const [data,setdata]=useState([]);
    const [IsOpenComment,setIsOpenComment]=useState(false);
    const [txtBinhLuan,settxtBinhLuan]=useState("");
    const [txtEditBinhLuan,settxtEditBinhLuan]=useState("");
    const [userapp,setuserapp]=useState("");

    const [dataEditBinhLuan,setdataEditBinhLuan]=useState({"$id": "0", "CREATEDATE": "2023-07-05T16:28:39", "DELETED": 0, "ID": 0, "ID_HOSO": 0, "ID_LOAICHUCNANG": 0, "IMG": null, "NOIDUNG": "", "UPDATEDATE": null, "USERNAME": "User25917049804923"});

    const dispatch = useDispatch();
    const item= props.route.params.data
     useEffect(()=>{
        ApiThuaDat.TangView(item.LstYKien.ID,2);
        GetBinhLuan();
        GetUSERAPP();
    },[])
    const GetUSERAPP=async()=>{
      let keyUUID=await AsyncStorage.getItem("UserUUID");
      let parsedkeyUUID = JSON.parse(keyUUID);  
      setuserapp(parsedkeyUUID.data)
    }
    const GetBinhLuan=()=>{
        ApiThuaDat.GETBINHLUAN(item.LstYKien.ID,2).then(res=>{
            //console.log(res.status)
            
              var data = JSON.parse(Decrypt(res.data,sde.KeyApp,sde.IVApp))
              console.log(data)
              if(data!=null&&data!=undefined)
              {
                if(data.KetQua)
                  {
                    setdata(data.Data)
                  }
                  else{
                    if(Platform.OS=="android")
                    {
                      ToastAndroid.showWithGravity(
                        "LỖi load data",
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
    }
    const DowloadFile=(duongdan)=>{

      ApiThuaDat.DowloadFile(duongdan).then(res=>{
        props.navigation.navigate('XemFilePDF',{data:{"url":res}})   
      }
      )
     }
    const ItemYKIEN=({item})=>(
        <View style={[styles.panelBody,styles.itemWhiteBox]}>
     
      
  <View style={{paddingHorizontal:15,paddingBottom:10}}>
  {/* {item.IMG.length<10&&<Image
        style={styles.stretch}
        source={{uri:LINKDOWLOAD+item.IMG}}
      />} */}
      <Image
        style={styles.stretch}
        source={{uri:LINKDOWLOAD+item.LstYKien.IMG}}
      />
            <Text style={[material.subheading,{textAlign:'center',fontWeight:'bold',color:theme.colors.Primary}]}>{item.LstYKien.TIEUDE}</Text>
  
            {/* <ListItem.RowItem title={"Phân khu: "} noidung={item.LstYKien.PHANKHU} />
            <ListItem.RowItem title={"Ngày bắt đầu: "} noidung={FomatTimeDDMMYYY(new Date(item.LstYKien.CREATEDATE))} />
            <ListItem.RowItem title={"Ngày kết thúc : "} noidung={item.LstYKien.EXITDATE!=null&&FomatTimeDDMMYYY(new Date(item.LstYKien.EXITDATE))} />
             */}
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
  
  
        
          </View>
      ) 
      
    const AddBinhLuan=async()=>{
        let keyUUID=await AsyncStorage.getItem("UserUUID");
        let parsedkeyUUID = JSON.parse(keyUUID);  
        console.log(txtBinhLuan)
        var dataBL={
            USERNAME:parsedkeyUUID.data,
            NOIDUNG:txtBinhLuan,
            ID_HOSO:item.LstYKien.ID,
            ID_LOAICHUCNANG:2
        }
        ApiThuaDat.POSTBINHLUAN(dataBL).then(res=>{
            //console.log(res.status)
            
              var data = JSON.parse(Decrypt(res.data,sde.KeyApp,sde.IVApp))
              console.log(data)
              if(data!=null&&data!=undefined)
              {
                if(data.KetQua)
                  {
                    settxtBinhLuan("")
                    GetBinhLuan();
                    Keyboard.dismiss();
                  }
                  else{
                    if(Platform.OS=="android")
                    {
                      ToastAndroid.showWithGravity(
                        "LỖi load data",
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
    }
    const EditBinhLuan=(data)=>{
        console.log(data)
        setdataEditBinhLuan(data)
        settxtEditBinhLuan(data.NOIDUNG)
        setIsOpenComment(true)
    }
    
    const SaveBinhLuan=async()=>{
        let keyUUID=await AsyncStorage.getItem("UserUUID");
        let parsedkeyUUID = JSON.parse(keyUUID);  
        console.log(txtBinhLuan)
        var dataBL={
            USERNAME:parsedkeyUUID.data,
            NOIDUNG:txtEditBinhLuan,
            ID:dataEditBinhLuan.ID
        }
        ApiThuaDat.UPDATEBINHLUAN(dataBL).then(res=>{
            //console.log(res.status)
            
              var data = JSON.parse(Decrypt(res.data,sde.KeyApp,sde.IVApp))
              console.log(data)
              if(data!=null&&data!=undefined)
              {
                if(data.KetQua)
                  {
                    settxtEditBinhLuan("")
                    GetBinhLuan();
                    Keyboard.dismiss();
                    setIsOpenComment(false)
                  }
                  else{
                    if(Platform.OS=="android")
                    {
                      ToastAndroid.showWithGravity(
                        "LỖi load data",
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
    }
    const DeleteBinhLuan=async(dataBL)=>{
      let keyUUID=await AsyncStorage.getItem("UserUUID");
      let parsedkeyUUID = JSON.parse(keyUUID); 
      console.log(dataBL)
      if(dataBL.USERNAME==parsedkeyUUID.data)
      {
  Alert.alert("Xoá bình luận", "Bạn có chắc muốn bình luận?", [
            {
              text: "Hủy",
              style: "cancel",
            },
        
            {
              text: "Đồng ý",
              onPress: () => {
                ApiThuaDat.DELETEBINHLUAN(dataBL).then(res=>{
                    //console.log(res.status)
                    
                      var data = JSON.parse(Decrypt(res.data,sde.KeyApp,sde.IVApp))
                      console.log(data)
                      if(data!=null&&data!=undefined)
                      {
                        if(data.KetQua)
                          {
                            GetBinhLuan();
                          }
                          else{
                            if(Platform.OS=="android")
                            {
                              ToastAndroid.showWithGravity(
                                "LỖi load data",
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
              },
            },
          ]);
      }
      else{
        Alert.alert("Không xoá được ý kiến")
      }
      
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:theme.colors.white}}>
                          <BackgroundCurve style={styles.svg} />

        <HeaderMenu navigation={props.navigation}  titleHeader={"Ý KIẾN CỘNG ĐỒNG"} />

        <ItemYKIEN item={item}/>
        <ScrollView style={styles.commentsWrapper}>

                        {data.map((comment, index) => (
                            <View style={{marginVertical:8}}>
                                <View style={{flexDirection:'row'}}>
                                    <View>
                                    <FontAwesome5 name='user-circle' color={theme.colors.gray} size={30}></FontAwesome5>
                                    </View>
                                    <View>
                                    <View style={{marginHorizontal:10}}>
                                    <Text style={{fontWeight:'bold'}}>{comment.USERNAME}</Text>
                                    <Text style={material.caption}>{FomatTimeDDMMYYY(new Date(comment.CREATEDATE))}</Text>

                                    </View>
                                    </View>
                                </View>
                                <View>
                                <Text style={material.body1}>{comment.NOIDUNG}</Text>
                                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                              {comment.USERNAME==userapp&&<>
                                <FontAwesome5 onPress={()=>EditBinhLuan(comment)}  name='edit' style={{textAlign:'right',marginRight:10}} color={theme.colors.Primary} size={20}></FontAwesome5>
                                <FontAwesome5  onPress={()=>DeleteBinhLuan(comment)} name='window-close' style={{textAlign:'right'}} color={theme.colors.red} size={20}></FontAwesome5>
                              
                              </>}
                                </View>
                                </View>
                            </View>
                        ))}
                              
                              </ScrollView>

                            
        <View style={styles.commentContainer}>
                    <View style={[styles.commentInput,{justifyContent:'center'}]}>
                            <TextInput value={txtBinhLuan} onChangeText={(e)=>settxtBinhLuan(e)} multiline style={styles.commentInputWrapper}></TextInput>
                            <FontAwesome onPress={()=>AddBinhLuan()}  name="send" style={{marginHorizontal:5,position:'absolute',right:15}} color={theme.colors.Primary} size={25}  />
                    </View>
                </View>


<ModalRN isVisible={IsOpenComment}  style={{justifyContent:'flex-end',alignItems:'center',bottom:0,margin:0}} onBackdropPress={()=>setIsOpenComment(false)}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "position" : "height"}>
               <SafeAreaView style={{width:theme.sizes.width,backgroundColor:theme.colors.white,borderTopLeftRadius:theme.sizes.radius,borderTopRightRadius:theme.sizes.radius,padding:0}} >
              
          <TextInput     autoFocus={true}                       
 value={txtEditBinhLuan} onChangeText={(e)=>settxtEditBinhLuan(e)} onSubmitEditing={()=>SaveBinhLuan()} multiline style={[styles.commentInputWrapper,{marginVertical:10}]}></TextInput>
                <MaterialCommunityIcons onPress={()=>SaveBinhLuan()} style={{backgroundColor:theme.colors.white,position:'absolute',alignSelf:'flex-end',justifyContent:'center',bottom:20}} size={30} color={theme.colors.Primary} name="content-save-edit"/>

              </SafeAreaView>
              </KeyboardAvoidingView>
      </ModalRN>
        </SafeAreaView>
    )
  
}

export default ChiTietYKien
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
  