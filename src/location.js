class Location{
    constructor(){
        //this IP will be gathered from the traceroute body
        //example api request
        // this.baseURL = "https://ipgeolocation.abstractapi.com/v1/?api_key=d79e9a495a9847968f527c10331248ee&ip_address="
    }
    async getLocation(ip){
        //api call to gather geolocation info
        // const location = await fetch(`${this.baseURL}${ip}`)
        const location = await fetch(`https://mapping-the-matrix.onrender.com/location?ip=${ip}`)
        const data = await location.json()
        return data
    }
}

export default Location