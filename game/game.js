import { Obj } from "./entities/player.js";
import { player_controller } from "./controls/player_controls.js"

//board 
let board, context
const tile_size = 48;
const columns = 24;
const rows = 16
const board_height = rows * tile_size;
const board_width = columns * tile_size;

const boundary = document.getElementById("game_console");

//map
let map;
map = [
    "wwwwwwwwwwwwwwwwwwwwwwww",
    "wp                     w",
    "w                      w",
    "w                      w",
    "w                      w",
    "w                      w",
    "w                      w",
    "w                      w",
    "w                      w",
    "w                      w",
    "w                      w",
    "w                      w",
    "w                      w",
    "w                      w",
    "w                      w",
    "wwwwwwwwwwwwwwwwwwwwwwww",
]

//image
const player_image = new Image();
player_image.src = "../assets/characters/robot.jpg";
const wall_image = new Image();
wall_image.src = "../assets/map/stone_wall.jpg";

//player
let player;

//walls
let walls = new Set();

//coordinates of assets
function get_coords(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === "w") {
                walls.add(new Obj(x * tile_size, y * tile_size, tile_size, tile_size));
            }
            if (map[y][x] === "p") {
                player = new Obj(x * tile_size, y * tile_size, tile_size, tile_size);
            }
        }
    }
};

//scalable canvas
function resize() {
    //get height and width of parent container
    const dimension = boundary.getBoundingClientRect();

    //get and choose smallest scale
    const scale_x = dimension.width / board_width;
    const scale_y = dimension.height / board_height;
    const scale = Math.min(scale_x, scale_y);

    //update board dimensions
    board.style.width = (board_width * scale) + "px";
    board.style.height = (board_height * scale) + "px";
};

//draw the assets in the game console
function draw() {
    //clear the board of previous assets
    context.clearRect(0, 0, board_width, board_height);

    //draw player
    context.drawImage(player_image, player.x, player.y, player.width, player.height);

    //draw wall
    for (let wall of walls) {
        context.drawImage(wall_image, wall.x, wall.y, wall.width, wall.height);
    }
};

//updates the game
function update() {
    draw();

    //store player controls in the window for pyodide to reference
    const player_controls = player_controller({get_player: () => {return player}, draw})
    window.player_controls = player_controls ;

    //gives a "green light" when player controls are fully loaded
    window.dispatchEvent(new Event("player-controls-ready"));
};

//initialise board
window.onload = () => {
    board = document.getElementById("board");
    board.height = board_height;
    board.width = board_width;
    context = board.getContext("2d");

    resize(); //ensure that text editor is the right size

    get_coords(map);
    update();
};

//resize board
window.onresize = resize;
