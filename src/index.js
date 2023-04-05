import Traceroute from "./traceroute";
import Location from "./location";
import Map from "./maps";
import { async } from "regenerator-runtime";

console.log('this thing on?')


// I need an event listener for main page when get started is clicked
//done
// When get started is clicked it should hide the main page elements and unhide the next page elements
//done
// Should listen for click and pass user input
//done
// On user input pass the result to the traceroute
//done
//iterate through the dns to grab each hop
//done
//for each each hop pass the the IP to the geo location
//done
//pass geo location longitude and latitude to the maps API
//done
//show the user google maps with laptop
//done

const getStarted = document.getElementById("get-started")

getStarted.addEventListener('click', (event) => {
    event.preventDefault();
    const welcomePage = document.getElementById("welcome")
    const enterDestination = document.getElementById("enter-destination")
    const macbook = document.getElementById("macbook-container")

    welcomePage.classList.add('hidden')
    enterDestination.classList.remove('hidden')
    macbook.classList.remove('hidden')
})



const letsGo = document.getElementById("get-destination")
let domainInput;
letsGo.addEventListener('click', (event) => {
    event.preventDefault();
    const enterDestination = document.getElementById("enter-destination")
    const destinationDetails = document.getElementById("destination-details")
    enterDestination.classList.add('hidden')
    destinationDetails.classList.remove('hidden')

    domainInput = document.getElementById("domain").value

    console.log(domainInput)
    routes()

})





const traceRoute = new Traceroute


//example of console logging the data object with the hops property
// routes.then((data) => {
//     console.log(data.response.hops)
// })

//hard coding IP addresses for now so i dont continue to call the API and hit the limit
let ip_collection = ["64.33.146.250", "69.4.127.37", "208.115.136.115", "157.240.33.164", "147.75.208.217", "173.252.67.1", "157.240.249.35" ]
//this function needs to check if the IP is 0.0.0.0
//function is grabbing each IP that is not 0.0.0.0 and adds it to the IP collection
// const routes = async function(){
//     let domain = domainInput
//     const route = traceRoute.getRoute(domain)
//     route.then((data) => {
//         console.log(data.response.hops, "hops console log")
//         for (let number in data.response.hops) {
//             if (data.response.hops[number].ip !== "0.0.0.0") {
//                 ip_collection.push(data.response.hops[number].ip)
//                 console.log(ip_collection)
//             }
//         }
//     })
// };



//working API call to gather IP geo location details
const locate = new Location

let listCities = ["Durand","Mather","Redwood City", "Tel Aviv", "Chicago", "Chicago"  ]
let listLongitude = [-91.9339, -90.3118, -97.822, -79.3716,-87.6521, -87.6318, ]
let listLatitude = [44.6311, 44.1461, 37.751, 43.6319, 41.8482, 41.8874, ]

window.listLongitude = listLongitude
window.listLatitude = listLatitude

function locateDetails(){
    for (let i=0 ; i < ip_collection.length; i++){
        setTimeout(() => {
            let geolocation = locate.getLocation(ip_collection[i])
            geolocation.then((data) => {
                console.log(data.city)
                console.log(data.latitude)
                console.log(data.longitude)
                console.log(data.ip_address)
                console.log(data)
            })
        },i * 1500)
    }
} 

window.locateDetails = locateDetails


// Google maps constructor function
// must pass latitude, then longitude to constructor
let map = new Map(listLatitude[0], listLongitude[0])
map.initMap


// saving a screipt html element to a variable called script
let script = document.createElement('script')
//setting src html tag equal to my google API Call
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA8dDHNlJDeFT4o2PjlkPzCutCeKnOmAJY&callback=map.initMap"
//setting async true on our HTML element
script.async = true
//adding html element to our head section of our HTML document
document.head.appendChild(script)

window.map = map



let i = 0
let destinationH1 = document.getElementById("destination")
destinationH1.innerHTML = `You've arrived at ${listCities[i]}`
const nextButton = document.getElementById("next-button")
nextButton.addEventListener('click', (event) => {
    event.preventDefault();
    i += 1;
    destinationH1.innerHTML = `You've arrived at ${listCities[i]}`
    map.updateMapAndMarkerPosition(listLatitude[i], listLongitude[i])
    buildMaps()
})


// gathers canvas
const canvas = document.getElementById("canvas");
//sets ctx
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "#0F0";
ctx.font = "16px monospace";

//resizes canvas as window changes
function resizeCanvas(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

//listens if window is resized, runs callback
window.addEventListener('resize', resizeCanvas)
resizeCanvas();


// Set up the characters and animation loop
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

canvas.addEventListener("mouseover", function(event){
    let mouseX = event.clientX
    let mouseY = event.clientY
    
})




//example of calling api through proxy server
// const fetchData = async() => {
//     let res = await fetch('http://localhost:5000')
//     if (res.ok) {
//         let data = await res.json();
//         console.log(data.data)
//     }
// }

// window.fetchData = fetchData



// let map;
// let marker
// const initMap = function() {
//     const options = {     
//             zoom: 11,
//             center: { lat: listLatitude[0], lng: listLongitude[0]  }
//         }
//     map = new google.maps.Map(document.getElementById('map'), options)
//     marker = new google.maps.Marker({
//             position: { lat: listLatitude[0], lng: listLongitude[0]},
//             map: map,
//             animation: google.maps.Animation.DROP
//         });
// }

// function updateMapAndMarkerPosition() {
//     let newCenter = new google.maps.LatLng(listLatitude[1], listLongitude[1]);
//     map.setCenter(newCenter);
//     marker.setPosition(newCenter);
// }

// //saving a screipt html element to a variable called script
// let script = document.createElement('script')
// //setting src html tag equal to my google API Call
// script.src = "https://maps.googleapis.com/maps/api/js?key=&callback=initMap"
// //setting async true on our HTML element
// script.async = true
// //adding html element to our head section of our HTML document
// document.head.appendChild(script)

// window.map = map
// window.initMap = initMap
// window.updateMapAndMarkerPosition = updateMapAndMarkerPosition

