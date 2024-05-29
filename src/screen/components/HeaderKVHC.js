
import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity ,Text} from "react-native";
//Color
import * as theme from '../../config/constants/theme';
//Icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Text

const { height } = Dimensions.get("window");
const  HeaderKVHC =(props)=>  {
 
    return (
        <View style={styles.header}>
        <View style={{ position: "absolute", bottom: 10, left: 15, zIndex: 10 }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              name='ios-arrow-back'
              size={28}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={{ position: "absolute", bottom: 5, right: 15, zIndex: 10 }}>
          <MaterialIcons
            style={{ marginBottom: 10 }}
            name='heart-multiple'
            size={25}
            color={theme.colors.red}
          />
        </View>
      </View>
    );
  
}

export default HeaderKVHC;

const styles = StyleSheet.create({
    header: {
      width: "100%",
      backgroundColor: theme.colors.Primary,
      justifyContent: "flex-end",
      height: Platform.OS === "android" ? 70 : height < 668 ? 70 : 90,
      paddingVertical: 10,
      shadowColor: "black",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 2,
      elevation: 1,
    },
    title: {
      textAlign: "center",
      color: theme.colors.white,
    },
  });
  