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

import BackgroundCurve from '../components/BackgroundCurve'

import * as theme from "../config/constants/theme.js";
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Card, ListItem, Icon } from 'react-native-elements'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CardThongTinQuyHoach from './components/CardThongTinQuyHoach';
import {Header} from './components/Header';
//Lib 3
import * as Animatable from 'react-native-animatable';


import ApiGeneral, { XA } from '../config/utilities/api/ApiGeneral';
import Geolocation from '@react-native-community/geolocation';
import { parse } from 'react-native-svg';
import Animated from 'react-native-reanimated';

//Redux
import { useDispatch, useSelector } from "react-redux";
import { LoadingFristAction } from '../reducer/auth/authActions';

const {width,height} = Dimensions.get('window')
import { Encrypt,Decrypt } from "../config/utilities/Tool";

var Aes = NativeModules.Aes
import base64 from 'react-native-base64'

import AGSMapView from '../../AGSMapView';
import ApiThuaDat from '../config/utilities/api/ApiThuaDat';
import { KeyboardAvoidingView } from 'react-native';
import Loader from './Loader';
import APILogin from '../config/utilities/api/APILogin';
const key = "U29OaGFhamxrdW9pbjEyODVzZGZqazlMb25nVGhhbmg=" // in base64 format
const iv = "SVZzZGZzZGZnZGY0ODdMVA=="
   // in base 64 format
const keysize128 = "128" 
const keysize256 = "256"

const generateKey = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length)
 
const encryptData = (text, key) => {
         return Aes.encrypt(text, "SoNhaajlkuoin1285sdfjk9LongThanh", "IVsdfsdfgdf487LT").then(cipher => ({
            cipher,
            iv:"IVsdfsdfgdf487LT",
        }))
    
}
const encryptDataIV = (text, key, iv) => {
  return Aes.encrypt(text, key, iv).then((cipher) => ({
    cipher,
    iv,
  }))      
}
var LAYERS = [
  {
    type: 'ArcGISTiledMapServiceLayer',
    urlQuyHoach: 'https://datdai.stnmt.dongnai.gov.vn:8443/arcgisdichvu/rest/services/DOTHIBIENHOA/PhanKhu_keyTTCNTT/MapServer',
    //urlRanhThua: 'https://datdai.stnmt.dongnai.gov.vn:8443/arcgisdichvu/rest/services/DOTHIBIENHOA/keyTTCNTT/MapServer/0',
    urlRanhThua: 'https://datdai.stnmt.dongnai.gov.vn:8443/arcgisdichvu/rest/services/DOTHIBIENHOA/PhanKhu_keyTTCNTT/MapServer',
    username:'dothibienhoa',
    password:'14657892',
    usernameNen:'atlas',
    passwordNen:'BandoNenDongnai@'

  },
  {
    type: 'ArcGISFeatureLayer',
    url: 'https://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/MTBENCHMARK2DATA2/FeatureServer/0'
  }
];

const DATATEST=[
  {"DienTich": "381.8", "LoaiDat": "ONT", "MaMau": "#FFD0FF", "Ten": "Đất ở tại nông thôn"},
  {"DienTich": "381.8", "LoaiDat": "ONT", "MaMau": "#FFD0FF", "Ten": "Đất ở"}

]
const decryptData = () =>
{
  return Aes.decrypt("VggbBZsIdHAKCb0Q/4Gkxg==","bd02a8dec7127aa30a94e9e9110585328962b260b95bab88b11bb5bc975cf5d0", "IVsdfsdfgdf487LT")
} 
//Create dataStorage
const saveDataToStorage = (name, data) => {
  AsyncStorage.setItem(
    name,
    JSON.stringify({
      data,
    }),
  );
};

const  getDataToStorage = async(name) => {
   return await AsyncStorage.getItem(name);
};

