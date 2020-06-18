//vars
//capture button in a variable
var buttonEl = document.querySelector("#save-task");

//capture ul in a variable
var tasksToDoEl = document.querySelector("#tasks-to-do");

//capute the dropdown
//var dropDownEl = document.querySelector("selecto-dropdown");

//caputre the input
//var inputEl = document.querySelector("text-input");

//capture the form elmenent
var formEl = document.querySelector("#task-form");



/*create variable with empty function that holds the rules to make 
a new list item when you press the button*/
var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
}

  var createTaskEl = function(taskDataObj) {
    //create list item 
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold taks info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  
  
  listItemEl.appendChild(taskInfoEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
  
  }
  /*takes the variable of the button adds a click event that runs 
  the callback function, createTaskHandler*/
/*add an event listener to the whole form that runs the below function*/
formEl.addEventListener("submit", taskFormHandler);
