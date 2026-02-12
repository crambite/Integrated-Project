const volume_range = document.getElementById("volume_range");
const volume_value = document.getElementById("volume_value");

const brightness_range = document.getElementById("brightness_range");
const brightness_value = document.getElementById("brightness_value");

const text_speed = document.getElementById("select");

const save = document.getElementById("save");
const logout = document.getElementById("logout")

const data = JSON.parse(sessionStorage.getItem("data"));

//decide if its logout or register
let logged_in = true;

if (!sessionStorage.getItem("player_id")) {
    logout.textContent = "Register/Login"

    logged_in = false;
}

//change to saved settings on open
volume_range.value = data.volume * 100;
volume_value.textContent = volume_range.value;
brightness_range.value = data.brightness;
brightness_value.textContent = brightness_range.value;
text_speed.value = data.text_speed;

volume_range.addEventListener("input", () => {
    //update value when text slider moves
    volume_value.textContent = volume_range.value;
});

brightness_range.addEventListener("input", () => {
    //update value when text slider moves
    brightness_value.textContent = brightness_range.value;
    
    const brightnessLevel = brightness_range.value / 50;
    document.body.style.filter = `brightness(${brightnessLevel})`;
});

//saving settings
save.addEventListener("click", () => {
    data.volume = volume_range.value / 100; //volume goes from 0 to 1
    data.brightness = brightness_range.value;
    data.text_speed = text_speed.value;

    sessionStorage.setItem("data", JSON.stringify(data));

    alert("Settings saved");
});

//logout
logout.addEventListener("click", () => {
    if (logged_in) {
        sessionStorage.clear();
        window.location.href = "../login.html";
    }
    else {
        window.location.href = "../login.html";
    }
})