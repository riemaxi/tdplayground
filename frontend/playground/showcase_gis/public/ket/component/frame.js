import Element from "./common/element.js"

const content = `
<style>
    #root{
        width: 100%;
        height: 100%;
    }
</style>
<div id="root">
    <slot></slot>
</div>
`

export default class Frame extends Element{
    constructor(){
        super(content)

        window.customElements.define('play-map', Map)

        this.control()

        this.show()
    }

    control(){
    }

    show(){
        this.map = L.map('map',{center: [39.0005,-84.9784], zoom: 4})

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map)
    }

    info(item){
        return `
            <div>route: ${item.routeName}</div>
            <div>train: ${item.trainID}</div>
            <div>velocity: ${Math.floor(item.velocity)} mph</div>
            <div>timely: ${item.trainTimely}</div>
        `
    }

    addObject(item){
        let icon = L.icon({
            iconUrl: './img/map.train.svg',
            iconSize: [40, 40],
            iconAnchor: [20,20]
        })

        let marker = L.marker([item.lat, item.lon], {icon}).addTo(this.map)
        marker.bindPopup(this.info(item))

        
    }

    set data(value){
        let list = Object.values(value)
        list.forEach(items => {
            items.forEach(item => this.addObject(item))
        })
    }    

}