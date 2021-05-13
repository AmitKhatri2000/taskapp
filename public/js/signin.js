const form = document.querySelector('form');
const errordiv = document.querySelector('.error-div');


async function signusers(username , email , password) {
    
    const res = await fetch('/users' , {
method:'POST' ,
body : JSON.stringify({username , email , password }),
headers: {'content-type':'application/json'}

    })
if (res.status === 201) {
    location.assign('/task');
} else {
    errordiv.innerHTML = "";
    const error = await res.json();
    const es = Object.keys(error);
    es.forEach( e =>{
        errordiv.innerHTML += `<div>
        <i class="fa fa-times" aria-hidden="true"></i>
        <p> 
      ${error[e]}
        </p>
      </div>`

    })
  
}
   

}


form.addEventListener('submit' , async(e)=>{
 e.preventDefault();
 const username = form.username.value.trim();
 const email = form.email.value.trim();
 const password = form.password.value.trim();
 form.reset();
 
 
 signusers(username , email , password );

   
})

