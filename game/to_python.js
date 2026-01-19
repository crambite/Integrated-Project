// Pyodide logic
const outputEl = document.getElementById("output");
const codeEl = document.getElementById("code");

function addToOutput(output) {
    outputEl.value += String(output) + "\n";
}

//Initialises Pyodide
outputEl.value = "Initializing...\n";

async function main() {
    try {
        const pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.1/full/"  // forces Pyodide to look only in the URL
        });

        outputEl.value += "Ready!\n---------------\n"; 
        return pyodide;
    } 

    catch (e) {
        outputEl.value += "Failed to load Pyodide:\n" + e + "\n";
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

        const result = pyodide.runPython(codeEl.value);
        const printed = pyodide.runPython("sys.stdout.getvalue()"); //allow us to output print() properly
        addToOutput(printed || result);
    } 

    catch (err) {
        addToOutput(err);
    }
}