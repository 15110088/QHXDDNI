
import React from 'react';
// Import react-native components
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Platform,
  StatusBar,
  TextInput,Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

//icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Colors
import * as theme from '../../config/constants/theme';
//Search Item component
import SearchItem from './SearchItem';
import Animated, { Easing } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { Value, timing } = Animated;
// Calculate window size
const { width, height } = Dimensions.get('window');
//Create dataStorage
const saveDataToStorage = (name, data) => {
    AsyncStorage.setItem(
      name,
      JSON.stringify({
        data,
      }),
    );
};

const getDataToStorage = (name, data) => {
    AsyncStorage.getItem(
      name,
      JSON.parse({
        data,
      }),
    );
};

export class Header extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      isFocused: false,
      keyword: '',
      productsFilter: '',
    };
    // animation values
    this._input_box_translate_x = new Value(width);
    this._back_button_opacity = new Value(0);
    this._content_translate_y = new Value(height);
    this._content_opacity = new Value(0);
  }
  //Search
  searchFilterFunction = (searchText) => {
    const data = this.props.products.filter((product) =>
       // console.log(product)
      product.toLowerCase().includes(searchText.toLowerCase()),
    );
    this.setState({ keyword: searchText, productsFilter: data });
  };

  _onFocus = () => {
    // update state
    this.setState({ isFocused: true });
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    };
    // content
    const content_translate_y_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
    };
    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start();
    timing(this._back_button_opacity, back_button_opacity_config).start();
    timing(this._content_translate_y, content_translate_y_config).start();
    timing(this._content_opacity, content_opacity_config).start();
    // force focus
     this.input.focus();
  };
  _onBlur = () => {
    // update state
    this.setState({ isFocused: false });
    // animation config 
    // input box
    const input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: Easing.inOut(Easing.ease),
    };
    const back_button_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };

    // content
    const content_translate_y_config = {
      duration: 200,
      toValue: height,
      easing: Easing.inOut(Easing.ease),
    };
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
    };
    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start();
    timing(this._back_button_opacity, back_button_opacity_config).start();
    timing(this._content_translate_y, content_translate_y_config).start();
    timing(this._content_opacity, content_opacity_config).start();
    // force blur
    this.input.blur();
  };
  XuLyTimKiemTrenBanDo=(value)=>{
    Keyboard.dismiss()

    //Check value định dạng tờ thửa
    this.props.LayToThua(value)
    this._onBlur()
  }
  render() {
    const scrollY = this.props.scrollPoint;
    const headerPlatform = 50;
    const clampedScrollY = scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolateLeft: 'clamp',
    });
    const _diff_clamp_scroll_y = Animated.diffClamp(
      clampedScrollY,
      0,
      headerPlatform,
    );
    const _header_translate_y = Animated.interpolate(_diff_clamp_scroll_y, {
      inputRange: [0, headerPlatform],
      outputRange: [0, -headerPlatform],
      extrapolate: 'clamp',
    });
    const _header_opacity = Animated.interpolate(_diff_clamp_scroll_y, {
      inputRange: [0, headerPlatform],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    // const ViewPlatForm = Platform.OS === "android" ? SafeAreaView : View;
    return (
      <>
        <SafeAreaView style={{ ...styles.header_safe_area, ...this.props.style }} >
          <Animated.View
            style={[
              styles.header,
              {
                transform: [
                  {
                    translateY: _header_translate_y,
                  },
                ],
                opacity: _header_opacity,
              },
            ]}
          >
            <View style={styles.header_inner}>
              <TouchableOpacity
                onPress={() => this.props.navigation.toggleDrawer()}
              >
                <Ionicons
                  name='ios-menu'
                  size={30}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
              <View>
              <TouchableOpacity onPress={this.props.ChonKVHC} style={{alignItems:'center',flexDirection:'row',backgroundColor:theme.colors.white,borderRadius:8,padding:5}}>  
              <MaterialCommunityIcons name="map-marker" color={theme.colors.Primary} size={20}/>
              <Text style={{color:theme.colors.Primary}}>{this.props.tenKVHC}</Text></TouchableOpacity>

              </View>
              <TouchableOpacity
                activeOpacity={1}
                underlayColor={'#ccd0d5'}
                onPress={this._onFocus}
                style={styles.search_icon_box}
              >
                <Ionicons name='search' size={20} color={theme.colors.Primary} />
              </TouchableOpacity>
              <Animated.View
                style={[
                  styles.input_box,
                  { transform: [{ translateX: this._input_box_translate_x }] },
                ]}
              >
                <Animated.View style={{ opacity: this._back_button_opacity }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    underlayColor={'#ccd0d5'}
                    onPress={this._onBlur}
                    style={styles.back_icon_box}
                  >
                    <Ionicons
                      name='ios-arrow-back'
                      size={25}
                      color={theme.colors.Primary}
                    />
                  </TouchableOpacity>
                </Animated.View>
                <TextInput
                  ref={ref=>{this.input=ref}}
                  placeholder='Số Tờ/Số Thửa'
                  clearButtonMode='always'
                  value={this.state.keyword}
                  onChangeText={(value) => this.searchFilterFunction(value)}
                  style={styles.input}
                  onSubmitEditing={()=>this.XuLyTimKiemTrenBanDo(this.state.keyword)}
                />
                 {/* <TouchableOpacity
                  style={styles.buttonSearch}
                  onPress={()=>this.XuLyTimKiemTrenBanDo(this.state.keyword)}
                  >
                  <Ionicons name="search" color="gray" size={16} />
                </TouchableOpacity> */}
              </Animated.View>
            </View>
          </Animated.View>
        </SafeAreaView>
        <Animated.View
          style={[
            styles.content,
            {
             opacity: this._content_opacity,
          //    transform: [{ translateY: this._content_translate_y }],
          transform: [{ translateY:this._content_translate_y }],
            },
          ]}
        >
          <View style={styles.content_safe_area}>
            {this.state.keyword === '' ? (
              <View style={styles.image_placeholder_container}>
                <Image
                  // source={require('../../assets/images//Logo.png')}
                  style={styles.image_placeholder}
                />
                <Text style={styles.image_placeholder_text}>
                  Nhập vào số tờ / số thửa{'\n'}
                  để tìm kiếm 
                </Text>
              </View>
            ) : (
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop:
                    Platform.OS === 'android' ? 0 : height < 668 ? 10 : 60,
                }}
              >
                {this.state.productsFilter.length === 0 ? (
                  <Text style={styles.image_placeholder_text}>
                    Không tìm thấy tờ thửa gợi ý
                  </Text>
                ) : (
                  <FlatList
                    data={this.state.productsFilter}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                      return (
                        <SearchItem
                         XuLyTimKiemTrenBanDo={this.XuLyTimKiemTrenBanDo}
                          item={item}
                          navigation={this.props.navigation}
                        />
                      );
                    }}
                  />
                )}
              </View>
            )}
          </View>
        </Animated.View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 1000,
    backgroundColor: theme.colors.Primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    position: 'absolute',
    backgroundColor: theme.colors.Primary,
    width,
    height: 50,
    top:
      Platform.OS === 'android'
        ? 0
        : height > 736
        ? 0
        : 0,
  },
  header_inner: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  search_icon_box: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.Primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_box: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: theme.colors.white,
    width: width,
  },
  buttonSearch: {
    shadowColor: '#222',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    backgroundColor: '#fff',
    padding: 13,
    marginRight:10,
    borderRadius: 30,
    aspectRatio: 1,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: theme.colors.gray,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    marginHorizontal: 20,
  },
  content: {
    width: width,
    height: height,
    position: 'absolute',
    left: 0,
    zIndex: 999,
  },
  content_safe_area: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 80 : 40,
    paddingBottom: 80,
    backgroundColor: theme.colors.white,
  },
  content_inner: {
    backgroundColor: theme.colors.Primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray,
  },
  image_placeholder_container: {
    flexDirection: 'column',
    marginTop: 100,
  },
  image_placeholder: {
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5,
  },
  search_item: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e4eb',
    marginLeft: 16,
  },
  item_icon: {
    marginRight: 15,
  },
});