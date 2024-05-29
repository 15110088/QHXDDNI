package com.qldt.customNative;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.Constraints;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.SeekBar;
import android.widget.Toast;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import com.esri.arcgisruntime.arcgisservices.LabelDefinition;
import com.esri.arcgisruntime.geometry.AngularUnit;
import com.esri.arcgisruntime.geometry.AngularUnitId;
import com.esri.arcgisruntime.geometry.GeodeticCurveType;
import com.esri.arcgisruntime.geometry.Geometry;
import com.esri.arcgisruntime.geometry.GeometryType;
import com.esri.arcgisruntime.geometry.ImmutablePart;
import com.esri.arcgisruntime.geometry.LinearUnit;
import com.esri.arcgisruntime.geometry.LinearUnitId;
import com.esri.arcgisruntime.geometry.Multipart;
import com.esri.arcgisruntime.geometry.Multipoint;
import com.esri.arcgisruntime.geometry.Part;
import com.esri.arcgisruntime.geometry.PointCollection;
import com.esri.arcgisruntime.geometry.Polygon;
import com.esri.arcgisruntime.geometry.Polyline;
import com.esri.arcgisruntime.geometry.SpatialReference;
import com.esri.arcgisruntime.layers.WebTiledLayer;
import com.esri.arcgisruntime.mapping.Viewpoint;
import com.esri.arcgisruntime.mapping.view.Graphic;
import com.esri.arcgisruntime.mapping.view.GraphicsOverlay;
import com.esri.arcgisruntime.symbology.CompositeSymbol;
import com.esri.arcgisruntime.symbology.SimpleFillSymbol;
import com.esri.arcgisruntime.symbology.SimpleLineSymbol;
import com.esri.arcgisruntime.symbology.SimpleMarkerSymbol;
import com.esri.arcgisruntime.symbology.Symbol;
import com.google.gson.*;


import com.esri.arcgisruntime.ArcGISRuntimeEnvironment;
import com.esri.arcgisruntime.ArcGISRuntimeException;
import com.esri.arcgisruntime.concurrent.ListenableFuture;
import com.esri.arcgisruntime.data.Feature;
import com.esri.arcgisruntime.data.FeatureCollection;
import com.esri.arcgisruntime.data.FeatureCollectionTable;
import com.esri.arcgisruntime.data.FeatureQueryResult;
import com.esri.arcgisruntime.data.QueryParameters;
import com.esri.arcgisruntime.data.ServiceFeatureTable;
import com.esri.arcgisruntime.geometry.Envelope;
import com.esri.arcgisruntime.geometry.GeometryEngine;
import com.esri.arcgisruntime.geometry.Point;
import com.esri.arcgisruntime.geometry.SpatialReferences;
import com.esri.arcgisruntime.layers.ArcGISTiledLayer;
import com.esri.arcgisruntime.layers.FeatureLayer;
import com.esri.arcgisruntime.layers.Layer;
import com.esri.arcgisruntime.mapping.ArcGISMap;
import com.esri.arcgisruntime.mapping.Basemap;
import com.esri.arcgisruntime.mapping.GeoElement;
import com.esri.arcgisruntime.mapping.LayerList;
import com.esri.arcgisruntime.mapping.view.DefaultMapViewOnTouchListener;
import com.esri.arcgisruntime.mapping.view.IdentifyLayerResult;
import com.esri.arcgisruntime.mapping.view.LocationDisplay;
import com.esri.arcgisruntime.mapping.view.MapView;
import com.esri.arcgisruntime.security.UserCredential;
import com.esri.arcgisruntime.symbology.TextSymbol;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.ReactInstanceManager;

import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.gson.reflect.TypeToken;
import com.qldt.DB.VungQH;
import com.qldt.MainActivity;
import com.qldt.R;
import com.qldt.model.AGSpoint;

import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import kotlin.text.Regex;

public class MapActivity extends LinearLayout implements LifecycleEventListener  {

    // Variable Arcgis
    private MapView mMapView;
    private ArcGISMap map;
    ArcGISTiledLayer layerGG;
    ArcGISTiledLayer tiledLayerBaseMap;
    private MapModule mapModule;

