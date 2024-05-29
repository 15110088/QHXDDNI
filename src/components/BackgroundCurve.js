import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle, Rect, Path} from 'react-native-svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const BackgroundCurve = ({style}) => {
  return (
    <View style={style}>
      <View style={styles.viewAbove} />
      {/* <Svg height="100%" width="100%" style={styles.svg} viewBox="0 0 1440 320">
        <Path
          fill="#487FFE"
         // d="M0,256L48,261.3C96,267,192,277,288,245.3C384,213,480,139,576,101.3C672,64,768,64,864,101.3C960,139,1056,213,1152,218.7C1248,224,1344,160,1392,128L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        d="M0,96L24,112C48,128,96,160,144,192C192,224,240,256,288,250.7C336,245,384,203,432,160C480,117,528,75,576,96C624,117,672,203,720,224C768,245,816,203,864,170.7C912,139,960,117,1008,112C1056,107,1104,117,1152,138.7C1200,160,1248,192,1296,202.7C1344,213,1392,203,1416,197.3L1440,192L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
        />
      </Svg> */}
    </View>
  );
};

export default BackgroundCurve;

const styles = StyleSheet.create({
  viewAbove: {
    backgroundColor: '#487FFE',
    height:Platform.OS=="ios"?RFValue(55,600):0   ,
  },
  svg: {
    position: 'absolute',
    top: 50
  },
});
