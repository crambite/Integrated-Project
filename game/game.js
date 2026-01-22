import { Player } from "./characters/player.js";

//Board size
let board, context
const tile_size = 48;
const columns = 24;
const rows = 16
const board_height = rows * tile_size;
const board_width = columns * tile_size;

let player = new Player("../assets/characters/temp/temp.png");

//Initialise board
window.onload = () => {
    board = document.getElementById("board");
    board.height = board_height;
    board.width = board_width;
    context = board.getContext("2d");

    draw();
};

//Scalable canvas



//Draw the assets in the game console
function draw() {
    context.clearRect(0, 0, board_width, board_height);

    context.drawImage(player.img, 0, 48, tile_size, tile_size,)
};