    private ServiceFeatureTable mServiceFeatureTable;
    private FeatureLayer mFeatureLayer;
    private ServiceFeatureTable mServiceFeatureTableMauQH;
    private FeatureLayer mFeatureLayerMauQH;
    private LocationDisplay lDisplayManager;
    private LocationDisplay mLocationDisplay;
    Basemap.Type basemapType;
    String soTo = "0";
    String idVungQH="0";
    String  soThua = "0";
    String  dienTich = "0";
    String  loaiDat="";
    String  kvhcTD="";
    String PasswordDT="093stmnt";
    String UserNameDT="sotainguyen";
    String PasswordNen="sotainguyen";
    String UserNameNen="093stmnt";
    String UrlRanhThua="123";
    String urlQuyHoach="123";
    List<VungQH> LstVungQH=new ArrayList<>();
    boolean DoCanh = false;
    String ThuaDatBackUp="";
    private native String invokeNativeFunction();


    private double latitute ;
    private  double longtitute;
    final WebTiledLayer webTiledLayer = new WebTiledLayer("https://mt1.google.com/vt/lyrs=y&x={col}&y={row}&z={level}&s=Galile");
    final WebTiledLayer webTiledLayerRoad = new WebTiledLayer("https://mts1.google.com/vt/lyrs=m&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile");
    static {
        System.loadLibrary("native-lib");
    }


    float opacity = 1;
    private SeekBar btnOpacity;

    private static LayerList ListLayer_Map;
    List<FacilityModel> ListLocation;

    //
    private Context context;
    private  int _MaXa=26380;

    public MapActivity(Context context,String SoTo,String SoThua,MapModule mapModule) {
        super(context);//ADD THIS
        this.context = context;
        this.soThua=SoThua;
        this.soTo=SoTo;
        this.mapModule = mapModule;

        init();

    }

    public void init() {

        String jsonFileString = loadJSONFromAsset();
        Gson gson = new Gson();
        Type listUserType = new TypeToken<List<FacilityModel>>() { }.getType();

        ListLocation = gson.fromJson(jsonFileString, listUserType);

        //    inflate(context.getApplicationContext(), R.layout.activity_map, this);
//        if (context instanceof ReactContext) {
//            ((ReactContext) context).addLifecycleEventListener(this);
//        }
        inflate(context, R.layout.activity_map, this);
        mMapView = findViewById(R.id.mapView);
        setupMap();
        setupLocationDisplay();

        showCallLayout();
        btnOpacity = findViewById(R.id.btnOpacity);




        // Set the current to progress
        // and display in the TextView
        btnOpacity.setProgress(100);

        // On Change Listener to change
        // current values as drag
        btnOpacity.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                btnOpacity.setProgress(i);
                opacity =(float) i/100;
                tiledLayerBaseMap.setOpacity(opacity);
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

    }

