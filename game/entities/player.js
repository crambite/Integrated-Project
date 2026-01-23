export class Obj{
    constructor (x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    };

    move_forward() {
        this.y -= this.height
    };

    move_backward() {
        this.y += this.height
    };

    move_left() {
        this.x -= this.width
    };

    move_right() {
        this.x += this.width
    }
};