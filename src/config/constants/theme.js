import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { material,iOSUIKit,systemWeights  } from 'react-native-typography'


const colors = {
    blue: '#2E5BFF',
    green: '#08be51',
    green2:'#0e7f4c',
    green1:'#007e3d',
    green3:'#009c49',
    light_green:'#8BC31A',
    pink:'#E91E63',
    blue:'#1976d2',
    light_blue:'#03a9f4',

    light: '#fff',
    red: '#D63649',
    yellow: '#F7C137',
    teal: '#00C1D4',
    purple: '#8C54FF',
    black: '#2E384D',
    black2: '#69707F',
    black3: '#8798AD',
    white: '#FFFFFF',
    gray: '#BFC5D2',
    gray2: '#F4F6FC',
    gray3: '#EEF3F5',
    gray4: '#EEEFF3',

    
    caption: '#B0BAC9',
    input: 'rgba(224, 231, 255, 0.20)', // '#E0E7FF' 20%
    border: '#D6DDF6',
    card: 'rgba(46,91,255,0.08)',
    shadow: 'rgba(46,91,255,0.07)',
    redPH:'#D63649',
    blueDO:'#00C1D4',
    Primary:'#487FFE',
    lightblue: '#95c7ff'

  };
  
  const sizes = {
    base: 16,
    font: 14,
    margin: 36,
    title: 24,
    radius: 12,
    padding: 36,
    font: 15,
    h1: 48,
    h2: 34,
    h3: 28,
    h4: 15,
    paragraph: 15,
    caption: 13,
    captionMedium: 12,
    width,
    height
  };
  
  const fonts = {
    h1: {
      fontFamily: "Montserrat-Bold",
      fontSize: sizes.h1
    },
    h2: {
      fontFamily: "Montserrat-Bold",
      fontSize: sizes.h2
    },
    h3: {
      fontFamily: "Montserrat-Bold",
      fontSize: sizes.h3
    },
    paragraph: {
      fontFamily: 'Rubik-Regular',
      fontSize: sizes.paragraph,
      color: colors.black,
      letterSpacing: 0,
      lineHeight: 22,
    },
    paragraphGray: {
      fontFamily: 'Rubik-Regular',
      fontSize: sizes.paragraph,
      color: colors.gray,
      letterSpacing: 0,
      lineHeight: 22,
    },
    paragraphGray2: {
      fontFamily: 'Rubik-Regular',
      fontSize: sizes.paragraph,
      color: colors.gray2,
      letterSpacing: 0,
      lineHeight: 22,
    },
    caption: {
      marginTop:5,
      marginRight:5,
      ...material.caption
    },
    captionMedium: {
      fontFamily: 'Rubik-Medium',
      fontSize: sizes.captionMedium,
      color: colors.black3,
      letterSpacing: 1.12,
      lineHeight: 14,
    },
    button: {
      fontFamily: 'Rubik-Medium',
      fontSize: sizes.font,
      color: colors.white,
      letterSpacing: 0,
      lineHeight: 21,
    },
    textBodyCard:{
      ...material.body1,
      flexWrap:'wrap',
      color:colors.Primary,
  
    },
    textBodyTitle:{
      ...material.body1,
      flexWrap:'wrap'
  
    },
    link:{
      ...material.body1,
      flexWrap:'wrap',
      color:colors.blue,
      textDecorationLine: 'underline'
  
    },
    title:{
      ...material.title,
      ...systemWeights.bold,
      fontSize: 18,
  
    },
    input:{
    //  ...material.subheading,
      fontSize: 16,
      fontWeight:'500',
      paddingVertical:20
  
    },
    body:{
      ...material.body1,
  
    },
    item_title:{
      ...material.title,
      ...systemWeights.semibold,
      fontSize: 16,
    },
    item_desc:{
      ...material.title,
      ...systemWeights.regular,
      fontSize: 15,
    },
    item_body:{
      ...material.caption,
      ...systemWeights.regular,
      fontSize: 15,
    },
  
    
  
  };
  
  export {
    colors,
    sizes,
    fonts,
  };