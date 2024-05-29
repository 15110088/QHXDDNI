//
//  MapArcView.swift
//  nativeIOS
//
//  Created by dinh tho on 9/30/20.
//

import UIKit
import ArcGIS

// var webTiledLayerRoad = AGSWebTiledLayer(urlTemplate: "https://mts1.google.com/vt/lyrs=m&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile")
//  var webTiledLayerVeTinh = AGSWebTiledLayer(urlTemplate: "https://mt1.google.com/vt/lyrs=y&x={col}&y={row}&z={level}&s=Galile")
//  map =  AGSMap(spatialReference: AGSSpatialReference(wkid: 3857)!)
// allLayers = [webTiledLayerRoad, featureBienDao,featureLayerDVHC, tiledLayer_QuyHoach,tileLayer_QuyhoachXD,mapImageLayerThua]
//  map.operationalLayers.addObjects(from: allLayers)
          
//   mapView.map = map


class MapViewArcgis: UIView ,AGSGeoViewTouchDelegate,AGSCalloutDelegate{
  @objc var onSendSoTo_SoThua: RCTDirectEventBlock? // sử dung truyền dữ liệu từ native sang react
  func licenseApplication() {
          do {
              try AGSArcGISRuntimeEnvironment.setLicenseKey("runtimelite,1000,rud6806025350,none,1JPJD4SZ8Y4DRJE15232")
          } catch {
              print("[Error: AGSArcGISRuntimeEnvironment] Error licensing app: \(error.localizedDescription)")
          }
      }
  
  @objc var SoTo: NSNumber = 12;
  @objc var SoThua: NSNumber = 33;
  @objc var MaXa: NSNumber = 26380;
  
  @objc var OpacityMap: Float = 1;


  private var allLayers: [AGSLayer] = []
  private var featureTable: AGSServiceFeatureTable?//dùng để Tìm kiếm
  private var featureTableXa: AGSServiceFeatureTable?// dùng để zoom
  private var featureLayer: AGSFeatureLayer?// thông tin layer ranh thửa
  private var featureTableQH: AGSServiceFeatureTable?//dùng để Tìm kiếm Vùng Quy Hoạch
  private var featureLayerQH_Search: AGSFeatureLayer?// thông tin layer ranh thửa
  var envelopXa :AGSEnvelope?
  var selectedFeatures = [AGSFeature]()
  var selectedFeaturesQH = [AGSFeature]()

  let mapview:AGSMapView  =  AGSMapView()
  
  let graphicsOverlay = AGSGraphicsOverlay()


  private let basemapInfoArray: [(basemap: AGSBasemap, label: String)] = [
          (.openStreetMap(), "OpenStreetMap (Raster)"),
        (.darkGrayCanvasVector(), "Dark Gray Canvas (Vector)"),
         (.imagery(), "Imagery (Raster)"),
         (.imageryWithLabels(), "Imagery w/ Labels (Raster)"),
         (.imageryWithLabelsVector(), "Imagery w/ Labels (Vector)"),
         (.lightGrayCanvas(), "Light Gray Canvas (Raster)"),
         (.lightGrayCanvasVector(), "Light Gray Canvas (Vector)"),
         (.nationalGeographic(), "National Geograhpic (Raster)"),
         (.navigationVector(), "Navigation (Vector)"),
         (.oceans(), "Oceans (Raster)"),
         (.streets(), "Streets (Raster)"),
         (.streetsVector(), "Streets (Vector)"),
         (.streetsNightVector(), "Streets Night (Vector)"),
         (.streetsWithReliefVector(), "Streets w/ Relief (Vector)"),
         (.terrainWithLabels(), "Terrain w/ Labels (Raster)"),
         (.terrainWithLabelsVector(), "Terrain w/ Labels (Vector)"),
         (.topographic(), "Topographic (Raster)"),
         (.topographicVector(), "Topographic (Vector)")
     ]
  let map = AGSMap(basemapType: .openStreetMap, latitude:10.8545598,longitude:106.8514206, levelOfDetail: 10)
  //let map=AGSMap(basemap: .openStreetMap())


  //khai báo layer màu
  let featureLayerQH: AGSArcGISTiledLayer? = {
    var url_QH = URL(string: "https://datdai.stnmt.dongnai.gov.vn:8443/arcgisdichvu/rest/services/DOTHIBIENHOA/PhanKhu_26377/MapServer")!
            let phanKhuLayer=AGSArcGISTiledLayer(url: url_QH);
            phanKhuLayer.credential=AGSCredential(user: "dothi2021", password: "Anhdung@pass")
    return phanKhuLayer
   }()
  
