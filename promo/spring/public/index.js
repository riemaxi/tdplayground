
class Simulation{
    constructor(){
        this.mass = 1 // mass of the body in kg
        this.springConstant = 10 // spring constant (k) in N/m
        this.initialImpulse = 5 // initial impulse (J) in N·s
        this.omega0 = Math.sqrt(2 * this.springConstant / this.mass) // natural angular frequency
        this.amplitude = this.initialImpulse / (this.mass * this.omega0) // initial amplitude after first impulse

        this.canvas = document.getElementById('canvas')
        this.body = document.getElementById('body')
        this.spring0 = document.getElementById('spring0')
        this.spring1 = document.getElementById('spring1')

        this.play()
    }

    position(t){
        return this.amplitude * Math.sin(this.omega0 * t) // position x(t)
    }

    play(t = 0){
        let scale =  2 + this.position(t)/this.amplitude
        let transform = `translate(100,100) scale(${scale},1)`
        this.spring0.setAttribute('transform', transform)

        let x = 130 + 100*scale
        transform = `translate(${x},100) scale(${4-scale},1)`
        this.spring1.setAttribute('transform', transform)

        x = 100*(scale+1)
        transform = `translate(${x},100) scale(.05,.08)`
        this.body.setAttribute('transform', transform)

    
        window.requestAnimationFrame(() => this.play(t + .01))
    }

}

new Simulation()