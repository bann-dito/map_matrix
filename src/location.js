class Location{
    constructor(){
        //this IP will be gathered from the traceroute body
        //example api request
        this.baseURL = "https://ipgeolocation.abstractapi.com/v1/?api_key=ADD_API_KEY&ip_address="
    }
    async getLocation(ip){
        //api call to gather geolocation info
        const location = await fetch(`${this.baseURL}${ip}`)
        const data = await location.json()
        return data
    }
}

export default Location