  func makeUIView() ->  AGSMap {
          //Thêm Lớp Ranh Thửa vào Map

            let featureServiceURLRT = URL(string: GetURLMap(MaXa))!
             let featureTableService = AGSServiceFeatureTable(url: featureServiceURLRT)
             let featureLayerRT = AGSFeatureLayer(featureTable: featureTableService)
             self.featureLayer=featureLayerRT;
        //Tạo table để tìm kiếm Ranh Thửa
              //let featureServiceURL = URL(string:"http://datdai.stnmt.dongnai.gov.vn/arcgis/rest/services/DOTHIBIENHOA/26377/MapServer/0")!
//              let featureTableTimKiem = AGSServiceFeatureTable(url: featureServiceURLRT)
//                    featureTableTimKiem.credential=AGSCredential(user: "dothi2021", password: "Anhdung@pass")
//                  self.featureTable=featureTableTimKiem
    
          //Tạo table để tìm kiếm vùng quy hoạch
//          var url_QH = URL(string: "https://datdai.stnmt.dongnai.gov.vn:8443/arcgisdichvu1882022/rest/services/DOTHIBIENHOA/PhanKhu_26377/MapServer/0")!
//          let featureTableServiceQH = AGSServiceFeatureTable(url: url_QH)
//          featureTableServiceQH.credential=AGSCredential(user: "dothi2021", password: "Anhdung@pass")
//          self.featureTableQH=featureTableServiceQH;
//          let featureLayerQH_Search = AGSFeatureLayer(featureTable: featureTableServiceQH)
//          self.featureLayerQH_Search=featureLayerQH_Search

    
  
        //Tạo table để tìm kiếm xã
        let featureServiceURLXa = URL(string: "https://datdai.stnmt.dongnai.gov.vn:8443/arcgis160dd/rest/services/hanhchinh/HanhChinhDNAILIS/MapServer/1")!
        let _featureTableXa = AGSServiceFeatureTable(url: featureServiceURLXa)
    _featureTableXa.credential=AGSCredential(user: "08032022", password: "P@ssw0rdArcGisServer@123")
        self.featureTableXa = _featureTableXa
    
    var url_QH_MapServer = URL(string: GetURLMapQH(MaXa))!
           
    
    let featureLayerQH_Array = AGSArcGISTiledLayer(url: url_QH_MapServer)
    featureLayerQH_Array.credential=AGSCredential(user: "dothibienhoa", password: "Conlaumoikhai20@22")
    featureLayerQH_Array.opacity=self.OpacityMap;
    
    var webTiledLayerRoad = AGSWebTiledLayer(urlTemplate: "https://mts1.google.com/vt/lyrs=m&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile")
    var webTiledLayerVeTinh = AGSWebTiledLayer(urlTemplate: "https://mt1.google.com/vt/lyrs=y&x={col}&y={row}&z={level}&s=Galile")
//    map = AGSMap(spatialReference: AGSSpatialReference(wkid: 3857)!)
//    allLayers = [webTiledLayerRoad, featureBienDao,featureLayerDVHC, tiledLayer_QuyHoach,tileLayer_QuyhoachXD,mapImageLayerThua] map.operationalLayers.addObjects(from: allLayers) mapView.map = map
    allLayers=[webTiledLayerRoad,featureLayerQH_Array]
    
    

     //       map.operationalLayers.add(featureLayerQH_Array)
//        map.operationalLayers.add(self.featureLayerQH_Search)
//        map.operationalLayers.add(self.featureLayer)
  map.operationalLayers.addObjects(from: allLayers)

        return map
  }

  
  let slider: UISlider = {
      let slider = UISlider()
    let screenSize: CGRect = UIScreen.main.bounds
    slider.frame = CGRect(x: screenSize.width-120, y: 125, width: 170, height: 70);
    slider.transform = CGAffineTransform(rotationAngle: CGFloat(-Double.pi/2))
      slider.minimumValue = 0
      slider.maximumValue = 1
      slider.value = 1
      slider.isContinuous = true
      slider.maximumTrackTintColor = UIColor(white: 0, alpha: 0.3)

      // ** COMMENT THIS OUT **
      slider.addTarget(self, action: #selector(onSliderValChanged(sender:event:)), for: .valueChanged)

      return slider
  }()
  
  @objc func onSliderValChanged(sender: UISlider, event: UIEvent) {

    allLayers[1].opacity=Float(sender.value*1.0)

    /*
      use this code in step-4 instead

      slider.value = round(sender.value)

      UIView.animate(withDuration: 0.25, animations: {
          self.slider.layoutIfNeeded()

          let trackRect = sender.trackRect(forBounds: sender.frame)
          let thumbRect = sender.thumbRect(forBounds: sender.bounds, trackRect: trackRect, value: sender.value)
          self.milesLabel.center = CGPoint(x: thumbRect.midX, y: sender.frame.origin.y - 55)

          // ** all the other views are aligned with the thumbRect's center as it slides **

          self.clearView.frame.origin = self.milesLabel.frame.origin
      })
      */
  }
  
  lazy var button: UIButton = {
    let b = UIButton.init(type: UIButton.ButtonType.system)
    b.titleLabel?.font = UIFont.systemFont(ofSize: 50)
    b.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    b.setTitle("Button Title", for: .normal)
    

    return b
  }()
  
 
  required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
        setupView();

      }
    override init(frame: CGRect) {
      super.init(frame: frame)
      setupView();
      
    }
  

