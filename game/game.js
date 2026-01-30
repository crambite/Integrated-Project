import { Obj } from "./entities/obj.js";
import { player_controller } from "./controls/player_controls.js"

//run button
const run = document.querySelector(".run")

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
    "wwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwe iwwwwwwwwwwww",
    "wwwwwwwwwww wwwwwwwwwwww",
    "wwwwwwwwwwwpwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwwwwwwwwwww"
];

//intersections
let intersections = new Set();

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
let queue = [];

//turns
let turns = 1;

//player
let player;

//shoot state
let is_shooting = false;
window.shoot = {start_x : 0, start_y : 0 , end_x : 0, end_y : 0};

//ghost
let ghost;

//enemy
let enemies = new Set();

//walls
let walls = new Set();

//game loop
let interval;

//counter used in functions (enemy_turn)
let count = 0

//images

//enemy
const enemy_image = new Image();
enemy_image.src = "../assets/characters/enemy.png";

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
                ghost = new Obj(x * tile_size, y * tile_size, tile_size, tile_size);
            }
            else if (map[y][x] === "i") {
                intersections.add(new Obj(x * tile_size, y * tile_size, tile_size, tile_size));
            }
            else if (map[y][x] === "e") {
                enemies.add(new Obj(x * tile_size, y * tile_size, tile_size, tile_size))
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

    //draw fow (dosent use sets)
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

    //draw enemy
    for (let enemy of enemies) {
        context.drawImage(enemy_image, enemy.x, enemy.y, enemy.width, enemy.height);
    }

    //draw bullet ray if player shoots
    if (is_shooting) {
            //bullet ray settings
            context.strokeStyle = "red";
            context.lineWidth = 4;

            context.beginPath();
            context.moveTo(window.shoot.start_x, window.shoot.start_y);
            context.lineTo(window.shoot.end_x, window.shoot.end_y);
            context.stroke();

            //auto clear the bullet ray
            setTimeout(draw, 500)
    }
};

//updates the game on the player's turn
function player_turn() {
    //check for turn end
    if (queue.length === 0) {
        turns += 1;

        //start enemy turn
        alert("enemy turn");

        clearInterval(interval);
        interval = null;
        interval = setInterval(() => {enemy_turn(2)}, 500);

        return;
    }

    //gets the first instruction from the queue
    const instruction = queue[0];

    //checks the instruction and executes it
    if (instruction === "up") {
        player.up();
    }
    else if (instruction === "down") {
        player.down();
    }
    else if (instruction === "left") {
        player.left();
    }
    else if (instruction === "right") {
        player.right();
    }
    else if (instruction === "shoot") {
        //allows us to draw the shot
        is_shooting = true;

        player.shoot(enemies);
    }

    //clear fow
    fow = player.clear_fow(fow);

    //check if player collided with enemy (done here as ghost dosent need to care about death to enemy)
    if (player.collision(enemies)) {
        alert("You died");

        reset();

        return;
    }

    draw();

    queue.shift();

    //reset shooting back to original state
    is_shooting = false;
    window.shoot = {start_x : 0, start_y : 0 , end_x : 0, end_y : 0};
};

//updates the game on enemy turn
function enemy_turn(steps) {
    player.move(enemies);

    //check for collision for enemies
    if (player.collision(enemies)) {
        alert("You died");

        reset();

        return;
    }

    draw();
    count++

    //stops moving the enemy when it has moved its specified number of syeps and brings it back to the player's turn
    if (count === steps) {
        alert(`turn: ${turns}`);

        //reset count for next use
        count = 0;
        
        //stop updating the game until the next time player presses run
        clearInterval(interval);
        interval = null;
    }

}


//reset game back to start
function reset() {
    //stop game from updating
    clearInterval(interval);
    interval = null;

    //resetting or clearing everything
    queue.length = 0;
    turns = 1;
    is_shooting = false;
    window.shoot = { start_x: 0, start_y: 0, end_x: 0, end_y: 0 };
    count = 0

    walls.clear();
    enemies.clear();
    intersections.clear();

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

    player = null;
    ghost = null;

    get_coords(map);
    fow = player.clear_fow(fow);

    //updates the references
    window.walls = walls;
    window.intersections = intersections;
    window.ghost = ghost;

    window.player_controls = player_controller(queue, ghost);
    window.dispatchEvent(new Event("player-controls-ready"));

    draw();
}

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
    window.walls = walls;
    window.intersections = intersections;
    window.ghost = ghost;

    draw();

    //store player controls in the window for pyodide to reference
    const player_controls = player_controller(queue, ghost);
    window.player_controls = player_controls;

    //gives a "green light" when player controls are fully loaded
    window.dispatchEvent(new Event("player-controls-ready"));
};

//resize board
window.onresize = resize;

//run only when "run" is clicked
run.addEventListener("click", () => {
    //prevents multiple clicks
    if (interval) {
        console.log("spam run")
        return;
    }

    interval = setInterval(player_turn, 500);
});
