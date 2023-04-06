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