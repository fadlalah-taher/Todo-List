// variable
var editTaskId = 0;
var displayTask = {};


// hide the form 
$('.form-appear').toggle();
// when click on button Add a task form appear
$('#addtask-item').click(() => $('.form-appear').toggle());

// exit form add task
$('.fa-xmark').click(() => {
    $('.form-appear').toggle();
    $('#title').val('');
    $('#Description').val('');
    $('#Point').val('1');
    $('#due-time').val('');
    editTaskId = 0;
})

// Adding task to displayTask
$('#add').click((element) =>{
    element.preventDefault();
    if(invalidInput()){
        return;
    }
    var id;
})













////////////////////// functions

const invalidInput = () => {
    if ($('#title').val() === '' || $('#Description').val() === '' || $('#due-time').val() === '') {
        if ($('#title').val() === '') {
            $('#title').attr('placeholder', 'title cannot be empty');
        }
        if ($('#Description').val() === '') {
            $('#Description').attr('placeholder', 'Description cannot be empty');
        }
        return true;
    }
    else{
        return false;
    }
}

const todoId = () => {
    let rand;
    let ids = [];
    for (let todo of todos)
        ids.push(todo.taskId)
        ids.length === 599 && alert('Full List');
        ids.length === 599 && retrun;
    do {
        rand = Math.floor(Math.random() * 599 + 100);
    } while (ids.includes(rand))
    return rand;
}