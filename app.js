//getting variables
const todo_input = document.querySelector('.input_todo');
const todo_button = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo-list');
const todofilter = document.querySelector('select[name="todos"]'); // Select the select element

//when ever page reloaded
document.addEventListener('DOMContentLoaded',function(e){
    getTodo();
})
todo_button.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todofilter.addEventListener('click', filtertodo);

function addTodo(e) {

    const listtodo = document.createElement('div');
    listtodo.className = "todo";

    const todos = document.createElement('li');
    todos.className = "todo-item";

    setTodo(todo_input.value);

    todos.appendChild(document.createTextNode(todo_input.value));

    listtodo.appendChild(todos);

    todo_input.value = " ";

    //create complete-button
    const completeBtn = document.createElement("buttton");
    completeBtn.className = "complete-btn";
    completeBtn.innerHTML = '<i class="fa fa-check"></i>';
    listtodo.appendChild(completeBtn);


    //creating trash button
    const trashBtn = document.createElement("buttton");
    trashBtn.className = "trashBtn";
    trashBtn.innerHTML = '<i class="fa fa-trash"></i>';
    listtodo.appendChild(trashBtn);
    todoList.appendChild(listtodo);

    e.preventDefault();
}
function deleteCheck(e) {
    //delete functionalities

    const items = e.target;
    if (items.className === 'trashBtn') {
        const todo = items.parentElement;
        todo.classList.add("fall");
        removeTodo(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }
    //complete functinalities

    if (items.className === 'complete-btn') {
        const todo = items.parentElement;
        console.log(todo);
        todo.classList.toggle('completed');//for line through or come back to real stage

    }

    e.preventDefault();
}


//filter todo
function filtertodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {

        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            default:
                console.log(e.target.value);
        }

    })


    e.preventDefault();
}

//to set in local storage

function setTodo(todo) {
    let todos;
    if (localStorage.getItem('todos')===null) {
        todos=[];

    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    //setting to local storage
    localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodo(){
    let todos;
    if (localStorage.getItem('todos')===null) {
        todos=[];

    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){

        console.log(todo);

    });
}
function removeTodo(todo){
    let todos;
    if (localStorage.getItem('todos')=== null) {
        todos=[];

    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
   
}
