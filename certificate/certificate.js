const data = JSON.parse(sessionStorage.getItem("data"));
const type = document.getElementById("type");
const cert = document.getElementById("cert");

//set username
document.getElementById("name").textContent = data.username || "Player";

//check if all badges of the tier has been obtained
function tier(tier) {
    return data["The_Room_" + tier] === true && 
    data["Enemies_" + tier] === true && 
    data["The_Exit_" + tier] === true && 
    data["North_America_" + tier] === true && 
    data["South_America_" + tier] === true &&
    data["Asia_" + tier] === true &&
    data["Africa_" + tier] === true &&
    data["Australia_" + tier] === true &&
    data["Familiar_Scene_" + tier] === true
}

if (tier("silver")) {
    cert.style.background = "rgb(192, 192, 192)";
    type.textContent = "CERTIFICATE OF ACHIEVEMENT";
}
if (tier("gold")) {
    cert.style.background = "rgb(218, 193, 52)";
    type.textContent = "CERTIFICATE OF EXCELLENCE";
}
if (tier("plat")) {
    cert.style.background = "rgb(90, 142, 255)";
    type.textContent = "CERTIFICATE OF MASTERY";
}

function downloadPDF() {
    const element = document.getElementById("cert");

    const opt = {
    margin: 0,
    filename: "Certificate.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }
    };

    html2pdf().set(opt).from(element).save();
}