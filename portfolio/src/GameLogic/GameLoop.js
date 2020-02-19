import Char from "../GameLogic/Char";
import Paddle from '../GameLogic/Paddle';
import Ball from '../GameLogic/Ball';

let mousePos = { x: 0, y: 0 };

class GameLoop {

    fontSize = 30;

    originalText = "Helllllo world! ! !!! Spacing test";

    paddleWidth = 100;
    paddle = new Paddle({ x: window.innerWidth / 2 - this.paddleWidth / 2, y: window.innerHeight - window.innerHeight / 10 }, { width: this.paddleWidth, height: 15 });
    ball;
    characters = []
    particles = []

    lastTime;
    shouldLoop = true;
    c;

    constructor(canvas, text, setGameState) {
        console.log("Game loop constructor")
        this.c = canvas.getContext("2d");
        this.originalText = text;
        this.setGameState = setGameState;
        this.ball = new Ball({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, { width: 20, height: 20 }, this.setGameState);
    }

    setStyles() {

        this.c.font = this.fontSize + 'px ' + 'Arial';
        this.c.lineWidth = 2;
        this.c.textBaseline = 'middle';
        this.c.textAlign = 'center';
        this.c.fillStyle = "white";

    }

    queueParticle(particle) {
        this.particles.push(particle);
    }

    updateMousePosition(mPos) {
        mousePos = mPos;
    }

    startLoop() {
        console.log("Start")
        this.doFrame();
        this.setStyles();

        let totalXOffset = 0;
        let yOffset = 40;

        let totalIndex = 0;


        let originalTextLines = this.originalText.split("\n");
        //initialize by filling characters array with Chars for each character in text
        for (let j = 0; j < originalTextLines.length; j++) {
            totalXOffset = 0;
            for (let i = 0; i < originalTextLines[j].length; i++) {
                let position = { x: window.innerWidth / 2 - this.c.measureText(originalTextLines[j]).width / 2 + (totalXOffset + this.c.measureText(originalTextLines[j][i]).width / 2), y: window.innerHeight / 10 + j * yOffset }
                let char = new Char(originalTextLines[j][i], position, this.c.measureText(originalTextLines[j][i]).width, totalIndex, this.queueParticle.bind(this));
                this.characters.push(char);
                totalXOffset += this.c.measureText(originalTextLines[j][i]).width;
                totalIndex ++;
            }
    }

    }

    stopLoop(){
        this.shouldLoop = false;
    }

    doFrame(currentTime) {
        //console.log(this.mousePos)
        this.c.clearRect(0, 0, window.innerWidth, window.innerHeight);//clear previous frame

        this.setStyles();

        if (!this.lastTime) this.lastTime = currentTime;
        let deltaTime = currentTime - this.lastTime;//time since last frame
        this.lastTime = currentTime;

        if (isNaN(deltaTime)) {
            deltaTime = 0;
        }

        //draw chars
        this.characters.forEach((char) => {
            //char.drawBounds(c);
            this.setStyles();
            char.draw(this.c);
        });

        //draw particles
        let particlesToDelete = [];
        this.particles.forEach(particle => {
            if (particle.isEffectDone) {
                particlesToDelete.push(particle);
            }
            else {
                particle.draw(this.c, deltaTime);
            }
        });

        if (particlesToDelete.length > 0) {

            particlesToDelete.forEach(particle => {
                this.particles = this.particles.filter((item) => {
                    return item != particle
                });
            });

        }

        particlesToDelete = [];

        //draw paddle
        this.paddle.moveTowards(mousePos.x, window.innerWidth, deltaTime);//smoothly move towards mousePos.x
        this.paddle.draw(this.c);

        //draw ball
        this.ball.move(this.paddle, this.characters, deltaTime);
        this.ball.draw(this.c);

        if(this.shouldLoop) {
            requestAnimationFrame(this.doFrame.bind(this));
        }
    }

}

export default GameLoop;