
const toDoForm = document.querySelector(".js_toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    //여기서 input을 그냥 해줄수 있는 이유는 toDoForm이 this이기 때문이다.
    toDoList = document.querySelector(".js_toDoList");

const TODOS_LS = "toDos"
const TODOSVALUE_LS = [];

function saveToDoList(text) {
    localStorage.setItem(TODOS_LS, JSON.stringify(text));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = TODOSVALUE_LS.length;
    span.innerText = text;
    delBtn.innerText = "❌"
    li.id = newId
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    TODOSVALUE_LS.push(toDoObj);
    saveToDoList(TODOSVALUE_LS);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";

}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        JSON.parse(loadedToDos).forEach(function (toDos) {
            paintToDo(toDos.text);
        });
    }
}

function init() {
    loadToDos()
    toDoForm.addEventListener("submit", handleSubmit);
}
init();
