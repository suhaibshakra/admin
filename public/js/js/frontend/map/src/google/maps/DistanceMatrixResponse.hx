/**
  DistanceMatrixResponse : generated by hxtern
*/
package google.maps;

extern class DistanceMatrixResponse {
	public function new() {}

	public var destinationAddresses: Array<String>;

	public var originAddresses: Array<String>;

	public var rows: Array<google.maps.DistanceMatrixResponseRow>;
}
