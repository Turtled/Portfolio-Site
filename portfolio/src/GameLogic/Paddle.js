class Paddle {

    constructor(position, size, accelerationRate) {
        this.accelerationRate = this.accelerationRate;
        this.speed = 0;
        this.size = size;
        this.position = position;
    }

    draw(context) {
        context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

    boundsInclude(position) {
        if(position.x > this.position.x - this.size / 2 && position.x < this.position.x + this.size / 2) {
            if(position.y > this.position.y - this.size / 2 && position.y < this.position.y + this.size / 2) {
                return true;
            }
        }
        return false;
    }

}

export default Paddle;