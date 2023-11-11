
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    confirmPasswordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        confirmPasswordInput.setCustomValidity("Passwords do not match");
    } else {
        confirmPasswordInput.setCustomValidity("");
    }
    });
});

function registrar_usuario(){
    
    let username_ = document.getElementById('username').value
    let email_ = document.getElementById('email').value
    let password_ = document.getElementById('password').value

    let data = { 
        email:email_, 
        username:username_, 
        password:password_,
        roles:['admin']
    }

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        };

        fetch('/user', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

function registrar() {
    registrar_usuario()
        .then( (response) => {
            alert('Usuario registrado exitosamente.')
            window.location.href = 'index.html';
        } )
        .catch( (error) => {
            alert('Error al ingresar.')
        } )    
}

function cancelar(){
    window.location.href = 'index.html';
}