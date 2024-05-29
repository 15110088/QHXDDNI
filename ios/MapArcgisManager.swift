//
//  MapArcgisManager.swift
//  QLDT
//
//  Created by dinh tho on 11/2/20.
//

import Foundation
import ArcGIS

@objc(MapArcgisViewManager)
class MapArcgisViewManager: RCTViewManager {
  override func view() -> UIView! {
   
    return  MapViewArcgis()
  }
  
  @objc override static func requiresMainQueueSetup() -> Bool {
      return false
  }
  
  @objc func updateFromManager(_ node: NSNumber, SoTo: NSNumber,SoThua:NSNumber) {
   // Truyền dữ liệu từ react sang native.  count là giá trị truyền vào
   // truyên vào hàm update trong CuonterView
   // hàm nầy sẽ lấy giá trị set vào lable
    DispatchQueue.main.async {                               // 2
      let component = self.bridge.uiManager.view(            // 3
        forReactTag: node                                    // 4
      ) as! MapViewArcgis                                       // 5
      component.Get_SoTo_SoThua_fromRN(SoTo: SoTo,SoThua: SoThua)                    // 6
    }
  }
  
  @objc func UpdateMaXa(_ node: NSNumber, MaXa: NSNumber) {
   // Truyền dữ liệu từ react sang native.  count là giá trị truyền vào
   // truyên vào hàm update trong CuonterView
   // hàm nầy sẽ lấy giá trị set vào lable
    

    
    DispatchQueue.main.async {                               // 2
      let component = self.bridge.uiManager.view(            // 3
        forReactTag: node                                    // 4
      ) as! MapViewArcgis                                       // 5
     // var xa = MaXa["xa"] as? NSNumber
      component.Get_MaXa_fromRN(MaXaRN: MaXa)                    // 6
    }
  }
  
  @objc func DrawGeoJSONRing(_ node: NSNumber, Ring: String) {
   // Truyền dữ liệu từ react sang native.  count là giá trị truyền vào
   // truyên vào hàm update trong CuonterView
   // hàm nầy sẽ lấy giá trị set vào lable
    

    
    DispatchQueue.main.async {                               // 2
      let component = self.bridge.uiManager.view(            // 3
        forReactTag: node                                    // 4
      ) as! MapViewArcgis                                       // 5
     // var xa = MaXa["xa"] as? NSNumber
      component.DrawGeoJSONRing(Ring: Ring)                    // 6
    }
  }
  
  
  
  
  @objc func updateLocation(_ node: NSNumber) {
   // Truyền dữ liệu từ react sang native.  count là giá trị truyền vào
   // truyên vào hàm update trong CuonterView
   // hàm nầy sẽ lấy giá trị set vào lable
    DispatchQueue.main.async {                               // 2
      let component = self.bridge.uiManager.view(            // 3
        forReactTag: node                                    // 4
      ) as! MapViewArcgis                                       // 5
      component.Get_Location_fromRN()                    // 6
    }
  }
  
  @objc func updateID(_ node: NSNumber, ID: NSNumber) {
   // Truyền dữ liệu từ react sang native.  count là giá trị truyền vào
   // truyên vào hàm update trong CuonterView
   // hàm nầy sẽ lấy giá trị set vào lable
    DispatchQueue.main.async {                               // 2
      let component = self.bridge.uiManager.view(            // 3
        forReactTag: node                                    // 4
      ) as! MapViewArcgis                                       // 5
      component.Get_IDVungQH_fromRN(ID: ID)                    // 6
    }
  }
  @objc func updateMap(_ node: NSNumber, ID: NSNumber) {
   // Truyền dữ liệu từ react sang native.  count là giá trị truyền vào
   // truyên vào hàm update trong CuonterView
   // hàm nầy sẽ lấy giá trị set vào lable
    DispatchQueue.main.async {                               // 2
      let component = self.bridge.uiManager.view(            // 3
        forReactTag: node                                    // 4
      ) as! MapViewArcgis                                       // 5
      component.ChangeMap(ID: ID)                    // 6
    }
  }


}
