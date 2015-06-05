var Todo = function (options) {
  var args = options || {};

  this.task = args.task;
  this.status = 'Open';

};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Incomplete Task List ~~~~~~~~~~~~~~~~~~~~~~~~~~
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Completed Task List ~~~~~~~~~~~~~~~~~~~~~~~~~~

var closedStorageBin = [];

// Toggle tasks
$('#opentasks').on('click', 'li', function(event) {

  // grab task that was clicked on
  // mark task as completed

  $(this).toggle('complete');

  var cTask = $(this).text();

  var taskToClose = _.find(openStorageBin, { task: cTask });

  taskToClose.status = 'Closed';

  // Store for later
  closedStorageBin.push(taskToClose);

  // Display on page
  $('#closedtasks').append('<li class="complete"><input type="checkbox" checked>' + cTask + '</li>');


  console.log(taskToClose);

});


// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Toggle Incomplete/Completed ~~~~~~~~~~~~~~~~~~~~~~~~~~

$('#closedtasks').on('click', 'li', function () {
  // var $checkbox = $(this).find(':checkbox');
  // $checkbox.attr('checked', !$checkbox.attr('checked'));
  $(this).removeClass('complete');

  // var tTask = $(this).text();

  // var taskToEdit = _.find(openStorageBin, { task: tTask });

  // taskToEdit.status = 'Open';

  // closedStorageBin

  // openStorageBin.push(taskToEdit);

});
