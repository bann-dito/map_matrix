class Traceroute {
    constructor(){

    }
    async getRoute(name){
        const route = await fetch(`https://mapping-the-matrix.onrender.com/?domain=${name}`)
        const data = await route.json();
        return data
    }
}

export default Traceroute