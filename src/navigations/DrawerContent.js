import React, { useState, useEffect } from 'react';
import { View, StyleSheet,Alert,NativeModules, Platform } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { LogoutAction  } from "../reducer/auth/authActions";
import * as theme from '../config/constants/theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//Redux
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { Divider } from 'react-native-paper';
import ApiGeneral from '../config/utilities/api/ApiGeneral';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetKeyStore } from '../reducer/sde/sdeAction';
import APILogin from '../config/utilities/api/APILogin';
import AsyncStorage from '@react-native-community/async-storage'

const saveDataToStorage = (name, data) => {
  AsyncStorage.setItem(
    name,
    JSON.stringify({
      data,
    }),
  );
};
const DrawerContent=(props)=> {
    const user = useSelector((state) => state.auth.user);
    const [dataKVHC,setdataKVHC]=useState([]);
    const [dataKVHCCon,setdataKVHCCon]=useState([]);

    const [IsHuyen,setIsHuyen]=useState(true);

    useEffect(()=>{
      if(Platform.OS=='android')
      {
        NativeModules.MapArcgisViewModule.GetAPI((eventId) => {
          dispatch(GetKeyStore("","utwj^{.B[B2Mh^OpNRxvRHYYgUKt(622","K0C<:>91=2.yH&52","+=bk+NwvT56QE~qa*18D2$Blm]UXXgff",eventId,"","","GBXY1XLO1@q-","","","",""))
        })
      }
      else{
          dispatch(GetKeyStore("","utwj^{.B[B2Mh^OpNRxvRHYYgUKt(622","K0C<:>91=2.yH&52","+=bk+NwvT56QE~qa*18D2$Blm]UXXgff","hguZ1vs1217Yz1j3","","","GBXY1XLO1@q-","","","",""))
        
      }
  
        LoadKVHCCon(731)
         
    },[])

    const LoadKVHCCon=(ID)=>{

      APILogin.GETBANDO().then(req=>{
        setdataKVHCCon(ApiGeneral.GetKVHC_Con(ID).filter(n=>req.includes(n.maKvhc)))
        setIsHuyen(false)
      }).catch(err=>{
        setdataKVHCCon(ApiGeneral.GetKVHC_Con(ID))
        setIsHuyen(false)
      })
      
    }
    const dispatch = useDispatch();
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
            props.navigation.navigate("Login");
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
            props.navigation.navigate("Login");
          },
        },
      ]);
    };

    
    const { state, ...rest } = props;
    const newState = { ...state };

  //  const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(
        <SafeAreaView style={{flex:1,marginTop:30}}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                         <View style={{flexDirection:'row'}}>
                            {Object.keys(user).length === 0 ?
                            (
                            <TouchableOpacity    onPress={() => {props.navigation.navigate('Login')}}> 
                            <Avatar.Image source={require("../assets/images/defaultprofile.jpg")} size={50}/>
                             </TouchableOpacity>
                            ):(
                            <Avatar.Image source={require("../assets/images/Logo.png")}size={50} style={{backgroundColor:theme.colors.white}}/>)}
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                            {Object.keys(user).length === 0?
                                    <View style={{borderWidth:1,borderRadius:20,padding:2,borderColor:theme.colors.Primary,backgroundColor:theme.colors.Primary}}>
                                    <TouchableOpacity onPress={() => {props.navigation.navigate('Login')}}>
                                 <Title style={[styles.title,{color:theme.colors.white}]}>Đăng Nhập</Title>
                                 </TouchableOpacity>
                                </View>
                                 :
                                  <><Title style={styles.title}>{user.email}</Title>
                                  </>
                              }
                            </View>
                        </View> 


                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>Version:</Paragraph>
                                <Caption style={styles.caption}>1.6</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>Update:</Paragraph>
                                <Caption style={styles.caption}>2023</Caption>
                            </View>
                        </View>
                    </View>
                    <Divider />

                    <Drawer.Section style={styles.drawerSection}>
                     
                            {Object.keys(user).length === 0 ?<></>:
<>
<DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="book" 
                                color={theme.colors.Primary}
                                size={size}
                                />
                            )}
                            label="Hồ Sơ Quy Hoạch"

                            onPress={() => {props.navigation.navigate('HoSoQuyHoach')}}
                        />

<DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                name="clipboard-plus-outline" 
                                color={theme.colors.Primary}
                                size={size}
                                />
                            )}
                            label="Xin Ý Kiến"
                            onPress={() => {props.navigation.navigate('XinYKien')}}/></>
                            }

                    
                  
                    </Drawer.Section>
                    <DrawerContentScrollView   {...props}>




                     {/* <Drawer.Section style={{top:-30}}  title="Khu vực hành chính">
                  
                    
                  
                   

{!IsHuyen&&dataKVHCCon.map((v,i)=>{
                    return(
                        <DrawerItem 
                         key={i.toString()}
                         icon={({color, size}) => (
                        <MaterialCommunityIcons 
                        name="map-marker" 
                        color={color} 
                        size={size} 
                        />
                    )}
                    label={v.ten}
                    onPress={() => {props.navigation.navigate('MapMain',{ID:v.maKvhc})}}

                    />
                    
                    ) 

                    })}
                  </Drawer.Section> */}
                    </DrawerContentScrollView>


                </View>
            {Object.keys(user).length === 0 ? (
        <></>):(
          <>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                   onPress={()=>props.navigation.navigate('DoiMatKhau')}
                    icon={({color, size}) => (
                        <MaterialCommunityIcons 
                        name="key-variant" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Dổi mật khẩu"
                    //onPress={() => {signOut()}}
                />
            </Drawer.Section>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                   onPress={XoaTaiKhoan}
                    icon={({color, size}) => (
                        <MaterialCommunityIcons 
                        name="delete" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Xoá Account"
                    //onPress={() => {signOut()}}
                />
            </Drawer.Section>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                   onPress={Logout}
                    icon={({color, size}) => (
                        <MaterialCommunityIcons 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Đăng Xuất"
                    //onPress={() => {signOut()}}
                />
            </Drawer.Section>
          </>
           )}
        </SafeAreaView>
    );
}

export default DrawerContent

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      
    },
    userInfoSection: {
      paddingLeft: 20,
   //   backgroundColor:theme.colors.Primary
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      marginHorizontal:5
    },
    caption: {
      fontSize: 14,
      marginHorizontal:5,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });