(function() {
'use strict';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Task constructor & prototype ~~~~~~~~~~~~~~~~~~~~~~~~~~
var Task = function (options) {
  var args = options || {};

  this.task = args.task;
  this.status = 'Open'; // value can be 'Open' or 'Closed'
  this.id = _.random(200, 6000); // Added with Tim on Mon., Jun 8 - Idea is to have
                                 // unique ID for each task
};

Task.prototype.genHTML = function (divID, checked, tasktext, deletebtnID) {
  return '<li class="taskli" id="' + this.id + '"><div class="taskitem" id="' + divID + '">' +
  '<input type="checkbox" ' + checked +'>' + tasktext + '</div><div class="deletebtn" id="' +
  deletebtnID + '><a href="#"><i class="fa fa-trash-o"></i></a></div></li>';
};

Task.prototype.delete = function (total, ulID, status) {
  $('.deletebtn').click(function (event) {
    event.preventDefault();
    var $taskID = $(this).parent().attr('id');
    storageBin = _.without(storageBin, _.find(storageBin, { id: Number($taskID) }));
    $(this).closest('li').remove();
    taskCount();
    displayCount(total, ulID, status);
  });
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Global variables ~~~~~~~~~~~~~~~~~~~~~~~~~~

var openTotal, closedTotal;

var storageBin = [];

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~
function taskCount() {
  openTotal = 0;
  closedTotal = 0;
  _.each(storageBin, function(task) {
    if (task.status === 'Open') {
      return openTotal++;
    } else if (task.status === 'Closed') {
      return closedTotal++;
    }
  });
}

function displayCount(total, ulID, status) {
  if (total > 0) {
    $(ulID).html('Number of ' + status + ' tasks: ' + total);
  } else {
    $(ulID).html('');
  }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Adding to task list ~~~~~~~~~~~~~~~~~~~~~~~~~~

// Set up submit
// On submit, create a new instance
$('#addTask').on('submit', function (event) {

  event.preventDefault();
  var $taskText = $('#taskText').val();
  var taskInstance = new Task ({task: taskText});

  // Store it for later
  storageBin.push(taskInstance);

  // Display on page
  var opentaskhtml = taskInstance.genHTML("opentask", "", $taskText, "deleteopen");
  $('#opentasks').append(opentaskhtml);

  // Reset form
  this.reset();

  // Open task count
  taskCount();
  displayCount(openTotal, '#opencount', 'open');

  // Delete task
  taskInstance.delete(openTotal, '#opencount', 'open');

});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Change task to completed ~~~~~~~~~~~~~~~~~~~~~~~~~~

$('#opentasks').on('click', '.taskitem', function(event) {
  event.preventDefault();

  // Mark tasks completed
  $(this).toggle('complete');
  $(this).next('.deletebtn').remove();

  var $cTask = $(this).text();

  // Grab task that was clicked on
  var $taskID = $(this).parent().attr('id'); // Added with Tim, used to search for task w/ unique ID
  var taskToClose = _.find(storageBin, { id: Number($taskID) }); // Added with Tim

  taskToClose.status = 'Closed';

  // Update task counts
  taskCount();
  displayCount(openTotal,'#opencount', 'open');
  displayCount(closedTotal,'#closedcount', 'closed');

  // Display on page
  var closedtaskhtml = taskToClose.genHTML("closedtask", "checked", $cTask, "deleteclosed");
  $('#closedtasks').append(closedtaskhtml);

  // Delete task
  taskToClose.delete(closedTotal, '#closedcount', 'closed');

});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Toggle from Completed to Open ~~~~~~~~~~~~~~~~~~~~~~~~~~

$('#closedtasks').on('click', '.taskitem', function(event) {
  event.preventDefault();

  var $tTask = $(this).text();
  var $taskID = $(this).parent().attr('id');

   // Remove from completed task list
  $(this).closest('li').remove();

  // Grab task that was clicked on and change status
  var taskToEdit = _.find(storageBin, { id: Number($taskID) });
  taskToEdit.status = 'Open';

  // Display in open task list
  var reopentaskhtml = taskToEdit.genHTML("opentask", "", $tTask, "deleteopen");
  $('#opentasks').append(reopentaskhtml);

  // Update task counts
  taskCount();
  displayCount(openTotal,'#opencount', 'open');
  displayCount(closedTotal,'#closedcount', 'closed');

  // Delete reopened task
  taskToEdit.delete(openTotal, '#opencount', 'open');

});

/*
Tim's solution:
$('#removeTask').on('click', function(event) {
  event.preventDefault();

  taskBin.forEach(function(t){
    if (t.status !== 'Open') {
    taskBin = _.without(taskBin, t);
    $('#' + t.id).remove();
    }
  });
});
*/
});
