import React, { useEffect, useRef,forwardRef,useImperativeHandle,Component } from 'react';
import { Text, View } from 'react-native';
import { NativeEventEmitter, Platform, requireNativeComponent, NativeModules,  UIManager, findNodeHandle, DeviceEventEmitter } from 'react-native'

const COMPONENT_NAME = "MapArcgisView";

const AGSMap = requireNativeComponent(COMPONENT_NAME, AGSMapView);


class AGSMapView extends Component {
    constructor(props) {
        super(props);
       
    }
    showAlert() {
        console.log("Hello from Child Component")
        console.log(this.agsMapRef)
    }
    _onUpdate = event => {
    if (this.props.onUpdate) {
      this.props.onUpdate(event.nativeEvent);
       }
    };
    render() {
     
        return (
            <AGSMap  onSendSoTo_SoThua={this._onUpdate} {...this.props} style={{flex:1}} ref={e => this.agsMapRef = e} ></AGSMap>
        );
      }
    TruyenMaXa_ToNative (...args) {
        console.log(args)
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(this.agsMapRef),
          UIManager.getViewManagerConfig(COMPONENT_NAME).Commands.UpdateMaXa,
          [...args]
        );
        // UIManager.dispatchViewManagerCommand(
        //     findNodeHandle(this.agsMapRef),
        //     UIManager.getViewManagerConfig(COMPONENT_NAME).Commands.UpdateMapVeTinh,
        //     [],
        //    );
      }
      
      DrawGeoJSONRing (args) {
        console.log(args)
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(this.agsMapRef),
          UIManager.getViewManagerConfig(COMPONENT_NAME).Commands.DrawGeoJSONRing,
          [args]
        );
      }

   

      ChucNangMoRong (args) {
        console.log(args)
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(this.agsMapRef),
          UIManager.getViewManagerConfig(COMPONENT_NAME).Commands.ChucNangMoRong,
          [args]
        );
      }
//ios ccode nhanh
      TruyenIDMap_ToNative = (...args) => {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this.agsMapRef),
        UIManager[COMPONENT_NAME].Commands.updateMap,
        [...args]
      );
    };
    TruyenLocation_ToNative = (...args) => {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this.agsMapRef),
        UIManager[COMPONENT_NAME].Commands.updateLocation,
        [...args]
      );
    };

}
    


export default AGSMapView;
