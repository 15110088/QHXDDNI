import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useForm, Controller } from "react-hook-form";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Alert,
  Text,
  Dimensions,
  ImageBackground,
  TextInput
} from "react-native";
import PropTypes from "prop-types";
import { Caption } from 'react-native-paper';
import APILogin from "../config/utilities/api/APILogin";

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



import * as theme from "../config/constants/theme.js";
import renderField from "../screen/components/renderField";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { material } from 'react-native-typography'

//Ultil


//Redux
import { useDispatch, useSelector } from "react-redux";

//Icon
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

//lib3
import {LoginUser} from "../reducer/auth/authActions";
const { height,width } = Dimensions.get("window");
import AsyncStorage from '@react-native-community/async-storage'

import {
  NavigationContainer,
  useIsFocused,useFocusEffect
} from '@react-navigation/native';
import { Encrypt,Decrypt } from "../config/utilities/Tool";
//Validation
const validate = (values) => {
  const errors = {};
  if (!values.email) { 
    errors.email = "Tài khoản không được bỏ trống";
  } 
  // else
  //  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   //errors.email = "Email không hơp lệ";
  // }
  else if (!values.password) {
    errors.password = "Mật khẩu không được bỏ trống";
  } 
  else if (values.password.length < 1) {
    errors.password = "Mật khẩu phải nhiều hơn hoặc bằng 1 ký tự";
  }
  return errors;
};