  private func setupView() {
    licenseApplication();
    mapview.map=makeUIView();
    // có dòng này mới hiện thị map lên screen
    mapview.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    mapview.touchDelegate=self
    mapview.locationDisplay.autoPanMode = .recenter
    ZoomXa(MaXa)
  

    self.addSubview(mapview);
    self.addSubview(slider)


    }
 
  func geoView(_ geoView: AGSGeoView, didTapAtScreenPoint screenPoint: CGPoint, mapPoint: AGSPoint) {
//    guard let featureLayer1 = featureLayerQH_Search,
//        let featureTable1 = featureTableQH else {
//            return
//    }
//    if !self.selectedFeaturesQH.isEmpty {
//      featureLayer1.unselectFeatures(selectedFeaturesQH)
//      self.selectedFeaturesQH.removeAll()
//    }
//    var grap=result.geoElements[0]
//    var to=grap.attributes.value(forKey: "SH_TO") as! NSNumber
//    var thua=grap.attributes.value(forKey:"SH_THUA")as! NSNumber
//    var DienTich=grap.attributes.value(forKey:"DIEN_TICH")as! NSNumber
//    var loaiDat = grap.attributes.value(forKey:"LOAIDAT")as! NSString
//    print(to)
//    print(thua)
//    print(DienTich)
//    self.mapview.graphicsOverlays.removeAllObjects();
    // deselect all selected features
   
    self.SendDataMapToReactNative(to: mapPoint.x,thua: mapPoint.y,dientich: 0,loaidat: "")
    //var d=AGSPoint;
    print(mapPoint.x);
    print(mapPoint.y);

    print("23");
  }
  
  
  //Gửi số tờ số thửa lên react native khi click. vào một điểm
  @objc func SendDataMapToReactNative(to:Double,thua:Double,dientich:NSNumber,loaidat:NSString) {// truyền sự kiên biến  count qua react native  khi long press
    if onSendSoTo_SoThua != nil {
      let data:[Any]=[
        [
        "SoTo":to,
        "SoThua":thua,
        "DienTich":dientich,
        "LoaiDat":loaidat
        ]
      ]
      onSendSoTo_SoThua!(["dataToThua": data])// trên react. dùng e.nativeEvent.count để lấy biến count
    }
    else{
          print("on update null");
        }
  }
  //Lấy số tờ số thửa từ react native
  @objc func Get_SoTo_SoThua_fromRN(SoTo: NSNumber,SoThua:NSNumber) {
    print("update title")
    print(SoTo)
    print(SoThua)
    selectFeaturesForSearchTerm(SoTo,SoThua)
    
  }
  
  //Lấy ID vùng quy hoạchtừ react native
  @objc func Get_IDVungQH_fromRN(ID: NSNumber) {
    print("update vung quy hoach")
    print(ID)
    TimKiemVungQuyHoach(ID)
  }
  
  @objc func ChangeMap(ID: NSNumber) {
    print("ChangeMap")
    print(ID)
    ThayDoiBanDo(ID)
  }
  
  //Lấy MaXa từ react native
  //Hàm chọn laị phường xã reload map
  @objc func Get_MaXa_fromRN(MaXaRN: NSNumber) {
    mapview.map?.operationalLayers.removeAllObjects();
    print("update MaXa")
    print(MaXaRN)
    MaXa=MaXaRN
    setupView()
  }
  
