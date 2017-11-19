var shape_obj;
var map;
var drawingManager;
var infoWindow;
var territory_coords = {shape_type: '', value: {}};
var shape_attrs = {shape_type: '', options: {}};
var map_attrs = {zoom: 13, center: {lat: 31.975127, lng: 35.843351}};
var json_description_input;
var shape_attrs_hidden_input;
var mapDiv;
var allowControl = true;
var drawing_modes;
var circleCenter;
var circleRadius;
var rectangle_array = [];
var tempArray = [];
var polygon_array = [];

function initMapDefaultData(placeData, editable) {
    allowControl = editable;
    map_attrs = placeData.map_attributes;
    shape_attrs = placeData.shape_attributes;
    switch (shape_attrs.shape_type) {
        case 'circle':
            circleCenter = placeData.center;
            circleRadius = parseFloat(placeData.radius);
            break;
        case 'polygon':
            polygon_array = placeData.polygon;
            break;
        case 'rectangle':
            rectangle_array = placeData.rectangle;
            break;
    }
    initMap();
}

function initMap() {
    mapDiv = document.getElementById('map');
    json_description_input = document.getElementById('json_description_input');
    shape_attrs_hidden_input = document.getElementById('shape_attrs_hidden_input');

    drawing_modes = [
        google.maps.drawing.OverlayType.CIRCLE
    ];

    map = new google.maps.Map(mapDiv, {
        zoom: map_attrs.zoom,
        center: map_attrs.center
    });

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: allowControl,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
            drawingModes: drawing_modes
        },
        circleOptions: {
            fillOpacity: .5,
            clickable: allowControl,
            draggable: allowControl,
            editable: allowControl,
            zIndex: 1
        },
        rectangleOptions: {
            fillOpacity: .5,
            clickable: allowControl,
            draggable: allowControl,
            editable: allowControl,
            zIndex: 1
        },
        polygonOptions: {
            fillOpacity: .5,
            clickable: allowControl,
            draggable: allowControl,
            editable: allowControl,
            zIndex: 3
        }
    });
    default_map_attribute(map);
    var removeShapeWidget = '<input onclick="remove_shape();" type=button value="Remove this place">';

    switch (shape_attrs.shape_type) {
        case 'circle':
            var circle = new google.maps.Circle({
                clickable: allowControl,
                draggable: allowControl,
                editable: allowControl,
                zIndex: 1,
                fillOpacity: 0.5,
                map: map,
                center: circleCenter,
                radius: circleRadius
            });
            if (allowControl) {
                initialize_circle_description(circleCenter, circleRadius);
                addEventsToCircle(circle, removeShapeWidget);
            }
            if (shape_obj == undefined) {
                this.shape_obj = circle;
            }
            break;
        case 'polygon':
            //We will create a temp array of objects of lat and lng, and then put it in the polygon_array
            angular.forEach(polygon_array, function (coords, key) {
                tempArray.push({
                    lat: coords[0],
                    lng: coords[1]
                });
            });
            polygon_array = tempArray;
            tempArray = [];
            var polygon = new google.maps.Polygon({
                paths: polygon_array,
                fillOpacity: .5,
                clickable: allowControl,
                draggable: allowControl,
                editable: allowControl,
                zIndex: 3,
                map: map
            });
            if (shape_obj == undefined) {
                this.shape_obj = polygon;
            }

            if (allowControl) {
                initialize_polygon_description(polygon_array);
                addEventsToPolygon(polygon, removeShapeWidget);
            }
            break;
        case 'rectangle':
            var rectangle = new google.maps.Rectangle({
                fillOpacity: .5,
                clickable: allowControl,
                draggable: allowControl,
                editable: allowControl,
                map: map,
                bounds: new google.maps.LatLngBounds(
                    new google.maps.LatLng(rectangle_array[0][0], rectangle_array[0][1]),
                    new google.maps.LatLng(rectangle_array[2][0], rectangle_array[2][1])),
                zIndex: 1
            });
            if (shape_obj == undefined) {
                this.shape_obj = rectangle;
            }
            if (allowControl) {
                initialize_rectangle_description(rectangle.getBounds());
                addEventsToRectangle(rectangle, removeShapeWidget);
            }
            break;
    }

    google.maps.event.addListener(map, 'drag', function () {
        var map_center = map.getCenter();
        map_attrs.center['lat'] = map_center.lat();
        map_attrs.center['lng'] = map_center.lng();
        var map_attrs_hidden_input = document.getElementById('map_attrs_hidden_input');
        map_attrs_hidden_input.value = JSON.stringify(map_attrs);
    });
    google.maps.event.addListener(map, 'zoom_changed', function () {
        var map_zoom_level = map.getZoom();
        map_attrs.zoom = map_zoom_level;
        var map_attrs_hidden_input = document.getElementById('map_attrs_hidden_input');
        map_attrs_hidden_input.value = JSON.stringify(map_attrs);
    });
    drawingManager.setMap(map);
    //drawingManager.setMap(map);
    infoWindow = new google.maps.InfoWindow({
        content: removeShapeWidget
    });
    //Add listener to the rectangle for click events
    google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
        addEventsToRectangle(rectangle, removeShapeWidget);
    });

    //Add listener to the rectangle for click events
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
        addEventsToPolygon(polygon, removeShapeWidget);
    });
    //Add listener to the circle for click events
    google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle) {
        addEventsToCircle(circle, removeShapeWidget);
    });
    //Add listener to get important info about the shape
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
        initializeShapeDescription(event);
    });
}

