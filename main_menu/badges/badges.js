// The Room
const The_Room_bronze = document.getElementById("The_Room_bronze");
const The_Room_bronze_txt = document.getElementById("The_Room_bronze_txt");

const The_Room_silver = document.getElementById("The_Room_silver");
const The_Room_silver_txt = document.getElementById("The_Room_silver_txt");

const The_Room_gold = document.getElementById("The_Room_gold");
const The_Room_gold_txt = document.getElementById("The_Room_gold_txt");

const The_Room_plat = document.getElementById("The_Room_plat");
const The_Room_plat_txt = document.getElementById("The_Room_plat_txt");


// Enemies
const Enemies_bronze = document.getElementById("Enemies_bronze");
const Enemies_bronze_txt = document.getElementById("Enemies_bronze_txt");

const Enemies_silver = document.getElementById("Enemies_silver");
const Enemies_silver_txt = document.getElementById("Enemies_silver_txt");

const Enemies_gold = document.getElementById("Enemies_gold");
const Enemies_gold_txt = document.getElementById("Enemies_gold_txt");

const Enemies_plat = document.getElementById("Enemies_plat");
const Enemies_plat_txt = document.getElementById("Enemies_plat_txt");

// The Exit
const The_Exit_bronze = document.getElementById("The_Exit_bronze");
const The_Exit_bronze_txt = document.getElementById("The_Exit_bronze_txt");

const The_Exit_silver = document.getElementById("The_Exit_silver");
const The_Exit_silver_txt = document.getElementById("The_Exit_silver_txt");

const The_Exit_gold = document.getElementById("The_Exit_gold");
const The_Exit_gold_txt = document.getElementById("The_Exit_gold_txt");

const The_Exit_plat = document.getElementById("The_Exit_plat");
const The_Exit_plat_txt = document.getElementById("The_Exit_plat_txt");

// North America
const North_America_bronze = document.getElementById("North_America_bronze");
const North_America_bronze_txt = document.getElementById("North_America_bronze_txt");

const North_America_silver = document.getElementById("North_America_silver");
const North_America_silver_txt = document.getElementById("North_America_silver_txt");

const North_America_gold = document.getElementById("North_America_gold");
const North_America_gold_txt = document.getElementById("North_America_gold_txt");

const North_America_plat = document.getElementById("North_America_plat");
const North_America_plat_txt = document.getElementById("North_America_plat_txt");


// South America
const South_America_bronze = document.getElementById("South_America_bronze");
const South_America_bronze_txt = document.getElementById("South_America_bronze_txt");

const South_America_silver = document.getElementById("South_America_silver");
const South_America_silver_txt = document.getElementById("South_America_silver_txt");

const South_America_gold = document.getElementById("South_America_gold");
const South_America_gold_txt = document.getElementById("South_America_gold_txt");

const South_America_plat = document.getElementById("South_America_plat");
const South_America_plat_txt = document.getElementById("South_America_plat_txt");


// Asia
const Asia_bronze = document.getElementById("Asia_bronze");
const Asia_bronze_txt = document.getElementById("Asia_bronze_txt");

const Asia_silver = document.getElementById("Asia_silver");
const Asia_silver_txt = document.getElementById("Asia_silver_txt");

const Asia_gold = document.getElementById("Asia_gold");
const Asia_gold_txt = document.getElementById("Asia_gold_txt");

const Asia_plat = document.getElementById("Asia_plat");
const Asia_plat_txt = document.getElementById("Asia_plat_txt");


// Africa
const Africa_bronze = document.getElementById("Africa_bronze");
const Africa_bronze_txt = document.getElementById("Africa_bronze_txt");

const Africa_silver = document.getElementById("Africa_silver");
const Africa_silver_txt = document.getElementById("Africa_silver_txt");

const Africa_gold = document.getElementById("Africa_gold");
const Africa_gold_txt = document.getElementById("Africa_gold_txt");

const Africa_plat = document.getElementById("Africa_plat");
const Africa_plat_txt = document.getElementById("Africa_plat_txt");


// Australia
const Australia_bronze = document.getElementById("Australia_bronze");
const Australia_bronze_txt = document.getElementById("Australia_bronze_txt");

const Australia_silver = document.getElementById("Australia_silver");
const Australia_silver_txt = document.getElementById("Australia_silver_txt");

const Australia_gold = document.getElementById("Australia_gold");
const Australia_gold_txt = document.getElementById("Australia_gold_txt");

const Australia_plat = document.getElementById("Australia_plat");
const Australia_plat_txt = document.getElementById("Australia_plat_txt");


// Familiar Scene
const Familiar_Scene_bronze = document.getElementById("Familiar_Scene_bronze");
const Familiar_Scene_bronze_txt = document.getElementById("Familiar_Scene_bronze_txt");

const Familiar_Scene_silver = document.getElementById("Familiar_Scene_silver");
const Familiar_Scene_silver_txt = document.getElementById("Familiar_Scene_silver_txt");

