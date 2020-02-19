class Char {

    constructor(text, position, size, stringIndex, particleCallback) {
        this.text = text;
        this.position = position;
        this.size = size;
        this.stringIndex = stringIndex;
        this.doDestroyParticles = particleCallback;
    }

    draw(context) {
        context.fillText(this.text, this.position.x, this.position.y);
    }

    height = 30;

    drawBounds(context) {
        //console.log(this.size)
        context.fillStyle = "red";
        context.fillRect(this.position.x - this.size / 2, this.position.y - this.height / 2, this.size, this.height);
    }

    boundsInclude(position, size) {
        if(this.text == " ") {
            return false;
        }
        if (position.x + size.width / 2 > this.position.x - this.size / 2 && position.x + size.width / 2 < this.position.x + this.size / 2 ||
            position.x - size.width / 2 > this.position.x - this.size / 2 && position.x - size.width / 2 < this.position.x + this.size / 2) {
            if (position.y + size.height / 2 > this.position.y - this.size / 2 && position.y + size.height / 2 < this.position.y + this.size / 2 ||
                position.y - size.height / 2 > this.position.y - this.size / 2 && position.y - size.height / 2 < this.position.y + this.size / 2) {
                return true;
            }
        }
        return false;
    }

    getCollisionSide(position) {
        //distances from the ball to each side of the character
        let xDist1 = position.x - this.position.x - this.size / 2;
        let xDist2 = position.x - this.position.x + this.size / 2;

        //shortest of the two
        let shortestXDist = xDist2;

        if (xDist1 < xDist2) {
            shortestXDist = xDist1;
        }

        //distances from the ball to each side of the character
        let yDist1 = position.y - this.position.y - this.height / 2;
        let yDist2 = position.y - this.position.y + this.height / 2;

        //shortest of the two
        let shortestYDist = yDist2;

        if (yDist1 < yDist2) {
            shortestYDist = yDist1;
        }

        //Collision happened on either left or right side of the character
        if (shortestXDist < shortestYDist) {
            return "x";
        }
        else {//top or bottom
            return "y";
        }
    }

}

export default Char;