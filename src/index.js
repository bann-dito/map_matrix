import Traceroute from "./traceroute";
import Location from "./location";
import Map from "./maps";

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
//not done, line 80

//for each each hop pass the the IP to the geo location
//

//pass geo location longitude and latitude to the maps API


//show the user google maps with laptop


const getStarted = document.getElementById("get-started")

getStarted.addEventListener('click', (event) => {
    event.preventDefault();
    const welcomePage = document.getElementById("welcome")
    const enterDestination = document.getElementById("enter-destination")
    const macbook = document.getElementById("macbook-container")

    welcomePage.classList.add('hidden')
    enterDestination.classList.remove('hidden')
    macbook.classList.remove('hidden')
    // setInterval(draw, 33);
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
    //routes is on line 80
})





const traceRoute = new Traceroute


//example of console logging the data object with the hops property
// routes.then((data) => {
//     console.log(data.response.hops)
// })

//hard coding IP addresses for now
// let ip = ["149.56.56.62", "10.98.243.143", "10.34.49.68", "10.74.9.186", "10.200.3.133", "198.32.118.126","104.244.42.65" ]
let ip = []
//this function needs to check if the IP is 0.0.0.0
//commenting out for now until I can figure out how to pull IPs from the object
const routes = async function(){
    let domain = domainInput
    const route = await traceRoute.getRoute(domain)
};



//working API call to gather IP geo location details
const locate = new Location



const geolocation = locate.getLocation("166.171.248.255")



// async function getLongitude(){
//     geolocation.then((data) =>{
//         return data.longitude
//     })
// }

// getLongitude()


// geolocation.then((data) =>{
//     getLatitude = data.latitude
//     getLongitude = data.longitude
//     console.log(getLatitude)
//     console.log(getLongitude)

// })

//Google maps constructor function
//must pass latitude, then longitude to constructor
let map = new Map(37.7749, -122.4194)
map.initMap

//saving a screipt html element to a variable called script
let script = document.createElement('script')
//setting src html tag equal to my google API Call
script.src = "https://maps.googleapis.com/maps/api/js?key=ADD_API_KEY&callback=map.initMap"
//setting async true on our HTML element
script.async = true
//adding html element to our head section of our HTML document
document.head.appendChild(script)

window.map = map







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
