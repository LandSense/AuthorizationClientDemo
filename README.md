# AuthorizationClientDemo

## Using the LandSense Federation using a client-side framework

For client-side web applications we are providing a demo using the [hello.js](https://github.com/MrSwitch/hello.js) JavaScript SDK for authenticating with the federation.

## The use case

This demo loads a map and allows you to login using the LandSense federation. With the successful login you will receive an access token that is required to request a protected resource from a LandSense service provider, a GeoServer WMS layer (U.S. states) in this case, that is overlaid over the basemap.

![Screenshot](https://geo-wiki.org/tools/hellojs/AuthorizationClientDemo.png)

See a live demo [here](https://geo-wiki.org/tools/hellojs).

## Client credentials

The demo app uses client credentials from the [LandSense Authorisation Server](https://as.landsense.eu). You might want to replace them with the client credentials of the app you registered. You find the code in the upper part of the `js/site.js` file.

```javascript
hello.init({
  landsense: "<YOUR-CLIENT-ID>"
}, { scope: "openid profile email landsense" });
```

---

## Components

### Third party

Our demo uses some third party libraries to showcase the login and requesting a protected resource, but the only required library is [hello.js](https://github.com/MrSwitch/hello.js).

To make this demo work we additionally used:

- JQuery
- Bootstrap
- Openlayers

You find all the includes in the `index.html`.

### js/landsense.js

The hello.js provider to connect with the landsense federation. To use it in your project you can just link it from this github repository.

### js/site.js

Handles the user interaction (click on login / logout) and configures hello.js. After a successful login, the `AddLayer` method in the `demoMap.js` is called to display the protected layer.

**Please note:**

> The demo only runs on `http://localhost:53535/`. If you want to test it and run it under some other URL you have to register your application with the [LandSense Authorisation Server](https://as.landsense.eu) and get separate client credentials.

### js/demoMap.js

Initializes the map with a base layer and provides the functions to add or remove the protected layer. The layer has to send the `access token` as an additional parameter.

### css/site.css

Just some very basic styling for the demo.
