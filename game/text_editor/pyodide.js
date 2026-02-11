// Pyodide logic
const codeEl = document.getElementById("code");

//player controls
function set_controls(pyodide) {
    pyodide.globals.set("up", window.player_controls.up);
    pyodide.globals.set("down", window.player_controls.down);
    pyodide.globals.set("left", window.player_controls.left);
    pyodide.globals.set("right", window.player_controls.right);
    pyodide.globals.set("shoot", window.player_controls.shoot);
    pyodide.globals.set("is_intersection", window.ghost.is_intersection.bind(window.ghost));
    pyodide.globals.set("is_dead_end", window.ghost.is_dead_end.bind(window.ghost));

    //debug
    pyodide.globals.set("debug", window.debug);
};

async function main() {
    try {
        const pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.1/full/"  // forces Pyodide to look only in the URL
        });

        //player functions
        if (window.player_controls) {
            set_controls(pyodide)
        }
        else {
            window.addEventListener("player-controls-ready", () => set_controls(pyodide))
        }

        return pyodide;
    } 

    catch (e) {
        throw e;
    }
}

let pyodideReadyPromise = main();

//Sends code to Pyodide to get output
async function evaluatePython() {
    const pyodide = await pyodideReadyPromise;

    pyodide.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
    `);

    const code = aceEditor.getValue(); // get code from Ace editor
    pyodide.runPython(code);
}