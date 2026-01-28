export class Obj{
    constructor (x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    };

    //movement
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
    };

    //clear fow (need to start with something.clear_fow(fow))
    clear_fow(fow) {
        //fog clears 5 by 5 block around player (-2, -1, 0, 1, 2) when looped from negative 2, hence 5
        const clear_dist = 3

        //increament from player to make 5 by 5
        const width_increament = -2;
        const height_increament = -2;

        //loop through the height
        for (let y = height_increament; y < clear_dist; y++) {

            //get y postition to clear fog
            const clear_y = this.y / this.height + y;

            //stop clearing at boundary
            if (clear_y < 0 || clear_y > fow.length) {
                continue
            }

            //loop through width
            for (let x = width_increament; x < clear_dist; x++) {
                //get x postition to clear fog
                const clear_x = this.x / this.width  + x;
                
                //stop clearing at boundary
                if (clear_x < 0 || clear_x > fow[0].length) {
                    continue
                }

                fow[clear_y][clear_x] = "";
            }
        }

        return fow
    };

    //aabb collision (need to start with something.collision(obj))
    collision(obj) {
        return this.x < obj.x + obj.width  &&
                this.x + this.width > obj.x &&
                this.y < obj.y + obj.height &&
                this.y + this.height > obj.y;
    }
};