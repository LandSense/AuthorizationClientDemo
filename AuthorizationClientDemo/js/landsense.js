(function (hello) {

	hello.init({

		"landsense": {

			name: "LandSense",

			oauth: {
				version: 2,
				auth: "https://as.landsense.eu/oauth/authorize",
				grant: "https://as.landsense.eu/oauth/token"
			},

			scope: {
				openid: "openid",
				profile: "profile"
			},

			login: function (p) {
				p.qs.nonce = "12345";
				p.qs.response_type = "token id_token";
			},

			base: "https://as.landsense.eu/oauth/",

			get: {
				me: "userinfo"
			},

			// Refresh the access_token once expired
			refresh: true,

			// OAuth2 standard defines SPACE as scope delimiter, hello.js defaults to ','
			scope_delim: " ",

			// Changed according to: https://github.com/MrSwitch/hello.js/issues/167
			xhr: function (p) {
				var token = p.query.access_token;
				delete p.query.access_token;

				if (token) {
					p.headers = {
						"Authorization": "Bearer " + token
					};
				}

				return true;
			}
		}
	});

})(hello);