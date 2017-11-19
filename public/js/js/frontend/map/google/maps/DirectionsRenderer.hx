/**
DirectionsRenderer : generated by hxtern
*/
package google.maps;

extern class DirectionsRenderer extends google.maps.MVCObject {
	public function new(?opt_opts: Hxtern.Any2<google.maps.DirectionsRendererOptions,Dynamic<String>>) {}

	public function addListener(eventName: String, handler: Dynamic): google.maps.MapsEventListener {}

	public function bindTo(key: String, target: google.maps.MVCObject, ?opt_targetKey: String, ?opt_noNotify: Bool): Null<Dynamic> {}

	public function changed(key: String): Null<Dynamic> {}

	public function get(key: String): Dynamic {}

	public function getDirections(): google.maps.DirectionsResult {}

	public function getMap(): google.maps.Map {}

	public function getPanel(): Node {}

	public function getRouteIndex(): Float {}

	public function notify(key: String): Null<Dynamic> {}

	public function set(key: String, value: Dynamic): Null<Dynamic> {}

	public function setDirections(directions: google.maps.DirectionsResult): Null<Dynamic> {}

	public function setMap(map: google.maps.Map): Null<Dynamic> {}

	public function setOptions(options: Hxtern.Any2<google.maps.DirectionsRendererOptions,Dynamic<String>>): Null<Dynamic> {}

	public function setPanel(panel: Node): Null<Dynamic> {}

	public function setRouteIndex(routeIndex: Float): Null<Dynamic> {}

	public function setValues(values: Hxtern.Any2<Dynamic,Null<Dynamic>>): Null<Dynamic> {}

	public function unbind(key: String): Null<Dynamic> {}

	public function unbindAll(): Null<Dynamic> {}
}
