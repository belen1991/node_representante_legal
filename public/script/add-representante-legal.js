function obtener() {
    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // Indicar que se envían datos JSON
            }
        };

        fetch('/representante_legal', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

function guardar_representante(){
    let ruc_ = document.getElementById('ruc').value
    let cedula_ = document.getElementById('cedula').value
    let nombre_ = document.getElementById('nombre').value
    let apellido_ = document.getElementById('apellido').value
    let email_ = document.getElementById('email').value
    let domicilio_ = document.getElementById('domicilio').value
    let telefono_ = document.getElementById('telefono').value

    let data = { 
        ruc:ruc_, 
        nombre:nombre_, 
        cedula:cedula_,
        apellido: apellido_,
        email: email_,
        domicilio: domicilio_,
        telefono: telefono_ }

    return new Promise((resolve, reject) => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(data) // Convertir los datos a JSON
        };

        fetch('/representante_legal', request_options)
            .then((data) => resolve(data.json()))
            .catch((error) => reject(`[error]: ${error}`));
    })
}

function guardar() {
    guardar_representante()
        .then( (response) => {
            window.location.href = 'list-representante-legal.html';
        } )
        .catch( (error) => {
            alert('Error al ingresar.')
        } )
}

function cancelar(){
    window.location.href = 'list-representante-legal.html';
}