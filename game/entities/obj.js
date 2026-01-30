export class Obj{
    constructor (x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.old_x = 0
        this.old_y = 0
    };

    /* movement
    collision is done here to make allow ghost to have collision */
    up() {
        //save old coords for collision
        this.old_y = this.y

        this.y -= this.height

        if (this.collision(window.walls)) {
            this.y = this.old_y
        }
    };

    down() {
        //save old coords for collision
        this.old_y = this.y

        this.y += this.height

        if (this.collision(window.walls)) {
            this.y = this.old_y
        }
    };

    left() {
        //save old coords for collision
        this.old_x = this.x

        this.x -= this.width

        if (this.collision(window.walls)) {
            this.x = this.old_x
        }
    };

    right() {
        //save old coords for collision
        this.old_x = this.x

        this.x += this.width

        if (this.collision(window.walls)) {
            this.x = this.old_x
        }
    };

    //checks
    is_intersection() {
        //check if player is at the intersection
        if (this.collision(window.intersections)) {
            return true;
        }
        else {
            return false;
        }
    }

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

    //aabb collision (need to start with something.collision(obj)) where obj is an array or set
    collision(obj) {
        for (let item of obj) {
            if (this.x < item.x + item.width && this.x + this.width > item.x && this.y < item.y + item.height && this.y + this.height > item.y) {
                return true
            }
        }
    }

    //finds an enemy within 2 tiles up, down, left, right from player and kills it, else does nothing
    shoot(enemies) {
        for (let enemy of enemies) {
            const diff_x = Math.abs((this.x - enemy.x) / this.width);
            const diff_y = Math.abs((this.y - enemy.y) / this.height);
            const shoot_range = 3;  //one more than intended range since < is used

            //check for same axis and within range
            if (!((this.y === enemy.y && diff_x < shoot_range) || (this.x === enemy.x && diff_y < shoot_range))) {
                continue;
            }

            window.shoot = {start_x : this.x + this.width / 2, start_y : this.y + this.height / 2, end_x : enemy.x + enemy.width / 2, end_y : enemy.y + enemy.height / 2};
            
            //remove the enemy
            enemies.delete(enemy);
        }
    }

    //random enemy movement
    move(enemies) {
        //loop through enemies
        for (let enemy of enemies) {
            //decides random direction, 0 - up 1 - down 2 - left 3 - right
            const direction = Math.floor(Math.random() * 4);

            if (direction === 0) {
                enemy.up();
            }
            else if (direction === 1) {
                enemy.down();
            }
            else if (direction === 2) {
                enemy.left();
            }
            else {
                enemy.right();
            }  
        }
    }
};