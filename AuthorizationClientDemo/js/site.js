$(document).ready(function() {
	// Initialize hello.js to use the landsense provider
	// Provide the client-id of the app you registered at: https://as.landsense.eu/oauth/registerapps
	hello.init({
		// Add additional providers here if needed
		landsense: "78e04fab-b0e2-49b0-bbd5-8193791658ef@as.landsense.eu"
	});
});

// When the user clicks on login
$("#loginLandSense").on("click", function () {

	// Setup event handler to update the WMS url each time the access token is refreshed
	hello.on("auth", demoMap.RefreshWMSParams);

	// Do the login (a small popup window opens)
	hello("landsense").login({
		// Define the scopes (here in login, in case also other login providers shall be used)
		scope: "openid profile email landsense"
	}).then(function (p) {

		// In case of success you end up here and get the id-token
		var jwt = parseJwt(p.authResponse.id_token);

		// TODO: Set a proper nonce in the login and validate it here
		// https://stackoverflow.com/questions/10051494/oauth-nonce-value

		// TODO: Validate the jwt
		// https://as.landsense.eu/.well-known/openid-configuration
		// https://github.com/kjur/jsrsasign/wiki/Tutorial-for-JWT-verification

		// Display the username
		$("#name").html("Hello " + jwt.preferred_username);

		// Prettify the jwt content and display it in the PRE
		var content = JSON.stringify(jwt, null, '\t');
		$("#tokenContent").text(content);

		// Add the secured layer to the map for the first time
		demoMap.AddLayer();

		// Toggle the login / logout buttons
		$("#loginLandSense").hide();
		$("#logoutLandSense").show();

	}, function (e) {
		// In case an error happend when doing the login
		$("#tokenContent").text("Signin error: " + e.error.message);
	});
});

// When the user clicks on logout
$("#logoutLandSense").on("click",function() {
	hello("landsense").logout({ force: true }).then(function() {

		// Remove the secured layer as it will not work without a valid access token anyway
		demoMap.RemoveLayer();

		// Reset the fields
		$("#name").html("... logged out.");
		$("#tokenContent").text("");

		// Toggle the login / logout buttons
		$("#logoutLandSense").hide();
		$("#loginLandSense").show();
	});
});

// Helper function to parse the JWT token
function parseJwt(token) {
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace("-", "+").replace("_", "/");
	return JSON.parse(window.atob(base64));
};