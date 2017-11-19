/**
MapCanvasProjection : generated by hxtern
*/
package google.maps;

extern class MapCanvasProjection extends google.maps.MVCObject {
	public function new() {}

	public function addListener(eventName: String, handler: Dynamic): google.maps.MapsEventListener {}

	public function bindTo(key: String, target: google.maps.MVCObject, ?opt_targetKey: String, ?opt_noNotify: Bool): Null<Dynamic> {}

	public function changed(key: String): Null<Dynamic> {}

	public function fromContainerPixelToLatLng(pixel: google.maps.Point, ?opt_nowrap: Bool): google.maps.LatLng {}

	public function fromDivPixelToLatLng(pixel: google.maps.Point, ?opt_nowrap: Bool): google.maps.LatLng {}

	public function fromLatLngToContainerPixel(latLng: google.maps.LatLng): google.maps.Point {}

	public function fromLatLngToDivPixel(latLng: google.maps.LatLng): google.maps.Point {}

	public function get(key: String): Dynamic {}

	public function getWorldWidth(): Float {}

	public function notify(key: String): Null<Dynamic> {}

	public function set(key: String, value: Dynamic): Null<Dynamic> {}

	public function setValues(values: Hxtern.Any2<Dynamic,Null<Dynamic>>): Null<Dynamic> {}

	public function unbind(key: String): Null<Dynamic> {}

	public function unbindAll(): Null<Dynamic> {}
}