  //Lấy MaXa từ react native
  //Hàm chọn laị phường xã reload map
  @objc func DrawGeoJSONRing(Ring: String) {
    print("update DrawGeoJSONRing")
    print(Ring)
    
    do {
      //mapview.map?.operationalLayers.removeAllObjects();

      mapview.graphicsOverlays.removeAllObjects()
      // if(Ring.Count()>10)
      // {
      let dict = convertToDictionary(text: Ring)
  

         let polygon = (try? AGSPolygon.fromJSON(dict)) as! AGSPolygon
             let polygonSymbolOut =   AGSSimpleLineSymbol(
              style: .solid,
              color:  UIColor.cyan,
              width: 3
             )
      let polygonSymbol = AGSSimpleFillSymbol(style: AGSSimpleFillSymbolStyle.solid, color: UIColor(white: 1, alpha: 0), outline: polygonSymbolOut)

             let polygonGraphic = AGSGraphic(geometry: polygon, symbol: nil, attributes: nil)
      self.graphicsOverlay.graphics.removeAllObjects();
            self.graphicsOverlay.renderer = AGSSimpleRenderer(symbol: polygonSymbol)
            self.graphicsOverlay.graphics.add(polygonGraphic)
             mapview.graphicsOverlays.add(self.graphicsOverlay)
             mapview.setViewpointGeometry(polygon, padding: 25)
     //  }
    } catch {
        print("User creation failed with error: \(error)")
    }

  }
  func convertToDictionary(text: String) -> [String: Any]? {
      if let data = text.data(using: .utf8) {
          do {
              return try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
          } catch {
              print(error.localizedDescription)
          }
      }
      return nil
  }

  @objc func Get_Location_fromRN() {
    print("update Location")
    mapview.locationDisplay.start { [weak self] (error) in
           if let error = error {
             //  self?.showError(error)
           }
    }
  }
  
  //Thay đổi layer
  func ThayDoiBanDo(_ ID: NSNumber)
  {
    var webTiledLayerRoad = AGSWebTiledLayer(urlTemplate: "https://mts1.google.com/vt/lyrs=m&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile")
    var webTiledLayerVeTinh = AGSWebTiledLayer(urlTemplate: "https://mt1.google.com/vt/lyrs=y&x={col}&y={row}&z={level}&s=Galile")

    switch ID {
    case 3:
      //mapview.map?.basemap = self.basemapInfoArray[3].basemap
      
      allLayers[0]=webTiledLayerRoad;

      //let layer = removedLayers

      //mapview.map?.operationalLayers.removeObject(at: 0);
      
      //mapview.map?.operationalLayers.remove(self.featureLayerQH as Any)
      mapview.map?.basemap = self.basemapInfoArray[0].basemap
      mapview.map?.operationalLayers.removeAllObjects();
      mapview.map?.operationalLayers.addObjects(from: allLayers)
    case 0:
      allLayers[0]=webTiledLayerVeTinh;
      mapview.map?.basemap = self.basemapInfoArray[0].basemap
      mapview.map?.operationalLayers.removeAllObjects();
      mapview.map?.operationalLayers.addObjects(from: allLayers)
    
      //mapview.map?.operationalLayers.insert(layer, at:0)
    default:
      allLayers[0]=webTiledLayerRoad;

        // mapview.map?.basemap = self.basemapInfoArray[0].basemap

    }

  }
  private var removedLayers: [AGSLayer] {
    if let operationalLayers = mapview.map?.operationalLayers as? [AGSLayer] {
      return allLayers.filter { !operationalLayers.contains($0)}
        }
        return []
    }
    