const Familiar_Scene_gold = document.getElementById("Familiar_Scene_gold");
const Familiar_Scene_gold_txt = document.getElementById("Familiar_Scene_gold_txt");

const Familiar_Scene_plat = document.getElementById("Familiar_Scene_plat");
const Familiar_Scene_plat_txt = document.getElementById("Familiar_Scene_plat_txt");

//refer and collect
const refer = document.getElementById("refer");
const collect = document.getElementById("collect");

//player data
const data = JSON.parse(sessionStorage.getItem("data"));

//map_data
const map_list = JSON.parse(sessionStorage.getItem("map_list"));

//collect cert
if (!sessionStorage.getItem("player_id")) {
    collect.textContent = "Login to continue";
}
else {
    collect.addEventListener("click", () => {
        window.location.href = "../../certificate/certificate.html"
    })
}

//referral code
if (!sessionStorage.getItem("player_id")) {
    refer.textContent = "Login to continue";
}
else if (data["Familiar_Scene"] !== true) {
    refer.textContent = "Complete the game";
}
else if (!data.code) {
    //random code generator
    let text = "";
    let random;
    for (let i = 0; i < 6; i++) {
        random = Math.floor(Math.random() * 10);
        text += random;
    }
    refer.textContent = text;

    data.code = text;

    sessionStorage.setItem("data", JSON.stringify(data));
}
else {
    refer.textContent = data.code;
}

//update the bronze badges
function bronze(img, txt) {
    //check if the badge has been accquired
    if (data[img.id.replace("_bronze", "")] === true) {
        img.src = "../assets/bronze.png";
    }

    txt.textContent = "Complete the map.";
};

//update the silver badges
function silver(img, txt) {
    //check if the badge has been accquired
    if (data[img.id] === true) {
        img.src = "../assets/silver.png";
    }

    txt.textContent = `Complete the map in ${map_list[img.id]} turns or less.`;
};

//update the gold badges
function gold(img, txt) {
    //check if the badge has been accquired
    if (data[img.id] === true) {
        img.src = "../assets/gold.png";
    }

    txt.textContent = `Complete the map in ${map_list[img.id]} turns or less.`;
};

//update the silver badges
function plat(img, txt) {
    //check if the badge has been accquired
    if (data[img.id] === true) {
        img.src = "../assets/plat.png";
    }

    txt.textContent = "Complete the map in 1 turn.";
};

//updates all the badges
function update_all_badges() {
    // The Room
    bronze(The_Room_bronze, The_Room_bronze_txt);
    silver(The_Room_silver, The_Room_silver_txt);
    gold(The_Room_gold, The_Room_gold_txt);
    plat(The_Room_plat, The_Room_plat_txt);

    // Enemies
    bronze(Enemies_bronze, Enemies_bronze_txt);
    silver(Enemies_silver, Enemies_silver_txt);
    gold(Enemies_gold, Enemies_gold_txt);
    plat(Enemies_plat, Enemies_plat_txt);

    // The Exit
    bronze(The_Exit_bronze, The_Exit_bronze_txt);
    silver(The_Exit_silver, The_Exit_silver_txt);
    gold(The_Exit_gold, The_Exit_gold_txt);
    plat(The_Exit_plat, The_Exit_plat_txt);

    // North America
    bronze(North_America_bronze, North_America_bronze_txt);
    silver(North_America_silver, North_America_silver_txt);
    gold(North_America_gold, North_America_gold_txt);
    plat(North_America_plat, North_America_plat_txt);

    // South America
    bronze(South_America_bronze, South_America_bronze_txt);
    silver(South_America_silver, South_America_silver_txt);
    gold(South_America_gold, South_America_gold_txt);
    plat(South_America_plat, South_America_plat_txt);

    // Asia
    bronze(Asia_bronze, Asia_bronze_txt);
    silver(Asia_silver, Asia_silver_txt);
    gold(Asia_gold, Asia_gold_txt);
    plat(Asia_plat, Asia_plat_txt);

    // Africa
    bronze(Africa_bronze, Africa_bronze_txt);
    silver(Africa_silver, Africa_silver_txt);
    gold(Africa_gold, Africa_gold_txt);
    plat(Africa_plat, Africa_plat_txt);

    // Australia
    bronze(Australia_bronze, Australia_bronze_txt);
    silver(Australia_silver, Australia_silver_txt);
    gold(Australia_gold, Australia_gold_txt);
    plat(Australia_plat, Australia_plat_txt);

    // Familiar Scene
    bronze(Familiar_Scene_bronze, Familiar_Scene_bronze_txt);
    silver(Familiar_Scene_silver, Familiar_Scene_silver_txt);
    gold(Familiar_Scene_gold, Familiar_Scene_gold_txt);
    plat(Familiar_Scene_plat, Familiar_Scene_plat_txt);
};

//wait for window to load
window.addEventListener("load", update_all_badges)