/**
PlaceResult : generated by hxtern
*/
package google.maps.places;

extern class PlaceResult {
	public function new() {}

	public var address_components: Array<google.maps.GeocoderAddressComponent>;

	public var aspects: Array<google.maps.places.PlaceAspectRating>;

	public var formatted_address: String;

	public var formatted_phone_number: String;

	public var geometry: google.maps.places.PlaceGeometry;

	public var html_attributions: Array<String>;

	public var icon: String;

	public var id: String;

	public var international_phone_number: String;

	public var name: String;

	public var permanently_closed: Bool;

	public var photos: Array<google.maps.places.PlacePhoto>;

	public var price_level: Float;

	public var rating: Float;

	public var reference: String;

	public var review_summary: String;

	public var reviews: Array<google.maps.places.PlaceReview>;

	public var types: Array<String>;

	public var url: String;

	public var vicinity: String;

	public var website: String;
}