import { Player } from "./characters/player.js";

//board size
let board, context
const tile_size = 48;
const columns = 24;
const rows = 16
const board_height = rows * tile_size;
const board_width = columns * tile_size;

const boundary = document.getElementById("game_console");

let player = new Player("../assets/characters/temp/temp.png");

//scalable canvas
function resize() {
    //get height and width of parent container
    const dimension = boundary.getBoundingClientRect();

    //get and choose smallest scale
    const scale_x = dimension.width / board_width;
    const scale_y = dimension.height / board_height;
    const scale = Math.min(scale_x, scale_y)

    //update board dimensions
    board.style.width = (board_width * scale) + "px";
    board.style.height = (board_height * scale) + "px";
}

//draw the assets in the game console
function draw() {
    //clear the board of previous assets
    context.clearRect(0, 0, board_width, board_height);

    context.drawImage(player.img, 0, 48, tile_size, tile_size,)
};

//initialise board
window.onload = () => {
    board = document.getElementById("board");
    board.height = board_height;
    board.width = board_width;
    context = board.getContext("2d");

    resize()
    draw();
};

//resize board
window.onresize = resize;