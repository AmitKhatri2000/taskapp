
  const taskdiv = document.querySelector('.taskdiv')
 const form = document.querySelector('form');
 window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || 
                         ( typeof window.performance != "undefined" && 
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});

//css

const input = document.querySelector('.search');
const label = document.querySelector('.slabel');
input.addEventListener('focusin' , ()=>{
label.classList.remove('hidden');
})
input.addEventListener('focusout' , ()=>{
  label.classList.add('hidden');
  })

//css


async function update(id , discription , completed ) {
  console.log(discription ,completed);
 await fetch(`/tasks/${id}` , {
method: 'PATCH',
body : JSON.stringify({discription , completed}),
headers: {'content-type':'application/json'}
  })
}



async function  gettasks(value) {
   try {
  const res = await fetch(`/tasks?completed=${value}`);
  const data = await res.json();
  if (data.length == 0) {
   return taskdiv.innerHTML = "   Soory no tasks found , Add some!"
  }
  taskdiv.innerHTML = "";
  data.forEach( task => {
    if (task.completed) {
      taskdiv.innerHTML += `
      <div class= "tasksubdiv">
      <label class="container">
      <input type="checkbox"  class= "checkbox" data-id="${task._id}" id="${task._id}" name="completed" checked>
      <span class="checkmark"></span> 
      </label>
      <P id="${task._id}p" class="paradis">${task.discription}</p>
      <div class= "editdiv hidden" id="${task._id}d">
      <label for="discription" >discription</label>
      <input  type="text"  name="discription" id="${task._id}i" >
      <button data-id="${task._id}" class="savebut">save</button>
      </div>  
      <button data-id="${task._id}" class="editbut"> edit </button>
      <button class="delbut"> <a href='/deltasks/${task._id}'>delete</a> </button>
      </div>` 
     
    } else {
      taskdiv.innerHTML += `
      <div class= "tasksubdiv">
      <label class="container">
      <input type="checkbox"  class= "checkbox" data-id="${task._id}" id="${task._id}" name="completed"  >
      <span class="checkmark"></span>
      </label>
      <P id="${task._id}p" class="paradis">${task.discription}</p>
      <div class= "editdiv hidden" id="${task._id}d">
      <label for="discription" >discription</label>
      <input  type="text"  name="discription" id="${task._id}i" >
      <button data-id="${task._id}" class="savebut">save</button>
      </div>  
      <button data-id="${task._id}" class="editbut"> edit </button>
      <button class="delbut"> <a href='/deltasks/${task._id}'>delete</a> </button>
      </div>` 
    }
   const editbuts = document.querySelectorAll('.editbut');
   const savebuts = document.querySelectorAll('.savebut');
      editbuts.forEach( editbut => {
      editbut.addEventListener('click' , (e)=>{
      var id = e.target.getAttribute('data-id')
      var editdiv = document.getElementById(`${id}d`);
      var paradis = document.getElementById(`${id}p`);
      editdiv.classList.toggle('hidden');
      paradis.classList.toggle('hidden')

     })
   });
   savebuts.forEach( savebut => {
   savebut.addEventListener('click', (e)=>{
    var id = e.target.getAttribute('data-id')
    var editdiv = document.getElementById(`${id}d`);
    var paradis = document.getElementById(`${id}p`);
    var value = document.getElementById(`${id}i`).value.trim();
    if (value) {
      paradis.innerHTML = value;
      editdiv.classList.toggle('hidden');
      paradis.classList.toggle('hidden');
      update(id , value , "");
    }
    
   })


   });

    const tasksubdivs = document.querySelectorAll('.tasksubdiv');
    tasksubdivs.forEach( div => {
      div.addEventListener('click' ,(e)=>{
        if (e.target.classList.contains("checkbox")) {
         var id = e.target.getAttribute('data-id')
         var checkbox = document.getElementById(id);
           if (checkbox.checked) {           
             update(id ,"",  true);     
            }
           
            else{
             update(id ,"", false);
            }
        }
            }) 
    });

 
})
} catch (error) {
  console.log(error);
}

}

gettasks();

// search js start here------

input.addEventListener('keyup' , ()=>{
  var value = input.value.trim();
  if (value) {
   var array = Array.from(taskdiv.children)
      array.forEach(div =>{
      Array.from(div.children).forEach(undiv => {
      if (undiv.tagName === 'P') {
        if (!(undiv.textContent.includes(value))) {
          div.classList.add('hidden')
         }
        else{
          div.classList.remove('hidden')
         }
        }
       })
      })
    }
 else{
  Array.from(taskdiv.children).forEach(div =>{
  div.classList.remove('hidden')
  })
 }
  
})

// search js end here------


form.addEventListener('submit' , async(e)=>{
 e.preventDefault();
const discription = form.discription.value.trim();
form.reset();
  try {
await fetch('/tasks' , {
method:'POST' ,
body : JSON.stringify({discription}),
headers: {'content-type':'application/json'}
  })
  gettasks();
}
 catch (error) {  
     console.log(error);
 }
})


async function myFunction() {
  var value = document.getElementById("mySelect").value;
  gettasks(value);
}