function initialize_circle_description(center, radius) {
    territory_coords.shape_type = 'circle';
    territory_coords.value['center'] = center;
    territory_coords.value['radius'] = radius;
    shape_attrs.shape_type = 'circle';
    shape_attrs.options = drawingManager.circleOptions;
    shape_attrs_hidden_input.value = JSON.stringify(shape_attrs);
    json_description_input.value = JSON.stringify(territory_coords);
    toggle_drawing_manager(false);
}

function toggle_drawing_manager(drawing_manager_state) {
    drawingManager.setOptions({
        drawingControl: drawing_manager_state
    });
}

function initialize_rectangle_description(bounds) {
    territory_coords.shape_type = 'rectangle';
    territory_coords.value.bounds = bounds;
    shape_attrs.shape_type = 'rectangle';
    shape_attrs.options = drawingManager.rectangleOptions;
    shape_attrs_hidden_input.value = JSON.stringify(shape_attrs);
    json_description_input.value = JSON.stringify(territory_coords);
    toggle_drawing_manager(false);
}

function initialize_polygon_description(paths) {
    territory_coords.shape_type = 'polygon';
    if (paths.getArray == undefined) {
        territory_coords.value.paths = paths;
    } else {
        territory_coords.value.paths = paths.getArray();
    }
    shape_attrs.shape_type = 'polygon';
    shape_attrs.options = drawingManager.polygonOptions;
    shape_attrs_hidden_input.value = JSON.stringify(shape_attrs);
    json_description_input.value = JSON.stringify(territory_coords);
    toggle_drawing_manager(false);
}

function initializeShapeDescription(event) {
    switch (event.type) {
        case 'circle':
            initialize_circle_description(event.overlay.getCenter(), event.overlay.getRadius());
            break;
        case 'rectangle':
            initialize_rectangle_description(event.overlay.getBounds());
            break;
        case
        'polygon':
            initialize_polygon_description(event.overlay.getPath());
            break;
    }
}

function addEventsToCircle(circle, removeShapeWidget) {
    drawingManager.setDrawingMode(null);
    /* DOES WORK */
    google.maps.event.addListener(circle, 'radius_changed', function () {
        territory_coords.shape_type = "circle";
        territory_coords.value['radius'] = circle.getRadius();
        json_description_input.value = JSON.stringify(territory_coords);
        infoWindow.close();
    });
    google.maps.event.addListener(circle, 'drag', function () {
        territory_coords.shape_type = "circle";
        territory_coords.value['center'] = circle.getCenter();
        json_description_input.value = JSON.stringify(territory_coords);
        infoWindow.close();
    });
    google.maps.event.addListener(circle, 'click', function (event) {
        // Set the info window's content and position.
        infoWindow.setContent(removeShapeWidget);
        infoWindow.setPosition(circle.getCenter());
        shape_obj = circle;
        infoWindow.open(map);
        //circle.setMap(null);
    });
}

