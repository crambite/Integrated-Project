window.addEventListener("load", () => {
    const data = JSON.parse(sessionStorage.getItem("data") || "{}");
    
     if (data.brightness) {
        const brightnessLevel = data.brightness / 50;
        document.body.style.filter = `brightness(${brightnessLevel})`;
    }
});