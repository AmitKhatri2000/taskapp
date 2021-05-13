
  window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || 
                         ( typeof window.performance != "undefined" && 
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});

const form = document.querySelector('form');
const errordiv = document.querySelector('.error-div');



 function errordisplay(error) {
    errordiv.innerHTML = "";
    errordiv.innerHTML += `<div>
    <i class="fa fa-times" aria-hidden="true"></i>
    <p> 
  ${error}
    </p>
  </div>`
}

function msgdisplay(msg) {
    errordiv.innerHTML = "";
    errordiv.innerHTML += `<div>
    <i class="fa fa-check" aria-hidden="true"></i>
    <p> 
  ${msg}
    </p>
  </div>`
}

async function getname() {
        var res = await fetch('/profile')
        var data = await res.json(); 
        form.username.value = data.username; 
}

getname();

   async function updateusers(username , password) {
   
        const res = await fetch('/update' , {
            method:'PATCH' ,
            body : JSON.stringify({username , password }),
            headers: {'content-type':'application/json'}
             })
            form.username.value = username;   

            var err = await res.json();  
            if (err.code === 11000) {
                errordisplay("this username has already been registered"); 
            }
   
}

async function passwordcheck(password) {
     const res = await fetch(`/profile?password=${password}`);
    if (res.status === 400) {
            throw new Error("unable to update because password didn't match");
    }
    return true;
    }


form.addEventListener('submit' , async(e)=>{
 e.preventDefault();
 const old_password = form.old_password.value.trim();
 const username = form.username.value.trim();
 const password = form.password.value.trim();
 form.reset();
 if (password) {
     if (old_password) {
     try {
     matched = await passwordcheck(old_password);
     if (matched) {
             updateusers(username , password);
             msgdisplay("successfully updated")
     }
     } catch (error) {
      errordisplay(error.message);
     }
    }
     else {
         errordisplay("please provide old password")
    }
       
 }
 else{
        updateusers(username , password);
        msgdisplay("username successfully updated")
 }
   
})

