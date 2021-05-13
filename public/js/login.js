
const form = document.querySelector('form');
const errordiv = document.querySelector('.error-div');


async function logusers(username , password) {
    
        const res = await fetch('/users/login' , {
   method:'POST' ,
   body : JSON.stringify({username , password }),
   headers: {'content-type':'application/json'}
   
        })
    if (res.status === 200) {
        location.assign('/task');
    } else {
        errordiv.innerHTML = "";
        const data = await res.text();
        errordiv.innerHTML += `<div>
        <i class="fa fa-times" aria-hidden="true"></i>
        <p> 
      ${data}
        </p>
      </div>`

    }
       

    }



form.addEventListener('submit' , async(e)=>{
 e.preventDefault();

 const username = form.username.value.trim();
 const password = form.password.value.trim();
 form.reset();
 
 
    logusers(username , password);

   
})

