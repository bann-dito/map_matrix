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
    const welcomePage = document.getElementById("welcome-container")
    const enterDestination = document.getElementById("destinations")
    const macbook = document.getElementById("macbook-container")

    welcomePage.classList.add('hidden')
    enterDestination.classList.remove('hidden')
    macbook.classList.remove('hidden')
})



const letsGo = document.getElementById("domain-submit")
let domainInput;
letsGo.addEventListener('click', (event) => {
    event.preventDefault();
    const enterDestination = document.getElementById("enter-destination")
    const destinationDetails = document.getElementById("destination-details")
    enterDestination.classList.add('hidden')
    destinationDetails.classList.remove('hidden')
    domainInput = document.getElementById("domain").value
    
    console.log(domainInput)
    routes(domainInput)
})



window.domainInput = domainInput

const traceRoute = new Traceroute


//example of console logging the data object with the hops property
// routes.then((data) => {
//     console.log(data.response.hops)
// })

//hard coding IP addresses for now so i dont continue to call the API and hit the limit
// let ip_collection = ["64.33.146.250", "69.4.127.37", "208.115.136.115", "157.240.33.164", "147.75.208.217", "173.252.67.1", "157.240.249.35" ]
let ip_collection = []
// this function needs to check if the IP is 0.0.0.0
// function is grabbing each IP that is not 0.0.0.0 and adds it to the IP collection
// this function is working!!!!
const routes = function(domain){
    const route = traceRoute.getRoute(domain)
    route.then((data) => {
        console.log(data.response.hops, "hops console log")
        for (let number in data.response.hops) {
            if (data.response.hops[number].ip !== "0.0.0.0" && data.response.hops[number].ip !== "*") {
                ip_collection.push(data.response.hops[number].ip)
                console.log(ip_collection)
            }
        }
        locateDetails()
    })    
};



//this is for testing while placing google maps in the correct CSS position

// const routes = function(){
//     locateDetails()
// }




window.ip_collection = ip_collection

//working API call to gather IP geo location details
const locate = new Location

// let listCities = ["Durand","Mather","Redwood City", "Tel Aviv", "Chicago", "Chicago"  ]
// let listLongitude = [-91.9339, -90.3118, -97.822, -79.3716,-87.6521, -87.6318, ]
// let listLatitude = [44.6311, 44.1461, 37.751, 43.6319, 41.8482, 41.8874, ]

let listCities = []
let listLongitude = []
let listLatitude = []

window.listCities = listCities
window.listLongitude = listLongitude
window.listLatitude = listLatitude
//this function is working
function locateDetails(){
    for (let i=0 ; i < ip_collection.length; i++){
        setTimeout(() => {
            let geolocation = locate.getLocation(ip_collection[i])
            geolocation.then((data) => {
                if (!listLongitude.includes(data.longitude)){
                    listCities.push(data.city)
                    listLongitude.push(data.longitude)
                    listLatitude.push(data.latitude)
                    console.log(data.city)
                    console.log(data.latitude)
                    console.log(data.longitude)
                    console.log(data.ip_address)
                    console.log(data)
                    if ( i === 0 ){
                        destinationH1.innerHTML = `You've arrive at ${listCities[0]}`
                        makeMap()
                    }
                }
            })
        },i * 1500)
    }
} 

window.locateDetails = locateDetails


// Google maps constructor function
// must pass latitude, then longitude to constructor
//this function is working!!!
let map;
function makeMap(){
    map = new Map(listLatitude[0], listLongitude[0])
    map.initMap
    let script = document.createElement('script')
    //setting src html tag equal to my google API Call
    fetch("https://mapping-the-matrix.onrender.com/goog").then(res => {
        return res.text()
    }).then(key => {
        console.log(key)
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=map.initMap`
    })
    //setting async true on our HTML element
    script.async = true
    //adding html element to our head section of our HTML document
    document.head.appendChild(script)
    
    window.map = map
}



// saving a screipt html element to a variable called script


//this is working!!!
let i = 0
let destinationH1 = document.getElementById("destination")
destinationH1.innerHTML = `You've arrived at ${listCities[i]}`
const nextButton = document.getElementById("next-button")
const onNextClick = function(event){
    event.preventDefault();
    i +=1;
    destinationH1.innerHTML = `You've arrived at ${listCities[i]}`
    map.updateMapAndMarkerPosition(listLatitude[i], listLongitude[i])
    if ( i === listLatitude.length){
        destinationH1.innerHTML = "Your Mapped Matrix"
        map.addMarkers(listLatitude, listLongitude)
        nextButton.removeEventListener('click', onNextClick)
    }
}
nextButton.addEventListener('click', onNextClick)

// nextButton.addEventListener('click', (event) => {
//     event.preventDefault();
//     i += 1;
//     destinationH1.innerHTML = `You've arrived at ${listCities[i]}`
//     map.updateMapAndMarkerPosition(listLatitude[i], listLongitude[i])
//     if (i === listLatitude.length) {
//         map.addMarkers(listLatitude, listLongitude)
//     }
// })


//set canvas to to HTML canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//set canvas to the current window width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//color and font style
ctx.fillStyle = "#0F0";
ctx.font = "16px monospace";



const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const charArr = chars.split("");
//number of columns needed based on the width of the window
const columns = canvas.width / 16;
let drops = [];
//set each element in column equal to 1
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}


function draw() {
    //set canvas to semi-transparent black
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    //draws rectangle based on canvas width and heigh that we set earlier
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //set fillstyle to green
    ctx.fillStyle = "#0F0";
    for (let i = 0; i < drops.length; i++) {
        //sets char index to hold a random index up to the char Array length
        const charIndex = Math.floor(Math.random() * charArr.length);
        //set char to the random char
        const char = charArr[charIndex];
        //fills text
        ctx.fillText(char, i * 16, drops[i] * 16);
        //resets drop back to 0, otherwise increment
        if (drops[i] * 16 > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

//resizes the canvas based on the state of the window and height
function resizeCanvas(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const columns = canvas.width / 16
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1
    }
}

//listening for window resize, runs callback if it does
window.addEventListener('resize', resizeCanvas)
resizeCanvas();




canvas.addEventListener("mousemove", function(event){
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;


    const column = Math.floor(mouseX / 16);
    const row = Math.floor(mouseY / 16);

    ctx.fillStyle = "#ff3333";
    for (let i = column - 1; i <= column + 1; i++) {
        for (let j = row - 1; j <= row + 1; j++) {
            if (i >= 0 && i < columns && j >= 0 && j < drops.length) {
                ctx.fillText(charArr[Math.floor(Math.random() * charArr.length)], i * 16, drops[j] * 16);
            }  
        }
    }
});


//draws canvas
setInterval(draw, 33);

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

