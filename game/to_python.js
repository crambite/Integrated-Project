// Pyodide logic
const outputEl = document.getElementById("output");
const codeEl = document.getElementById("code");

function addToOutput(output) {
    outputEl.value += String(output) + "\n";
}

//Initialises Pyodide
outputEl.value = "Initializing...\n"; //can be deleted in final draft

async function main() {
    try {
        const pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.1/full/"  // forces Pyodide to look only in the URL
        });

        outputEl.value += "Ready!\n---------------\n"; //can be deleted in final draft
        return pyodide;
    } 

    catch (e) {
        outputEl.value += "Failed to load Pyodide:\n" + e + "\n"; //can be deleted in final draft
        throw e;
    }
}

let pyodideReadyPromise = main();

//Sends code to Pyodide to get output
async function evaluatePython() {
    const pyodide = await pyodideReadyPromise;

    try {
        pyodide.runPython(`
            import sys
            from io import StringIO
            sys.stdout = StringIO()
        `);

        const code = aceEditor.getValue(); // get code from Ace editor
        const result = pyodide.runPython(code);
        const printed = pyodide.runPython("sys.stdout.getvalue()"); //allow us to output print() properly
        addToOutput(printed || result);
    } 

    catch (err) {
        addToOutput(err);
    }
}