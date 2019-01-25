class Particle {
    constructor(observable, id, x, y, size, velX, velY, cr, cg, cb) {
        this.observable = observable

        this.id = id
        this.x = x
        this.y = y
        this.size = size
        this.velX = velX
        this.velY = velY
        this.cr = cr
        this.cg = cg
        this.cb = cb
        this.calpha = 1
        this.startTime = new Date()
        this.t = 0
    }

    update(currentTime) {
        this.t = (currentTime.getTime() - this.startTime.getTime())/1000

        this.x += (this.velX/(this.velY*this.t))
		this.velY *= -1
		this.y += this.velX*this.t
    }

    display(canvas2DContext) {
        this.calpha *= 0.986
		// Check if particle is gone
		if(this.calpha < 0.005){
			this.observable.emit('particle_ended')
        }
    
		// Save current context
		canvas2DContext.save()
		
		// Circle
		canvas2DContext.beginPath();
		canvas2DContext.strokeStyle = `rgba(${this.cr},${this.cg},${this.cb})`;
		canvas2DContext.arc(this.x*this.t, (this.y)*this.t, Math.random()*8*this.size*this.t, 0, Math.PI*2, true);
		canvas2DContext.stroke();
		canvas2DContext.closePath()
		// Restore context
		canvas2DContext.restore()
    }
}

export default Particle;