    @SuppressLint("ClickableViewAccessibility")
    public void setupMap() {
        ArcGISRuntimeEnvironment.setLicense("runtimelite,1000,rud6806025350,none,1JPJD4SZ8Y4DRJE15232");
        if (mMapView != null) {
            double latitude =  10.859027;
            double longitude = 106.862645;
            map = new ArcGISMap(SpatialReference.create(3857));
            tiledLayerBaseMap = new ArcGISTiledLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer");
            mServiceFeatureTable =new ServiceFeatureTable("https://services3.arcgis.com/HV12pKzVNa7vmogy/ArcGIS/rest/services/HanhChinhDNAILIS/FeatureServer/0");
            mFeatureLayer =new FeatureLayer(mServiceFeatureTable);

            ListLayer_Map = map.getOperationalLayers();
            ListLayer_Map.add(webTiledLayerRoad);
            ListLayer_Map.add(tiledLayerBaseMap);
          //  ListLayer_Map.add(mFeatureLayer);

            map.setMinScale(70000);
            mMapView.setMap(map);
            mMapView.getMap().addDoneLoadingListener(() -> {
                ArcGISRuntimeException e = mMapView.getMap().getLoadError();
                Boolean success = e != null;
                String errorMessage = !success ? "" : e.getMessage();
                WritableMap map = Arguments.createMap();
                map.putBoolean("success",success);
                map.putString("errorMessage",errorMessage);

            });
            lDisplayManager = mMapView.getLocationDisplay();
            mapModule.setMapView(mMapView);
            Viewpoint pon= new Viewpoint(latitude, longitude,70000);
            mMapView.setViewpoint(pon);
            //ZoomToXa(mMapView,_MaXa);
        }
    }
    public void emitEvent(String eventName, WritableMap args) {
        ((ReactContext) getContext()).getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                eventName,
                args
        );
    }
    private  void showCallLayout(){
        mMapView.setOnTouchListener(new DefaultMapViewOnTouchListener(this.context, mMapView) {
            @Override
            public boolean onSingleTapConfirmed(MotionEvent e) {
                Log.d("Info", "onSingleTapConfirmed: " + e.toString());
                //    mFeatureLayerMauQH.clearSelection();
                Point clickPoint = mMapView
                        .screenToLocation(new android.graphics.Point(Math.round(e.getX()), Math.round(e.getY())));

                Point wgs84Point = (Point) GeometryEngine.project(clickPoint, SpatialReferences.getWgs84());

                LstVungQH.removeAll(LstVungQH);
                QueryParameters query = new QueryParameters();
                query.setGeometry(clickPoint);
                //Code api
                latitute = wgs84Point.getY();
                longtitute = wgs84Point.getX();
                Gson gson = new Gson();
                VungQH VungTD  =new VungQH();
                VungTD.setSoTo(String.valueOf(clickPoint.getX()));
                VungTD.setSoThua(String.valueOf(clickPoint.getY()));

                String jsonTD = gson.toJson(VungTD);
                ReactContext reactContext = (ReactContext) mMapView.getContext();

                reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("dataToThua", jsonTD);


                return true;
            }
        });

    }
    private void addNestingGround(Geometry nestingGround) {

        ThuaDatBackUp = nestingGround.toJson();
        //Link GoogMap
        Point pointCenter = new Point(Math.round(nestingGround.getExtent().getCenter().getX()), Math.round(nestingGround.getExtent().getCenter().getY()), SpatialReference.create(3857));
        Point wgs84Point = (Point) GeometryEngine.project(pointCenter, SpatialReferences.getWgs84());
        latitute = wgs84Point.getY();

        longtitute = wgs84Point.getX();


        List<Point> LstPoint = new ArrayList<>();

        mMapView.getGraphicsOverlays().clear();
        LinearUnit linearUnit = new LinearUnit(LinearUnitId.METERS);
        AngularUnit angularUnit = new AngularUnit(AngularUnitId.DEGREES);

        //String json = (((Polygon) nestingGround).toPolyline().toJson());
        (((Polygon) nestingGround)).getParts();
        for (ImmutablePart name : (((Polygon) nestingGround)).getParts()) {
            for (Point name2 : name.getPoints()) {
                LstPoint.add(name2);

            }
        }
        if (LstPoint.size() > 0) {
            LstPoint.add(LstPoint.get(0));

        }
//        Pattern pattern = Pattern.compile("\\[\\d*.\\d*,\\d*.\\d*]");
//        Matcher m2 = pattern.matcher(json);
//
//        while (m2.find()) {
//            Log.d("Info", "xy: " + m2.group());
//
//            AGSpoint point = new AGSpoint();
//            String[] tokens = m2.group().split(",|[|]");
//            point.setX(Float.parseFloat(tokens[0].replace("[", "")));
//            point.setY(Float.parseFloat(tokens[1].replace("]", "")));
//            LstPoint.add(point);
//        }


        for (int i = 0; i < LstPoint.size() - 1; i++) {
            PointCollection polylinePoints = new PointCollection(SpatialReferences.getWebMercator());
            polylinePoints.add(LstPoint.get(i).getX(), LstPoint.get(i).getY());
            polylinePoints.add(LstPoint.get(i + 1).getX(), LstPoint.get(i + 1).getY());

            Polyline polyline = new Polyline(polylinePoints);

            GraphicsOverlay graphicsOverlay = new GraphicsOverlay();

            SimpleLineSymbol outlineSymbol = new SimpleLineSymbol(SimpleLineSymbol.Style.SOLID, Color.rgb(0, 255, 255), 3);

            TextSymbol TextSymbol = new TextSymbol();
            TextSymbol.setSize(13);
            TextSymbol.setColor(Color.rgb(224, 67, 54));
            //TextSymbol.setHaloColor(Color.rgb(72, 125, 254));
            //TextSymbol.setOutlineColor(Color.rgb(0, 255, 255));
            TextSymbol.setBackgroundColor(Color.WHITE);
            TextSymbol.setOutlineWidth(2);
            TextSymbol.setHaloWidth(1);
            TextSymbol.setText(String.valueOf(Math.floor(GeometryEngine.length(polyline) * 10) / 10));


            List<Symbol> lstSymbol = new ArrayList<>();
            lstSymbol.add(outlineSymbol);
            if (DoCanh) {
                lstSymbol.add(TextSymbol);
            }
            CompositeSymbol compositeSymbol = new CompositeSymbol(lstSymbol);

            Graphic nestingGraphic = new Graphic(polyline, compositeSymbol);

            graphicsOverlay.getGraphics().add(nestingGraphic);
            mMapView.getGraphicsOverlays().add(graphicsOverlay);
        }


        Envelope envelope = nestingGround.getExtent();
        //mMapView.setViewpointGeometryAsync(envelope, 100);
        Point clickPoint = new Point(Math.round(envelope.getCenter().getX()), Math.round(envelope.getCenter().getY()), SpatialReferences.getWebMercator());


        Point wgs84Center = (Point) GeometryEngine.project(clickPoint, SpatialReferences.getWgs84());
        Viewpoint pon = new Viewpoint(wgs84Center.getY()-0.00035, wgs84Center.getX(), 1200);

        mMapView.setViewpointAsync(pon,3f);

    }
    public void ChucNangMoRong(ReadableMap args){
        String Type= args.getString("Type");

        if(Type.equals("IMAGERY"))
        {
            ListLayer_Map.set(0,webTiledLayer);

        }
        if(Type.equals("ROAD"))
        {
            ListLayer_Map.set(0,webTiledLayerRoad);

        }
        if(Type.equals("LINKGOOGLE"))
        {
            // if (laThanhvien) {
            Uri gmmIntentUri = Uri.parse("google.navigation:q=" + latitute + "," + longtitute);
            Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
            mapIntent.setPackage("com.google.android.apps.maps");
            context.startActivity(mapIntent);
            // }else {Toast.makeText(context,"Đăng nhập thành viên để sử dụng chức năng này", Toast.LENGTH_SHORT).show();}
        }
        if(Type.equals("LOCATION"))
        {
            try {
                mLocationDisplay.setAutoPanMode(LocationDisplay.AutoPanMode.RECENTER);
                mLocationDisplay.startAsync();
            } catch (Exception ex) {
                Log.i("error",ex.getMessage());
                //ex.printStackTrace();
            }
        }
        if(Type.equals("FULLMAP"))
        {
            ZoomToXa(mMapView,this._MaXa);
        }
        if(Type.equals("MEASUREMENT"))
        {
            DoCanh=!DoCanh;
            if(!ThuaDatBackUp.equals(""))
            {
                addNestingGround(Multipoint.fromJson(ThuaDatBackUp));
            }
        }

        if(Type.equals("ON_MEASUREMENT"))
        {
            DoCanh=true;
            if(!ThuaDatBackUp.equals(""))
            {
                addNestingGround(Multipoint.fromJson(ThuaDatBackUp));
            }
        }

        if(Type.equals("OFF_MEASUREMENT"))
        {
            DoCanh=false;
            if(!ThuaDatBackUp.equals(""))
            {
                addNestingGround(Multipoint.fromJson(ThuaDatBackUp));
            }
        }



    }




    public void DrawGeoJSONRing(ReadableMap args){
        try {
            String GeoThuaDat= args.getString("Ring");

            if(!GeoThuaDat.equals(""))
            {
                Log.i("nghia",GeoThuaDat);
                addNestingGround(Multipoint.fromJson(GeoThuaDat));
            }

        }
        catch (Exception e)
        {
            Log.e("nghia",e.getMessage());
        }

    }
    public String loadJSONFromAsset() {
        String json = null;
        try {
            InputStream is = context.getAssets().open("text.json");
            int size = is.available();
            byte[] buffer = new byte[size];
            is.read(buffer);
            is.close();
            json = new String(buffer, "UTF-8");
        } catch (IOException ex) {
            ex.printStackTrace();
            return null;
        }
        return json;
    }
    private void ZoomToXa(MapView mMapView, int maXa)
    {
        try{
            for (int i = 0; i < ListLocation.size(); i++) {

                if(ListLocation.get(i).maKvhc.equals(String.valueOf(maXa)))
                {
                    Viewpoint pon= new Viewpoint(ListLocation.get(i).Lat, ListLocation.get(i).Long, 70000);
                    mMapView.setViewpointAsync(pon,3f);

                }
            }


        }
        catch (Exception ex) {
            Log.e( "Error=" ,ex.getMessage());

        }
    }

    public void setSoTo(String st) {
        this.soTo = st;
    }
    public void setIDVungQH(String st) {
        this.idVungQH = st;
    }

    public void setPasswordDT(String st) {
        this.PasswordDT = st;
    }
    public void setUserNameDT(String st) {
        this.UserNameDT = st;
    }
    public void setURL_RanhThua(String st) {
        this.UrlRanhThua = st;
    }
    public void setURL_Quyhoach(String st) {
        this.urlQuyHoach = st;
    }
    public void setOpacityLayer(float st) {
        this.opacity = st;
    }
    public void AddLayer(ReadableArray layers){
        if (layers != null || layers.size() > 1) {
            ReadableMap layer = layers.getMap(0);
            String type = layer.getString("type");
            String urlRanhThua = layer.getString("urlRanhThua");
            String urlQuyHoach = layer.getString("urlQuyHoach");

            String username = layer.getString("username");
            String password = layer.getString("password");

            String usernameNen = layer.getString("usernameNen");
            String passwordNen = layer.getString("passwordNen");

            this.PasswordNen=passwordNen;
            this.UserNameNen=usernameNen;
            this.PasswordDT=password;
            this.UserNameDT=username;
            this.UrlRanhThua=urlRanhThua;
            this.urlQuyHoach=urlQuyHoach;

            UserCredential user = new UserCredential(username, invokeNativeFunction());
            tiledLayerBaseMap = new ArcGISTiledLayer(urlQuyHoach.replace("keyTTCNTT",String.valueOf(this._MaXa)));
            tiledLayerBaseMap.setCredential(user);

//           String urlRT=GetURLMap(String.valueOf(this._MaXa));
//           mServiceFeatureTable=new ServiceFeatureTable(urlRT);
//           mServiceFeatureTable.setCredential(user);
//           mFeatureLayer=new FeatureLayer(mServiceFeatureTable);



            ListLayer_Map = map.getOperationalLayers();
            ListLayer_Map.set(1,tiledLayerBaseMap);
            //ListLayer_Map.add(mFeatureLayerMauQH);
            //ListLayer_Map.set(2,mFeatureLayer);
            ZoomToXa(mMapView,_MaXa);


            mMapView.setMap(map);
            // addLableMap();

        }

    }

    public void TimKiem(){
        mFeatureLayer.clearSelection();
        String soToTim=this.soTo;
        String soThuaTim=this.soThua;
        try{
            if (soToTim != null && soToTim.length() > 0) {
                QueryParameters queryParameters = new QueryParameters();
                queryParameters.setWhereClause("SH_TO =" + soToTim + " and SH_THUA=" + soThuaTim + " ");
                try {
                    List<FeatureQueryResult> outFields = new ArrayList<>();
                    mFeatureLayer.clearSelection();

                    final ListenableFuture<FeatureQueryResult> future = mServiceFeatureTable.queryFeaturesAsync(queryParameters);

                    future.addDoneListener(new Runnable() {
                        @Override
                        public void run() {
                            try {

                                //create a feature collection table from the query results
                                FeatureCollectionTable featureCollectionTable = new FeatureCollectionTable(future.get());

                                //create a feature collection from the above feature collection table
                                FeatureCollection featureCollection = new FeatureCollection();
                                featureCollection.getTables().add(featureCollectionTable);

                                FeatureQueryResult result = future.get();
                                Iterator<Feature> resultIterator = result.iterator();
                                soThua=soThuaTim;
                                soTo=soToTim;
                                if (resultIterator.hasNext()) {
                                    Feature feature1 = resultIterator.next();
                                    Envelope envelope = feature1.getGeometry().getExtent();
                                    mMapView.setViewpointGeometryAsync(envelope, 10);
                                    mFeatureLayer.selectFeature(feature1);
                                    //handleViewPageThuaDat();
                                } else {
                                }
                            } catch (Exception e) {

                                Log.e(getResources().getString(R.string.app_name),
                                        "Error=" + e.getMessage());
                            }
                        }
                    });

                } catch (Exception e) {

                }
            }

        }
        catch (Exception ex) {

        }

        System.out.println("Clikc tim kiem thua dat");
        System.out.println(this.soThua);
        System.out.println(this.soTo);

    }
    public void TimKiemVungQuyHoach(){
        mFeatureLayerMauQH.clearSelection();

        String idVungQH =this.idVungQH;
        try{
            if (idVungQH != null && idVungQH.length() > 0) {
                QueryParameters queryParameters = new QueryParameters();
                queryParameters.setWhereClause("OBJECTID_1 =" + idVungQH);
                try {
                    List<FeatureQueryResult> outFields = new ArrayList<>();

                    final ListenableFuture<FeatureQueryResult> future = mServiceFeatureTableMauQH.queryFeaturesAsync(queryParameters);

                    future.addDoneListener(new Runnable() {
                        @Override
                        public void run() {
                            try {

                                //create a feature collection table from the query results
                                FeatureCollectionTable featureCollectionTable = new FeatureCollectionTable(future.get());

                                //create a feature collection from the above feature collection table
                                FeatureCollection featureCollection = new FeatureCollection();
                                featureCollection.getTables().add(featureCollectionTable);

                                FeatureQueryResult result = future.get();
                                Iterator<Feature> resultIterator = result.iterator();

                                if (resultIterator.hasNext()) {
                                    Feature feature1 = resultIterator.next();
                                    Envelope envelope = feature1.getGeometry().getExtent();
                                    mMapView.setViewpointGeometryAsync(envelope, 10);
                                    mFeatureLayerMauQH.selectFeature(feature1);
                                    //handleViewPageThuaDat();
                                } else {
                                }
                            } catch (Exception e) {

                                Log.e(getResources().getString(R.string.app_name),
                                        "Error=" + e.getMessage());
                            }
                        }
                    });

                } catch (Exception e) {

                }
            }

        }
        catch (Exception ex) {

        }
    }

    public void LoadMapWithMaXa(String Xa){

        UserCredential user = new UserCredential(this.UserNameDT, invokeNativeFunction());
        tiledLayerBaseMap = new ArcGISTiledLayer(urlQuyHoach.replace("keyTTCNTT",Xa));
        tiledLayerBaseMap.setCredential(user);

//        String urlRanhThua=GetURLMap(Xa);
//        mServiceFeatureTable=new ServiceFeatureTable(urlRanhThua);
//        mServiceFeatureTable.setCredential(user);
//        mFeatureLayer=new FeatureLayer(mServiceFeatureTable);
        ListLayer_Map = map.getOperationalLayers();
        ListLayer_Map.set(1,tiledLayerBaseMap);
        //ListLayer_Map.set(2,mFeatureLayer);
        //addLableMap();


    }
    //add lable

    public void addLableMap(){
        TextSymbol republicanTextSymbol = new TextSymbol();
        republicanTextSymbol.setSize(8);
        republicanTextSymbol.setColor(Color.RED);
        republicanTextSymbol.setHaloColor(Color.WHITE);
        republicanTextSymbol.setHaloWidth(2);

        JsonObject json = new JsonObject();
        JsonObject expressionInfo = new JsonObject();
        // expressionInfo.add("value", new JsonPrimitive("$feature.SH_TO + \" (\" + $feature.SH_THUA + \")\\n Diện Tích \" + $feature.DIEN_TICH"));
        expressionInfo.add("value", new JsonPrimitive("Tờ:"+"{SH_TO}"+"/Thửa:"+"{SH_THUA}"));
        json.add("labelExpressionInfo", expressionInfo);
        json.add("labelPlacement", new JsonPrimitive("esriServerPolygonPlacementAlwaysHorizontal"));

        JsonObject democratJson = json.deepCopy();
        democratJson.add("where", new JsonPrimitive("1 = 1"));
        democratJson.add("symbol", JsonParser.parseString(republicanTextSymbol.toJson()));


        LabelDefinition republicanLabelDefinition = LabelDefinition.fromJson(democratJson.toString());
        mFeatureLayer.getLabelDefinitions().add(republicanLabelDefinition);
        mFeatureLayer.setLabelsEnabled(true);
    }

    private void setupLocationDisplay() {
        mLocationDisplay = mMapView.getLocationDisplay();
        mLocationDisplay.addDataSourceStatusChangedListener(dataSourceStatusChangedEvent -> {

            // If LocationDisplay started OK or no error is reported, then continue.
            if (dataSourceStatusChangedEvent.isStarted() || dataSourceStatusChangedEvent.getError() == null) {
                return;
            }
        });
        //mLocationDisplay.setAutoPanMode(LocationDisplay.AutoPanMode.COMPASS_NAVIGATION);
        mLocationDisplay.startAsync();
        mLocationDisplay.startAsync();
    }
    public  void UpdateMaXa(ReadableMap args){
        // setupMap();
        String xa= args.getString("xa");
        LoadMapWithMaXa(xa);
        ZoomToXa(mMapView,Integer.parseInt(xa));

        System.out.println("Click MaXa"+xa);

    }
    public  void UpdateMapVeTinh(){
        System.out.println("Click IMAGERY_WITH_LABELS");
        //basemapType = Basemap.Type.IMAGERY_WITH_LABELS;
        //mMapView.getMap().setBasemap(Basemap.createImageryWithLabelsVector());
        //map.getOperationalLayers().remove(0);
        //mMapView.setMap(map);
        ListLayer_Map.set(0,webTiledLayer);

//        while(!ListLayer_Map.isEmpty())
//        {
//            ListLayer_Map.remove(0);
//        }
//        ListLayer_Map.add(mFeatureLayer);

    }
    public  void UpdateMapDuong(){
        System.out.println("Click OPEN_STREET_MAP");
        ListLayer_Map.set(0,webTiledLayerRoad);

    }






    public String GetURLMap(String Xa)
    {
        String URL= UrlRanhThua.replace("keyTTCNTT",Xa);
        return URL;
    }

    public void setSoThua(String st) {
        this.soThua = st;
    }

    public void setMaXa(int st) {
        this._MaXa = st;
    }

    public void ZoomToGPS() {
        try {
//                lDisplayManager.setAutoPanMode(LocationDisplay.AutoPanMode.RECENTER);
//                if (!lDisplayManager.isStarted())
//                {
//                    lDisplayManager.startAsync();
//                }
//                lDisplayManager.isShowLocation();

            mLocationDisplay.setAutoPanMode(LocationDisplay.AutoPanMode.RECENTER);
            mLocationDisplay.startAsync();

        } catch (Exception ex) {
            Log.i("error",ex.getMessage());
            //ex.printStackTrace();
        }
    }


    @Override
    public void onHostResume() {
        mMapView.resume();

    }

    @Override
    public void onHostPause() {
        mMapView.pause();

    }

    @Override
    public void onHostDestroy() {
        mMapView.dispose();
        if (getContext() instanceof ReactContext) {
            ((ReactContext) getContext()).removeLifecycleEventListener(this);
        }
    }
}