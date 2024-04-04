import Magnet from "./magnet.js"

const CONTENT = `
<svg width="100%" height="100%">
    <rect width="100%" height="100%"  fill="black" rx="20%" ry="20%" />
</svg>`


export default class Splitter extends Magnet{
    constructor(){
        super(CONTENT)
    }
}
