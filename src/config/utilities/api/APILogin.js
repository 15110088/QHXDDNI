
import {POSTAPI, GETAPIBASICTOKEN,POSTAPI_TOKEN} from '../Tool'
import { API_URL } from '../config';

const  Login=async(data)=>{
  var URL =API_URL+"/api/User/Login"
  console.log(URL)
  return POSTAPI(URL,data);
}

const GETBANDO=()=>{

  var URL ="";
  
   URL =API_URL+"/api/User/GETOnBD"
  
  console.log(URL)
  return GETAPIBASICTOKEN(URL)
}

const DoiMatKhau=(data)=>{
  var URL =API_URL+"/api/User/ChangePass"
  console.log(URL)
  console.log(data)


    return POSTAPI_TOKEN(URL,data,data.Token);

}

export default {
    Login,
    GETBANDO,DoiMatKhau
};
