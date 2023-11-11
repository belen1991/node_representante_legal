document.addEventListener('DOMContentLoaded', function () {

    function loguear_usuario() {
        let email_ = document.getElementById('email').value;
        let password_ = document.getElementById('password').value;

        let data = { 
            email: email_, 
            password: password_
        };

        return new Promise((resolve, reject) => {
            const request_options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
            };

            fetch('/signin', request_options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => reject(`[error]: ${error}`));
        });
    }

    function login() {
        loguear_usuario()
            .then(response => {
                if (response.token) {
                    sessionStorage.setItem('token', response.token);
                    console.log('Usuario logueado exitosamente.');
                    window.location.href = 'list-representante-legal.html';
                } else {
                    alert('No se ha recibido un token');
                }
            })
            .catch(error => {
                alert('Error al ingresar.');
            });
    }

    window.login = login;

    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
    });
});
