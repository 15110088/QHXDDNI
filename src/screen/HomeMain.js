import React, { Component,useEffect,useRef } from 'react';
import { View,
	Image,
	Text,
	TouchableOpacity,
	ImageBackground,
    Animated,Dimensions,
    TouchableWithoutFeedback,
	StyleSheet,
	Button,
	ToastAndroid,
	ActivityIndicator, } from 'react-native';
	import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
	import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
	import Entypo from 'react-native-vector-icons/Entypo';
	import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
	import Fontisto from 'react-native-vector-icons/Fontisto';
	import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
	import Foundation from 'react-native-vector-icons/Foundation';
	import AntDesign from 'react-native-vector-icons/AntDesign';
	import Feather from 'react-native-vector-icons/Feather';
	import { material,human } from 'react-native-typography'

import * as theme from "../config/constants/theme.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel'
import BackgroundCurve from '../components/BackgroundCurve.js';
import { HeaderMenu } from './components/HeaderMenu.js';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper'
import { DataGioiThieu } from '../config/utilities/InitData.js';
import { useDispatch, useSelector } from "react-redux";
import * as rssParser from 'react-native-rss-parser';
import { useState } from 'react';
import RenderHtml, { RenderHTML } from 'react-native-render-html';
import ApiThuaDat from '../config/utilities/api/ApiThuaDat.js';
import { Decrypt } from '../config/utilities/Tool.js';
import { LINKDOWLOAD } from '../config/utilities/config.js';

const {width,height} = Dimensions.get('window')



 
  const banners = [
	{
	  id: "9471645183",
	  imageUrl: require("../assets/images/1.jpg"),
	},
	
	{
	  id: "044416421",
	  imageUrl: require("../assets/images/4.jpg"),
	},
	{
		id: "5656210978",
		imageUrl: require("../assets/images/2.jpg"),
	  },
	
];
const DataChucNang=[
    {
        id: 1,
        color: theme.colors.Primary,
        icon:'location-arrow',
        backgroundColor: theme.colors.white,
		backcoloricon: '#bedcff',
        description: "Tra cứu quy hoạch"
    },
    {
        id: 2,
        color: theme.colors.light_blue,
        icon:'receipt',
        backgroundColor: theme.colors.white,
		backcoloricon: '#b3e5fc',
        description: "Hồ sơ quy hoạch"
    },
    {
		id: 4,
        color: theme.colors.red,
		backcoloricon: '#fcd0d9',
        icon:'volume-down',
        backgroundColor: theme.colors.white,
        description: "Quyết định quy hoạch"
    },
    {
       
		id: 3,
        color: theme.colors.purple,
		backcoloricon: '#d9c6fe',
        icon:'users',
        backgroundColor: theme.colors.white,
        description: "Lấy ý kiến cộng đồng"
    }
    // {
    //     id: 5,
    //     color: theme.colors.white,
    //     icon:'building',
    //     backgroundColor: theme.colors.Primary,
    //     description: "Dự Án"
    // },
    // {
    //     id: 6,
    //     color: theme.colors.white,
    //     icon:'file-word',
    //     backgroundColor: theme.colors.Primary,
    //     description: "Thư Viện Văn Bản"
    // },
    // {
    //     id: 7,
    //     color: theme.colors.white,
    //     icon:'coins',
    //     backgroundColor: theme.colors.Primary,
    //     description: "Tài Liệu Kho"
    // },
    
]

