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