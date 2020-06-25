//vars
//grabs the tasks in progress column
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
//grabs the tasks completed column
var tasksCompletedEl = document.querySelector("#tasks-completed");
//grabs main and stores as variable
var pageContentEl = document.querySelector("#page-content");
//timer used to generate and assign IDs to common buttons
var taskIdCounter = 0;

//capture button in a variable
var buttonEl = document.querySelector("#save-task");

//capture ul in a variable
var tasksToDoEl = document.querySelector("#tasks-to-do");

//capute the dropdown
//var dropDownEl = document.querySelector("selecto-dropdown");

//caputre the input
//var inputEl = document.querySelector("text-input");

//capture the form element
var formEl = document.querySelector("#task-form");



/*create variable with empty function that holds the rules to make 
a new list item when you press the button*/
var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
  alert("You need to fill out the task form!");
  return false;
}
  //reset the form element after you've put a new task in
  formEl.reset();
  
  //isEdit variable initalizaiton-this keeps track of which tasks we're editing and lets us know a task is being edited in first place
  var isEdit = formEl.hasAttribute("data-task-id");
  
// has data attribute, so get task id and call function to complete edit process
if (isEdit) {
  var taskId = formEl.getAttribute("data-task-id");
  completeEditTask(taskNameInput, taskTypeInput, taskId);
} 
// no data attribute, so create object as normal and pass to createTaskEl function
else {
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  createTaskEl(taskDataObj);
}
}

var completeEditTask = function(taskName, taskType, taskId) {
  // find the matching task list item
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// set new values
taskSelected.querySelector("h3.task-name").textContent = taskName;
taskSelected.querySelector("span.task-type").textContent = taskType;

alert("Task Updated!");
formEl.removeAttribute("data-task-id");
document.querySelector("#save-task").textContent = "Add Task";
};


var createTaskEl = function(taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  tasksToDoEl.appendChild(listItemEl);

  // increase task counter for next unique id
  taskIdCounter++;
};

//with taskId pass a different ID into the funciton each time
var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
var editButtonEl = document.createElement("button");
editButtonEl.textContent = "Edit";
editButtonEl.className = "btn edit-btn";
editButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(editButtonEl);

// create delete button
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
for (var i = 0; i < statusChoices.length; i++) {
  // create option element
  var statusOptionEl = document.createElement("option");
  statusOptionEl.textContent = statusChoices[i];
  statusOptionEl.setAttribute("value", statusChoices[i]);

  // append to select
  statusSelectEl.appendChild(statusOptionEl);
}

actionContainerEl.appendChild(statusSelectEl);

return actionContainerEl;

};

var taskStatusChangeHandler = function(event) {
console.log(event.target)
console.log(event.target.getAttribute("data-task-id"))
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

};


  /*takes the variable of the button adds a click event that runs 
  the callback function, createTaskHandler*/
/*add an event listener to the form that runs the add new task function*/
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

var editTask = function(taskId) {
  
  console.log("editing task #" + taskId);

  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  // get content from task name and type
var taskName = taskSelected.querySelector("h3.task-name").textContent;


var taskType = taskSelected.querySelector("span.task-type").textContent;

document.querySelector("input[name='task-name']").value = taskName;
document.querySelector("select[name='task-type']").value = taskType;
//this is an expression
document.querySelector("#save-task").textContent = "Save Task";
formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId) {
  console.log(taskId);
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  console.log(taskSelected);
  taskSelected.remove();
};

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);