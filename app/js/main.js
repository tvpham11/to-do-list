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

  // Open task count
  if (openStorageBin.length > 0) {
    $('#opencount').html('Number of open tasks: ' + openStorageBin.length);
  }

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

  // Remove from openStorageBin
  openStorageBin.splice($.inArray(taskToClose, openStorageBin),1);

  // Display on page
  $('#closedtasks').append('<li class="complete"><input type="checkbox" checked>' + cTask + '</li>');

  console.log(taskToClose);

  // Closed task count
  if (closedStorageBin.length > 0) {
    $('#closedcount').html('Number of completed tasks: ' + closedStorageBin.length);
  }

});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Toggle Incomplete/Completed ~~~~~~~~~~~~~~~~~~~~~~~~~~

$('#closedtasks').on('click', 'li', function () {
  $(this).toggleClass('complete');

  var tTask = $(this).text();

  var taskToEdit = _.find(closedStorageBin, { task: tTask });

  taskToEdit.status = 'Open';

  // Store for later
  openStorageBin.push(taskToEdit);

  // Remove from closedStorageBin
  closedStorageBin.splice($.inArray(taskToEdit, closedStorageBin),1);
  $(this).remove();

  // Update closed task count
  if (closedStorageBin.length > 0) {
    $('#closedcount').html('Number of completed tasks: ' + closedStorageBin.length);
  }
  else {
    $('#closedcount').remove();
  }

  // Display on page
  $('#opentasks').append('<li><input type="checkbox">' + tTask + '</li>');

  // Update ppen task count
  if (openStorageBin.length > 0) {
    $('#opencount').html('Number of open tasks: ' + openStorageBin.length);
  }

});
