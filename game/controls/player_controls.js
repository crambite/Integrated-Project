export function player_controller({get_player, draw}) {

    //movement
    function forward() {
        const player = get_player();
        player.move_forward();
        draw();
    };

    function backward() {
        const player = get_player();
        player.move_backward();
        draw();
    };

    function left() {
        const player = get_player();
        player.move_left();
        draw();
    };

    function right() {
        const player = get_player();
        player.move_right();
        draw();
    };

    return{forward, backward, left, right};
};