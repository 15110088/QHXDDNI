
import React, { Component, useState, useEffect } from 'react';
import { View, Text,ScrollView,Image, SafeAreaView,Button,StyleSheet ,Dimensions,TextInput,TouchableOpacity,NativeModules} from 'react-native';

import * as theme from "../../config/constants/theme.js";


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
const {width,height} = Dimensions.get('window')

import { Card, ListItem, Icon } from 'react-native-elements'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useSelector } from 'react-redux';


const CardThongTinQuyHoach=(props)=>{
  console.log("=======")
  const user = useSelector((state) => state.auth.user);
  console.log(user)
    const [IsThongTin,SetIsThongTin] = useState(false)
    const ShowThongTin=()=>{
      // console.log(IsHideChiTiet())
      //    SetIsThongTin(!IsThongTin)
      //  if(!IsThongTin){
      //     console.log(props.dataQH.id)
      //   }
        props.LayThongTinVungQuyHoach(props.index)
    }
    const IsHideChiTiet=()=>{
      console.log(props.dataQH.maMDSDQuyHoach)

      if(Object.keys(user).length!=0){
        if(props.dataQH.maMDSDQuyHoach=='DGT'||props.dataQH.maMDSDQuyHoach=='DHT'||props.dataQH.maMDSDQuyHoach=='DKV'||props.dataQH.maMDSDQuyHoach=='SON')
        {
          return true
        }
        
        return false
      }
      else{
        return true

      }
      
    }
    return(
        <>
        <Card  key={props.index} style={{flex:1}}>
          {/* <ScrollView  style={{flex:1}}> */}
          <Text style={{justifyContent:'center',alignItems:'center' ,fontStyle:'italic',color:'#0000ff',marginLeft:5}}>{props.dataQH.phapLy}</Text>

                  <TouchableOpacity onPress={!IsHideChiTiet()?ShowThongTin:null}>
                  <Text style={{color:theme.colors.Primary}}>Vùng quy hoạch</Text>
                  <View style={styles.viewrowQH}>
                      <Text style={styles.textQH}>Chức năng:</Text>
                      <Text style={styles.textvalueQH}>{props.dataQH.tenVungQuyHoach}</Text>
                      {/* <Subheading>Chức năng:</Subheading>
                      <Paragraph>{props.dataQH.tenVungQuyHoach}</Paragraph> */}
                  </View>
                  <View style={styles.viewrowQH}>
                      <Text style={styles.textQH}>Diện tích:</Text>
                      <Text style={styles.textvalueQH}>{props.dataQH.dienTichGiao!=null?(props.dataQH.dienTichGiao.length>1?props.dataQH.dienTichGiao+' m²':''):''} </Text>
                  </View>
                  {
                   !IsHideChiTiet()&&
                    <View style={{flex:1,height:20,flexDirection:'row',justifyContent:'flex-end'}}>
                    <View style={{flexDirection:'row',borderWidth:1,backgroundColor:theme.colors.lightblue,paddingHorizontal:5,borderColor:theme.colors.Primary,borderRadius:10}}>
                          <MaterialIcons name={'remove-red-eye'} color={theme.colors.blue} size={18}></MaterialIcons>
                          <Text style={{marginLeft:5,color:theme.colors.blue}}>Chi tiết</Text>
                    </View>
                    </View>

                  }
                 
                  

                  </TouchableOpacity>
{/* <Button title="123" onPress={()=>{console.log(IsHideChiTiet());console.log(Object.keys(user).length)}}></Button> */}
              
           
             
                  
                  
          {/* </ScrollView> */}
        </Card>
      </>
    )
}

export default CardThongTinQuyHoach



const styles = StyleSheet.create({


    
    textvalueQH:{
      fontSize:RFValue(12,600),
      color:theme.colors.black,
      marginLeft:5,
      flex:0.6,
  
    },
    textQH:{
      fontSize:RFValue(12,600),
      fontWeight:'bold',
      color:theme.colors.black,
      flex:0.4
  
    },
    viewCol:{
      //flex:1,
      padding:10
    },
    viewrowQH:{
      flexDirection:'row',paddingLeft:10,
    }
  })