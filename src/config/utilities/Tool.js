import React, { useCallback } from "react";
import * as  RootNavigation from "../../navigations/RootNavigation";
import { TouchableOpacity } from "react-native";
import axios from 'axios';

import * as theme from "../constants/theme";
//Upload Image
// import * as ImagePicker from "expo-image-picker";
// import * as Permissions from "expo-permissions";
//import Constants from "expo-constants";
import {fetch} from 'react-native-ssl-pinning';
var CryptoJS = require("crypto-js");
import AsyncStorage from '@react-native-community/async-storage'

import { STRIPE_PUBLISHABLE_KEY, API_URL } from "../utilities/config";

// export const OpenURL = ({ url, children }) => {
//   const handlePress = useCallback(async () => {
//     // Checking if the link is supported for links with custom URL scheme.
//     const supported = await Linking.canOpenURL(url);

//     if (supported) {
//       // Opening the link with some app, if the URL scheme is "http" the web link should be opened
//       // by some browser in the mobile
//       await Linking.openURL(url);
//     } else {
//       Alert.alert(`Don't know how to open this URL: ${url}`);
//     }
//   }, [url]);
//   return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
// };

//Handle Deep Link
export const urlRedirect = (url) => {
  if (!url) return;
  // parse and redirect to new url
  let { path, queryParams } = Linking.parse(url);
  // console.log(
  //   `Linked to app with path: ${path} and data: ${JSON.stringify(
  //     queryParams
  //   )}`
  // );
  if (path) {
    RootNavigation.navigate(path, queryParams);
  }
  return;
};

//Handle Fetching timeout
export const timeoutPromise = (url) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Timeout, Server is not responding"));
    }, 20 * 1000);
    url.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
};
const pad=(n) =>{return n < 10 ? "0"+n : n;}

export const FomatTimeDDMMYYY = (dateobj) => {
  var result = pad(dateobj.getDate())+"/"+pad(dateobj.getMonth()+1)+"/"+dateobj.getFullYear();
  return result;
};
export   const  MonthDiff=(d1, d2)=> {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

export  const Encrypt=(data,KEYAPP,IVAPP)=> {
  console.log(KEYAPP + ' ' +IVAPP)

  var cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(KEYAPP), {
    iv: CryptoJS.enc.Utf8.parse(IVAPP), // parse the IV 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
})
var cipher1 = CryptoJS.AES.decrypt(cipher.toString(), CryptoJS.enc.Utf8.parse(KEYAPP), {
  iv: CryptoJS.enc.Utf8.parse(IVAPP), // parse the IV 
  padding: CryptoJS.pad.Pkcs7,
  mode: CryptoJS.mode.CBC
})
console.log(cipher1.toString(CryptoJS.enc.Utf8))
console.log("===========")

  return cipher.toString()
}
export   const  Decrypt=(data,KEYAPP,IVAPP)=> {
  console.log(KEYAPP + ' ' +IVAPP)
  var cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(KEYAPP), {
    iv: CryptoJS.enc.Utf8.parse(IVAPP), // parse the IV 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
})
console.log(cipher.toString(CryptoJS.enc.Utf8))
  return cipher.toString(CryptoJS.enc.Utf8)
}

export const colorCheck = (colorCode) => {
  switch (colorCode) {
    case "yellow":
      return theme.colors.yellow;
    case "green":
      return theme.colors.green;
    case "purple":
      return theme.colors.purple;
    case "blue":
      return theme.colors.blue;
    case "pink":
      return theme.colors.pink;
    default:
      return theme.colors.light_green;
  }
};
export const POSTAPI = (URL,data) => {
//   return fetch(URL, {
//     method: "POST" ,
//     timeoutInterval: 10000, // milliseconds
//     body: JSON.stringify(data),
//     // your certificates array (needed only in android) ios will pick it automatically
//     sslPinning: {
//         certs: ["xn"] // your certificates name (without extension), for example cert1.cer, cert2.cer
//     },
//     headers: {
//         Accept: "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*", "e_platform": "mobile",
//     }
// })
// .then(response => {
//     return JSON.parse(response.bodyString)
// })
const requestOption ={
  method:'POST',
  headers: {'Content-Type': 'application/json'},
  body:data 
}



return axios.post(URL,data)
.then(res => {
  console.log(res)
      return res.data
  })

};

export const POSTAPIBASICTOKEN = (URL,data) => {

  const authHeader = 'Basic ' + "dmFyY2hhcjI6UXlSNE95Um9TQw==";

  
  const requestOption ={
    method:'POST',
    headers: {'Content-Type': 'application/json','Authorization':authHeader},
    body:data
   
    
  }
  return axios.post(URL,data,requestOption)
  .then(res => {
    console.log(res)
        return res.data
    })
  
  };

  export const GETAPIBASICTOKEN = (URL) => {

    const authHeader = 'Basic ' + "dmFyY2hhcjI6UXlSNE95Um9TQw==";
  
    
    const requestOption ={
      method:'get',
      headers: {'Content-Type': 'application/json','Authorization':authHeader},
     
      
    }
    return axios.get(URL,requestOption)
    .then(res => {
      console.log(res.data)
          return res.data
      })
    
    };



export const POSTAPI_TOKEN = (URL,data,token) => {
//   return fetch(URL, {
//     method: "POST" ,
//     timeoutInterval: 10000, // milliseconds
//     body: JSON.stringify(data),
//     // your certificates array (needed only in android) ios will pick it automatically
//     sslPinning: {
//         certs: ["xn"] // your certificates name (without extension), for example cert1.cer, cert2.cer
//     },
//     headers: {
//         Accept: "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*", "e_platform": "mobile",
//         Authorization: 'Bearer ' + token,

//     }
// })
// .then(response => {
//     return JSON.parse(response.bodyString)
// })

const requestOption ={
  method:'POST',
  headers: {'Content-Type': 'application/json','Authorization':'Bearer ' + token},
  body:data 
}

return axios.post(URL,data,requestOption)
.then(res => {
  console.log(res)
      return res.data
  })
};

export const GETAPI_TOKEN = (URL,token) => {

  
  const requestOption ={
    method:'GET',
    headers: {'Content-Type': 'application/json','Authorization':'Bearer ' + token}
  }
  
  return axios.get(URL,requestOption)
  .then(res => {
    console.log(res)
        return res.data
    })
  };

//Get token from Stripe Server

export const getCreditCardToken = (creditCardData) => {
  const card = {
    "card[number]": creditCardData.values.number.replace(/ /g, ""),
    "card[exp_month]": creditCardData.values.expiry.split("/")[0],
    "card[exp_year]": creditCardData.values.expiry.split("/")[1],
    "card[cvc]": creditCardData.values.cvc,
  };
  return fetch("https://api.stripe.com/v1/tokens", {
    headers: {
      // Use the correct MIME type for your server
      Accept: "application/json",
      // Use the correct Content Type to send data to Stripe
      "Content-Type": "application/x-www-form-urlencoded",
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },
    // Use a proper HTTP method
    method: "post",
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map((key) => key + "=" + card[key])
      .join("&"),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error)); 
};
export const saveDataToStorage = (name, data) => {
  AsyncStorage.setItem(
    name,
    JSON.stringify({
      data,
    }),
  );
};
// varchar2
// QyR4OyRoSC