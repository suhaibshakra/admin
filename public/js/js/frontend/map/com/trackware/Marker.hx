package com.trackware;

import js.Browser;
import google.maps.LatLng;
import google.maps.InfoWindow;

@:expose
class Marker {
    var map_marker:google.maps.Marker;
    var infowindow:InfoWindow;
    var latg:Float;
    var long:Float;
    /*
    if true, the dialog is shown
     */
    var isOpened:Bool = false;
    static var markers:Array<Marker>;

    public function new(aLat, aLong, aCoustomerName) {

        if (markers == null) markers = new Array<Marker>();

        iniInfoWindow(aCoustomerName);

        markers.push(this);
        var loc:LatLng = new LatLng(aLat, aLong, 0);
        map_marker = new google.maps.Marker();
        map_marker.setMap(Map.instance.map);
        map_marker.setPosition(loc);

        //To show the Coustomers Names By default
        this.showInfo(aCoustomerName);


        map_marker.addListener('click', function() {
            if (isOpened) {
                this.hideInfo();
            } else {
                this.showInfo(aCoustomerName);
            }
            //Browser.console.log(infowindow);
            if (infowindow == null) {
                Browser.console.log(infowindow);
                this.showInfo(aCoustomerName);
            }
        });

        /*
         * Expand the map to hold multiple markers
         */
        Map.instance.include(loc);
    }

    function iniInfoWindow(aCoustomerName):Void {
        infowindow = new InfoWindow({
            content: "<div style='width:300px;'>" + aCoustomerName + "</div>"
        });
        infowindow.addListener("closeclick", function() {
            isOpened = false;
        });
    }
    /**
    * Show the infoWindow over the map
    **/

    public function hideInfo():Void {
        infowindow.close();
        isOpened = false;
    }

    /**
    * Show the infoWindow over the map
    **/

    public function showInfo(aCoustomerName):Void {
        infowindow.open(Map.instance.map, map_marker);
        isOpened = true;
    }


    /**
    * Clear a spasific marker
    **/

    public function dispose() {
        map_marker.setMap(null);
        map_marker = null;
    }

    /**
    * Clear all the markers
    **/

    static public function clear() {
        if (markers != null) {
            for (markerobj in markers) {
                markerobj.dispose();
            }

        }
        markers = new Array<Marker>();
    }
}