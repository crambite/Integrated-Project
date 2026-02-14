const boundary = document.getElementById("game_console");
const help_btn = document.getElementById("help");
const help_menu = document.getElementById("help_menu");
const help_close = document.getElementById("help_close");
const guide = document.getElementById("robot_text");
const map = document.getElementById("map");

const data = JSON.parse(sessionStorage.getItem("data"));

let open = false;

//scalable canvas
function resize() {
    //get height and width of parent container
    const dimension = boundary.getBoundingClientRect();

    //get and choose smallest scale
    const scale_x = dimension.width / window.board_width;
    const scale_y = dimension.height / window.board_height;
    const scale = Math.min(scale_x, scale_y);

    //update board dimensions
    board.style.width = (board_width * scale) + "px";
    board.style.height = (board_height * scale) + "px";
};

//ensure that text editor is the right size
window.addEventListener("load", () => {
    resize();

    //display map level
    map.textContent = sessionStorage.getItem("map").replace("_", " ")
});

//resize board
window.addEventListener("resize", resize);

//help menu
help_btn.addEventListener("click", () => {
    //prevent memu form being open if another is open
    if(open) {
        return;
    }

    open = true;

    help_menu.style.top = 0;
});


//close menus
help_close.addEventListener("click", () => {
    help_menu.style.top = -1000 + "px";

    open = false;
});

//guide
if (data["The_Room"] === false) {
    guide.textContent = "You can use up(), down(), left(), right() to move by typing them into your text editor. You can also use is_intersection() and is_dead_end() as checks. For more help, click the ? icon.";
}
else if (data["Enemies"] === false) {
    guide.textContent = "You can use shoot() to kill an enemy within 2 tiles, even through walls! For more help, click the ? icon.";
}
else {
    guide.textContent = "Good luck! For more help, click the ? icon.";
}

function enableScroll() {
    document.body.style.overflowY = "visible";
}

window.enableScroll = enableScroll;


function disableScroll() {
    document.body.style.overflowY = "hidden";
}

window.disableScroll = disableScroll;