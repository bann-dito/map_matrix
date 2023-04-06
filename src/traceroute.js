class Traceroute {
    constructor(){
        // this.baseUrl = "https://api.viewdns.info/traceroute/?domain="
    }
    async getRoute(name){
        //example traceroute api call https://api.viewdns.info/traceroute/?domain=twitter.com&apikey=yourapikey&output=output_type
        // const route = await fetch(`${this.baseUrl}${name}&apikey=8a172496a9ecd2ac42a15e8794acf0b45f771d64&output=json`);
        const route = await fetch(`http://localhost:5000/?domain=${name}`)
        const data = await route.json();
        return data
    }
}

export default Traceroute