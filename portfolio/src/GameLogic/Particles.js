class Particles {

    particles = []
    isEffectDone = false;

    constructor(position, amount) {
        this.position = position;
        this.amount = amount;

        for (let i = 0; i < amount; i++) {
            this.particles.push({ position: {x: position.x, y: position.y}, radius: Math.random() * 4 + 1, velocity: { x: Math.random() * 7.5 - 3.75, y: Math.random() * 7.5 - 3.75 } });
        }
    }

    draw(context, deltaTime) {
        let isParticlesStillOnScreen = false;
        this.particles.forEach((particle) => {
            particle.velocity.y += ( 9.81 * Math.pow(deltaTime, 2) ) / 10000;//gravity formula 
            particle.position.y += particle.velocity.y;
            particle.position.x += particle.velocity.x;

            if(particle.position.y < window.innerHeight) {
                isParticlesStillOnScreen = true
            }
            //console.log(particle.x, particle.y, particle.radius, 0, 2 * Math.PI)
            context.beginPath();
            context.arc(particle.position.x, particle.position.y, particle.radius, 0, 2 * Math.PI);
            context.fill();
        })
        if(isParticlesStillOnScreen === false) {
            //this effect is done, lets delete this Particles object
            this.isEffectDone = true;
        }
    }

}

export default Particles;