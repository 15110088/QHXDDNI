package com.qldt.customNative;

import android.content.Intent;

import com.esri.arcgisruntime.geometry.GeometryEngine;
import com.esri.arcgisruntime.geometry.Point;
import com.esri.arcgisruntime.geometry.SpatialReference;
import com.esri.arcgisruntime.mapping.Viewpoint;
import com.esri.arcgisruntime.mapping.view.MapView;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;

import javax.annotation.Nonnull;

public class MapModule  extends ReactContextBaseJavaModule {
    ReactApplicationContext context = getReactApplicationContext();

    static {
        System.loadLibrary("native-lib");
    }
    private native String invokeNativeFunction();
    private MapView mapView;

    public MapModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @Nonnull
    @Override
    public String getName() {
        return "MapArcgisViewModule";
    }


    public void setMapView(MapView mapView) {
        this.mapView = mapView;
    }


    @ReactMethod
    public void setLevel(float level) {
        // TODO: centerAndZoom is acting as if level was a factor even when the basemap is a TiledLayer
        // see https://developers.arcgis.com/android/api-reference/reference/com/esri/android/map/MapView.html#centerAndZoom(double,%20double,%20float)

    }

    @ReactMethod
    public void setCenterWGS84(float x, float y) {

        if (mapView != null) {
            Point pointWgs = new Point(x, y);
            Point pointMap = (Point) GeometryEngine.project(
                    pointWgs,
                    SpatialReference.create(4326)
            );
            Viewpoint pon= new Viewpoint(x, y, 70000);

            mapView.setViewpointAsync(pon,3f);
        }
    }

    @ReactMethod
    public void GetAPI(Callback callBack) {
        String eventId = invokeNativeFunction();
        callBack.invoke(eventId);

    }
}
