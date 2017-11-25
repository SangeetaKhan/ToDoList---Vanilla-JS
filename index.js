let todoItemArr =[],todoItemBlock,todoItemFilterBlock,todoVal,todoItemBtn,currEditedIndex;
todoItemBlock = document.getElementById('todoItems');


var addTodos = function(){
    this.loadStoredTodos = () =>{
        todoItemArr = JSON.parse(localStorage.getItem('storedItems')|| "[]");
        this.isStored = true;
        this.populateTodoHtml(todoItemArr,this.isStored)
    }
    
    addTodos.prototype.isStored = 'false';
    this.populateTodoHtml = (todoArr,todoIndex) =>{
        let _this = this;
        document.getElementById('todoItem').value="";
        todoArr.map(function(item,index){
                if(item.isNew){
                item.listType === 'grpList' ? _this.buildHtml(item,index) : _this.buildSubListHTML(item,todoIndex);
                item.isNew=false;
            }
        });
        
    }
}

addTodos.prototype.buildSubListHTML = (item,index) => {
    let subListEle = '',parentListEle ='';
    parentListEle = document.getElementsByClassName('grpItems');
    subListEle = '<div><div class="subListItems" id ="subItem-'+index+'">' + item.todoListItems + '</div><input type="checkbox" class = "listItems" name="status" value="completed"></div>';
     parentListEle[index].innerHTML += subListEle ;
    let listItems = document.getElementsByClassName('listItems')[index];
    listItems.addEventListener("change" , ( function(item,index){
        return function (){
            item.status = "completed";
             this.buildCompletedHTML(item);
            todoItemArr[index].todoListItems.splice(index,1);
            var node = document.getElementById('subItem-'+index).parentNode;
            (todoItemArr.length) ? node.parentNode.removeChild(node):todoItemBlock.innerHTML = "";  
        }
    })(item,index),false)
   
    
}

changeListStatus = (index) => {
    todoItemArr = JSON.parse(localStorage.getItem('storedItems')|| "[]");
    
}

addTodos.prototype.buildCompletedHTML = (item,cb) => {
    let filteredToDos, completedTodos; 
     filteredToDos = document.getElementById('todoItemFilters');
         if(item.status === "completed"){
            completedTodos ='<div class="items">'+item.todoListItems+'</div>';
            todoItemFilters.innerHTML+=completedTodos;
         }
}

addTodos.prototype.buildHtml = (item,index)  => {
   let todoItemEle ='';
    todoItemEle = '<div class="grpItems"><div class="list-'+item.todoItem+'">' +item.todoItem + '</div> <div> <input type="text" class="search" placeholder="Search Todos"  /></div><div class ="todoItems"><input type="text" class="todoListItem" placeholder="Add Todo Items" onkeyup ="addItems(\'' +index + '\')" /> </div></div>'
    todoItemBlock.innerHTML+= todoItemEle;
    let searchBtn = document.getElementsByClassName('search')[index];
    searchBtn.addEventListener("keyup" , (function(item,index){
        return function() {
             let searchTxt ='';
                if(event.keyCode === 13){
                    searchTxt = document.getElementsByClassName('search')[index].value;
                    if(searchTxt !== ''){
                        item.todoListItems.filter(function(el){
                            if(el.todoListItems === searchTxt){
                                alert('Found');
                            }
                        })
                    }
                }
        }
    })(item,index),false)
}


searchTodos = (index,item) => {
    let searchTxt ='';
    if(event.keyCode === 13){
        searchTxt = document.getElementsByClassName('search')[index].value;
        if(searchTxt !== ''){
            item[index].todoListItems.filter(function(el){
                if(el.todoListItems === searchTxt){
                    alert('Found');
                }
            })
        }
    }
}
addItems = (index) => {
    if(event.keyCode == '13'){
        event.preventDefault();
        let todoItem , todoListItems ;
        todoItem = document.getElementsByClassName('todoListItem')[index].value;
        todoItemArr = JSON.parse(localStorage.getItem('storedItems')|| "[]");
        if(todoItem !== ''){
            todoItemArr[index].todoListItems.push({"todoListItems" : todoItem,"listType" : 'subListType',"isNew" : true,"status":"Active"}) ;
            //todoItemArr[index].todoListItems.listType = 'subListType';
            addTodosIns.populateTodoHtml(todoItemArr[index].todoListItems,index);
            
        }else{
            alert("Please todo Item")
        }
    }
}


addTodoList = (type,item,index) => {
    todoVal = document.getElementById('todoItem').value;
    todoItemArr.push({'todoItem' : todoVal,'status':'active','isNew':'true','listType' : 'grpList' ,"todoListItems" : []});
    localStorage.setItem('storedItems',JSON.stringify(todoItemArr));
    this.isStored = false;
    addTodosIns.populateTodoHtml(todoItemArr );

}

var addTodosIns = new addTodos();

addTodosIns.loadStoredTodos();
