// 'use strict';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Task constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~
var Todo = function (options) {
  var args = options || {};

  this.task = args.task;
  this.status = 'Open';
  this.id = _.random(200, 6000); // Added with Tim on Mon., Jun 8 - Idea is to have
                                 // unique ID for each task
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~

function taskCount(storagebin, ulID, status) {
  if (storagebin.length > 0) {
    $(ulID).html('Number of ' + status + ' tasks: ' + storagebin.length);
  } else {
    $(ulID).html('');
  }
}

function deleteTask (delbtn, storagebin, task, taskcountfunc, ulID, status) {
  $('.taskli').on('click', delbtn, function (event) {
    event.preventDefault();
    storagebin.splice($.inArray(task, storagebin), 1);
    $(this).closest('li').remove();
    taskcountfunc(storagebin, ulID, status);
  });
}

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
// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Task arrays ~~~~~~~~~~~~~~~~~~~~~~~~~~

var openStorageBin = [];
var closedStorageBin = [];

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Adding to task list ~~~~~~~~~~~~~~~~~~~~~~~~~~

// Set up submit
// On submit, create a new instance
$('#addTask').on('submit', function (event) {

  event.preventDefault();
  var taskText = $('#taskText').val();
  var taskInstance = new Todo ({task: taskText});

  // Store it for later
  openStorageBin.push(taskInstance);

  // Display on page
  var opentaskhtml = '<li class="taskli" id="' + taskInstance.id + '"><div class="taskitem" id="opentask">' +
  '<input type="checkbox">' + taskText + '</div><div class="deletebtn" id="deleteopen"><a href="#">' +
  '<i class="fa fa-trash-o"></i></a></li>';
  $('#opentasks').append(opentaskhtml);

  // Reset form
  this.reset();

  // Open task count
  taskCount(openStorageBin,'#opencount', 'open');

  // Delete open task
  deleteTask('#deleteopen a', openStorageBin, taskInstance, taskCount,'#opencount', 'open');
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Change task to completed ~~~~~~~~~~~~~~~~~~~~~~~~~~

// Mark tasks completed
$('#opentasks').on('click', 'li', function(event) {

  // grab task that was clicked on
  // mark task as completed
  $(this).toggle('complete');
  $(this).next('.deletebtn').remove();

  // var cTask = $(this).text(); // Commented due to using ID random number instead of text

  var taskID = $(this).attr('id'); // Added with Tim
  // var taskToClose = _.find(openStorageBin, { task: cTask }); // See line 76
  var taskToClose = _.find(openStorageBin, { id: Number(taskID) }); // Added with Tim

  taskToClose.status = 'Closed';

  // Remove from openStorageBin
  openStorageBin.splice($.inArray(taskToClose, openStorageBin), 1);

  // Store for later
  closedStorageBin.push(taskToClose);

  // Update open task count
  taskCount(openStorageBin,'#opencount', 'open');

  // Closed task count
  taskCount(closedStorageBin,'#closedcount', 'closed');

  // Display on page
  var closedtaskhtml = '<li class="taskli"><div class="taskitem" id="closedtask">' +
  '<input type="checkbox" checked>' + cTask + '</div><div class="deletebtn" id="deleteclosed">' +
  '<a href="#"><i class="fa fa-trash-o"></i></a></li>';
  $('#closedtasks').append(closedtaskhtml);

  //  Delete closed task
  deleteTask('#deleteclosed a', closedStorageBin, taskToClose, taskCount,'#closedcount', 'closed');

});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Toggle from Completed to Open ~~~~~~~~~~~~~~~~~~~~~~~~~~

$('#closedtasks').on('click', 'li', function (event) {
  event.preventDefault();
  $(this).toggleClass('complete');
  $(this).next('.deletebtn').remove();

  var tTask = $(this).text();

  var taskToEdit = _.find(closedStorageBin, { task: tTask });

  taskToEdit.status = 'Open';

  // Store for later
  openStorageBin.push(taskToEdit);

  // Remove from closedStorageBin
  closedStorageBin.splice($.inArray(taskToEdit, closedStorageBin), 1);
  $(this).remove();

  // Update closed task count
  taskCount(closedStorageBin,'#closedcount', 'closed');

  // Update open task count
  taskCount(openStorageBin,'#opencount', 'open');

  // Display on page
  var reopentaskhtml = '<li class="taskli"><div class="taskitem" id="opentask">' +
  '<input type="checkbox">' + tTask + '</div><div class="deletebtn" id="deleteopen">' +
  '<a href="#"><i class="fa fa-trash-o"></i></a></div></li>';
  $('#opentasks').append(reopentaskhtml);

  // Delete re-opened task
  deleteTask('#deleteopen a', openStorageBin, taskToEdit, taskCount,'#opencount', 'open');

});
