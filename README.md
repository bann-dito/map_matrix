# Mapping The Matrix 💻
## Background
Have you ever wondered how you’re computer takes you to google.com or facebook.com?
Many users are unaware that the internet is made up of physical connections and when you visit a website you first visit many other locations before your final destination.

Mapping The Matrix is a project that visualizes your IP packet through the physical world until you arrive to your end destination (i.e google.com, facebook.com).
1. Click on the Get Start button
2. Enter a domain name (i.e google.com, facebook.com, tesla.com, etc.)
3. Click on the Lets go button
4. Check out the cities your packet has visited
5. Click Next
6. Check out the summary all the places your packet visited!

[Wake up from the Matrix!](https://bann-dito.github.io/map_matrix/) 👈


## Table Of Contents
1. [Technologies](#technology)
2. [Libraries](#libraries)
3. [Code Highlights](#code-highlights)

## Technology
`Vanilla JavaScript`, `HTML5`, `CSS`, `DOM Manipulation`, `Canvas`, `NodeJS backend`

## Libraries
[ViewDNSInfo API](https://viewdns.info/api/)

[IPinfo API](https://ipinfo.io/products/ip-geolocation-api)

[Google Maps API](https://developers.google.com/maps)

## Code Highlights

### Matrix Waterfall
Using Canvas, I was able to draw a rain affect as a background. Using a string of characters I want to use, I split them into an Array of single characters.
In the Draw function I set the entire canvas to a semi transparent black color that provides the trailing affect while only filling the random character from the character array. The drops array keeps the position of the current drop and if the reset condition is met, is set back 0.
```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "#0F0";
ctx.font = "16px monospace";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const charArr = chars.split("");
const columns = canvas.width / 16;
let drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    for (let i = 0; i < drops.length; i++) {
        const charIndex = Math.floor(Math.random() * charArr.length);
        const char = charArr[charIndex];
        ctx.fillText(char, i * 16, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 33);
```

### Google Maps Class
In this Map class I utilize Google Maps to create a map with a provided Latitude and Longitude. When ready I can call the initMap function to create the map. The updateMapAndMarkerPosition function is used when the map needs present the new location visited. The addMarkers function is called at the end when markers for each location need to be displayed and the map re-centered

```js
class Map{
  constructor(latitude, longitude) {
      this.map = null;
      this.longitude = longitude
      this.latitude = latitude
      this.markers = [];
  }

  initMap = function() {
    const options = {     
        zoom: 11,
        center: { lat: this.latitude, lng: this.longitude }
    }
    this.map = new google.maps.Map(document.getElementById('map'), options)
    this.markers.push(new google.maps.Marker({
        position: { lat: this.latitude, lng: this.longitude },
        map: this.map,
        animation: google.maps.Animation.DROP
      }));
    };
    
    updateMapAndMarkerPosition = function(lat, long) {
      if (!isNaN(lat) && !isNaN(long)) {
        let newCenter = new google.maps.LatLng(lat, long);
        this.map.setCenter(newCenter);
        this.markers[0].setPosition(newCenter);
      }
    }
    
    addMarkers = function(lat, long){
      this.markers.forEach(marker => marker.setMap(null))
      this.markers = []
      const bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < lat.length; i++){
        const marker = new google.maps.Marker({
          position: { lat: lat[i], lng: long[i] },
          map: this.map,
          label: (i + 1).toString()
        });
        this.markers.push(marker)
        bounds.extend(marker.getPosition())
      }
      this.map.fitBounds(bounds)
    }
}

export default Map
```
