import React from "react";
import { View, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import * as theme from "../config/constants/theme.js";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");

const Loader = (props) => {
  return (
    <>

    <View
      style={{
        position: "absolute",
        marginTop:10,
        flex: 1,
        width,
        height,
        backgroundColor: "rgba(128, 129, 130,0.5)",
        zIndex: 1001,
        justifyContent: "center",
      }}
    >
          <MaterialCommunityIcons onPress={()=>props.close()} style={{backgroundColor:theme.colors.gray3,justifyContent:'flex-end',alignSelf:'flex-end',position:'absolute',top:0,marginTop:10}}  size={40} color={theme.colors.red} name="close-box"/>


      <ActivityIndicator size='large' color={theme.colors.Primary} />
    </View>

    </>
    
  );
};

export default Loader;