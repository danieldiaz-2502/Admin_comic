
const userForm = document.querySelector('.authform')



userForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    if(userForm.email.value === "daniel@gmail.com" & userForm.password.value === "123456"){
        localStorage.setItem("stateUser", true)
        window.location.href="main.html"        
    }else{
        alert("incorrecto")
    }
    
        
        
    

    userForm.reset()

})