const  HomeMain =(props)=>{


	const scrollX = useRef(new Animated.Value(0)).current;
    const pan = useRef(new Animated.ValueXY()).current;
	const navigation =props.navigation
	const user = useSelector((state) => state.auth.user);
	const sde = useSelector((state) => state.sde);
    const [dataRSS,setdataRSS]=useState([]);
    const [dataCongBoQH,setdataCongBoQH]=useState([]);
    const [IsLoading,setIsLoading]=useState(false);
    const [IsLoadingRSS,setIsLoadingRSS]=useState(false);

	useEffect(() => {
		Animated.timing(pan, { 
			toValue: { x: 900, y: -200 },
			delay: 1000,
			useNativeDriver: false,
		}).start();
	});
	useEffect(() => {
		
		async function fetchData() {
			setIsLoadingRSS(true)
			// You can await here
			const response =await fetch('https://moc.gov.vn/rss/1259/quy-hoach---kien-truc.rss')
			.then((response) => response.text())
			.then((responseData) => rssParser.parse(responseData))
			.then((rss) => {
			
				setdataRSS(rss.items.slice(0,5))
				setIsLoadingRSS(false)
			})
			;
		  }


		  fetchData();
		 


	},[]);
	useEffect(() => {
		
		if(sde.KeyApp.length>5)
		{
			setIsLoading(true)

			ApiThuaDat.GETCONGBOQH().then(res=>{
				console.log(sde) 

				var data = JSON.parse(Decrypt(res.data,sde.KeyApp,sde.IVApp))
				console.log(data)
				if(data!=null&&data!=undefined)
				{
				  if(data.KetQua)
					{
					  setdataCongBoQH(data.Data)
					}
					else{
					  if(Platform.OS=="android")
					  {
						ToastAndroid.showWithGravity(
						  "Không tìm thấy thông tin",
						  ToastAndroid.SHORT,
						  ToastAndroid.CENTER
						);
		  
					 
					  }
					}
				 setIsLoading(false)
				}
				else{
				}
				}).catch(err=>{
				  setIsLoading(false)
				  
				  ToastAndroid.showWithGravity(
					"Lỗi truy cập máy chủ CONGBOQH",
					ToastAndroid.SHORT,
					ToastAndroid.CENTER
				  );
				  console.log(err)
				})
		}
		


	},[sde]);
	const Slide = ({data}) => {
		return (
		  <TouchableWithoutFeedback onPress={()=>props.navigation.navigate("ChiTietCongBo",{data:data})} style={{flex: 1,
			width,
			alignItems: "center",
			paddingHorizontal: 5}}>
			<Image
			  style={{
				resizeMode: "cover",
				width: "100%",
				height: 200,
				borderRadius: 10,
			  }}
			  source={{uri:LINKDOWLOAD + data.LstCongBo.IMG}}
			/>
		  </TouchableWithoutFeedback>
		);
	  };
	  const TypeNavigate=(ID)=>{
        if(ID==1)
        {
            navigation.navigate("MapMain")
        }
        if(ID==2)
        {
			if(Object.keys(user).length === 0)
			{
				navigation.navigate("Login")

			}
			else{
				navigation.push("HoSoQuyHoach")

			}

        }
        if(ID==3)
        {

            navigation.push("XinYKien")
        }
        if(ID==4)
        {
			navigation.push("DanhSachCongBoQH",{data:dataCongBoQH})

        }
        // else{
        //     navigation.push("SearchInfo",{ID:ID})
        // }


    }
	  const renderItem= ({item}) => {
        return (
            <TouchableOpacity
            key={`${item.id}`}
            style={{ margin:  5, alignItems: 'center' }}
            onPress={() => TypeNavigate(item.id)}
        >
            <View
                key={`${item.id}`}
                style={{
                    height: theme.sizes.width/4-8,
                    width: theme.sizes.width/4-20,
                    backgroundColor: item.backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center',
					borderWidth:2,
					borderColor:item.color,
					borderRadius:8,
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 6,
					},
					shadowOpacity: 0.39,
					shadowRadius: 8.30,
					elevation: 13,
					
                }}
            >
                <View style={{borderRadius:12,backgroundColor:item.backcoloricon,padding:2}}>
                <FontAwesome5 name={item.icon} size={18} style={{margin:2}} color={item.color}/>

				</View>
                <Text  key={`${item.id}`} style={[{ textAlign: 'center', flexWrap: 'wrap',margin:5,fontSize:10,color:theme.colors.black}]}>{item.description}</Text>

            </View>
        </TouchableOpacity>
        )
    }
	const renderTinTuc= (item) => {
		console.log(item)
        return (
			<View style={{flex:1,width:theme.sizes.width,marginHorizontal:10}}>
			<View style={{margin:5,flexDirection:'row',alignItems:'center'}}>
				<FontAwesome5 name="newspaper" color={"#458dff"} size={25} style={{margin:5,flex:1}}></FontAwesome5>
			<Text style={[material.body2,{color:'#458dff',flex:9}]}>{item.title.trim()}</Text>
			</View>
			<Text style={[material.caption,{color:theme.colors.black,textAlign:'right',marginHorizontal:20}]}><FontAwesome5 name={"calendar"} /> {item.published}</Text>

            <TouchableOpacity
            key={`${item.published}`}
            style={{ marginHorizontal: 15,margin:5}}
			
        >
			
		{/* <Text style={[material.caption,{color:theme.colors.black,textAlign:'right',margin:3}]}><FontAwesome5 name={"calendar"} />{item.published}</Text> */}
			<RenderHTML
      contentWidth={theme.sizes.width-40}
      source={{html:item.description.replace("/Images","https://moc.gov.vn//Images")}}
    />
        </TouchableOpacity>
		</View>
        )
    }
    const Loadding=()=>(
		<>
		<View style={{height:200,backgroundColor:theme.colors.white,justifyContent:'center',alignItems:'center'}}>
		<ActivityIndicator/>
		<Text>Đang lấy dữ liệu</Text>
		</View>

		</>
	)
    return (
        <SafeAreaView style={styles.page}>
			      <BackgroundCurve style={styles.svg} />

<HeaderMenu IsMenu={true} navigation={props.navigation}  titleHeader={"TRANG CHỦ"} />	

<ScrollView>
<Text style={styles.txtHeader}>QUY HOẠCH XÂY DỰNG</Text>

<FlatList
	 data={DataChucNang}
	 numColumns={4}
	 columnWrapperStyle={{ justifyContent: 'space-between'}}
	 keyExtractor={item => `${item.id}`}
	 style={{marginHorizontal:15,marginTop:5}}
	 renderItem={renderItem}
	   />
		   <Text style={styles.txtHeader}>QUYẾT ĐỊNH QUY HOẠCH</Text>
<View style={{flex:1,margin:10,borderWidth:0,borderRadius:10}}> 
{IsLoading?<Loadding/>:
<Swiper   height={200} showsButtons={false} autoplay={true}>
{dataCongBoQH.map((slide) => {
          return <Slide  key={slide.ID} data={slide} />;
        })}
      </Swiper>}
</View>

	  
		 

		   <Text style={styles.txtHeader}>TIN TỨC - SỰ KIỆN</Text>
		   {/* <FlatList
         data={dataRSS}
         keyExtractor={item => `${item.id}`}
		 style={{marginTop:5}}
         renderItem={renderTinTuc}
		 horizontal
           /> */}
		{IsLoadingRSS?<Loadding></Loadding>:dataRSS.map((v,i)=>{
			return(
				
				renderTinTuc(v)
			
			)
		})}
		
		</ScrollView>
		
	 
	  </SafeAreaView>
    );
  
}

