import * as Three from './lib/three.module.js'

export default class Space{
    constructor(){
        this.scene = new Three.Scene()
        this.camera = new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

        this.renderer = new Three.WebGLRenderer()
        this.renderer.setSize( window.innerWidth, window.innerHeight )
        document.body.appendChild( this.renderer.domElement )

        const geometry = new Three.BoxGeometry( 1, 1, 1 )
        const material = new Three.MeshBasicMaterial( { color: 0x00ff00 } )
        this.cube = new Three.Mesh( geometry, material )
        this.scene.add( this.cube )
        
        this.camera.position.z = 5

        this.render()
    }

    render(){
        requestAnimationFrame(() => this.render())

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera)
    }
}