var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {

    // prevents the browser from refreshing
    event.preventDefault();
    // selects the <input> element with the name of "task-name" from the html
    var taskNameInput = document.querySelector("input[name='task-name']").value;

    var taskTypeInput = document.querySelector("select[name='task-type']").value
    console.log(taskTypeInput);

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //styles the new task item
    listItemEl.className = "task-item";
    //adds the text
    listItemEl.textContent = taskNameInput;
    //appends this element to the task list
    tasksToDoEl.appendChild(listItemEl);

};



// finds the <form> elements in the html and saves it to the variable "formEl"
formEl.addEventListener("submit", createTaskHandler);
