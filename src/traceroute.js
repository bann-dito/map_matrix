class Traceroute {
    constructor(){

    }
    async getRoute(name){
        // const route = await fetch(`http://localhost:5001/traceroute?domain=${name}`)
        const route = await fetch(`https://mapping-the-matrix.onrender.com/traceroute?domain=${name}`)
        const data = await route.json();
        return data
    }
}

export default Traceroute