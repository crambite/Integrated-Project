

let intervalID = null;
//put story text here
const textLists = [
  "give me more buffer time pls",
  "we are charlie kirk"
];

let textIndex = 0;
let textingEnded = false;

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
        } 
        else {
            clearInterval(intervalID);
            intervalID = null;
            textingEnded = true;
            textIndex++; // move to next line in the list
        }
    }, 100);
}

function skipText() {
    // If already finished typing, go next text (animated)
    if (textingEnded) {
        if (textIndex >= textLists.length) {
        console.log("move to next page");
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


// start
printText(textLists[textIndex]);

