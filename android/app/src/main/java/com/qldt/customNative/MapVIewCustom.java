package com.qldt.customNative;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class MapVIewCustom extends SimpleViewManager<MapActivity> {
    private String soTo = "0";
    private String soThua = "0";
    private  MapActivity map ;
    private MapModule mapModule;
    @NonNull
    @Override
    public String getName() {
        return "MapArcgisView";
    }

    public  MapVIewCustom(MapModule mapModule){
        this.mapModule=mapModule;
    }
    @NonNull
    @Override
    public MapActivity createViewInstance(@NonNull ThemedReactContext reactContext) {

        map=new MapActivity(reactContext,soTo,soThua,mapModule);
        return map;
   }
    @ReactProp(name = "SoTo")
    public void setSoTo(MapActivity view, @Nullable String message) {
        Log.i("Set SoTo", "ANDROID_SAMPLE_UI");
        view.setSoTo(message);
    }
    @ReactProp(name = "URL_RanhThua")
    public void setURL_RanhThua(MapActivity view, @Nullable String message) {
        Log.i("Set ranh thua", "ANDROID_SAMPLE_UI");
        view.setURL_RanhThua(message);
    }
    @ReactProp(name = "URL_QuyHoach")
    public void setURL_QuyHoach(MapActivity view, @Nullable String message) {
        Log.i("Set URL_QuyHoach", "ANDROID_SAMPLE_UI");
        view.setURL_Quyhoach(message);
    }

    @ReactProp(name = "SoThua")
    public void setSoThua(MapActivity view, @Nullable String message) {
        Log.i("Set SoThua", "ANDROID_SAMPLE_UI");
        view.setSoThua(message);
    }
    @ReactProp(name = "IDVungQH")
    public void setIDVungQH(MapActivity view, @Nullable String message) {
        Log.i("Set IDVungQH", "ANDROID_SAMPLE_UI");
        view.setIDVungQH(message);
    }

    @ReactProp(name = "MaXa")
    public void setSoThua(MapActivity view, @Nullable int message) {
        Log.i("Set SoThua", "ANDROID_SAMPLE_UI");
        view.setMaXa(message);
    }

    @ReactProp(name = "UserNameDT")
    public void setUserNameDT(MapActivity view, @Nullable String message) {
        Log.i("Set UserNameDT", "ANDROID_SAMPLE_UI");
        view.setUserNameDT(message);
    }
    @ReactProp(name = "PasswordDT")
    public void setPasswordDT(MapActivity view, @Nullable String message) {
        Log.i("Set PasswordDT", "ANDROID_SAMPLE_UI");
        view.setPasswordDT(message);
    }

    @ReactProp(name = "layers")
    public void setLayers(MapActivity view, @Nullable ReadableArray layers) {
        Log.e("Nghia", "123"+layers);
        view.AddLayer(layers);
    }
    @ReactProp(name = "Opacity")
    public void setOpacityLayer(MapActivity view, @Nullable float message) {
        Log.i("Set Opacity", "ANDROID_SAMPLE_UI");
        view.setOpacityLayer(message);
    }


    @Override
    public Map<String,Integer> getCommandsMap() {
        Log.d("React"," View manager getCommandsMap:");
        return MapBuilder.of(
                "TimKiemThuaDat",
                1,"UpdateMaXa",2,"DrawGeoJSONRing",3,"ChucNangMoRong",4,"UpdateMapVeTinh",5,"UpdateMapDuong",6
              );
    }

    @Override
    public void receiveCommand(MapActivity view, int commandType, @Nullable ReadableArray args) {
        Assertions.assertNotNull(view);
        Assertions.assertNotNull(args);
        switch (commandType) {
            case 1: {
                view.TimKiem();
                return;
            }
            case 2: {
                view.UpdateMaXa(args.getMap(0));
                return;
            }
            case 3: {
                view.DrawGeoJSONRing(args.getMap(0));
                return;
            }
            case 4: {
                view.ChucNangMoRong(args.getMap(0));
                return;
            }
            case 5: {
                view.UpdateMapVeTinh();
                return;
            }
            case 6: {
                view.UpdateMapDuong();
                return;
            }

            default:
                throw new IllegalArgumentException(String.format(
                        "Unsupported command %d received by %s.",
                        commandType,
                        getClass().getSimpleName()));
        }
    }


}
