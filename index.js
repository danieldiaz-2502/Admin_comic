
const userForm = document.querySelector('.authform')


userForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    if(userForm.email.value === "daniel@gmail.com" & userForm.password.value === "123456"){
        location.href = "index.html"
    }else{
        alert("incorrecto")
    }
    
        
        
    

    userForm.reset()

})