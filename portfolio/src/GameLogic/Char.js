class Char {

    constructor(text, position, size, stringIndex) {
        this.text = text;
        this.position = position;
        this.size = size;
        this.stringIndex = stringIndex;
    }

    draw(context) {

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

export default Char;