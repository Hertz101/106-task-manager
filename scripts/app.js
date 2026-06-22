//This URL is the server direction.

const API="https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function saveTask(){

    //1. Get values from the DOM
    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();

    //2. Create an Object using our Class (Model)
    const taskToSave = new Task(title, desc, color, date, status, budget);
    console.log(taskToSave);

    //3. Send to server
    $.ajax({
        type:"POST",//HTTP Method : to create
        url: API,
        data: JSON.stringify(taskToSave),
        contentType:"application/json",
        success: function(created){
            console.log(created);
            // displayTask(created);
        },
        error: function(err){
            console.log(err);
        }
    });
}
// Updated HTML structure with ID and delete button 
function displayTask(task){
    let syntax = `
    <div class="task" id="${task.id}" style="border-color:${task.color}">
        <div class="info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
    </div>
    <label class="status">${task.status}</label>
    <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: ${task.budget}</label>
        </div>
        <button class="btn-delete">🗑️</button>
    </div>
    `;
    //inject the new HTML into the DOM tree
    $(".list").append(syntax);
}

// function updateTask(task){
//     $.ajax({
//         type: "PUT", // HTTP method to modify/ update
//         url: "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks/3",
//         data: JSON.stringify(
//             {
//                 title:"Hello this is the put method",
//                 budget: 159
//             }
//         ),
//         contentType:"application/json",
//         success: function(response){
//             console.log(response)
//         },
//         error: function(err){
//             console.log(err);
//         }
//     });
// }

function loadTask(){
    $.ajax({
        type:"GET",
        url: API,
        dataType:"json",
        success: function(data){
            console.log(data);
            $(".list").empty(); //clean the array before to render
            for(let i=0; i<data.length;i++){
            displayTask(data[i]);
            }
        },
        error: function(err){
            console.log(err);
        }
    });
}

function deleteTask(){
// 1. Context: 'this' is the specific button that was clicked
let btn = $(this);
// 2. Find the parent div with the class task
let taskElement = btn.parents(".task");
// 3. Extraction: get the ID that we save in the HTML
let id = taskElement.attr("id");

console.log("The requesting id is:", id);
//4. Server communication

$.ajax(
    {
        type:"delete",
        url: API + "/" + id, //Example : URL..../api/task/id(1)
        success: function(){
            // Success, we can remove the element
            taskElement.fadeOut(500,function(){
                $(this).remove();// Removes element from the DOM
            })
        }, error: function(err){
            console.log(err);
        }
    }
)

}

function init(){

    console.log("hello world");
    loadTask();
    $("#btnSave").click(saveTask);
    // OLD WAY (static page)
    //$(".btn-delete").click(deleteTask);

    //NEW WAY (Even delegation or dynamic pages)
    //On Click inside ".list" , if target is ".btn-delete", run deleteTask function
    $(".list").on("click", ".btn-delete", deleteTask);

}



window.onload = init; // Force that the HTML and the CSS gets resolved
// before that I run the logic