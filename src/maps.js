class Map{
    constructor(latitude, longitude) {
        this.map = null;
        this.longitude = longitude
        this.latitude = latitude
      }
      initMap = function() {
        const options = {     
                    zoom: 11,
                    center: { lat: this.latitude, lng: this.longitude }
                }
        this.map = new google.maps.Map(document.getElementById('map'), options)
        const marker = new google.maps.Marker({
                    position: { lat: this.latitude, lng: this.longitude },
                    map: this.map,
                    animation: google.maps.Animation.DROP
                });
      };
}

export default Map

// function initMap() {
//     var options = {     
//         zoom: 10,
//         center: { lat: 33.933241, lng: -84.340288 }
//     }
//     var map = new google.maps.Map(document.getElementById('map'), options);
//     var marker = new google.maps.Marker({
//         position: { lat: 33.933241, lng: -84.340288 },
//         map: map
//     });
// }


//     }
//     loadMap(city, state){
//         let script = document.createElement('script')
//         script.src = ""
//         script.defer = true
//         document.head.appendChild(script)