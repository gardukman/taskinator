var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {

    // prevents the browser from refreshing
    event.preventDefault();
    // creates a new task item
    var listItemEl = document.createElement("li");
    //styles the new task item
    listItemEl.className = "task-item";
    //adds the text
    listItemEl.textContent = "This is a new task.";
    //appends this element to the task list
    tasksToDoEl.appendChild(listItemEl);
    
};



// finds the <form> elements in the html and saves it to the variable "formEl"
formEl.addEventListener("submit", createTaskHandler);
