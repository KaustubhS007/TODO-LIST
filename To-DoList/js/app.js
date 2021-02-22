const clear=document.querySelector(".clear");
const dateElement=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementById("input");

const CHECK="fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINE_THROUGH="lineThrough";


function addToDo(toDo,id,done,trash) {
if(trash){
    return;
}    

const DONE =done ? CHECK:UNCHECK;   
const LINE=done ? LINE_THROUGH:" ";
const text= `<li class="item">
                <i class=" fa ${DONE} " job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="de fa fa-trash-o" job="delete" id="${id}"></i>

            </li>`
       
const position="beforeend";           


list.insertAdjacentHTML(position,text)
}
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done ? false : true;
}
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash=true;

}

document.addEventListener("keyup",function(event){
    if(event.keyCode == 13)
    {
        const toDo=input.value;
        if(toDo){
            addToDo(toDo,id,false,false);
            LIST.push(
                {
                    name:toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
            
            localStorage.setItem("TODO",JSON.stringify(LIST));
            id++;
            input.value="";
        }
        

    }
})
//when the user clicks a button to delete or done

list.addEventListener("click",function(event){
    let element=event.target;
    const elementJob=event.target.attributes.job.value;
    if(elementJob=='complete')
    completeToDo(element);
    else if(elementJob=='delete')
    removeToDo(element);

    localStorage.setItem("TODO",JSON.stringify(LIST));
})

let LIST,id;

let data=localStorage.getItem("TODO");
if(data)
{
    LIST=JSON.parse(data);
    
    id=LIST.length;
    loadToDo(LIST);
}
else{
    LIST=[];
    id=0;

}
function loadToDo(array){
    array.forEach(function(item) {
        addToDo(item.name,item.id,item.done,item.trash);
        
    });
}
//refreshing the page
clear.addEventListener('click',function(){
    localStorage.clear();
    location.reload();
});

//show date
let options={weekday:'long',month:'short',day:'numeric'};
let today=new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US",options);