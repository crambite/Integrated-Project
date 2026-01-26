export function player_controller(queue) {

    //movement
    function forward() {
        queue.push("forward")
    };

    function backward() {
        queue.push("backward")
    };

    function left() {
        queue.push("left")
    };

    function right() {
        queue.push("right")
    };

    //return as an object to store in variable
    return{forward, backward, left, right};
};