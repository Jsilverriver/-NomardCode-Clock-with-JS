
const toDoForm = document.querySelector(".js_toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    //여기서 input을 그냥 해줄수 있는 이유는 toDoForm이 this이기 때문이다.
    toDoList = document.querySelector(".js_toDoList");

const TODOS_LS = "toDos"
let TODOSVALUE_LS = [];

function saveToDoList(text) {
    localStorage.setItem(TODOS_LS, JSON.stringify(text));
}

function delBtnFn(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    //여기까진 html li 지우기.
    //filter로 클릭된 것을 지우는 배열을 만들어낸다.
    const clearnToDo = TODOSVALUE_LS.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    })
    //만들어낸걸 다시 value에 저장한다. 그래야 위에께 다시 동작했을때 중복되지 않을테니까.
    TODOSVALUE_LS = clearnToDo;
    saveToDoList(TODOSVALUE_LS);
}

function paintToDo(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = TODOSVALUE_LS.length;
    span.innerText = text;
    delBtn.innerText = "❌"
    delBtn.addEventListener("click", delBtnFn);
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
