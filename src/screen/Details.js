import React, { Component,useRef, useState} from 'react';
import { View, Text,Button,Dimensions, SafeAreaView,TouchableOpacity,ScrollView,TouchableWithoutFeedback,Image ,NativeModules} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Carousel from 'react-native-snap-carousel'
import Animated, { Easing, Value } from "react-native-reanimated";
import Map from './testMap'
const styles = {

  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    height: 120,
    backgroundColor: '#b197fc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  map: {
    flex: 1,
    height: 300,
    width: 300
  },
}

const Images= [
    {
      image: require('../assets/images/2.jpg'),
    },
    {
      image: require('../assets/images/3.jpg'),
    },
    {
      image: require('../assets/images/2.jpg'),
    },
    {
      image: require('../assets/images/4.jpg'),
    },
  ];

  const {width,height} = Dimensions.get('window')
  const RenderItem = ({item}) => {
    return(
      <TouchableWithoutFeedback>
        <Image source={item.image} style={{width: 360, height: 240, borderRadius: 10}} />
      </TouchableWithoutFeedback>
    )
  }
 const  reloadApp=()=> {
    // TODO: this is iOS only
  }
const  Details =()=> {
  var LAYERS = [
    {
      type: 'ArcGISTiledMapServiceLayer',
      url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer'
    },
    {
      type: 'ArcGISFeatureLayer',
      url: 'https://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/MTBENCHMARK2DATA2/FeatureServer/0'
    }
  ];
    
    return (
        
          <SafeAreaView style={{flex:1,backgroundColor:'#ff0000'}}
          >
          <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>

        <Map layer={LAYERS}  style={styles.map}/>

        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
        <Button title="123" onPress={reloadApp}></Button>
       
      </View>

          </SafeAreaView>
    );
  
}

export default Details;
