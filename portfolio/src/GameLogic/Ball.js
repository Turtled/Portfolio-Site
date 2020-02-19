import Particles from "./Particles";
import * as GameStates from "../GameLogic/GameStates"

class Ball {

    timeSinceLastCollision = 210293129;
    collisionCooldown = 20;

    stop = false;

    constructor(position, size, setGameState) {
        this.velocity = { x: .2, y: .5 };
        this.size = size;
        this.position = position;
        this.setGameState = setGameState;
    }

    draw(context) {
        context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

    move(paddle, characters, deltaTime) {

        this.timeSinceLastCollision += deltaTime;

        let foundCollision = false;

        characters.forEach(char => {
            if (char.boundsInclude(this.position, this.size) && this.timeSinceLastCollision >= this.collisionCooldown) {
                this.timeSinceLastCollision = 0;
                char.text = " ";
                char.doDestroyParticles(new Particles({ x: char.position.x, y: char.position.y }, Math.random() * 5 + 5));//spawn particles at the character's position; amount ranging from 0 - 10 
                if (char.getCollisionSide(this.position) == "x") {
                    console.log("X Reflection")
                    this.velocity.x *= -1;
                }
                else {
                    console.log("Y Reflection")
                    this.velocity.y *= -1;
                }

                let stillACharLeft = false;
                characters.forEach(char => {
                    if (char.text != " ") {
                        stillACharLeft = true;
                    }
                });
                if (stillACharLeft === false) {//they won!
                    if (this.stop === false) {
                        console.log("Game overing");
                        this.setGameState(GameStates.GAME_END_WIN);
                        this.stop = true;
                    }
                }
            }
        });

        if (paddle.boundsInclude(this.position) && this.timeSinceLastCollision >= this.collisionCooldown) {
            this.timeSinceLastCollision = 0;
            this.velocity.y *= -1;
            this.velocity.x = paddle.distanceFromCenter(this.position) / 10;
            console.log(paddle.distanceFromCenter(this.position) / 10)
        }

        if (this.position.y <= 0 && this.timeSinceLastCollision >= this.collisionCooldown) {
            this.timeSinceLastCollision = 0;
            this.velocity.y *= -1;
        }

        if (this.position.y >= window.innerHeight) {//ball hit the bottom of the screen, GAME OVER
            if (this.stop === false) {
                console.log(this.position.y, ">=" ,window.innerHeight, " = ", this.position.y >= window.innerHeight)
                console.log("Game overing");
            this.setGameState(GameStates.GAME_END_LOSS);
            this.stop = true;
            }

        }

        if (this.position.x <= 0 || this.position.x >= window.innerWidth && this.timeSinceLastCollision >= this.collisionCooldown) {
            this.timeSinceLastCollision = 0;
            this.velocity.x *= -1;
        }

        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;

    }

    boundsInclude(position) {
        console.log(this.timeSinceLastCollision)
        if (position.x > this.position.x - this.size / 2 && position.x < this.position.x + this.size / 2) {
            if (position.y > this.position.y - this.size / 2 && position.y < this.position.y + this.size / 2) {
                if (this.timeSinceLastCollision >= this.collisionCooldown) {
                    this.timeSinceLastCollision = 0;
                    return true;
                }
            }
        }
        return false;
    }

}

export default Ball;