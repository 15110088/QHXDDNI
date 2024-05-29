import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet,FlatList } from "react-native";
import * as theme from "../config/constants/theme.js";
import HeaderKVHC from "../screen/components/HeaderKVHC"
import ApiGeneral from '../config/utilities/api/ApiGeneral';
import { Card, ListItem, Icon } from 'react-native-elements'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


 

const KhuVucHanhChinh =(props)=> {
    const [dataKVHC,setdataKVHC]=useState(0);
    useEffect(()=>{
        ApiGeneral.GetKVHC().then(res=>{
            setdataKVHC(res)
           
          })
    },[])
    const ChonMaKVHC=async(data)=>{

         props.navigation.navigate("Home",{
            screen:'MapMain',
            params: {Kvhc:data}}
        )

      }
      const _ItemKhuVuc=({item})=>{
        var arrTen=item.ten.split(" ")
        return(
          <>
          <ListItem 
          onPress={()=>ChonMaKVHC(item)}
          >
            <Ionicons name="location" color={theme.colors.Primary} size={RFValue(20,600)}  />
          <ListItem.Content>
          <ListItem.Title>{item.ten.substr(arrTen[0].length,item.ten.length).trim()}</ListItem.Title>
            <ListItem.Subtitle>{arrTen[0]}</ListItem.Subtitle>
          </ListItem.Content>
          {/* <ListItem.Chevron color={theme.colors.green} /> */}
          </ListItem>
          </>
        )
      }
    

    return (
        <View style={styles.container}>
        <HeaderKVHC navigation={props.navigation} />
        <FlatList 
                 data={dataKVHC} 
                 keyExtractor = { (item, index) => index.toString() }
                 renderItem={_ItemKhuVuc}/>
      </View>
    );
  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
  });
export default KhuVucHanhChinh;
