var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;

var taskFormHandler = function(event) {
    
    // prevents the browser from refreshing
    event.preventDefault();
    // selects the <input> element with the name of "task-name" from the html
    var taskNameInput = document.querySelector("input[name='task-name']").value;

    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

};

var createTaskEl = function(taskDataObj) {
     // create list item
     var listItemEl = document.createElement("li");
     listItemEl.className = "task-item";

     // add task id as a custom attribute
     listItemEl.setAttribute("data-task-id", taskIdCounter);
 
     // create div to hold task info and add to list item
     var taskInfoEl = document.createElement("div");
     // give it a class name
     taskInfoEl.className = "task-info";
     // add HTML content to div
     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
 
     listItemEl.appendChild(taskInfoEl);

     var taskActionEl = createTaskActions(taskIdCounter);
     listItemEl.appendChild(taskActionEl);
     
 
     // add entire list item to list
     tasksToDoEl.appendChild(listItemEl);

     // increase task counter for next unique id
     taskIdCounter++;
};

// the function "taskId" is going to create task actions
var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // creat delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    // defines an initial counter, starting at 0, "i < statusChoices.length" keeps the loop running by checking the iterator against the number of items in the array, "i++" increments the counter by one after the each loop iteration, "statusChoices[i]" returns the value of the array at the given index (when i = 0 or statusChoices[0] we get the first item)
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}


// finds the <form> elements in the html and saves it to the variable "formEl"
formEl.addEventListener("submit", taskFormHandler);
