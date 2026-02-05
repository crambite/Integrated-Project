//player data
let data = JSON.parse(sessionStorage.getItem("data"));

//act
const act_1 = document.getElementById("act1");
const act_2 = document.getElementById("act2");

//map
const map_names = document.querySelectorAll(".map_name");
const maps = document.querySelectorAll(".map");
const close_btn = document.getElementById("close");

//confirm screen
const confirm_screen = document.getElementById("confirm_map");
const map_name_cfm = document.getElementById("map_name_cfm");
const enter = document.getElementById("enter");

//next act
const next_act_pos = document.getElementById("next_act");
const next_act = document.getElementById("next_act_box");
const next_act_name = document.getElementById("next_act_name");
const next_act_image = document.getElementById("next_act_img");

//drones
const drones = document.querySelectorAll(".drone");
let drone_selected = false

let map_id, drone_name;

let act = sessionStorage.getItem("act");

//sets act to defult page of "lab" if its the player's first time visiting
if (act === null) {
    //defult page
    act = "lab";  

    sessionStorage.setItem("act", act);
}

//resize
function resize() {
    if (act === "lab") {
        //centre the map
        const rect = act_1.getBoundingClientRect();
        const top = Math.ceil((window.innerHeight - rect.height) / 2);

        act_1.style.top = top + "px";
    }
    else if (act === "world") {
        //centre the map
        const rect = act_2.getBoundingClientRect();
        const top = Math.ceil((window.innerHeight - rect.height) / 2);

        act_2.style.top = top + "px";
    }
}

//drone selection
for (let drone of drones) {
    //check for click
    drone.addEventListener("click", (e) => {
        //check if another drone has been clicked
        if (drone_selected === true) {
            drone_selected = false;
            drone.style.border = "3px solid rgb(8, 9, 110)";

            return;
        }

        drone_selected = true;

        drone.style.border = "3px solid rgb(255, 43, 43)";

        drone_name = e.currentTarget.id;
        sessionStorage.setItem("drone", drone_name);
    })
}

//maps
for (let i = 0; i < maps.length; i++) {
    const map = maps[i];
    const map_name = map_names[i];

    //check if mouse is hovering
    map.addEventListener("mouseenter", () => {
        map_name.style.opacity = 1;
    });

    //check if mouse is not hovering
    map.addEventListener("mouseleave", () => {
        map_name.style.opacity = 0;
    });

    //open map confirm screen
    map.addEventListener("click", (e) => {
        confirm_screen.style.top = 50 + "%";

        map_id = e.currentTarget.id;

        //display name of map
        map_name_cfm.textContent = map_id.replace("_", " ");
    })

    //if completed, becomes green
    if (data[map.id] === true) {
        map.classList.add("completed");
    }
}

close_btn.addEventListener("click", () => {
    confirm_screen.style.top = -1000 + "px";
})

//store all data in session storage and sends user to respective map
enter.addEventListener("click", () => {
    //check for all required data
    if (!map_id || !drone_selected) {
        alert("You must select a drone")

        return;
    }

    sessionStorage.setItem("map", map_id);

    window.location.href = "../game/game.html";
})

//next act button
next_act.addEventListener("mouseenter", () => {
    next_act_name.style.opacity = 1;
});

next_act.addEventListener("mouseleave", () => {
    next_act_name.style.opacity = 0;
});

//sends to next act
next_act.addEventListener("click", () => {
    if (act === "lab") {
        //change the map
        act_1.style.top = -1000 + "px";
        act_2.style.top = 0;

        //configure next act button looks
        next_act_pos.style.top = 95 + "%";
        next_act_pos.style.left = 80 + "%";
        next_act_image.src = "assets/lab.png";
        next_act_name.textContent = "To Lab";

        //save the act player is currently on
        act = "world";
        sessionStorage.setItem("act", act);
    }
    else if (act === "world") {
        //change the map
        act_1.style.top = 0;
        act_2.style.top = -1000 + "px";

        //configure next act button looks
        next_act_pos.style.top = 90 + "%";
        next_act_pos.style.left = 68 + "%";
        next_act_image.src = "assets/globe.png";
        next_act_name.textContent = "To World";

        //save the act player is currently on
        act = "lab";
        sessionStorage.setItem("act", act);
    }

    resize();
});

window.addEventListener("resize", resize);

window.addEventListener("load", () => {
    //get act the player was previously on (persists per session)
    act = sessionStorage.getItem("act");

    //dosent need to do anything if its on lab map as thats the defult
    if (act !== "world") {
        return;
    }

    //change the map
    act_1.style.top = -1000 + "px";
    act_2.style.top = 0;

    //configure next act button looks
    next_act_pos.style.top = 95 + "%";
    next_act_pos.style.left = 80 + "%";
    next_act_image.src = "assets/lab.png";
    next_act_name.textContent = "To Lab";

    resize();
});

//hiding levels on the map if requirements not met
const Enemies = document.getElementById("Enemies");
const The_Exit = document.getElementById("The_Exit");
const Familiar_Scene = document.getElementById("Familiar_Scene");

//starting
if (data["The_Room"] === false) {
    Enemies.parentElement.style.top = -1000 + "px";
}

if (data["Enemies"] === false) {
    The_Exit.parentElement.style.top = -1000 + "px";
    next_act.parentElement.style.top = -1000 + "px";
}

//final stage
if (data["North_America"] === false || data["South_America"] === false || data["Asia"] === false || data["Africa"] === false || data["Australia"] === false) {
    Familiar_Scene.parentElement.style.top = -1000 + "px";
}