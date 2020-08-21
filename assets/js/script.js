var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    // creates a new task item
    var listItemEl = document.createElement("li");
    //styles the new task item
    listItemEl.className = "task-item";
    //adds the text
    listItemEl.textContent = "This is a new task.";
    //appends this element to the task list
    tasksToDoEl.appendChild(listItemEl);
};

buttonEl.addEventListener("click", createTaskHandler);
