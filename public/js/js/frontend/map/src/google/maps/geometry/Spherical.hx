/**
  Spherical : generated by hxtern
*/
package google.maps.geometry;
@:native("google.maps.geometry.spherical")
extern class Spherical {
	public static function computeArea(path: Hxtern.Any2<Array<google.maps.LatLng>,google.maps.MVCArray<google.maps.LatLng>>, ?opt_radius: Float): Float {}

	public static function computeDistanceBetween(from: google.maps.LatLng, to: google.maps.LatLng, ?opt_radius: Float): Float {}

	public static function computeHeading(from: google.maps.LatLng, to: google.maps.LatLng): Float {}

	public static function computeLength(path: Hxtern.Any2<Array<google.maps.LatLng>,google.maps.MVCArray<google.maps.LatLng>>, ?opt_radius: Float): Float {}

	public static function computeOffset(from: google.maps.LatLng, distance: Float, heading: Float, ?opt_radius: Float): google.maps.LatLng {}

	public static function computeOffsetOrigin(to: google.maps.LatLng, distance: Float, heading: Float, ?opt_radius: Float): google.maps.LatLng {}

	public static function computeSignedArea(loop: Hxtern.Any2<Array<google.maps.LatLng>,google.maps.MVCArray<google.maps.LatLng>>, ?opt_radius: Float): Float {}

	public static function interpolate(from: google.maps.LatLng, to: google.maps.LatLng, fraction: Float): google.maps.LatLng {}
}