function addEventsToPolygon(polygon, removeShapeWidget) {
    drawingManager.setDrawingMode(null);
    /* DOES WORK */
    google.maps.event.addListener(polygon, 'drag', function () {
        polygon_array = [];
        var polygonPath = polygon.getPath();
        var path = "";
        //Constructing polygon path
        for (var i = 0; i < polygonPath.length; i++) {
            polygon_array.push([polygonPath.getAt(i).lat(), polygonPath.getAt(i).lng()]);
        }
        territory_coords.shape_type = "polygon";
        territory_coords.value['paths'] = polygon_array;
        json_description_input.value = JSON.stringify(territory_coords);
        infoWindow.close();
    });
    google.maps.event.addListener(polygon.getPath(), 'set_at', function (index) {
        polygon_array = [];
        var polygonPath = polygon.getPath();
        var path = "";
        //Constructing polygon path
        for (var i = 0; i < polygonPath.length; i++) {
            polygon_array.push([polygonPath.getAt(i).lat(), polygonPath.getAt(i).lng()]);
        }
        territory_coords.shape_type = "polygon";
        territory_coords.value['paths'] = polygon_array;
        json_description_input.value = JSON.stringify(territory_coords);
        infoWindow.close();
    });
    google.maps.event.addListener(polygon, 'click', function (event) {
        // Set the info window's content and position.
        infoWindow.setContent(removeShapeWidget);
        infoWindow.setPosition(event.latLng);
        shape_obj = polygon;
        infoWindow.open(map);
        //polygon.setMap(null);
    });
}

function addEventsToRectangle(rectangle, removeShapeWidget) {
    drawingManager.setDrawingMode(null);
    /* DOES WORK */
    google.maps.event.addListener(rectangle, 'bounds_changed', function () {
        territory_coords = {shape_type: '', value: {}};
        territory_coords.shape_type = "rectangle";
        territory_coords.value['bounds'] = rectangle.getBounds();
        json_description_input.value = JSON.stringify(territory_coords);
        infoWindow.close();
    });
    google.maps.event.addListener(rectangle, 'drag', function () {
        territory_coords = {shape_type: '', value: {}};
        territory_coords.shape_type = "rectangle";
        territory_coords.value['bounds'] = rectangle.getBounds();
        json_description_input.value = JSON.stringify(territory_coords);
        infoWindow.close();
    });
    google.maps.event.addListener(rectangle, 'click', function (event) {
        // Set the info window's content and position.
        infoWindow.setContent(removeShapeWidget);
        infoWindow.setPosition(event.latLng);
        //Save current rectangle object to remove it later
        shape_obj = rectangle;
        infoWindow.open(map);
    });
}

function default_map_attribute(map) {
    map_attrs.zoom = map.getZoom();
    map_attrs.center['lat'] = map.getCenter().lat();
    map_attrs.center['lng'] = map.getCenter().lng();
    var map_attrs_hidden_input = document.getElementById('map_attrs_hidden_input');
    map_attrs_hidden_input.value = JSON.stringify(map_attrs);
}

function remove_shape() {
    google.maps.event.clearListeners(shape_obj, 'click');
    google.maps.event.clearListeners(shape_obj, 'drag');
    switch (territory_coords.shape_type) {
        case 'circle':
            shape_obj.setRadius(0);
            break;
        case 'polygon':
            shape_obj.setPath([]);
            break;
        case 'rectangle':
            shape_obj.setBounds(null);
            break;
    }
    shape_obj.setMap(null);
    territory_coords = {shape_type: '', value: {}};
    infoWindow.close();
    json_description_input.value = "";
    toggle_drawing_manager(true);
}