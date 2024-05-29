import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screen/HomeMain";
import Details from "../screen/Details";
import Setting from "../screen/HomeMain";
import MapMain from "../screen/MapMain";
import {Login} from "../screen/Login";
import * as theme from "../config/constants/theme.js";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import KhuVucHanhChinh from "../screen/KhuVucHanhChinh";
import Code from "../screen/Code";
import HoSoQuyHoach from "../screen/HoSoQuyHoach";
import XinYKien from "../screen/XinYKien";
import XemFilePDF from "../screen/XemFilePDF";
import DangKy from "../screen/DangKy";
import HomeMain from "../screen/HomeMain";
import ChiTietTinTuc from "../screen/ChiTietTinTuc";
import Profile from "../screen/user/Profile";
import { useSelector } from "react-redux";
import ChiTietCongBo from "../screen/congboqh/ChiTietCongBo";
import ChiTietYKien from "../screen/ykien/ChiTietYKien";
import DanhSachCongBoQH from "../screen/congboqh/DanhSachCongBoQH";
import DoiMatKhau from "../screen/user/DoiMatKhau";


const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
	const user = useSelector((state) => state.auth.user);

	return (
		<Tab.Navigator
		screenOptions={({ route }) => ({
			tabBarIcon: ({ focused }) => {
			  let iconName;
			  const color = focused ? theme.colors.Primary : theme.colors.gray;
			  if (route.name === 'MapMain') {
				iconName = 'map';
			  } else if (route.name === 'Login') {
				iconName = 'person-circle';
			  } else if (route.name === 'Home') {
				iconName = 'home';
			  }
			  return <Icon name={iconName} size={25} color={color} />;
			},
		    })}
			barStyle={{
				backgroundColor: theme.colors.gray,
				height: 50,
				justifyContent: 'center',
			}}
			activeColor={theme.colors.Primary}
			inactiveColor={'#dfdfdf'}
			>
					<Tab.Screen
				name='Home'
				component={HomeMain}
				options={{
					tabBarLabel: "Trang Chủ",
					tabBarColor: '#1f65ff',
					// tabBarIcon: ({ color, size }) => (
					// 	<Icon name='ios-compass' color={color} size={35} />
					// ),
					//tabBarBadge: 3,
				}}
			/>
			<Tab.Screen
				name='MapMain'
				component={MapMain}
				options={{
					tabBarLabel: "Bản Đồ",
					tabBarColor: '#1f65ff',
					// tabBarIcon: ({ color, size }) => (
					// 	<Icon name='ios-compass' color={color} size={35} />
					// ),
					//tabBarBadge: 3,
				}}
			/>
			<Tab.Screen
				name='Login'
				component={Object.keys(user).length === 0?Login:Profile}
				options={{
					tabBarLabel: "",
					tabBarLabel: "Tài Khoản",

					tabBarColor: '#694fad',
					// tabBarIcon: ({ color, size }) => (
					// 	<Icon name='person-circle' color={color} size={35} />
					// ),
				}}
			/>
		</Tab.Navigator>
	);
};

const Stack = createStackNavigator();
const screenOptionStyle = {
	headerShown: false,
};

const HomeStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			{/* <Stack.Screen name='Code' component={Code} /> */}
			<Stack.Screen name='Home' component={BottomTabNavigator} />

			<Stack.Screen  initialParams={{ID:26380}} name='MapMain' component={MapMain} />

						<Stack.Screen initialParams={{ID:26380}} name='Login1' component={Login} />


						<Stack.Screen name='Detail' component={Details} />


			<Stack.Screen name='KVHC' component={KhuVucHanhChinh} />
			<Stack.Screen name='DanhSachCongBoQH' component={DanhSachCongBoQH} />

			<Stack.Screen name='ChiTietCongBo' component={ChiTietCongBo} />
			<Stack.Screen name='DangKy' component={DangKy} />
			
			<Stack.Screen name='HoSoQuyHoach' component={HoSoQuyHoach} />
			<Stack.Screen name='ChiTietTinTuc' component={ChiTietTinTuc} />
			<Stack.Screen name='ChiTietYKien' component={ChiTietYKien} />

			<Stack.Screen name='XinYKien' component={XinYKien} />
			<Stack.Screen name='XemFilePDF' component={XemFilePDF} />
			<Stack.Screen name='Profile' component={Profile} />
			<Stack.Screen name='DoiMatKhau' component={DoiMatKhau} />

			

		</Stack.Navigator>
	);
};

export default HomeStackNavigator;