const LoginForm = (props) => {

  const [showPass, setShowPass] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
 // const { handleSubmit } = props;

  const { register,control, handleSubmit,setValue, formState: { errors } } = useForm();
  const isFocused = useIsFocused();
  const sde = useSelector((state) => state.sde);

  

  const saveDataToStorage = (name, data) => {
    AsyncStorage.setItem(
      name,
      JSON.stringify({
        data,
      }),
    );
  };
  useEffect(()=>{

    AsyncStorage.getItem("user").then(req=>{
      console.log(req)
      if(req==null)
      {    
      }
      else{
        const convert= JSON.parse(req)

        console.log(convert.data.Username)
     
        setValue("username",convert.data.Username)
        setValue("password",convert.data.Password)

      }
    })
  },[])

  useEffect(()=>{
    console.log('dang chon man hinh nay')
    if(isFocused)
          {
            AsyncStorage.getItem("user").then(req=>{
              if(req==null)
              {    
                setValue("username","")
                setValue("password","")
              }
              else{
                const convert= JSON.parse(req)
                console.log(convert.data.UserName)
                setValue("username",convert.data.Username)
                setValue("password","")
              }
            })
      }
},[isFocused])

  const Submit = async (values) => {


    try {
        var dataLogin={
          Username:values.username,
          Password:values.password,
          IMEI:"",
          MaBuuChinh:""

        } 
        var dataMaHoa = {
          data:Encrypt(JSON.stringify(dataLogin),sde.KeyApp,sde.IVApp)

        }
        console.log(dataMaHoa)

         saveDataToStorage('user', dataLogin);
     
        APILogin.Login(dataMaHoa).then(data=>{
          console.log(data.data)
  Decrypt(data.data,sde.KeyApp,sde.IVApp)

var res = JSON.parse(Decrypt(data.data,sde.KeyApp,sde.IVApp))
          console.log(res)
          if(res.KetQua)
          {
             dispatch(LoginUser(values.username,"",res.Token));
             AsyncStorage.getItem("DeleteAccount").then(req=>{
              console.log("===================")

              if(req!=null&&JSON.parse(req).data==values.username)
              {
                Alert.alert("Tài khoản không tồn tại")
                return;
              }
              if(Platform.OS=='ios')
              {
                props.navigation.navigate("MapMain");
  
              }
              else{
                props.navigation.navigate('MapMain')
  
              }
            })

            
          }
          else{
            alert(res.Msg)
          }
         }) 
      } catch (err) {
        alert(err)
  
        console.log(err)
       }
  };
  const SubmitGuest=()=>{
    props.navigation.navigate("MapMain");
   console.log(auth)
    // AsyncStorage.getItem("user").then(req=>{
    //       console.log(req)
    // })
 
    
  }
    
    return (
      <ImageBackground
      style={{ flex: 1, position: "absolute", height:height, width }}
      source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Dn7UQjblDGVdI5Ad-dLGc0JIvJZno6P4TA&usqp=CAU'}}
      blurRadius={10}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "position" : "height"}>
      {!auth.isFirst&&
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("MapMain");
        }}
        style={{ position: "absolute", top: 60, right: 20,zIndex:1 }}
      >
      <Ionicons name="ios-arrow-redo" size={35} color={theme.colors.white} />
      </TouchableOpacity>
      }
           
      <View style={styles.header}>
    
          <View style={{flexDirection:'row',paddingBottom:15,justifyContent:'center'}}> 
         <Image source={require('../assets/images/Logo.png')}   style={{width:70,height:70,borderRadius:35,marginRight:5,backgroundColor:theme.colors.white}}></Image>
         <View style={{justifyContent:'center',marginLeft:5}}>
         <Text style={[material.body2,{fontWeight:'bold',color:theme.colors.white,alignSelf:'center'}]}>QUY HOẠCH XÂY DỰNG</Text>
         <Text style={[material.body2,{fontWeight:'bold',color:theme.colors.white,alignSelf:'center'}]}>TP. BIÊN HÒA</Text>

         </View>

        </View> 
        <View>
          {/* <Text style={[material.headlineWhite,{fontWeight:'bold',color:theme.colors.white,alignSelf:'center'}]}>ĐĂNG NHẬP</Text> */}
        </View>
      </View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: 10,
              zIndex: -1,
            }}
          >
            <View style={{marginHorizontal:20,marginBottom:15}}>
            
            <FontAwesome name="user-circle-o" color={theme.colors.white} size={17} style={{position:'absolute', bottom: 17,left: 15, width: 19, height: 22}}/>

            <Controller

        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
          style={[{fontSize:15,backgroundColor:'transparent',borderBottomWidth:1,borderColor:theme.colors.white,paddingLeft:40,paddingBottom:20,color:theme.colors.white}]}

          onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder='Tài khoản'
            textAlignVertical='center'
            placeholderTextColor={theme.colors.white}
           // underlineColorAndroid={theme.colors.white}
            autoCapitalize='none'
            
           //{...register("username", {required:true})}
           {...register("username", {
            validate: {
             // positive: v => parseInt(v) > 0 || 'should be greater than 0',
            }
          })}
          />
        )}
        rules={{required:true}}
        name="username"
        defaultValue={""}
      />
          


            {/* <Field
                name="email"
                keyboardType="default"
                label="Tài khoản"
                icon="account"
                component={renderField}
                onChangeText={(e)=>setUserName(e)}    
                value={'nghiatt'}  

              />
              <Field
                name="password"
                keyboardType="default"
                label="Mật khẩu"
                component={renderField}
                secureTextEntry={showPass ? false : true}
                passIcon="eye"
                icon="lock"
                showPass={showPass}
                setShowPass={setShowPass}
                onChangeText={(e)=>setPassowrd(e)}  
                value={'123123'}  
    

              /> */}
         
            </View>

            <View style={{marginHorizontal:20,marginBottom:15}}>
            <FontAwesome name="lock" color={theme.colors.white} size={20} style={{position:'absolute', bottom: 20,left: 20, width: 19, height: 22}}/>
        <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder='Mật khẩu'
            autoCapitalize='none'
            secureTextEntry
            style={[{fontSize:15,backgroundColor:'transparent',borderBottomWidth:1,borderColor:theme.colors.white,paddingLeft:40,paddingBottom:20,color:theme.colors.white}]}
           // underlineColorAndroid={theme.colors.white}
            placeholderTextColor={theme.colors.white}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true}}
        defaultValue={""}
      />
              </View>
              <View style={{marginHorizontal:20,marginBottom:15}}>

              {errors.username?.type==="positive" && <Text style={styles.error}>{errors?.username?.message}</Text>}
      {errors.username?.type==="required" && <Text style={styles.error}>Vui lòng nhập tài khoản</Text>}
      {errors.password?.type==="required" && <Text style={styles.error}>Mật khẩu không được để trống</Text>}
      </View>

            <TouchableOpacity onPress={handleSubmit(Submit)} style={{ marginVertical: 10,alignSelf:'center',flex:1,width:width-50 }}>
                 <View style={[styles.signIn,{backgroundColor:'#1f7cee',flex:1}]}>
                  
                  <View style={[styles.circleIcon,{backgroundColor:theme.colors.white,position:'absolute',left:20}]}>
                  <FontAwesome5 size={20} name={'user'} style={{alignItems:'flex-start'}} color={'#1f7cee'}/>
                  </View>
                  <Text style={material.body2White}>Quản lý</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={SubmitGuest} style={{ marginVertical: 10,alignSelf:'center',flex:1,width:width-50 }}>
                 <View style={[styles.signIn,{backgroundColor: theme.colors.white,flex:1}]}>
                  
                  <View style={[styles.circleIcon,{backgroundColor:theme.colors.black2,position:'absolute',left:20}]}>
                  <FontAwesome5 size={20} name={'user-secret'} style={{alignItems:'flex-start'}} color={theme.colors.white}/>
                  </View>
                  <Text style={material.body2}>Khách</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.navigation.navigate('DangKy')} style={{ marginVertical: 10,alignSelf:'center',flex:1,width:width-50 }}>
                 <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
                  
            
                  <Text style={[material.body2White,{fontWeight:'bold',textTransform:'uppercase',color:'#2200cc',textDecorationLine:'underline'}]}>Đăng ký</Text>
                </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

    </KeyboardAvoidingView>
    <View style={{flex:1,alignItems:'center',justifyContent:'flex-end',marginBottom:100}}>
        <View style={{backgroundColor:theme.colors.white,padding:8,borderRadius:20}}>
    
        <View style={{flexDirection:'row',flexWrap:'wrap',marginVertical:5}}>
        <AntDesign name='antdesign'size={15}/>
        <Text style={material.caption}> Người thực hiện:</Text>
        <Text style={[material.caption,{fontWeight:'bold',color:theme.colors.Primary}]}>  Trương Vĩnh Hiệp </Text>
        </View>

        <View style={{flexDirection:'row',flexWrap:'wrap',marginVertical:5}}>
        <Text style={[material.caption,{color:theme.colors.Primary}]}>Trưởng phòng quản lý đô thị Biên Hoà</Text>
        </View>
        <View style={{flexDirection:'row',flexWrap:'wrap',marginVertical:5}}>
          <Ionicons name='location'size={15}/>
          <Text style={material.caption}> D/c:</Text>

          <Text style={[material.caption,{color:theme.colors.Primary}]}> 225 (tầng 7), đường Võ Thị Sáu Khu phố 1,</Text>
        </View>
        <View style={{flexDirection:'row',flexWrap:'wrap',marginVertical:5}}>
        <Text style={[material.caption,{color:theme.colors.Primary}]}>phường Thống Nhất, TP. Biên Hòa - ĐN</Text>
        </View>
        <View style={{flexDirection:'row',flexWrap:'wrap',marginVertical:5}}>
          <MaterialCommunityIcons name='phone'size={15}/>
          <Text style={material.caption}> ĐT:</Text>
          <Text style={[material.caption,{color:theme.colors.Primary}]}>  0251 3822 394</Text>
        </View>
        <View>



        </View>
        </View>
    </View>
   

    </ImageBackground>
    );
  
}

export const Login = reduxForm({
  form: "Login", // a unique identifier for this form
  initialValues:{"email":"nghiatt"},
  validate, // <--- validation function given to redux-form
})(LoginForm);


LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  error:{
    color:theme.colors.red,
  },
  group: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 5,
  },
  header: {
    marginTop: height * 0.08,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  title: {
    color: theme.colors.white,
    fontSize: 40,
    letterSpacing: 5,
    textAlign: "center",
    fontWeight:'bold'
  },
  text: {
    color: "#fff",
  },
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
  },
  textSign: {
    fontSize: 15,
    color: "#fff",
  },
  textSignSmall: {
    color: theme.colors.lighter_green,
    textAlign: "center",
  },
  center: {
    alignItems: "center",
  },
  circleImage: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    padding: 20,
    borderRadius: 55,
    borderStyle: "dashed",
    borderColor: theme.colors.grey,
  },
  circleIcon: {
    width:30,justifyContent:'center',alignItems:'center',height:30,borderRadius:15
  },
  faceid: {
    resizeMode: "contain",
    height: 70,
    width: 70,
  },
  loginOpt: {
    color: theme.colors.lighter_green,
    marginBottom: 10,
  },
});