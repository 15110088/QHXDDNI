//
//  MapArcgisViewManager.m
//  QLDT
//
//  Created by dinh tho on 11/2/20.
//

#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(MapArcgisViewManager, RCTViewManager)
// Props truyền ra ngoài
RCT_EXPORT_VIEW_PROPERTY(SoTo, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(SoThua, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(onSendSoTo_SoThua, RCTDirectEventBlock)
//Hàm  tìm kiếm thửa đất truyền vào số tờ số thửa 
RCT_EXTERN_METHOD(
  updateFromManager:(nonnull NSNumber *)node
  SoTo:(nonnull NSNumber *)SoTo
  SoThua:(nonnull NSNumber *)SoThua

)
//Hàm Zoom Xa truyền vào mã xã
RCT_EXTERN_METHOD(
  UpdateMaXa:(nonnull NSNumber *)node
  MaXa:(nonnull NSNumber *)MaXa
)
//Hàm định vị không cần truyền biến 
RCT_EXTERN_METHOD(
  updateLocation:(nonnull NSNumber *)node
)
//Hàm thay đổi bản đồ
RCT_EXTERN_METHOD(
  updateMap:(nonnull NSNumber *)node
  ID:(nonnull NSNumber *)ID
)
//Hàm Zoom Xa truyền vào mã xã
RCT_EXTERN_METHOD(
  DrawGeoJSONRing:(nonnull NSNumber *)node
  Ring:(nonnull NSString *)Ring
)

RCT_EXTERN_METHOD(
  updateID:(nonnull NSNumber *)node
  ID:(nonnull NSNumber *)ID
)

@end
