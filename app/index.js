document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded and DOMContentLoaded event fired.");

    const button = document.getElementById("myTick");
    
    // Log the button to verify if it was found
    console.log("Button element:", button);

    if (button) {
        button.addEventListener("click", getTextk);
        console.log("Event listener attached to button.");
    } else {
        console.error("Button with id 'myTick' not found in the DOM.");
    }
});

async function getTextk() {
    const taskInput = document.getElementById("dummyId").value;
    document.getElementById("output").innerText = `Your task: ${taskInput}`;
}
