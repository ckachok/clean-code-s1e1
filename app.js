//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task'); //Add a new task
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTaskHolder = document.getElementById('incomplete-tasks'); //task-list of 
const completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks
const pointerDelete = document.querySelector('.pointer');


//New task list item
function createNewTaskElement(taskString) {

  let listItem = document.createElement('li'); //task list item
      listItem.className = 'task-list__item'

  let checkBox = document.createElement('input'); //input type checkbox
      checkBox.className = 'input task-list__input-checkbox';
      checkBox.type ='checkbox';

  let label = document.createElement('label'); //label
      label.className = 'task-list__label';
      label.innerText = taskString;

  let editInput = document.createElement('input'); //input type text
      editInput.className = 'input input-text task-list__input-text';
      editInput.type ='text';

  let editButton = document.createElement('button'); //edit button
      editButton.className = 'btn task-list__btn-edit';
      editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.

  let deleteButton = document.createElement('button'); //delete button
      deleteButton.className = 'btn task-list__btn-delete';

  let deleteButtonImg = pointerDelete.cloneNode(true); //image-pointer delete button
      deleteButtonImg.className = 'pointer';

  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

function addTask() {
  console.log('Add Task...');
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

//Edit an existing task.
function editTask() {
  console.log('Edit Task...');
  console.log('Change "edit" to "save"');

  let listItem = this.parentNode;

  const editInput = listItem.querySelector('.task-list__input-text');
  const label = listItem.querySelector('.task-list__label');
  const editBtn = listItem.querySelector('.task-list__btn-edit');
  let containsClass = listItem.classList.contains('edit-mode');
  //If class of the parent is .edit-mode
  if (containsClass) {
    //switch to .edit-mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
    label.classList.remove('task-list__label_edit-mode');
    editInput.classList.remove('task-list__input-text_edit-mode');
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
    editInput.classList.add('task-list__input-text_edit-mode');
    label.classList.add('task-list__label_edit-mode');
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle('edit-mode');
};

//Delete task.
function deleteTask() {
  console.log('Delete Task...');

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
function taskCompleted() {
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  const label = listItem.querySelector('.task-list__label');
  label.classList.add('task-list__label_completed');

  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}

function taskIncomplete() {
  console.log('Incomplete Task...');
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  let listItem = this.parentNode;
  const label = listItem.querySelector('.task-list__label');
  label.classList.remove('task-list__label_completed');

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function ajaxRequest() {
    console.log('AJAX Request');
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);


function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
  //select ListItems children
  const checkBox = taskListItem.querySelector('.task-list__input-checkbox');
  const editButton = taskListItem.querySelector('.task-list__btn-edit');
  const deleteButton = taskListItem.querySelector('.task-list__btn-delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items children(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.