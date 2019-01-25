'use sctrict'

import Particle from './particle.js'

class App {
    constructor() {
        this._particlesArray = new Array()
        this._pId = 0
        this._requestAnimationFrame = null
        // Canvas
        this._canvas = document.querySelector('#canvas')
        if(this._canvas && this._canvas.getContext('2d')) {
            this._canvas.width = window.innerWidth
            this._canvas.height = window.innerHeight
            this._canvas2DContext = this._canvas.getContext('2d')
            // Create Particles
            this.createParticles()
            // Animate
            const step = timestamp => {
                this.updateCanvas()
                window.requestAnimationFrame(step)
            }
            step()
        }
        // Resize window
        window.addEventListener('resize', (ev) => {
            this._canvas.width = window.innerWidth
            this._canvas.height = window.innerHeight
        })
    }

    createParticles() {
        // Constants
        const fx = Math.random()*this._canvas.width;
        const fy = Math.random()*this._canvas.height/2;
        const cr = Math.round(Math.random()*255);
        const cg = Math.round(Math.random()*255);
        const cb = Math.round(Math.random()*255);
    
        for(let i=0;i<5000+Math.round(Math.random()*500);i++){
            console.log(fx + ' ' + fy + ' ' + cr)
            const p = new Particle(observable, this._pId, fx, fy, 4, Math.random()*8-4, Math.random()*8-4, cr, cg, cb);
            p.observable.addEventListener('particle_ended', (ev) => {
                console.log(ev)
                this.removeParticleFromArray(this._pId);
            });
            this._particlesArray.push(p);
            this._pId++;
        }
    }

    removeParticle(id){
        let match = false
        let i = 0
        let p = 0
        while(!match && i<this._particlesArray.length) {
            p = this._particlesArray[i]
            if(p.id === id) {
                match = true
            } else {
                i++
            }
        }
        this._particlesArray.splice(i,1);
    }

    updateCanvas() {
        // Get dimension canvas
	    var canvasWidth = this._canvas.width;
        var canvasHeight = this._canvas.height;	

        this._canvas2DContext.globalCompositeOperation = "source-over";
        this._canvas2DContext.fillStyle = "rgba(0,0,0,0.1)";
        this._canvas2DContext.fillRect(0, 0, canvasWidth, canvasHeight);
        this._canvas2DContext.globalCompositeOperation = "lighter";
    
        // Current time
        const currentTime = new Date();
    
        // Loop through particles
        for(let i=0;i<this._particlesArray.length;i++){
            const p = this._particlesArray[i];
            p.update(currentTime);
            p.display(this._canvas2DContext);
        }

        //console.log(this._particlesArray.length)
    }
}

export default App;