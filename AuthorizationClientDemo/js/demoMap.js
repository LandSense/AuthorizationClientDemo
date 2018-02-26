var demoMap = new function () {

	// Private members
	var map = new ol.Map({
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		target: "map",
		view: new ol.View({
			center: [-10997148, 4569099],
			zoom: 4
		})
	});

	// Set up the secured layer which can only be displayed when providing a valid access token
	var landsenseLayerSource = new ol.source.TileWMS({
		url: "https://sp.landsense.secure-dimensions.de/geoserver-oauth/wms",
		params: { 'LAYERS': "topp:states", 'TILED': true },
		serverType: "geoserver"
	});

	var landsenseLayer = null;

	// Public functions
	this.AddLayer = function () {
		landsenseLayer = new ol.layer.Tile({
			extent: [-13884991, 2870341, -7455066, 6338219],
			source: landsenseLayerSource
		});

		map.addLayer(landsenseLayer);
	};

	this.RemoveLayer = function () {
		if (landsenseLayer != null) {
			map.removeLayer(landsenseLayer);
		}
	};

	this.RefreshWMSParams = function () {

		// Get the authorization response from hello.js
		var authResponse = hello.getAuthResponse("landsense");

		// Provide the access token as an additional parameter to the secured layer
		landsenseLayerSource.updateParams({ "access_token": authResponse.access_token });
	}
};