import { Obj } from "./entities/obj.js";
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
    "w p     w              w",
    "w wwww  w  wwwwwwwww   w",
    "w w     w        w     w",
    "w w  wwwwwwwww   w  wwww",
    "w w        w     w     w",
    "w wwwwwww  w  wwwwwww  w",
    "w      w   w        w  w",
    "wwww   w   wwwwwww  w  w",
    "w      w         w  w  w",
    "w  wwwwwwwwwww   w  w  w",
    "w              w w  w  w",
    "w  wwwwwwwwwww w w  w  w",
    "w            w   w     w",
    "w              w       w",
    "wwwwwwwwwwwwwwwwwwwwwwww"
];

//fow
let fow;
fow = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
];

//function queue
let queue = []

//turns
let turns = 1

//player
let player;

//walls
let walls = new Set();

//images
//player
const player_image = new Image();
player_image.src = "../assets/characters/robot.jpg";

//wall
const wall_image = new Image();
wall_image.src = "../assets/map/stone_wall.jpg";

//fog
const fog_image = new Image();
fog_image.src = "../assets/map/fog.png";

//coordinates of assets
function get_coords(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {

            //initialise fow
            fow[y].push("f");
            
            //skips if that part of the map is empty
            if (map[y][x] === " ") {
                continue
            }

            if (map[y][x] === "w") {
                walls.add(new Obj(x * tile_size, y * tile_size, tile_size, tile_size));
            }
            else if (map[y][x] === "p") {
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

    //draw wall
    for (let wall of walls) {
        context.drawImage(wall_image, wall.x, wall.y, wall.width, wall.height);
    }

    //draw fow
    for (let y = 0; y < fow.length; y++) {
        for (let x = 0; x < fow[y].length; x++) {
            //check if fog has been cleared
            if (fow[y][x] === "") {
                continue;
            }

            context.drawImage(fog_image, x * tile_size, y *tile_size, tile_size, tile_size);
        }
    }

    //draw player
    context.drawImage(player_image, player.x, player.y, player.width, player.height);
};

//updates the game
function update() {

    //get player's previous coordinates in case theres collision
    let old_x = player.x;
    let old_y = player.y;

    //check that queue isnt empty
    if (queue.length === 0) {
        return
    }

    //gets the first instruction from the queue
    const instruction = queue[0];

    //checks the instruction and executes it
    if (instruction === "forward") {
        player.move_forward();
    }
    else if (instruction === "backward") {
        player.move_backward();
    }
    else if (instruction === "left") {
        player.move_left();
    }
    else if (instruction === "right") {
        player.move_right();
    }

    //detect collision
    for (let wall of walls) {
        if (!player.collision(wall)) {
            continue
        }

        player.x = old_x;
        player.y = old_y;
    }

    //clear fow
    fow = player.clear_fow(fow);


    //update turns
    turns += 1;

    draw();

    queue.shift();
};

//initialise board
window.onload = () => {
    board = document.getElementById("board");
    board.height = board_height;
    board.width = board_width;
    context = board.getContext("2d");

    resize(); //ensure that text editor is the right size

    //initialise game
    get_coords(map); 
    fow = player.clear_fow(fow);

    draw();

    //store player controls in the window for pyodide to reference
    const player_controls = player_controller(queue);
    window.player_controls = player_controls;

    //gives a "green light" when player controls are fully loaded
    window.dispatchEvent(new Event("player-controls-ready"));

    const interval = setInterval(update, 500);
};

//resize board
window.onresize = resize;


