var Todo = function (options) {
  var args = options || {};

  this.task = args.task;
  this.status = 'Open';

};

//Task List
var openStorageBin = [];

// Set up submit
// On submit, create a new instance
$('#addTask').on('submit', function(event) {

  event.preventDefault();
  var taskText = $('#taskText').val();
  var taskInstance = new Todo ({task: taskText});

  // Store it for later
  openStorageBin.push(taskInstance);

  // Display on page
  $('#opentasks').append('<li><input type="checkbox">' + taskText + '</li>');


  // Reset form
  this.reset();

});

var closedStorageBin = [];

// Toogle tasks
$('#opentasks').on('click', 'li', function(event) {

  // grab task that was clicked on
  // mark task as completed

  $(this).toggle('complete');

  var tTask = $(this).text();

  var taskToEdit = _.find(openStorageBin, { task: tTask });

  taskToEdit.status = 'Closed';

  // Store for later
  closedStorageBin.push(taskToEdit);

  // Display on page
  $('#closedtasks').append('<li class="complete"><input type="checkbox" checked>' + tTask + '</li>');


  console.log(taskToEdit);

});
