// variable
var editTaskId = 0;
var displayTask = {};
var todotask = [];
var results;
let displayTodos;


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
        displayTask.title = $('#title').val();
        displayTask.description = $('#Description').val();
        displayTask.point = $('#Point').val();
        displayTask.dueTime.value = $('#due-time').val();
        displayTask.dueTime.time = `${ currentTime($('#due-time').val()) }`
        for (let i = 0; i < todotask.length; i++) {
            if (todotask[i].taskId === displayTask.taskId) {
                todotask[i] = displayTask
            }
        }
        $('.form-appear').toggle();
        editTaskId = 0;
        updateEdits(displayTask);
        displayTask = {};

    }
    else{
        id = todoId()
        $('.form-appear').toggle();
        todotask.push({
            completed: false,
            taskId: id,
            title: `${ $('#title').val() }`,
            description: `${ $('#Description').val() }`,
            point: `${ $('#Point').val() }`,
            createdTime: {
                time: `${ currentTime() }`,
                value: new Date()
            },
            dueTime: {
                time: `${ currentTime($('#due-time').val()) }`,
                value: $('#due-time').val()
            }
        })

        $(`<div class="element" id="div${ id }">
            <p>${ id }</p>
        <div>
            <p>${ $('#title').val() }</p>
        </div>
        <div id="t${ id }">
            <p>${ $('#Description').val() }</p>
        </div>
        <div id="t${ id }">
            ${ $('#Point').val() }
        </div>
        <div id="t${ id }">
            <p>${ currentTime() }</p>
        </div>
        <div id="t${ id }">
            ${ currentTime($('#due-time').val()) }
        </div>
        <div id="t${ id }">
            <input type="checkbox" name="Completed" id="Completed${ id }">
        </div>
        <div id="t${ id }">
            <i class="fa-solid fa-pen-to-square" id="pen${ id }"></i>
        </div>
            <i class="fa-solid fa-trash-can" id="trash${ id }"></i>
        </div>`)
            .appendTo(".list-container");
    }
    edit(`#pen${ id }`);
    progress(`#Completed${ id }`);
    deleteTask(`#trash${ id }`);
    $('#title').val('');
    $('#Description').val('');
    $('#Point').val('1');
    $('#due-time').val('');
    localStorage.clear();
    fillLocalStorage(todotask);
});

// sorting in asc order according to point
const sortByPoint = (arr, order = 'asc') => {
    if (order === 'asc')
        arr.sort((a, b) => {
            return a.point - b.point;
        })
    else {
        arr.sort((a, b) => {
            return b.point - a.point;
        })
    }
}

// onclick sorting the list and change the icon
$('#points').click((element) => {
    $('#points').toggleClass('fa-angle-up')
    let todosB
    if (results) {
        todosB = [...results];
    } else {
        todosB = [...todos];
    }
    if (element.target.classList.contains('fa-angle-up'))
        sortByPoint(todosB);
    else
        sortByPoint(todosB, 's');
    displayTodos(todosB);
})

// search 
$('#search').on('keyup', (element) => {
    results = [];
    for (let todo of todotask) {
        if (todo.title.toLowerCase().includes(element.target.value.toLowerCase()) || todo.description.toLowerCase().includes(element.target.value.toLowerCase())) {
            results.includes(todo) ? '' : results.push(todo);
        }
    }
    displayTodos(results);
})

// onclick clear ToDo list
$('#clear').click(() => {
    localStorage.clear();
    todotask = [];
    displayTodos(todotask);
})


// functions
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

//  random ID
const todoId = () => {
    let rand;
    let ids = [];
    for (let todo of todotask)
        ids.push(todo.taskId)
        ids.length === 500 && alert('Full List');
        ids.length === 500 && retrun;
    do {
        rand = Math.floor(Math.random() * 500 + 100);
    } while (ids.includes(rand))
    return rand;
}

