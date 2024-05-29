import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import * as theme from "../config/constants/theme.js";

export const RowItem=({title,noidung,IsLink})=>(
  <>
    <View style={[styles.viewline,{justifyContent:'space-between'}]}>
      <View style={{flex:0.4}}>
      <Text style={theme.fonts.textBodyTitle}>{title}</Text>

      </View>
      <View style={{flex:0.6}}>
      <Text style={[IsLink?theme.fonts.link:theme.fonts.textBodyCard,{textAlign:"right"}]}>{noidung}</Text>

      </View>
                          
          </View>
  </>
)

export const ColItem=({title,noidung,IsLink})=>(
  <>
      <View style={[styles.viewline,{justifyContent:'space-between'}]}>
          <View>
          <Text style={theme.fonts.textBodyTitle}>{title}</Text>
          </View>
          <View >
          <Text style={[theme.fonts.textBodyCard]}>{noidung}</Text>
          </View>
    </View>
  </>
)

export const RowList=({title,value})=>(
  <View style={{flex:1,marginHorizontal:10,flexDirection:'row'}}>
  <View style={{flex:3,justifyContent:'center'}}>
<Text style={[theme.fonts.body,{marginVertical:7,color:theme.colors.black2}]}>{title}</Text>
</View>
<View style={{flex:7,justifyContent:'center'}}>

  <Text style={[theme.fonts.body,{marginVertical:5}]}>{value}</Text>
  </View>

</View>
 )

const styles = StyleSheet.create({
  viewline:{
    flexDirection:'row',flexWrap:'wrap',paddingBottom:10
},
});



