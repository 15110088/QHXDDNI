

import { API_URL } from '../config';

import { Encrypt, GETAPI_TOKEN, GETAPIBASICTOKEN, POSTAPI, POSTAPI_TOKEN, POSTAPIBASICTOKEN } from '../Tool';

const GETQUYHOACH=(data,TYPE)=>{

   var URL ="";
   if(TYPE==1)
   {
    URL =API_URL+"/api/thuadatios/Quyhoachpoint"
   }
   else{
    URL =API_URL+"/api/thuadatios/Quyhoach"
   }
   console.log(URL)
   return POSTAPIBASICTOKEN(URL,data)
}





const GETQUYHOACHCHITIET=(data,token)=>{

     var URL =API_URL+"/api/thuadatios/QuyhoachLogin"

    console.log(URL)
    return POSTAPI_TOKEN(URL,data,token)
 }

 
const GETHOSOQUYHOACH=(token)=>{

   var URL =API_URL+"/api/thuadatios/GetHoSo"

  console.log(URL)
  return GETAPI_TOKEN(URL,token)
}


const GETYKIEN=()=>{

   var URL =API_URL+"/api/thuadatios/GetYKien"

  console.log(URL)
  return GETAPIBASICTOKEN(URL)
}
const GETCONGBOQH=(data)=>{

   var URL ="";
   URL =API_URL+"/api/thuadatios/GetCongBoQH"

   console.log(URL)
   return GETAPIBASICTOKEN(URL,data)
}
const GETBINHLUAN=(ID,IDCHUCNANG)=>{

   var URL ="";
   URL =API_URL+"/api/thuadatios/GetBinhLuan?ID="+ID+"&IDCHUCNANG="+IDCHUCNANG

   console.log(URL)
   return GETAPIBASICTOKEN(URL)
}
const POSTBINHLUAN=(data)=>{

   var URL =API_URL+"/api/thuadatios/InsertYKien"
  
   return POSTAPIBASICTOKEN(URL,data)
}
const UPDATEBINHLUAN=(data)=>{

   var URL =API_URL+"/api/thuadatios/UpdateYKien"
   return POSTAPIBASICTOKEN(URL,data)
}
const DELETEBINHLUAN=(data)=>{
   var URL =API_URL+"/api/thuadatios/DeleteYKien"
   return POSTAPIBASICTOKEN(URL,data)
}

const TangView=(ID,IDCHUCNANG)=>{

   var URL =API_URL+"/api/thuadatios/TangView?ID="+ID+"&IDCHUCNANG="+IDCHUCNANG
   console.log(URL)
   return GETAPIBASICTOKEN(URL)
}

const DowloadFile=(DUONGDAN)=>{

   var URL =API_URL+"/api/thuadatios/DowloadDanhSachFile?DUONGDANFILE="+DUONGDAN
   console.log(URL)
   return GETAPIBASICTOKEN(URL)
}

export default {
    GETQUYHOACH,GETQUYHOACHCHITIET
    ,GETHOSOQUYHOACH,GETYKIEN,GETCONGBOQH
    ,GETBINHLUAN,POSTBINHLUAN,TangView
    ,UPDATEBINHLUAN,DELETEBINHLUAN,DowloadFile
}

