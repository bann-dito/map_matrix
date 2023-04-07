import Traceroute from "./traceroute";
import Location from "./location";
import Map from "./maps";
import { async } from "regenerator-runtime";

//Sets getStarted to the get-started HTML elements
const getStarted = document.getElementById("get-started")

//Listens for a click on the get-started button
//To summ. this hides the homepage and shows the enter destination container
getStarted.addEventListener('click', (event) => {
    //prevents the default of loading a page on click
    event.preventDefault();
    //saves the HTML container welcome container
    const welcomePage = document.getElementById("welcome-container")
    //saves the HTNL container destinations
    const enterDestination = document.getElementById("destinations")
    //saves the HTML container macbook-container
    const macbook = document.getElementById("macbook-container")
    //Adds hidden to the HTML container 
    welcomePage.classList.add('hidden')
    //Rmoeves hidden from the HTML container destination
    enterDestination.classList.remove('hidden')
    //Removes hidden from the HTML container macbook-container
    macbook.classList.remove('hidden')
})


const letsGo = document.getElementById("domain-submit")
let domainInput;

//Summarize, this function waits for this for lets go to be clicked
//Hides HTML elements, shows the destinations details container
//Gathers user input and passes it to routes function
letsGo.addEventListener('click', (event) => {
    event.preventDefault();
    const enterDestination = document.getElementById("enter-destination")
    const destinationDetails = document.getElementById("destination-details")
    enterDestination.classList.add('hidden')
    destinationDetails.classList.remove('hidden')
    domainInput = document.getElementById("domain").value
    
    // console.log(domainInput)
    routes(domainInput)
})

// window.domainInput = domainInput

//makes a new traceroute instance
const traceRoute = new Traceroute
//array of collected IP from the routes function
let ip_collection = []

//Summarize, takes domain input from the Lets go event listener
//calls the class function getRoute and passes the domain input
//get route is an API fetch and passes each hop into 
//calls the locate details function when done
const routes = function(domain){
    const route = traceRoute.getRoute(domain)
    route.then((data) => {
        // console.log(data.response.hops, "hops console log")
        for (let number in data.response.hops) {
            if (data.response.hops[number].ip !== "0.0.0.0" && data.response.hops[number].ip !== "*") {
                ip_collection.push(data.response.hops[number].ip)
                // console.log(ip_collection)
            }
        }
        locateDetails()
    })    
};


// window.ip_collection = ip_collection

//working API call to gather IP geo location details
const locate = new Location

let listCities = []
let listLongitude = []
let listLatitude = []

// window.listCities = listCities
// window.listLongitude = listLongitude
// window.listLatitude = listLatitude

//iterates through array of collected IPs
//due to API restrictions each API call from getLocation
//must wait one second per request
//adds API data into an array
function locateDetails(){
    for (let i=0 ; i < ip_collection.length; i++){
        setTimeout(() => {
            let geolocation = locate.getLocation(ip_collection[i])
            geolocation.then((data) => {
                if (!listLongitude.includes(data.longitude)){
                    listCities.push(data.city)
                    listLongitude.push(data.longitude)
                    listLatitude.push(data.latitude)
                    // console.log(data.city)
                    // console.log(data.latitude)
                    // console.log(data.longitude)
                    // console.log(data.ip_address)
                    // console.log(data)
                    if ( i === 0 ){
                        destinationH1.innerHTML = `You've arrive at ${listCities[0]}`
                        makeMap()
                    }
                }
            })
        },i * 1500)
    }
} 

// window.locateDetails = locateDetails




//Makes a map as an instance of Map
//Takes in the first positions from listLatitude and listLongitude
//Create a new script HTML element
//Fetches the google maps API key from the proxy server
//Sets the new script src to equal our google maps API call
//Google maps API requires a callback function, hence map.initMap
let map;
function makeMap(){
    map = new Map(listLatitude[0], listLongitude[0])
    map.initMap
    let script = document.createElement('script')
    //setting src html tag equal to my google API Call
    fetch("https://mapping-the-matrix.onrender.com/goog").then(res => {
        return res.text()
    }).then(key => {
        // console.log(key)
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=map.initMap`
    })
    //setting async true on our HTML element
    script.async = true
    //adding html element to our head section of our HTML document
    document.head.appendChild(script)
    //setting map on the window
    window.map = map
}



//Listens for next-button click
//On button click increment i by 1
//Set the arrived destination to the updated city
//update the map and marker to updated coordinates
//if we've reached the end we provide summary view of all mapped location
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


//draws canvas every 33 miliseconds
setInterval(draw, 33);