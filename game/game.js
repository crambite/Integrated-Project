import { Obj } from "./entities/obj.js";
import { player_controller } from "./controls/player_controls.js"
import { patch_player_data } from "../player_data/auth.js"

const data = JSON.parse(sessionStorage.getItem("data"));

//loading
const loading = document.getElementById("loading")
setTimeout(() => {
    loading.style.top = -1000 + "px"
}, 3000)

//run button
const run = document.querySelector(".run")

//reset button
const reset_btn = document.getElementById("reset")

//message display
const message = document.getElementById("message")
const message_content = document.getElementById("message_content")

//board 
let board, context
const tile_size = 48;
const columns = 24;
const rows = 16
const board_height = rows * tile_size;
const board_width = columns * tile_size;
window.board_height = board_height
window.board_width = board_width

//map
const map_id = sessionStorage.getItem("map");
const map_list = JSON.parse(sessionStorage.getItem("map_list"));
const map = map_list[map_id];
window.current_map = map

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

//exit
let exit;

//shoot state
let is_shooting = false;
window.shoot = {start_x : 0, start_y : 0 , end_x : 0, end_y : 0};

//ghost
let ghost;

//enemy
let enemies = new Set();

//walls
let walls = new Set();

//floor
let floors = new Set();

//game loop
let interval;

//counter used in functions where i need index and item
let count = 0

//images

//enemy
const enemy_image = new Image();
enemy_image.src = "assets/characters/enemy.png";

//player
const player_image = {
up: new Image(),
down: new Image(), 
left: new Image(), 
right: new Image()
};

//store a loaded version of the image to prevent player image being drawn too slowly
player_image.up.src = "assets/characters/robot_up.png";
player_image.down.src = "assets/characters/robot_down.png"
player_image.left.src = "assets/characters/robot_left.png"
player_image.right.src = "assets/characters/robot_right.png"

//upgraded robot sprite
if (sessionStorage.getItem("map") === "Familiar_Scene" || data["Familiar_Scene"] === true) {
    player_image.up.src = "assets/characters/Big_up.png";
    player_image.down.src = "assets/characters/Big_down.png"
    player_image.left.src = "assets/characters/Big_left.png"
    player_image.right.src = "assets/characters/Big_right.png"
}

let current_player_image = player_image.up
//wall
const wall_image = new Image();
wall_image.src = "assets/map/wall.png";

//floor
const floor_image = new Image();
floor_image.src = "assets/map/floor.png"

//fog
const fog_image = new Image();
fog_image.src = "assets/map/fog.png";

//exit
const exit_image = new Image();
exit_image.src = "assets/map/exit.png"

//sounds
const lazer_sound = new Audio("./assets/sounds/lazer.mp3")
lazer_sound.volume = data.volume;
const walk_sound = new Audio("./assets/sounds/walk.mp3")
walk_sound.volume = data.volume

function use(drone) {
    if (drone === "Kill") {
        //random enemy
        const random = Math.floor(Math.random() * enemies.size);

        //"kills" the enemy
        for (let enemy of enemies) {
            if (count === random) {
                enemies.delete(enemy);
                break;
            }

            count++;
        }
    }
    else if (drone === "Exit") {
        //gets the x, y of the exit and clears the fog on it
        const clear_x = exit.x / tile_size;
        const clear_y = exit.y / tile_size;

        fow[clear_y][clear_x] = "";
    }
    else if (drone === "Reveal") {
        //gets the x, y of all enemies and clears the fog on it
        for (let enemy of enemies) {
            const clear_x = enemy.x / tile_size;
            const clear_y = enemy.y / tile_size;

            fow[clear_y][clear_x] = "";
        }
    }

    //reset count for further use
    count = 0
}

//coordinates of assets
function get_coords(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {

            //initialise fow
            fow[y].push("f");
            
            //floor
            if (map[y][x] !== "w") {
                floors.add(new Obj(x * tile_size, y * tile_size, tile_size, tile_size));
            }

            //wall
            if (map[y][x] === "w") {
                walls.add(new Obj(x * tile_size, y * tile_size, tile_size, tile_size));
            }
            //player
            else if (map[y][x] === "p") {
                player = new Obj(x * tile_size, y * tile_size, tile_size, tile_size);
                ghost = new Obj(x * tile_size, y * tile_size, tile_size, tile_size);
            }
            //intersection
            else if (map[y][x] === "i") {
                intersections.add(new Obj(x * tile_size, y * tile_size, tile_size, tile_size));
            }
            //enemy
            else if (map[y][x] === "e") {
                enemies.add(new Obj(x * tile_size, y * tile_size, tile_size, tile_size));
            }
            //exit
            else if (map[y][x] === "E") {
                exit = new Obj(x * tile_size, y * tile_size, tile_size, tile_size);
            }
        }
    }

    //use the drone (automatic)
    use(sessionStorage.getItem("drone"));
};

