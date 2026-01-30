//file is needed to move ghost and player seperately, ghost on python while time, player on js time
export function player_controller(queue, ghost) {

    //movement
    function up() {
        ghost.up();

        //send to queue to move real player
        queue.push("up");
    };

    function down() {
        ghost.down();

        //send to queue to move real player
        queue.push("down");
    };

    function left() {
        ghost.left();

        //send to queue to move real player
        queue.push("left");
    };

    function right() {
        ghost.right();

        //send to queue to move real player
        queue.push("right");
    };

    //shoot
    function shoot() {
        //ghost does not perform shoot, player does
        queue.push("shoot");
    }

    //return as an object to store in variable
    return{up, down, left, right, shoot};
};