package google.maps;

extern class InfoWindow {
    public function new(options:Dynamic) : Void;

    public function open(map:Dynamic, marker:Dynamic) : Void;
    public function close() : Void;
    public function getMap() : Dynamic;
    public function addListener(eventName:String, closure:Dynamic) : Dynamic;

}
