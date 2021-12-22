window.onload = () => {
  debugger;
  getFromStorage();
  todos.length === 0 ? createNoTodoDiv() : createTodoUl();

  renderTodos();
};

//Create , Remove Elements
function createNoTodoDiv() {
  var div = document.createElement("div");
  div.className = "noTodo";
  div.id = "noTodo";
  var text = document.createTextNode("No Todo`s Yet !");
  div.appendChild(text);

  document.getElementById("content").appendChild(div);
}
function removeNoTodoDiv() {
  var el = document.getElementById("noTodo");
  console.log(el);
  el.remove();
}

function createTodoUl() {
  var ul = document.createElement("ul");
  ul.className = "todos";
  ul.id = "todos";

  document.getElementById("content").appendChild(ul);
  list = ul;
}
function removeTodoUl() {
  document.getElementById("todos").remove();
}

var todos = [];
var list = document.querySelector("ul");

function createDeleteBtn(todo) {
  var span = document.createElement("span");
  span.className = "close";
  var text = document.createTextNode("\u00D7");
  span.appendChild(text);

  todo.appendChild(span);

  span.onclick = (e) => {
    debugger;
    var parent = e.target.parentElement;
    parent.remove();

    todos = todos.filter((t) => t.id.toString() != parent.id);
    setLocalStorage();

    if (todos.length === 0) {
      removeTodoUl();
      createNoTodoDiv();
    }
  };
}

function renderTodos() {
  debugger;
  todos.forEach((t) => {
    let todo = document.createElement("li");
    let txt = document.createTextNode(t.todo);

    todo.appendChild(txt);
    todo.setAttribute("id", t.id);
    t.isDone ? todo.classList.add("checked") : null;

    todo.onclick = () => {
      toggleIsDone(todo, todo.getAttribute("id"));
    };
    createDeleteBtn(todo);

    if (todos.length === 0) {
      removeNoTodoDiv();
      createTodoUl();
    }
    list.appendChild(todo);
  });
}

function addTodo() {
  debugger;
  var input = document.getElementById("input");

  if(input.value !== "") {
    if (todos.length === 0) {
      removeNoTodoDiv();
      createTodoUl();
    }
  
    addToStorage(input.value);
  
    var todo = document.createElement("li");
    var txt = document.createTextNode(input.value);
  
    todo.appendChild(txt);
    todo.setAttribute("id", todos[todos.length - 1].id);
  
    todo.onclick = () => {
      toggleIsDone(todo, todo.getAttribute("id"));
    };
  
    createDeleteBtn(todo);
  
    list.appendChild(todo);
  
    input.value = "";
  } else {
    input.focus();
  }
}

function addToStorage(todo) {
  var item = {
    id: Date.now(),
    todo,
    isDone: false,
  };
  todos.push(item);

  setLocalStorage();
}

function getFromStorage() {
  let storage = localStorage.getItem("todos");
  if (storage !== null) todos = JSON.parse(storage);

  console.log(todos);
}

function toggleIsDone(item, id) {
  debugger;
  item.classList.toggle("checked");
  var index = todos.findIndex((t) => t.id.toString() == id);

  if (index != -1) {
    todos[index].isDone = !todos[index].isDone;
    setLocalStorage();
  }
}

function setLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