export default HomeMain;

const styles = StyleSheet.create({
	slide1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB'
	  },
	  slide2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#97CAE5'
	  },
	  slide3: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#92BBD9'
	  },
	page: {
		backgroundColor: theme.colors.gray4 ,
		flex: 1,
	},
	bi: {
        flex:1,
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 40,
		marginHorizontal: 20,
	},
	shadow: {
		backgroundColor: theme.colors.red,
		height: 320,
		width: 30,
		marginLeft: 195,
		opacity: 0.5,
		marginTop: 20,
		borderRadius: 20,
		position: "absolute",
	},
	textStorage: {
		color: theme.colors.light,
		fontSize: 10,
	//	fontFamily: "Montserrat_600SemiBold",
	},
	btn: {
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 30,
		backgroundColor: theme.colors.blue,
		paddingVertical: 10,
		paddingHorizontal: 25,
		borderRadius: 25,
		borderWidth: 3,
		borderColor: "#f04946",
	},
	textFree: {
		color: theme.colors.yellow,
		//fontFamily: "Montserrat_600SemiBold",
	},
	circle: {
		width: 10,
		height: 10,
		borderRadius: 10,
		marginHorizontal: 10,
	},
	// textUsed: {
	// 	color: Colors.colors.light,
	// 	fontFamily: "Montserrat_600SemiBold",
	// },
	labelContainer: {
		flexDirection: "row",
		alignSelf: "center",
		alignItems: "center",
		marginTop: 20,
	},
	av: {
		width: 40,
		height: 40,
		borderRadius: 10,
	},
	dot: {
		backgroundColor: theme.colors.yellow,
		width: 8,
		height: 8,
		borderRadius: 4,
		marginLeft: -4,
	},
	topText: {
		alignItems: "center",
		marginHorizontal: 20,
		flexDirection: "row",
		marginTop: 40,
	},
	textFile: {
		fontSize: 34,
		color: theme.colors.light,
		flex: 1,
		//fontFamily: "Montserrat_700Bold",
	},
	textManager: {
		fontSize: 28,
		color: theme.colors.light,
		fontWeight: "400",
		marginHorizontal: 20,
		//fontFamily: "Montserrat_700Bold",
	},
	topText: {
		flexDirection: "row",
		marginHorizontal: 20,
		marginTop: 10,
	},
	le: {
		color: theme.colors.light,
		//fontFamily: "Montserrat_600SemiBold",
	},
	ico: {
	//	marginTop: -20,
		marginHorizontal: 1.5,
	},
	ri: {
		color: theme.colors.yellow,
	//	fontFamily: "Montserrat_600SemiBold",
	},
	sideTab: {
		flexDirection: "row",
		marginHorizontal: -15,
		marginTop: 40,
	},
	tab1: {
		color: theme.colors.yellow,
		transform: [{ rotate: "-90deg" }],
		marginTop: 60,
	//	fontFamily: "Montserrat_600SemiBold",
	},
	tab2: {
		color: theme.colors.light,
		transform: [{ rotate: "-90deg" }],
		marginTop: 120,
	//	fontFamily: "Montserrat_600SemiBold",
	},
	card: {
		backgroundColor: theme.colors.red,
		height: 370,
		width: 210,
		borderRadius: 20,
		marginLeft: -800,
	},
	top: {
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	textTop: {
		color: "#FFF",
		fontSize: 16,
		opacity: 1,
		//fontFamily: "Montserrat_600SemiBold",
	},
	per: {
		color: "#FFF",
		//fontFamily: "Montserrat_600SemiBold",
	},
	pie: {
		height: 150,
		marginTop: 15,
	},
	gb: {
		marginTop: 5,
		color: "#FFF",
		//: "Montserrat_600SemiBold",
	},
	space: {
		color: "#FFF",
		fontSize: 24,
		//fontFamily: "Montserrat_600SemiBold",
	},
	center: {
		position: "absolute",
		alignSelf: "center",
		marginTop: 60,
		alignItems: "center",
	},
	col: {
		flexDirection: "row",
		alignItems: "center",
	},
	svg: {
		position: 'absolute',
		width: Dimensions.get('window').width,
	  },
	  txtHeader:{
		textAlign:'center',marginVertical:10,color:theme.colors.Primary,fontWeight:'bold'
	  }
});
