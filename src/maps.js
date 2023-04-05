class Map{
    constructor(latitude, longitude) {
        this.map = null;
        this.longitude = longitude
        this.latitude = latitude
        this.marker = null;
      }
      initMap = function() {
        const options = {     
                    zoom: 11,
                    center: { lat: this.latitude, lng: this.longitude }
                }
        this.map = new google.maps.Map(document.getElementById('map'), options)
        this.marker = new google.maps.Marker({
                    position: { lat: this.latitude, lng: this.longitude },
                    map: this.map,
                    animation: google.maps.Animation.DROP
                });
      };
      updateMapAndMarkerPosition = function(lat, long) {
            let newCenter = new google.maps.LatLng(lat, long);
            this.map.setCenter(newCenter);
            this.marker.setPosition(newCenter);
      }
}

export default Map