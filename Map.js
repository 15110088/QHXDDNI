// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import {
//   requireNativeComponent,
//   UIManager,
//   findNodeHandle
// } from "react-native";
// const COMPONENT_NAME = "MapArcgisView1";
// const RNMapViewNative = requireNativeComponent(COMPONENT_NAME);

// export default class Map extends Component {
//    _onUpdate = event => {
//     if (this.props.onUpdate) {
//       this.props.onUpdate(event.nativeEvent);
//        }
//     };
//     render() {
//       const {style } = this.props;

//       return (
//         <RNMapViewNative       
//             ref={ref => this.ref = ref}
//             onSendSoTo_SoThua={this._onUpdate}
//             style={style} />
//       );
//     }
//     TruyenSoToSoThua_ToNative = (...args) => {
//       UIManager.dispatchViewManagerCommand(
//         findNodeHandle(this.ref),
//         UIManager[COMPONENT_NAME].Commands.updateFromManager,
//         [...args]
//       );
//     };
//     TruyenMaXa_ToNative = (...args) => {
//       UIManager.dispatchViewManagerCommand(
//         findNodeHandle(this.ref),
//         UIManager[COMPONENT_NAME].Commands.updateMaXa,
//         [...args]
//       );
//     };
//     TruyenLocation_ToNative = (...args) => {
//       UIManager.dispatchViewManagerCommand(
//         findNodeHandle(this.ref),
//         UIManager[COMPONENT_NAME].Commands.updateLocation,
//         [...args]
//       );
//     };

//     TruyenIDVungQH_ToNative = (...args) => {
//       UIManager.dispatchViewManagerCommand(
//         findNodeHandle(this.ref),
//         UIManager[COMPONENT_NAME].Commands.updateID,
//         [...args]
//       );
//     };
//     TruyenIDMap_ToNative = (...args) => {
//       UIManager.dispatchViewManagerCommand(
//         findNodeHandle(this.ref),
//         UIManager[COMPONENT_NAME].Commands.updateMap,
//         [...args]
//       );
//     };
//   }