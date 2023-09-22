export default function (errorMsg = "404 - not found") {
    document.title = "Error";

    document.getElementById("body").innerHTML = `

        <div id="error">
            <h1>Error</h1>
            <h2>${errorMsg}</h2>
        </div>
    
    `;
}
