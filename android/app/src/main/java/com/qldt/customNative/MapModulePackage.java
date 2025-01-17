package com.qldt.customNative;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nonnull;

public class MapModulePackage implements ReactPackage {
    private  MapModule mapModule;
    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
        List <NativeModule> modules = new ArrayList();
        mapModule =new MapModule(reactContext);
        modules.add(mapModule);
        return modules;
    }
    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext) {

        return Arrays.<ViewManager>asList(
            new MapVIewCustom(mapModule)
    );





  }
}