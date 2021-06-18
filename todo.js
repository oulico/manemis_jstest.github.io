/*

const toDoForm = document.querySelector(".js-toDoForm"), //1
    toDoInput = toDoForm.querySelector("input"),//2
    toDoList = document.querySelector(".js-toDoList");//3

const TODOS_LS = 'toDos';//10

let toDos = [];

let idNumbers = 1;

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);

    });
    toDos = cleanToDos
    saveToDos();

}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){//16
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers; 
    idNumbers += 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(event){ //13
    event.preventDefault(); //14
    const currentValue = toDoInput.value;//15
    paintToDo(currentValue);//17
    toDoInput.value = "";//18 엔터누르면 값 생성
}



function loadToDos(){//8
    const loadedToDos = localStorage.getItem(TODOS_LS);//9
    if(loadedToDos !== null){//11
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
            });
    } 
}

function init() {//4
    loadToDos();//6
    toDoForm.addEventListener("submit", handleSubmit);//12
}

init();//5

*/


const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoListPending"),
  toDoListFinished = document.querySelector(".js-toDoListFinished");

const TODOS_LS = "toDos";
const TODOSFIN_LS = "FINISHED";
const SPAN_LS = "span";

let toDos = [];
let finishedtoDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteToDo2(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoListFinished.removeChild(li);
  const cleanFinishedToDos = finishedtoDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finishedtoDos = cleanFinishedToDos;
  saveToDosFinished();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveToDosFinished() {
  localStorage.setItem(TODOSFIN_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "✅";
  doneBtn.addEventListener("click", doneTask);

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintTodoFinished(text, getId) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo2);
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "⏪";
  doneBtn.addEventListener("click", backDoneTask);
  const span = document.createElement("span");
  const newId = getId;
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);
  li.id = newId;
  toDoListFinished.appendChild(li);
  const finishedtoDoObj = {
    text: text,
    id: newId
  };
  finishedtoDos.push(finishedtoDoObj);
  saveToDosFinished();
}

function doneTask(event) {
  const btn = event.target;
  const nodeLi = btn.parentNode;
  const text = nodeLi.firstChild;
  const textString = text.innerText;
  const getId = nodeLi.id;
  paintTodoFinished(textString, getId);
  deleteToDo(event);
}

function backDoneTask(event) {
  const btn = event.target;
  const nodeLi = btn.parentNode;
  const text = nodeLi.querySelector("span").innerText;
  toDoListFinished.removeChild(nodeLi);
  finishedtoDos = finishedtoDos.filter(function (toDo) {
    return toDo.id !== nodeLi.id;
  });
  paintTodo(text);
  saveToDos();
  saveToDosFinished();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintTodo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function something(toDo) {
      paintTodo(toDo.text);
    });
  }
}

function loadToDosFinished() {
  const loadedToDosFinished = localStorage.getItem(TODOSFIN_LS);
  if (loadedToDosFinished !== null) {
    const parsedToDosFinished = JSON.parse(loadedToDosFinished);
    parsedToDosFinished.forEach(function something(toDo) {
      paintTodoFinished(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  loadToDosFinished();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
