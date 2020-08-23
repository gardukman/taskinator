var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

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
};


// finds the <form> elements in the html and saves it to the variable "formEl"
formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// when the button is clicked, the function "taskButtonHandler" is activated
pageContentEl.addEventListener("click", taskButtonHandler);

// function of "delete task" called back to the taskId variable
var deleteTask = function(taskId) {

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

// function of "edit task" called back to the taskId variable
var editTask = function(taskId) {

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    // gets the content from the h3 task-name and span task-type sections created in the createTask var. Only searches in the "taskSelected" content
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // when the edit button is clicked, the querySelector takes the value of the task-name and task-type and puts them back in the the form input and drop down selector
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    // calls the <save-task> from the html and alters the text content to read "Save Task"
    document.querySelector("#save-task").textContent = "Save Task";
    // adds the taskId to a data-task-id attribute on the form itself
    formEl.setAttribute("data-task-id", taskId);
};