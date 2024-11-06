document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    const todoBtn = document.getElementById("todo-btn");
    const gitButton = document.getElementById("git");

    console.log("DOM fully loaded");

    // Load tasks from storage when the extension opens
    loadTasks();

    todoBtn.addEventListener("click", addTask);

    gitButton.addEventListener("click", () => {
        console.log("GitHub button clicked");
        window.open("https://github.com/GnDouble", "_blank");
    });

    function addTask() {
        const taskText = inputBox.value.trim();
        if (taskText === "") {
            alert("You can't add an empty task");
            console.log("Input was empty");
            return;
        }

        const task = { text: taskText, checked: false };
        createTaskElement(task);
        saveTask(task);
        inputBox.value = "";
    }

    function createTaskElement(task) {
        console.log("Creating task element:", task);
        const li = document.createElement("li");
        li.textContent = task.text;
        li.classList.toggle("checked", task.checked);

        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
    }

    function saveTask(task) {
        console.log("Saving task:", task);
        chrome.storage.sync.get({ tasks: [] }, (data) => {
            const tasks = data.tasks;
            tasks.push(task);
            chrome.storage.sync.set({ tasks }, () => {
                console.log("Task saved:", tasks);
            });
        });
    }

    function loadTasks() {
        console.log("Loading tasks from storage");
        chrome.storage.sync.get({ tasks: [] }, (data) => {
            const tasks = data.tasks;
            tasks.forEach((task) => createTaskElement(task));
            console.log("Tasks loaded:", tasks);
        });
    }

    function removeTask(taskText) {
        console.log("Removing task:", taskText);
        chrome.storage.sync.get({ tasks: [] }, (data) => {
            const tasks = data.tasks.filter((task) => task.text !== taskText);
            chrome.storage.sync.set({ tasks }, () => {
                console.log("Task removed:", taskText);
            });
        });
    }

    function toggleTaskStatus(taskText) {
        console.log("Toggling task status:", taskText);
        chrome.storage.sync.get({ tasks: [] }, (data) => {
            const tasks = data.tasks.map((task) => {
                if (task.text === taskText) {
                    return { ...task, checked: !task.checked };
                }
                return task;
            });
            chrome.storage.sync.set({ tasks }, () => {
                console.log("Task status toggled:", tasks);
            });
        });
    }

    listContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            toggleTaskStatus(e.target.textContent.trim());
        } else if (e.target.tagName === "SPAN") {
            const taskText = e.target.parentElement.textContent.slice(0, -1).trim();
            e.target.parentElement.remove();
            removeTask(taskText);
        }
    }, false);
});
