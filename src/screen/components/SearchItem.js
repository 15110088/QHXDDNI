import React from "react";
import { View, Image, TouchableOpacity, StyleSheet,Text} from "react-native";
import * as theme from '../../config/constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Text
//PropTypes check
import PropTypes from "prop-types";

const  SearchItem = ({ item, navigation,XuLyTimKiemTrenBanDo }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => XuLyTimKiemTrenBanDo(item)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Ionicons
          name='ios-search'
          size={22}
          color={theme.colors.gray}
          style={{ marginRight: 20 }}
        />
        <Text style={styles.name}>{item}</Text>
      </TouchableOpacity>
    </View>
  );
};

SearchItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
    justifyContent: "center",
  },
  image: {
    height: 50,
    width: 70,
    resizeMode: "stretch",
    borderRadius: 10,
    marginRight: 30,
  },
});

export default SearchItem