const MapMain =(props)=> {
  props.navigation.addListener('focus',()=> {
    console.log('nghias')
    console.log(props.route.params)
    if(props.route.params!=undefined){
       //ChonMaKVHC(props.route.params.Kvhc)
    }
  });

  const [animation,setanimation]=useState(new Animated.Value(0));
  const [Thua,setThua]=useState(0);
  const [To,setTo]=useState(0);
  const [IsOpen,setIsOpen]=useState(false);
  const [IsOpenChiTiet,setIsOpenChiTiet]=useState(false);
  const [IsOpenXa,setIsOpenXa]=useState(false);
  const [IDSelect,setIDSelect]=useState('26380');
  const [dataKVHC,setdataKVHC]=useState([]);

  const [IsLoading,setIsLoading]=useState(false);
  const sde = useSelector((state) => state.sde);

  const [maKVHCCon,setmaKVHCCon]=useState(26380);
  const [IsVeTinh,setIsVeTinh]=useState(true);
  

  const RefAnimationModal=useRef(null);

  const [tenKVHC,settenKVHC]=useState("Long Hưng");
  const [dataQH,setdataQH]=useState([]);
  const [dataQHtemp,setdataQHtemp]=useState(
    {"DanSo": "", "DienTich": null, "DienTichVungQuyHoach": "13,6", "IDQH": null, "LOCHUCNANG": "", "LoaiDat": null, "MaMau": null, "MatDoXD": "25", "OPho": "", "PhapLy": "Quyết định số 2916/QĐ-UBND ngày 12 tháng 9 năm 2016 của UBND tỉnh phê duyệt phân khu tỷ lệ 1/5000 phân khu C4 theo quy hoạch chung thành phố Biên Hòa", "TANGCAOXD": "", "TEN_CTQH": "ĐẤT Ở THẤP TẦNG ( OTT )", "Ten": null, "VungQH": ""}
  );

  const [dataToThua,setdataToThua]=useState({});
  const user = useSelector((state) => state.auth.user);

  const [tempSearch,setTempSearch]=useState([]);
  const [IsFirstAPP, setIsFirstAPP] = useState(false);
  const refdataToThua=useRef({
    SoTo:"0",
    SoThua:"0",
    DienTich:"0"
  })

  const [Login5lan,setLogin5lan]=useState(0);

  //Giao DIen 
  const [IsScroll,setIsScroll]=useState(false);
  const dispatch = useDispatch();
  const ISFIRSTAPP= ()=>{
    dispatch(LoadingFristAction())

    }
    useEffect(()=>{
      APILogin.GETBANDO().then(req=>{
        setdataKVHC(ApiGeneral.GetKVHC_Con(731).filter(n=>req.includes(n.maKvhc)))

      }).catch(err=>{
        
      })

      { Platform.OS=="android"&&DeviceEventEmitter.addListener("dataToThua",event=>{
        if(parseInt(event.SoTo)!=0&&parseInt(event.SoThua)!=0)
        {
         if(event.SoTo!=refdataToThua.current.SoTo&&event.SoThua!=refdataToThua.current.SoThua)
         {
           // console.log(parseInt(event.SoTo))
           // console.log(PaseeJSON.SoTo)
           // console.log(event)
            console.log('Ket qua event*******: '+ JSON.stringify(event))   
            setdataToThua(JSON.parse(event))
            refdataToThua.current=JSON.parse(event)
          //  sheetRef.current!=null&&sheetRef.current.snapTo(1)
         }
    
       }
  })
  }
  
  
          getDataToStorage("dataSearch").then(req=>{
                if(req!=null||req!=undefined)
                {
                  const data=JSON.parse(req).data
                  setTempSearch(data)
                } 
            }
          )
      
          
          ISFIRSTAPP();
          //props.navigation.navigate("Login");
  
    },[])
  
    useEffect(()=>{
  
       console.log(props.route.params)
      if(props.route.params!=undefined)
      {      
  
        const data= dataKVHC.filter(n=>n.maKvhc==props.route.params.ID);
  
        if(data.length>0)
        {
          if(maKVHCCon!=props.route.params.ID)
          {
           ChonMaKVHC(data[0])
           setmaKVHCCon(props.route.params.ID)
           if(Platform.OS=='android'){
            this.MapRef.TruyenMaXa_ToNative({xa:Platform.OS=='android'?props.route.params.ID:parseInt(props.route.params.ID)})
  
           }
           else{
            this.MapRef.TruyenMaXa_ToNative(parseInt(props.route.params.ID))
  
           }
        
        }
        }
      }
    })
  

    //Header Animation
    let scrollY = new Animated.Value(0);
    //Tương tác với native
    const update = async e => {
      console.log("lấy tờ thửa native")
      console.log(e)
      console.log(To)
      console.log(Thua)
      console.log("==========")
  
      const data={
        SoTo:e.dataToThua[0].SoTo,
        SoThua:e.dataToThua[0].SoThua,
        DienTich:"0"
      }
      console.log(data)
      setdataToThua(data)
      refdataToThua.current=data
    }
    const updateNativeMap = async(SoTo,SoThua) => {
      if(Platform.OS=='ios1')
      {
        this.MapRef.TruyenSoToSoThua_ToNative(SoTo,SoThua)
        //this._panel.hide()
              this._panel.show(0)
  
      }
      else{
        setIsLoading(true)
  
        var encryptStr= Encrypt(sde.KeyTime+(Math.floor(Date.now()/1000)),sde.KeyApp,sde.IVApp)
          console.log('vao ham tim kiem')
          let dataTD={
            SoTo:SoTo,
            SoThua:SoThua,
            MaXa:maKVHCCon,
            MaHuyen:731,
            Token:"",
            MaBuuChinh:encryptStr
          }
  
          var dataMaHoa = {
            data:Encrypt(JSON.stringify(dataTD),sde.KeyApp,sde.IVApp)
    
          }    
              console.log(dataMaHoa)
  
          ApiThuaDat.GETQUYHOACH(dataMaHoa,2).then(res=>{
          
            var data = JSON.parse(Decrypt(res.data,sde.KeyApp,sde.IVApp))
           
            if(data!=null&&data!=undefined)
            {
              if(data.KetQua)
                {
                  setdataQH(data.Data.QuyHoach)
                  var dataToThuaAPI={
                    SoTo:data.Data.SoTo,
                    SoThua:data.Data.SoThua,
                    DienTich:data.Data.DienTich
    
                  } 
                  refdataToThua.current=dataToThuaAPI
               if(Platform.OS=='android')
               {
                this.MapRef.DrawGeoJSONRing({Ring:JSON.stringify(data.Data.geojson)})
  
               }
               else{
                this.MapRef.DrawGeoJSONRing(JSON.stringify(data.Data.geojson))
               }
              
  
                    setIsOpen(true)
                }
                else{
                  console.log(data)
                  if(Platform.OS=="android")
                  {
                    ToastAndroid.showWithGravity(
                      "Lỗi lấy dữ liệu từ server",
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER
                    );
  
                    
      
    
                    
                  }
                }
             setIsLoading(false)
             
              
            }
            else{
              setIsLoading(false)
  
            }
           }).catch()
  
      
  
  
     
  
      
    };
  }  
  const LayToThua=(textSeaerch)=>{
    Keyboard.dismiss() 
    var ConvertChuoi =textSeaerch.split(' ').join(',').split('-').join(',').split('/').join(',').split('.').join(',').split(',').join(',').split(',')

    if(ConvertChuoi.length>1)
    {
      getDataToStorage("dataSearch").then(req=>{
        console.log(req)
        if(req==null||req==undefined)
        {
          const data=[]
          data.push(textSeaerch)
          setTempSearch(data)
          saveDataToStorage("dataSearch",data)
        }
        else{
          let CheckExists=false
          const data=JSON.parse(req).data;
          data.map((v,i)=>{
            if(v==textSeaerch)
            {
              CheckExists=true
            }
          })
          if(CheckExists==false)
          {
            data.push(textSeaerch)
            saveDataToStorage("dataSearch",data)
          }
          setTempSearch(data)

        }
     })


     if(!isNaN(parseInt(ConvertChuoi[1]))&&!isNaN(parseInt(ConvertChuoi[0])))
     {
      updateNativeMap(parseInt(ConvertChuoi[0]),parseInt(ConvertChuoi[1]))
     }
     else{
      Alert.alert("Nhập không đúng định dạng")
     }
    }
    else{
      Alert.alert("Nhập không đúng định dạng")
    }
    
  }
  //Component
  const _ItemKhuVuc=({item})=>{
    var arrTen=item.ten.split(" ")
    return(
      <>
      <ListItem onPress={()=>ChonMaKVHC(item)}>
        <Ionicons name="location" color={theme.colors.Primary} size={RFValue(20,600)}  />
          <ListItem.Content>
          <ListItem.Title>{item.ten.substr(arrTen[0].length,item.ten.length).trim()}</ListItem.Title>
            <ListItem.Subtitle>{arrTen[0]}</ListItem.Subtitle>
          </ListItem.Content>
      </ListItem>
      </>
    )
  }


  const ChonMaKVHC=async(data)=>{


    if(data!=undefined)
    {
      //this.ScrollChonKhuVuc.scrollTo({x: 0, y: 0, animated: true}) 
      var arrTen=data.ten.split(" ")
      settenKVHC(data.ten)
      console.log(data.maKvhc)
      setmaKVHCCon(data.maKvhc)
      
      setIsScroll(false)
    }

  }
  const ItemQH=({item})=>{
    console.log(item)
    return(
      <>
      <TouchableOpacity 
      onPress={()=>GetChiTiet(item.IDQH)}
      style={{flexDirection:'column',margin:10,justifyContent:'center',alignItems:'center',borderWidth:0.5,borderTopLeftRadius:30,borderBottomRightRadius:30,backgroundColor:theme.colors.Primary}}
      >
                  <View style={styles.viewrowQH}>
                      <Text style={styles.textQH}>Chức năng:</Text>
                      <Text style={styles.textvalueQH}>{item.Ten}</Text>
                      {/* <Subheading>Chức năng:</Subheading>
                      <Paragraph>{props.dataQH.tenVungQuyHoach}</Paragraph> */}
                  </View>
                  <View style={styles.viewrowQH}>
                      <Text style={styles.textQH}>Diện tích:</Text>
                      <Text style={styles.textvalueQH}>{item.DienTich!=null?(item.DienTich.length>1?item.DienTich+' m²':''):''} </Text>
                  </View>
                  {
                   !IsHideChiTiet(item)&&
                    <View style={{flex:1,height:20,bottom:0,right:8,flexDirection:'row',position:'absolute',justifyContent:'flex-end',alignItems:'flex-end'}}>
                    <View style={{flexDirection:'row',borderWidth:1,backgroundColor:theme.colors.white,paddingHorizontal:5,borderColor:theme.colors.Primary,borderRadius:30}}>
                          <MaterialIcons name={'remove-red-eye'} color={theme.colors.blue} size={18}></MaterialIcons>
                          <Text style={{marginLeft:5,color:theme.colors.blue}}>Chi tiết</Text>
                    </View>
                    </View>

                  }
      </TouchableOpacity>
      </>
    )
  }

const GetChiTiet=(ID)=>{
  var encryptStr= Encrypt(sde.KeyTime+(Math.floor(Date.now()/1000)),sde.KeyApp,sde.IVApp)

    let dataTD={
      SoTo:ID,
      SoThua:"",
      MaXa:maKVHCCon,
      MaHuyen:731,
      MaBuuChinh:encryptStr
    }
    console.log(dataTD)
    var dataMaHoa = {
      data:Encrypt(JSON.stringify(dataTD),sde.KeyApp,sde.IVApp)

    }

    console.log(dataMaHoa)
    ApiThuaDat.GETQUYHOACHCHITIET(dataMaHoa,user.token).then(res=>{
    //console.log(res.status)
    
      var data = JSON.parse(Decrypt(res.data,sde.KeyApp,sde.IVApp))
      console.log(data)
      if(data!=null&&data!=undefined)
      {
        if(data.KetQua)
          {
            setdataQHtemp(data.Data)
            setIsOpenChiTiet(true)
          }
          else{
            if(Platform.OS=="android")
            {
              ToastAndroid.showWithGravity(
                "Không tìm thấy thông tin thửa đất",
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

  const GetDataQH=useMemo(()=>{
    setdataQH([])
    if(dataToThua.SoTo!=0&&dataToThua.SoThua!=0&&Object.keys(dataToThua).length!=0)
    {
  
    setIsLoading(true)
    var encryptStr= Encrypt(sde.KeyTime+(Math.floor(Date.now()/1000)),sde.KeyApp,sde.IVApp)
      console.log(encryptStr)
      let dataTD={
        SoTo:dataToThua.SoTo,
        SoThua:dataToThua.SoThua,
        MaXa:maKVHCCon,
        MaHuyen:731,
        MaBuuChinh:encryptStr
      }
      console.log(dataTD)
      var dataMaHoa = {
        data:Encrypt(JSON.stringify(dataTD),sde.KeyApp,sde.IVApp)

      }

      console.log(dataMaHoa)
      ApiThuaDat.GETQUYHOACH(dataMaHoa,1).then(res=>{
      //console.log(res.status)
      
        var data = JSON.parse(Decrypt(res.data,sde.KeyApp,sde.IVApp))
        console.log(data)
        if(data!=null&&data!=undefined)
        {
          if(data.KetQua)
            {
              setdataQH(data.Data.QuyHoach)
              var dataToThuaAPI={
                SoTo:data.Data.SoTo,
                SoThua:data.Data.SoThua,
                DienTich:data.Data.DienTich

              } 
              refdataToThua.current=dataToThuaAPI
              if(Platform.OS=='android')
              {
               this.MapRef.DrawGeoJSONRing({Ring:JSON.stringify(data.Data.geojson)})
 
              }
              else{
               this.MapRef.DrawGeoJSONRing(JSON.stringify(data.Data.geojson))
              }
                              setIsOpen(true)
            }
            else{
              refdataToThua.current= {
                SoTo:"0",
                SoThua:"0",
                DienTich:"0"
              }
              if(Platform.OS=="android")
              {
               

              
                ToastAndroid.showWithGravity(
                  "Không tìm thấy thông tin thửa đất",
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );

             
              }
              else{
                alert("Không tìm thấy thông tin thửa đất")
              }
            }
         setIsLoading(false)
        }
        else{
          setIsLoading(false)

          if(Platform.OS=="android")
          {
           

          
            ToastAndroid.showWithGravity(
              "Không tìm thấy thông tin thửa đất",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );

         
          }
          else{
            alert("Không tìm thấy thông tin thửa đất")
          }

        }
       
        }).catch(err=>{
          setIsLoading(false)
          refdataToThua.current= {
            SoTo:"0",
            SoThua:"0",
            DienTich:"0"
          }

         
          if(Platform.OS=="android")
          {
        
            ToastAndroid.showWithGravity(
              "Lỗi truy cập máy chủ",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
         
          }
          else{
            alert("Không tìm thấy thông tin thửa đất")
          }
          console.log(err)
        })
   
  }
  },[dataToThua])

  const ChangeMap=()=>{

      if(IsVeTinh)
      {
        if(Platform.OS=='ios')
        {
        this.MapRef.TruyenIDMap_ToNative(3)
        }
        if(Platform.OS=='android')
        {
          ChucNangBanDo("IMAGERY")
        }
      }
      else{
        if(Platform.OS=='ios')
        {
        this.MapRef.TruyenIDMap_ToNative(0);
        }
        if(Platform.OS=='android')
        {
           ChucNangBanDo("ROAD")
        }
      }

    
     setIsVeTinh(!IsVeTinh);



  }

  const GetLocation=async()=>{
   // NativeModules.MapArcgisViewModule.setCenterWGS84(10.935700,106.800939);
//setIsOpen(true)
    try {

      if(Platform.OS=='ios')
      {
        this.MapRef.TruyenLocation_ToNative();
      }
 
      if(Platform.OS=='android')
      {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "ACCESS_FINE_LOCATION",
          message:
            "Vui lòng bật định vị ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      
        this.MapRef.ChucNangMoRong({Type:"LOCATION"})

        }
        else{
          Alert.alert("Lỗi")
        }
      } 
      else {
        console.log("ACCESS_FINE_LOCATION permission denied");
      }
    
    


    } catch (err) {
      console.warn(err);
    }

    

  }
  const ChucNangBanDo=(name)=>{
    this.MapRef.ChucNangMoRong({Type:name})
}
const IsHideChiTiet=(item)=>{
 console.log(item)
 console.log(user)

  if(Object.keys(user).length!=0){
    if(item.LoaiDat=='DGT'||item.LoaiDat=='DHT'||item.LoaiDat=='DKV'||item.LoaiDat=='SON')
    {
      return true
    }
    
    return false
  }
  else{
    return true

  }
  
}

const closeModal = () =>  {
  RefAnimationModal.current.fadeOutDown().then(endState=>{
    if(endState.finished)
    {
      setIsOpen(false)

    }
  })
}
const ItemKhuVuc=({item})=>{
  var arrTen=item.ten.split(" ")
  return(
    <>
    <TouchableOpacity onPress={()=>CHONXA(item)} style={{margin:10,flexDirection:'row',flex:1}}>
    <MaterialCommunityIcons name="map-marker" style={{marginHorizontal:5}} color={IDSelect==item.maKvhc?theme.colors.Primary:theme.colors.black} size={20}  />

      {/* <ListItem.RowItem title={arrTen[0]} noidung={item.ten.substr(arrTen[0].length,item.ten.length).trim()} /> */}
        <Text style={[theme.fonts.textBodyCard,{color:IDSelect==item.maKvhc?theme.colors.Primary:theme.colors.black}]}>{item.ten.trim()}</Text>
    </TouchableOpacity>
    </>
  )
} 
const CHONXA=(item)=>{
  setIsOpenXa(false)
  setIDSelect(item.maKvhc)

    const data= dataKVHC.filter(n=>n.maKvhc==item.maKvhc);

    if(data.length>0)
    {
      if(maKVHCCon!=item.maKvhc)
      {
       ChonMaKVHC(data[0])
       setmaKVHCCon(item.maKvhc)
       if(Platform.OS=='android'){
        this.MapRef.TruyenMaXa_ToNative({xa:Platform.OS=='android'?item.maKvhc:parseInt(item.maKvhcD)})
       }
       else{
        this.MapRef.TruyenMaXa_ToNative(parseInt(item.maKvhc))

       }
    
    }
    }
  
}
const OpenLogin=()=>{
  setLogin5lan(Login5lan+1)
  if(Login5lan>=5)
  {
    props.navigation.navigate("Login")

  }
}

    return (
      <SafeAreaView style={{flex:1,backgroundColor:theme.colors.white}}>
      <BackgroundCurve style={styles.svg} />
      <Header  scrollPoint={scrollY} navigation={props.navigation} ChonKVHC={()=>setIsOpenXa(true)} tenKVHC={tenKVHC} LayToThua={LayToThua} products={tempSearch}></Header>
      
          {/* MapArcgis */}
      <ScrollView style={{flex:1}} horizontal={true} pagingEnabled={true}  scrollEnabled={IsScroll}  >
          <View style={{flex:1,width:width,marginTop:35}}>
         
              {IsLoading&&<Loader close={()=>setIsLoading(false)}/>}
            <AGSMapView ref={e=>this.MapRef=e}  onUpdate={update} layers={LAYERS}  MaXa={parseInt(26380)}/>
          <TouchableOpacity style={{width:RFValue(25,600),height:RFValue(25,600),bottom:RFValue(30,600),right:RFValue(10,600),position:'absolute'}}  onPress={GetLocation}>
               <MaterialIcons
                  size={RFValue(25,600)}
                  name="my-location"
                  color={'#3EA9F4'}
                  style={{
                  }}>
                </MaterialIcons>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=>ChucNangBanDo("MEASUREMENT")} style={{width:RFValue(25,600),height:RFValue(25,600),bottom:RFValue(110,600),right:RFValue(10,600),position:'absolute'}}>
               <Entypo
                    size={30}
                    name="ruler"
                    color={'#3EA9F4'}
                    style={{
                    }}>
                  </Entypo>
                  </TouchableOpacity> */}
            <TouchableOpacity style={{width:RFValue(25,600),height:RFValue(25,600),bottom:RFValue(70,600),right:RFValue(10,600),position:'absolute'}}  onPress={ChangeMap}>
               <MaterialIcons
                  size={RFValue(25,600)}
                  name="satellite"
                  color={'#3EA9F4'}
                  style={{
                  }}>
                </MaterialIcons>
            </TouchableOpacity>

            {/* <TouchableOpacity style={{width:RFValue(25,600),height:RFValue(25,600),bottom:RFValue(150,600),right:RFValue(10,600),position:'absolute'}}  onPress={()=>ChucNangBanDo("FULLMAP")}>
               <MaterialIcons
                  size={RFValue(25,600)}
                  name="fullscreen"
                  color={'#3EA9F4'}
                  style={{
                  }}>
                </MaterialIcons>
            </TouchableOpacity> */}


           
  {IsOpen&&
        <TouchableWithoutFeedback>

      <Animatable.View ref={RefAnimationModal} animation={"fadeInUp"} style={{bottom:0,width:theme.sizes.width,backgroundColor:theme.colors.white,height:theme.sizes.height/2,position:'absolute',borderTopLeftRadius:theme.sizes.radius,borderTopRightRadius:theme.sizes.radius}}>
                                   
                                   <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "position" : "height"}>
               <SafeAreaView style={{width:theme.sizes.width,height:theme.sizes.height/2,backgroundColor:theme.colors.white,borderTopLeftRadius:theme.sizes.radius,borderTopRightRadius:theme.sizes.radius}} >
        
                <View style={{marginHorizontal:5}}>
                <Text style={{justifyContent:'center',alignItems:'center' , fontSize:RFValue(14,600),color:theme.colors.black,fontWeight:'bold'}}>Thông tin quy hoạch đô thị ({dataQH.length})</Text>
                </View>
                <View style={{marginHorizontal:5}}>
                <Text style={{color:theme.colors.red}}>Lưu ý: Thông tin quy hoạch này chỉ mang tính chất tham khảo</Text>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:width}}>

                <TouchableOpacity onPress={()=>ChucNangBanDo("LINKGOOGLE")} style={styles.viewCol}>
                  <FontAwesome5 color={theme.colors.Primary} name='directions' size={30}/>
                </TouchableOpacity>

                <View style={styles.viewCol}>
                <Text style={styles.textValue}>{refdataToThua.current.SoTo}</Text>
                <Text style={styles.textTitle}>Số Tờ</Text>
                </View>

                <View style={styles.viewCol} >
                <Text style={styles.textValue}>{refdataToThua.current.SoThua}</Text>
                <Text style={styles.textTitle}>Số Thửa</Text>
                </View>

                <View style={styles.viewCol} >
                <Text style={styles.textValue}>{parseFloat(refdataToThua.current.DienTich).toFixed(1)} </Text>
                <Text style={styles.textTitle}>Diện Tích (m²)</Text>
                </View>
                </View>

                </View>
                <FlatList 

               data={dataQH} 
               keyExtractor = { (item, index) =>index.toString() }
               renderItem={ItemQH}/>   
                                   <MaterialCommunityIcons onPress={()=>closeModal()} style={{backgroundColor:theme.colors.white,position:'absolute',alignSelf:'flex-end',justifyContent:'flex-end',bottom:0}} size={40} color={theme.colors.red} name="close-box"/>

              </SafeAreaView>
              </KeyboardAvoidingView>
      </Animatable.View>
      </TouchableWithoutFeedback>
}
      <ModalRN isVisible={IsOpenChiTiet} backdropOpacity={false} style={{justifyContent:'flex-end',alignItems:'center',bottom:0,margin:10}} onBackdropPress={()=>setIsOpenChiTiet(false)}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "position" : "height"}>
               <SafeAreaView style={{width:theme.sizes.width,height:theme.sizes.height/2,backgroundColor:theme.colors.white,borderTopLeftRadius:theme.sizes.radius,borderTopRightRadius:theme.sizes.radius,padding:10}} >
               
               <Text style={{color:theme.colors.blue}}>{dataQHtemp.PhapLy}</Text>

                    <ScrollView>

                   
                    <View style={[styles.viewrowQH,{backgroundColor:theme.colors.Primary,padding:8,borderRadius:8}]}>
                    <Text style={styles.textQH}>Chức năng:</Text>
                    <Text style={styles.textvalueQH}>{dataQHtemp.VungQH}</Text>
            
                </View>
              
                {/* <View style={{flex:1,height:20}}>
                  <Text style={{color:theme.colors.Primary}}>Thuộc lô chức năng</Text>
                </View>      */}
               <View style={[styles.viewrowQH,{backgroundColor:theme.colors.Primary,padding:8,borderRadius:8}]}>
                    <Text style={styles.textQH}>Lô đất:</Text>
                    <Text style={styles.textvalueQH}>{dataQHtemp.LOCHUCNANG}</Text>
                </View>
                <View style={[styles.viewrowQH,{backgroundColor:theme.colors.Primary,padding:8,borderRadius:8}]}>
                    <Text style={styles.textQH}>Ô phố:</Text>
                    <Text style={styles.textvalueQH}>{dataQHtemp.OPho}</Text>
                </View>

                <View style={[styles.viewrowQH,{backgroundColor:theme.colors.Primary,padding:8,borderRadius:8}]}>
                    <Text style={styles.textQH}>Diện tích:</Text>
                    <Text style={styles.textvalueQH}>{dataQHtemp.DienTichVungQuyHoach!=null?(dataQHtemp.DienTichVungQuyHoach.length>1?dataQHtemp.DienTichVungQuyHoach+' ha':''):''}</Text>
                </View>

                <View style={[styles.viewrowQH,{backgroundColor:theme.colors.Primary,padding:8,borderRadius:8}]}>
                    <Text style={styles.textQH}>Tằng cao XD:</Text>
                    <Text style={styles.textvalueQH}>{dataQHtemp.TANGCAOXD}</Text>
                </View>
                <View style={[styles.viewrowQH,{backgroundColor:theme.colors.Primary,padding:8,borderRadius:8}]}>
                    <Text style={styles.textQH}>Mật độ XD:</Text>
                    <Text style={styles.textvalueQH}>{dataQHtemp.MatDoXD}</Text>
                </View>
                <View style={[styles.viewrowQH,{backgroundColor:theme.colors.Primary,padding:8,borderRadius:8}]}>
                    <Text style={styles.textQH}>Dân số:</Text>
                    <Text style={styles.textvalueQH}>{dataQHtemp.DanSo.length>1?dataQHtemp.DanSo+' người':''} </Text>
                </View> 
                <View style={[styles.viewrowQH,{backgroundColor:theme.colors.Primary,padding:8,borderRadius:8}]}>
                    <Text style={styles.textQH}>Công Trình:</Text>
                    <Text style={styles.textvalueQH}>{dataQHtemp.TEN_CTQH}</Text>
            
                </View>
                </ScrollView>
                <MaterialCommunityIcons onPress={()=>setIsOpenChiTiet(false)} style={{backgroundColor:theme.colors.white,position:'absolute',alignSelf:'flex-end',justifyContent:'flex-end',bottom:0}} size={40} color={theme.colors.red} name="close-box"/>

              </SafeAreaView>
              </KeyboardAvoidingView>
      </ModalRN>
     
      </View>
      <View style={{flex:1,width:width}}>
      <FlatList 
               data={dataKVHC} 
               keyExtractor = { (item, index) => index.toString() }
               renderItem={_ItemKhuVuc}/>
      </View>
  
      </ScrollView>
      <ModalRN isVisible={IsOpenXa} backdropOpacity={false} style={{justifyContent:'flex-end',alignItems:'center',bottom:0,margin:0}} onBackdropPress={()=>setIsOpenChiTiet(false)}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "position" : "height"}>
                 <SafeAreaView style={{width:theme.sizes.width,height:theme.sizes.height-35,backgroundColor:theme.colors.white,borderTopLeftRadius:theme.sizes.radius,borderTopRightRadius:theme.sizes.radius,padding:0}} >
                 <View style={{justifyContent:'center',alignItems:'center',padding:5,borderTopLeftRadius:theme.sizes.radius,borderTopRightRadius:theme.sizes.radius,backgroundColor:theme.colors.Primary }}>
                      <Text style={{color:theme.colors.white,fontWeight:'bold'}}>XÃ/PHƯỜNG</Text>
            </View>
                 <FlatList contentContainerStyle={{flex:1,borderWidth:2,borderColor:theme.colors.Primary}}
                 data={dataKVHC.filter(n=>n.maKvhcCha=="731")} 
                 numColumns={2}
                 keyExtractor = { (item, index) => index.toString() }
                 renderItem={ItemKhuVuc}/>
                  <MaterialCommunityIcons onPress={()=>setIsOpenXa(false)} style={{backgroundColor:theme.colors.white,position:'absolute',alignSelf:'flex-end',justifyContent:'flex-end',bottom:0}} size={40} color={theme.colors.red} name="close-box"/>

                </SafeAreaView>
                </KeyboardAvoidingView>
        </ModalRN>
    </SafeAreaView>
    );
}