//win
function win() {
    const win = document.getElementById("win_screen");
    const next = document.getElementById("next");
    const bronze = document.getElementById("bronze");
    const silver = document.getElementById("silver");
    const silver_req = document.getElementById("silver_req");
    const gold = document.getElementById("gold");
    const gold_req = document.getElementById("gold_req");
    const plat = document.getElementById("plat");
    
    //make win screen viewable
    win.style.opacity = 1;
    win.style.pointerEvents = "all"

    //display badge requirements
    silver_req.textContent = `Complete the map in ${map_list[map_id + "_silver"]} turns or less.`;
    gold_req.textContent = `Complete the map in ${map_list[map_id + "_gold"]} turns or less.`;

    
    //wait for patch to be applied
    window.addEventListener("patch_applied", () => {
        //go to vn screen
        next.addEventListener("click", () => {
            //go to final animation if final map
            if (sessionStorage.getItem("map") === "Familiar_Scene" && data["end"] === false) {
                window.location.href = "../cutscenes/ending.html";

                return;
            }
            else if (sessionStorage.getItem("map") === "Familiar_Scene") {
                window.location.href = "../main_menu/badges/badges.html";

                return
            }

            window.location.href = "../visual_novel/visual_novel.html";
        });
    });

    //update player data to mark map as completed
    //set map state to cleared
    data[map_id] = true;

    //displat bronze badge
    bronze.src = "./assets/badges/bronze.png";

    //determine the player badge and display the image of the badge, and badge requirements on the win screen
    if (turns === map_list.plat) {
        data[map_id + "_plat"] = true;

        plat.src = "./assets/badges/plat.png";
    }
    if (turns <= map_list[map_id + "_gold"]) {
        data[map_id + "_gold"] = true;

        gold.src = "./assets/badges/gold.png";
    }
    if (turns <= map_list[map_id + "_silver"]) {
        data[map_id + "_silver"] = true;

        silver.src = "./assets/badges/silver.png";
    }

    //store the updated data
    sessionStorage.setItem("data", JSON.stringify(data));
    
    //update player saves in restdb
    patch_player_data();
};

//draw the assets in the game console
function draw() {
    //clear the board of previous assets
    context.clearRect(0, 0, board_width, board_height);

    //draw wall
    for (let wall of walls) {
        context.drawImage(wall_image, wall.x, wall.y, wall.width, wall.height);
    }

    //draw floor
    for (let floor of floors) {
        context.drawImage(floor_image, floor.x, floor.y, floor.width, floor.height);
    }

    //draw player
    context.drawImage(current_player_image, player.x, player.y, player.width, player.height);

    //draw exit
    context.drawImage(exit_image, exit.x, exit.y, exit.width, exit.height)

    //draw enemy
    for (let enemy of enemies) {
        context.drawImage(enemy_image, enemy.x, enemy.y, enemy.width, enemy.height);
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

        //stop player turn
        clearInterval(interval);
        interval = null;

        //dosent start enemy turn if there are no enemies
        if (!enemies || enemies.size === 0) {
            //player turn display
            display(`Turn: ${turns}`);

            return;
        }

        //start enemy turn
        display("Enemy Turn");

        interval = setInterval(() => {enemy_turn(2)}, 500); 

        return;
    }

    //gets the first instruction from the queue
    const instruction = queue[0];

    //checks the instruction and executes it
    if (instruction === "up") {
        player.up();

        //play audio
        walk_sound.play()

        //change sprite direction
        current_player_image = player_image.up;
    }
    else if (instruction === "down") {
        player.down();

        //play audio
        walk_sound.play()

        //change sprite direction
        current_player_image = player_image.down;
    }
    else if (instruction === "left") {
        player.left();

        //play audio
        walk_sound.play()

        //change sprite direction
        current_player_image = player_image.left;
    }
    else if (instruction === "right") {
        player.right();

        //play audio
        walk_sound.play()

        //change sprite direction
        current_player_image = player_image.right;
    }
    else if (instruction === "shoot") {
        //allows us to draw the shot
        is_shooting = true;

        //play audio
        lazer_sound.play()

        player.shoot(enemies);
    }
    else if(typeof instruction === "string") {
        //print
        display(instruction)
    }

    //clear fow
    fow = player.clear_fow(fow);

    draw(); 

    //check if player collided with enemy (done here as ghost dosent need to care about death to enemy)
    if (player.collision(enemies)) {
        display("You died");

        reset();

        return;
    }

    if (player.collision(exit)) {
        clearInterval(interval);

        win()

        return;
    }

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
        display("You died");

        reset();

        return;
    }

    draw();

    count++

    //stops moving the enemy when it has moved its specified number of steps and brings it back to the player's turn
    if (count === steps) {
        //reset count for next use
        count = 0;
        
        //player turn display
        display(`Turn: ${turns}`);

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
    window.shoot = {start_x: 0, start_y: 0, end_x: 0, end_y: 0};
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

//displays a message from the game
function display(text) {
    //make the banner visible
    message.style.opacity = 0.95;

    //write the message
    message_content.textContent = text;

    setTimeout(() => {
        message.style.opacity = 0;
    }, 1000)
}

//initialise board
window.addEventListener("load", () => {
    board = document.getElementById("board");
    board.height = board_height;
    board.width = board_width;
    context = board.getContext("2d");

    //initialise game
    get_coords(map); 
    fow = player.clear_fow(fow);
    window.walls = walls;
    window.intersections = intersections;
    window.ghost = ghost;

    //debug
    window.debug = () => {
        player.x = exit.x;
        player.y = exit.y;
    };

    draw();

    //store player controls in the window for pyodide to reference
    const player_controls = player_controller(queue, ghost);
    window.player_controls = player_controls;

    //gives a "green light" when player controls are fully loaded
    window.dispatchEvent(new Event("player-controls-ready"));
});

//run only when "run" is clicked
run.addEventListener("click", () => {
    //prevents multiple clicks
    if (interval) {
        return;
    }

    //sends code to pyodide
    evaluatePython()

    interval = setInterval(player_turn, 500);
});

//reset level
reset_btn.addEventListener("click", () => {
    reset();
    display("Reset Successful");
});