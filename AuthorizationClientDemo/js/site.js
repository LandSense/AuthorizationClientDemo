// When the user clicks on OAuth login
$("#loginLandSenseOAuth").on("click", function () {
	// Initialize hello.js to use the landsense provider
	// Provide the client-id of the app you registered at: https://as.landsense.eu/oauth/registerapps
	hello.init({
		// Add additional providers here if needed
		landsense: "1235c8ba-0efd-b5f1-a0df-e17dcf762807@as.landsense.eu"
	});

	// Setup event handler to update the WMS url each time the access token is refreshed
	hello.on("auth", demoMap.RefreshWMSParams);

	// Do the login (a small popup window opens)
	hello("landsense").login({
		// Define the scopes (here in login, in case also other login providers shall be used)
		scope: ""
	}).then(function (response) {
		// Handle the response
		processLoginResponse(response);
	}, function (e) {
		// In case an error happend when doing the login
		$("#tokenContent").text("Signin error: " + e.error.message);
	});
});

// When the user clicks on Crypto login
$("#loginLandSenseCrypto").on("click", function () {
	// Initialize hello.js to use the landsense provider
	hello.init({
		// Add additional providers here if needed
		landsense: "661dc274-caff-3500-666b-891ebdef280e@as.landsense.eu"
	});

	// Setup event handler to update the WMS url each time the access token is refreshed
	hello.on("auth", demoMap.RefreshWMSParams);

	// Do the login (a small popup window opens)
	hello("landsense").login({
		// Define the scopes (here in login, in case also other login providers shall be used)
		scope: "openid"
	}).then(function (response) {
		// Handle the response
		processLoginResponse(response);
	}, function (e) {
		// In case an error happend when doing the login
		$("#tokenContent").text("Signin error: " + e.error.message);
	});
});

// When the user clicks on Profile login
$("#loginLandSenseProfile").on("click", function () {
	// Initialize hello.js to use the landsense provider
	hello.init({
		// Add additional providers here if needed
		landsense: "9f80f0ea-dfed-99fa-e1d4-a5ada0430531@as.landsense.eu"
	});

	// Setup event handler to update the WMS url each time the access token is refreshed
	hello.on("auth", demoMap.RefreshWMSParams);

	// Do the login (a small popup window opens)
	hello("landsense").login({
		// Define the scopes (here in login, in case also other login providers shall be used)
		scope: "openid profile"
	}).then(function (response) {
		// Handle the response
		processLoginResponse(response);
	}, function (e) {
		// In case an error happend when doing the login
		$("#tokenContent").text("Signin error: " + e.error.message);
	});
});

// When the user clicks on Email login
$("#loginLandSenseEmail").on("click", function () {
	// Initialize hello.js to use the landsense provider
	hello.init({
		// Add additional providers here if needed
		landsense: "a90f9856-9ce1-0946-f9f2-0c569229cf31@as.landsense.eu"
	});

	// Setup event handler to update the WMS url each time the access token is refreshed
	hello.on("auth", demoMap.RefreshWMSParams);

	// Do the login (a small popup window opens)
	hello("landsense").login({
		// Define the scopes (here in login, in case also other login providers shall be used)
		scope: "openid email"
	}).then(function (response) {
		// Handle the response
		processLoginResponse(response);
	}, function (e) {
		// In case an error happend when doing the login
		$("#tokenContent").text("Signin error: " + e.error.message);
	});
});

// When the user clicks on OpenId login
$("#loginLandSenseOpenId").on("click", function () {
	// Initialize hello.js to use the landsense provider
	hello.init({
		// Add additional providers here if needed
		landsense: "3eaff2f9-9168-1ce2-51a5-dcda66bf789e@as.landsense.eu"
	});

	// Setup event handler to update the WMS url each time the access token is refreshed
	hello.on("auth", demoMap.RefreshWMSParams);

	// Do the login (a small popup window opens)
	hello("landsense").login({
		// Define the scopes (here in login, in case also other login providers shall be used)
		scope: "openid profile email"
	}).then(function (response) {
		// Handle the response
		processLoginResponse(response);
	}, function (e) {
		// In case an error happend when doing the login
		$("#tokenContent").text("Signin error: " + e.error.message);
	});
});

// When the user clicks on logout
$("#logoutLandSense").on("click", function () {
	hello("landsense").logout({ force: true }).then(function () {

		// Remove the secured layer as it will not work without a valid access token anyway
		demoMap.RemoveLayer();

		// Reset the fields
		$("#name").html("... logged out.");
		$("#tokenContent").text("");

		// Toggle the login / logout buttons
		$("#logoutLandSense").hide();
		$(".loginButton").show();
	});
});

function processLoginResponse(response) {
	if (response.authResponse.id_token !== undefined) {
		// In case of success you end up here and get the id-token
		var jwt = parseJwt(response.authResponse.id_token);

		// TODO: Set a proper nonce in the login and validate it here
		// https://stackoverflow.com/questions/10051494/oauth-nonce-value

		// TODO: Validate the jwt
		// https://as.landsense.eu/.well-known/openid-configuration
		// https://github.com/kjur/jsrsasign/wiki/Tutorial-for-JWT-verification

		// Display the username
		$("#name").html("Hello " + jwt.preferred_username);

		// Prettify the jwt content and display it in the PRE
		var content = JSON.stringify(jwt, null, "\t");
		$("#tokenContent").text(content);
	} else {
		$("#name").html("");
		$("#tokenContent").text("No ID-Token.");
	}

	// Add the secured layer to the map for the first time
	demoMap.AddLayer();

	// Toggle the login / logout buttons
	$(".loginButton").hide();
	$("#logoutLandSense").show();
}

// Helper function to parse the JWT token
function parseJwt(token) {
	var payload = token.split(".")[1];
	var base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
	return JSON.parse(atob(base64));
};