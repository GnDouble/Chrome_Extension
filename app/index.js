

async function sayHello() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query({ active: true});
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            //document.body
            alert("Is that inline?")
        }
    });

}
document.getElementById("myButton").addEventListener("click", sayHello);