import * as Three from './lib/three.module.js'

export default class Space{
    constructor(){
        this.build()
        this.render()
    }

    build(){
        this.buildScene()

        this.buildRenderer()

        this.addObjects()
        
        this.setup()
    }

    render(){
        requestAnimationFrame(() => this.render())

        this.transform()

        this.renderer.render(this.scene, this.camera)
    }

    buildScene(){
        this.scene = new Three.Scene()
        this.camera = new Three.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 500 )
    }

    buildRenderer(){
        this.renderer = new Three.WebGLRenderer()
        this.renderer.setSize( window.innerWidth, window.innerHeight )

        document.body.appendChild( this.renderer.domElement )
        console.log(this.renderer.domElement.style)
    }

    setup(){
        this.camera.position.set( 0, 100, 100 )
        this.camera.lookAt( 0, 0, 0 )
    }

    transform(){
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01;
    }

    addObjects(){
        this.cube = new Three.Mesh(
            new Three.BoxGeometry( 5, 5, 5 ),
            new Three.MeshBasicMaterial( { color: 0x00ff00 } )
        )

        const points = [
            new Three.Vector3( -10, 0, 0 ),
            new Three.Vector3( 0, 10, 0 ),
            new Three.Vector3( 10, 0, 0 )
        ]

        this.line = new Three.Line(
            new Three.BufferGeometry().setFromPoints( points ),
            new Three.LineBasicMaterial( { color: 0x0000ff } )
        ) 

        this.scene.add( this.cube )
        this.scene.add( this.line )
    }
}