let start_mouse_y, start_mouse_x;
let start_editor;
let save_height, save_minheight, save_width, save_top, save_left;
let is_dragging = false;
let is_minimise = false;
let is_maximise = false;

const text_editor = document.querySelector(".text_editor");
const handle = document.querySelector(".title_bar");
const text_area = document.querySelector(".code");
const minimise = document.querySelector(".minimise");
const maximise = document.querySelector(".maximise");

//Ace text editor
const aceEditor = ace.edit(text_area, {
    theme: "ace/theme/github_dark",
    mode: "ace/mode/python",
    selectionStyle: "text"
});

//resize Ace editor (Ace dosent allow resize without the custom function)
new ResizeObserver(() => aceEditor.resize()).observe(text_editor);

//drag logic
handle.addEventListener("mousedown", (e) => {
    is_dragging = true;

    //save text editor and mouse original coordinates 
    start_mouse_y = e.clientY;
    start_mouse_x = e.clientX;

    start_editor = text_editor.getBoundingClientRect();

});

text_editor.addEventListener("mouseup", (e) => {
    is_dragging = false;
});

text_editor.addEventListener("mousemove", (e) => {

    if (!is_dragging) {
        return
    }

    //check how far the mouse moved
    const dist_x = e.clientX - start_mouse_x;
    const dist_y = e.clientY - start_mouse_y;

    //change window position
    text_editor.style.left = (start_editor.left + dist_x) + "px";
    text_editor.style.top  = (start_editor.top + dist_y) + "px";
});

//minimise logic
minimise.addEventListener("click", (e) => {

    //strict minimise maximise (if minimised cannot click maximise vice versa)
    if (is_maximise) {
        return
    }

    //minimise
    if (!is_minimise) {

        //hide the text area
        text_area.style.opacity = 0;

        //saving original height
        save_minheight = text_editor.style.minheight
        save_height = text_editor.style.height

        //setting the text editor to look minimised
        text_editor.style.minHeight = 0; //remove the original restrictions
        text_editor.style.height = 3.5 + "rem";
        text_editor.style.resize = "none";

        is_minimise = true;
    }

    //unminimise
    else {

        //unhide text area
         text_area.style.opacity = 1;

        //setting the text editor back to original
        text_editor.style.minHeight = save_minheight;
        text_editor.style.height = save_height;
        text_editor.style.resize = "both";
        
        is_minimise = false;
    }
});

//maximise logic
maximise.addEventListener("click", (e) => {

    //strict minimise maximise (if minimised cannot click maximise vice versa)
    if (is_minimise) {
        return
    }

    //maximise
    if (!is_maximise) {

        //saving original dimensions and location
        save_width = text_editor.style.width;
        save_height = text_editor.style.height;
        save_top = text_editor.style.top
        save_left = text_editor.style.left
        
        //setting to fullscreen
        text_area.style.opacity = 1;
        text_editor.style.width = 100 + "vw";
        text_editor.style.height = 100 + "vh";
        text_editor.style.resize = "none";
        text_editor.style.left = 0;
        text_editor.style.top  = 0;

        is_maximise = true;
    }

    //unmaximise
    else {
        text_editor.style.width = save_width;
        text_editor.style.height = save_height;
        text_editor.style.top = save_top
        text_editor.style.left = save_left
        text_editor.style.resize = "both";

        is_maximise = false;
    }
});