// progress function
const progress = (selector) =>
    $(selector).change(
        function (element) {
            for (let todo of todotask) {
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
            for (let i = 0; i < todotask.length; i++) {
                if (todotask[i].taskId === displayTask.taskId) {
                    todotask[i] = displayTask
                }
            }
            updateProgress(displayTask)
            localStorage.clear()
            fillLocalStorage(todotask)
            displayTask = {}
        })

// update and display the tasks in specific order
const updateEdits = (element) => {
    let id = `#t${ element.taskId }`
    $(`${ id }:nth-of-type(1)`).html(`<p>${ element.title }</p>`)
    $(`${ id }:nth-of-type(2)`).html(`<p>${ element.description }</p>`)
    $(`${ id }:nth-of-type(3)`).html(`<p>${ element.point }</p>`)
    $(`${ id }:nth-of-type(5)`).html(`<p>${ element.dueTime.time }</p>`)
}

// display class that mark the todo that check
const updateProgress = (task) => {
    let divId = `#div${ task.taskId }`
    $(divId).toggleClass('markCheck');
}

// delete task 
const deleteTask = (selector) =>
    $(selector).click((element) => {
        for (let i = 0; i < todotask.length; i++) {
            let TrashId = `trash${ todotask[i].taskId }`
            if (TrashId === element.target.id) {
                todotask = todotask.filter(task => {
                    return task !== todotask[i];
                });
            }
        }
        displayTodos(todotask);
        localStorage.clear();
        fillLocalStorage(todotask);
        displayTask = {};
    })

const currentTime = (x = null) => {
    var date = new Date(x);
    var dt = new Date();
    if (x) {
        return `${ date.getDate() }/${ date.getMonth() + 1 }/${ date.getFullYear() } <br> ${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }`
    }
    return `${ dt.getDate() }/${ dt.getMonth() + 1 }/${ dt.getFullYear() } <br> ${ dt.getHours() }:${ dt.getMinutes() }:${ dt.getSeconds() }`
}

// edit function
const edit = (selector) =>
    $(selector).click((element) => {
        for (let todo of todotask) {
            let penId = `pen${ todo.taskId }`
            if (penId === element.target.id) {
                displayTask = todo
                break
            }
        }
        editTaskId = displayTask.taskId;
        $('.form-appear').toggle();
        $('#title').val(displayTask.title);
        $('#Description').val(displayTask.description);
        $('#Point').val(displayTask.point);
        $('#due-time').val(displayTask.dueTime.value);
    })


// Display ToDo
displayTodos = (arr) => {
    $('.list-container .element').remove()
    for (todo of arr) {
        $(`<div class="element ${ todo.completed ? 'done' : '' }" id="div${ todo.taskId }">
        <p>${ todo.taskId }</p>
    <div>
        <p>${ todo.title }</p>
    </div>
    <div id="t${ todo.taskId }">
        <p>${ todo.description }</p>
    </div>
    <div id="t${ todo.taskId }">
        ${ todo.point }
    </div>
    <div id="t${ todo.taskId }">
        ${ todo.dueTime.time }
    </div>
    <div id="t${ todo.taskId }">
        <p>${ todo.createdTime.time }</p>
    </div>
    <div id="t${ todo.taskId }">
        <input type="checkbox" name="Completed" id="Completed${ todo.taskId }" ${ todo.completed ? 'checked' : '' }>
    </div>
    <div id="t${ todo.taskId }">
        <i class="fa-solid fa-pen-to-square" id="pen${ todo.taskId }"></i>
    </div>
        <i class="fa-solid fa-trash-can" id="trash${ todo.taskId }"></i>
    </div>`)
            .appendTo(".list-container")
    }
    edit('.fa-pen-to-square');
    deleteTask('.fa-trash-can');
    progress('input[type=checkbox]');
}

// fill inside localStorage
const getLocalStorageItems = () => {
    let localItems = [];
    let i = 1;
    while (JSON.parse(localStorage.getItem(`todo:${ i }`))) {
        localItems.push(JSON.parse(localStorage.getItem(`todo:${ i }`)))
        i++;
    }
    return localItems;
}

const fillLocalStorage = (arr) => {
    let index = 1;
    for (todo of arr) {
        localStorage.setItem(`todo:${ index }`,
            JSON.stringify(todo)
        )
        index++;
    }
}

todotask = getLocalStorageItems(); 

edit('.fa-pen-to-square');
progress('input[type=checkbox]');
deleteTask('.fa-trash-can');
displayTodos(todotask);
