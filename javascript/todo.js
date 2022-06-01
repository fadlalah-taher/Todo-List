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
    if (editTaskId) {
        displayTask.title = $('#title').val()
        displayTask.description = $('#Description').val()
        displayTask.point = $('#Point').val()
        displayTask.dueTime.value = $('#due-time').val()
        displayTask.dueTime.time = `${ curTime($('#due-time').val()) }`
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].taskId === displayTask.taskId) {
                todos[i] = displayTask
            }
        }
        $('.form-appear').toggle()
        editTaskId = 0
        updateEdits(displayTask)
        displayTask = {}

    }
    else{
        id = todoId()
        $('.form-appear').toggle("fast")
        todos.push({
            completed: false,
            taskId: id,
            title: `${ $('#title').val() }`,
            description: `${ $('#Description').val() }`,
            point: `${ $('#Point').val() }`,
            createdTime: {
                time: `${ curTime() }`,
                value: new Date()
            },
            dueTime: {
                time: `${ curTime($('#due-time').val()) }`,
                value: $('#due-time').val()
            }
        })

        $(`<div class="element" id="div${ id }">
        <i class="fa-solid fa-pen-to-square" id="pen${ id }"></i>
        <div>
        <input type="checkbox" name="Completed" id="Completed${ id }">
        </div>
        <div id="t${ id }">
            <p>${ id }</p>
        </div>
        <div id="t${ id }">
            <p>${ $('#title').val() }</p>
        </div>
        <div id="t${ id }">
            <p>${ $('#Description').val() }</p>
        </div>
        <div id="t${ id }">
            ${ $('#Point').val() }
        </div>
        <div id="t${ id }">
            <p>${ curTime() }</p>
        </div>
        <div id="t${ id }">
            ${ curTime($('#due-time').val()) }
        </div>
        <i class="fa-solid fa-trash-can" id="trash${ id }"></i>
        </div>`)
            .appendTo(".list-container")
    }
    // edit(`#pen${ id }`)
    // progress(`#Completed${ id }`)
    // deleteTask(`#trash${ id }`)
    // $('#title').val('')
    // $('#Description').val('')
    // $('#Point').val('1')
    // $('#due-time').val('')
    // localStorage.clear()
    // fillLocalStorage(todos)
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

// progress function
const progress = (selector) =>
    $(selector).change(
        function (element) {
            for (let todo of todos) {
                let checkboxId = `Completed${ todo.taskId }`
                if (checkboxId === element.target.id) {
                    displayTask = todo
                    break
                }
            }
            if (element.target.checked) {
                displayTask.completed = true
            }
            else {
                displayTask.completed = false
            }
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].taskId === displayTask.taskId) {
                    todos[i] = targetTask
                }
            }
            updateProgress(displayTask)
            localStorage.clear()
            fillLocalStorage(todos)
            displayTask = {}
        })

// delete task 
const deleteTask = (selector) =>
    $(selector).click((element) => {
        for (let i = 0; i < todos.length; i++) {
            let TrashId = `trash${ todos[i].taskId }`
            if (TrashId === element.target.id) {
                todos = todos.filter(task => {
                    return task !== todos[i];
                });
            }
        }
        renderTodos(todos);
        localStorage.clear();
        fillLocalStorage(todos);
        targetTask = {};
    })