export default MapMain;
const styles = StyleSheet.create({
  wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
    ReloadMap:{
      position:'absolute',justifyContent:'center',
      alignItems:'center',
      top:100
    },
    containerPannal: {
      height: height-200,
      
      backgroundColor: theme.colors.light ,
      //alignItems: 'center',
     // justifyContent: 'center'
    },
  
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      marginHorizontal: 20,
    },
    svg: {
      position: 'absolute',
      width: Dimensions.get('window').width,
    },
    container: {
      backgroundColor: '#fff',
      margin: 10,
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 12,
      marginTop: 25,
      // shadow
      shadowColor: '#222',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },
    panelHeader: {
      height: 120,
      backgroundColor: '#b197fc',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerText: {
      color: '#828595',
      fontSize: 16,
      fontWeight: 'bold',
    },
    inputSearchContainer: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      // paddingHorizontal: 10,
      borderRadius: 25,
    },
    inputSearch: {
      padding: 12,
      fontSize: 16,
      fontWeight: '500',
      color: 'gray',
      //flex: 1,
    },
    buttonSearch: {
      shadowColor: '#222',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 12,
      backgroundColor: '#fff',
      padding: 13,
      borderRadius: 30,
      aspectRatio: 1,
    },
    dragHandler:{
      flexDirection:'row',
      backgroundColor:theme.colors.Primary
      ,justifyContent:'center'
      ,height:50
    },
    textTitle:{
      fontSize:RFValue(12,600),
      //color:theme.colors.gray
  
    },
    textValue:{
      fontSize:RFValue(16,600),
      fontWeight:'bold',
      color:theme.colors.Primary,
      marginTop:RFValue(10,600)  
  
    },
  
    viewCol:{
      //flex:1,
      padding:10,
      alignItems:'center'
    },
    viewrowQH:{
      flexDirection:'row',marginVertical:5,paddingLeft:10
    },
    textQH:{
      fontSize:RFValue(12,600),
      fontWeight:'bold',
      color:theme.colors.white,
      flex:0.4
  
    },
    textvalueQH:{
      fontSize:RFValue(12,600),
      color:theme.colors.white,
      marginLeft:5,
      flex:0.6,
  
    },
    containerFloatButton:{
      position:'absolute',
      alignItems: 'center',
     bottom:RFValue(100,600),right:RFValue(100,600)
  
    },
    FloatButton:{
     position:'absolute',
      width:60,
      height:60,
      borderRadius:30,
      shadowColor:"#F02A4b",
      shadowOpacity:0.3,
      shadowOffset:{height:10},
      justifyContent:'center',
      alignItems:'center',
  
     //bottom:RFValue(100,600),right:RFValue(100,600)
    },
    menuButton:{
      backgroundColor:theme.colors.red
    },
    secondary:{
      width:48,
      height:48,
      borderRadius:24,
      backgroundColor:theme.colors.white
    }
    
  })