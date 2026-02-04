const boundary = document.getElementById("game_console");
const help_btn = document.getElementById("help");
const help_menu = document.getElementById("help_menu");
const settings_btn = document.getElementById("settings");
const settings_menu = document.getElementById("settings_menu");
const help_close = document.getElementById("help_close");
const settings_close = document.getElementById("settings_close");
const map = document.getElementById("map");

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

//settings menu
settings_btn.addEventListener("click", () => {
    //prevent memu form being open if another is open
    if(open) {
        return;
    }

    open = true;

    const rect = settings_menu.getBoundingClientRect();

    //make settings appear in the middle
    const left = Math.ceil((window.innerWidth - rect.width) / 2);
    const top = Math.ceil((window.innerHeight - rect.height) / 2);

    settings_menu.style.top = top + "px";
    settings_menu.style.left = left + "px";
});

//close menus
help_close.addEventListener("click", () => {
    help_menu.style.top = -1000 + "px";

    open = false;
});

settings_close.addEventListener("click", () => {
    settings_menu.style.top = -1000 + "px";

    open = false;
});