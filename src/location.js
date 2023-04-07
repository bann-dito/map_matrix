class Location{
    constructor(){

    }
    async getLocation(ip){
        //api call to gather geolocation info
        const location = await fetch(`https://mapping-the-matrix.onrender.com/location?ip=${ip}`)
        const data = await location.json()
        return data
    }
}

export default Location