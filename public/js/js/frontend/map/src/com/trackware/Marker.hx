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
    static var markers:Array<Marker>;

    public function new(aLat, aLong, aCoustomerName) {

        if (markers == null) markers = new Array<Marker>();

        markers.push(this);
        var loc:LatLng = new LatLng(aLat, aLong, 0);
        map_marker = new google.maps.Marker();
        map_marker.setMap(Map.instance.map);
        map_marker.setPosition(loc);

        //To show the Coustomers Names By default
        this.showInfo(aCoustomerName);
        map_marker.addListener('click', function() {
            this.showInfo(aCoustomerName);
        });
        /*
         * Expand the map to hold multiple markers
         */
        Map.instance.include(loc);
    }

    /**
    * Show the infoWindow over the map
    **/

    public function showInfo(aCoustomerName):Void {
        infowindow = new InfoWindow({
            content: "<div style='width:300px;'>" + aCoustomerName + "</div>"
        });

        infowindow.open(Map.instance.map, map_marker);
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