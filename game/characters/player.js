export class Player{
    constructor(image_src) {
        this.img = new Image();
        this.img.src = image_src; //allow the image to be drawn
    }
};