  //Hàm zoom theo xã
  func ZoomXa(_ MaXa: NSNumber)
  {
    let queryParams = AGSQueryParameters()
    queryParams.whereClause = "MASO=\(MaXa)"
    featureTableXa?.queryFeatures(with: queryParams) { [weak self] (result: AGSFeatureQueryResult?, error: Error?) in
        guard let self = self else {
            return
        }
        
        if let error = error {
            // display the error as an alert
           print(error)
        } else if let features = result?.featureEnumerator().allObjects {
            if !features.isEmpty {
                // display the selection
                // zoom to the selected feature
             // self.mapview.setViewpointCenter(features., scale: 10000, completion: nil)

              self.mapview.setViewpointGeometry(features.first!.geometry!, padding: 10)
              self.mapview.map?.minScale=100000 
            }
            // update selected features array
            self.selectedFeatures = features
        }
    }
  }
  //Hàm Tìm Kiếm Vùng Quy Hoạch
  func TimKiemVungQuyHoach(_ ID: NSNumber) {
    guard let featureLayer = featureLayerQH_Search,
        let featureTable = featureTableQH else {
            return
    }
    
    // deselect all selected features
    if !selectedFeaturesQH.isEmpty {
        featureLayer.unselectFeatures(selectedFeaturesQH)
      selectedFeaturesQH.removeAll()
    }
    
    
    let queryParams = AGSQueryParameters()
    queryParams.whereClause = "OBJECTID_1='\(ID)'"
    let symbol=AGSSimpleLineSymbol(style: .solid, color: UIColor(ciColor: .green), width: 5)
    

    
    featureTable.queryFeatures(with: queryParams) { [weak self] (result: AGSFeatureQueryResult?, error: Error?) in
        guard let self = self else {
            return
        }
        
        if let error = error {
            // display the error as an alert
           print(error)
        } else if let features = result?.featureEnumerator().allObjects {
          let disgrap=AGSGraphic(geometry:features.first!.geometry!, symbol: symbol, attributes: nil)
          let graphoverlay=AGSGraphicsOverlay()
          graphoverlay.graphics.add(disgrap)
            if !features.isEmpty {
                // display the selection
              featureLayer.select(features)
                
       
              
                // zoom to the selected feature
               self.mapview.graphicsOverlays.removeAllObjects();
               self.mapview.graphicsOverlays.add(graphoverlay);
              //let fullExtent = featureLayer.fullExtent?.center;
//let latitute: Double = fullExtent!.x
            //  let longitude: Double = fullExtent!.y;
//
          //    let bassLocation = AGSViewpoint(latitude: latitute, longitude: longitude+0.5, scale: 25)
          //    self.envelopXa = AGSEnvelope(center: featureLayer.fullExtent!.center,width: 0.5,height: 0.5)

             // let bassLocation = AGSPoint(x: fullExtent?.width, y: fullExtent.height+0.5, spatialReference: .wgs84())
              self.mapview.setViewpointGeometry(features.first!.geometry!, padding: 25)
             // self.mapview.(self.envelopXa)
            } else {
                if let fullExtent = featureLayer.fullExtent {
                    // no matches, zoom to show everything in the layer
//                  self.mapview.graphicsOverlays.removeAllObjects();
//                  self.mapview.graphicsOverlays.add(graphoverlay);
                  //  self.mapview.setViewpointGeometry(fullExtent, padding: 50)
                }
            }
            // update selected features array
            self.selectedFeaturesQH = features
        }
    }
  }
  //Hàm Tìm kiếm nhập số tờ số thửa
  func selectFeaturesForSearchTerm(_ SoTo: NSNumber,_ SoThua: NSNumber) {
         guard let featureLayer = featureLayer,
             let featureTable = featureTable else {
                 return
         }
         
         // deselect all selected features
         if !selectedFeatures.isEmpty {
             featureLayer.unselectFeatures(selectedFeatures)
             selectedFeatures.removeAll()
         }
         
         let queryParams = AGSQueryParameters()
         queryParams.whereClause = "SH_TO='\(SoTo)' and SH_THUA='\(SoThua)'"

         featureTable.queryFeatures(with: queryParams) { [weak self] (result: AGSFeatureQueryResult?, error: Error?) in
             guard let self = self else {
                 return
             }
             
             if let error = error {
                 // display the error as an alert
                print(error)
             } else if let features = result?.featureEnumerator().allObjects {
                 if !features.isEmpty {
                     // display the selection
                     featureLayer.select(features)
                     
                     // zoom to the selected feature
                     self.mapview.setViewpointGeometry(features.first!.geometry!, padding: 25)
                 } else {
                     if let fullExtent = featureLayer.fullExtent {
                         // no matches, zoom to show everything in the layer
                         self.mapview.setViewpointGeometry(fullExtent, padding: 50)
                     }
                 }
                 // update selected features array
                 self.selectedFeatures = features
             }
         }
     }
  //Lây đường dẫn bản đồ
  func GetURLMap(_ MaXa:NSNumber)->String{
     var URL="";
     URL="https://datdai.stnmt.dongnai.gov.vn:8443/arcgisdichvu1882022/rest/services/DOTHIBIENHOA/"+MaXa.stringValue+"/MapServer/0"
     return URL
     
   }
  //Lây đường dẫn bản đồ phan khu
  func GetURLMapQH(_ MaXa:NSNumber)->String{
    var URL="";
    URL="https://datdai.stnmt.dongnai.gov.vn:8443/arcgisdichvu/rest/services/DOTHIBIENHOA/PhanKhu_"+MaXa.stringValue+"/MapServer"
    return URL
    
  }
  
  
}


  


