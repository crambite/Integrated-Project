let intervalID = null;
const map = sessionStorage.getItem("map");

const data = JSON.parse(sessionStorage.getItem("data"));

//speed
let speed;
if (data.text_speed === "Slow") {
    speed = 100
}
else if(data.text_speed === "Normal") {
    speed = 75
}
else {
    speed = 50
}

//loading
const loading = document.getElementById("loading");
setTimeout(() => {
    loading.style.top = -1000 + "px"
}, 3000)

//sound
const sound = new Audio("./assets/vn_audio.wav");
sound.volume = data.volume;

let textIndex = 0;
let textingEnded = false;

let textLists;
textLists = window.visual_novel_text[map];

const block_element = document.getElementById("story_text");

function printText(targetText) {
    if (typeof targetText !== "string") return;

    // stop any previous typing
    if (intervalID !== null) clearInterval(intervalID);

    textingEnded = false;
    block_element.textContent = "";

    const targetLength = targetText.length;


    //set the slow interval
    intervalID = setInterval(() => {
        const currentLen = block_element.textContent.length;

        if (currentLen < targetLength) {
            block_element.textContent = targetText.slice(0, currentLen + 1);
            sound.play()
        } 
        else {
            clearInterval(intervalID);
            intervalID = null;
            textingEnded = true;
            textIndex++; // move to next line in the list
        }
    }, speed);
}

function skipText() {
    // If already finished typing, go next text (animated)
    if (textingEnded) {
        //return to map once finished
        if (textIndex >= textLists.length) {
            window.location.href = "../map_selection/map.html" //go to map
            return;
        }
        printText(textLists[textIndex]); // this one animates
        return;
    }

    // If currently typing, instantly finish CURRENT text (no index change)
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
    }

    // current line is textIndex (because we haven't incremented yet)
    block_element.textContent = textLists[textIndex];
    textingEnded = true;
    textIndex++; // increment ONLY after we finish current line
}

printText(textLists[textIndex]);

// start
/* window.addEventListener("click", () => {
    sound.play().catch(() => {}); // unlock audio
    printText(textLists[textIndex]);
}, { once: true }); */
