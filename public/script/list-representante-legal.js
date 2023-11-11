
getRepresentantes()

function signout(){
    sessionStorage.setItem('token', "");
    window.location.href = 'index.html';
}

function getRepresentantes()
{
    const token = sessionStorage.getItem('token');
    if (!token || token=="") {
        alert('Debe estar logueado para revisar el listado de representantes legales');
        window.location.href = 'index.html';
      }
    fetch(`/representante_legal`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    })
    .then(response => response.json())
    .then(data => {
        const representantesList = document.getElementById('representantes-list');
        data.body.forEach(representante => {
            const representanteInfo = document.createElement('div');
            representanteInfo.innerHTML = `
                <strong>Nombre:</strong> ${representante.nombre} <br>
                <strong>Apellido:</strong> ${representante.apellido} <br>
                <strong>RUC:</strong> ${representante.ruc} <br>
                <strong>Cédula:</strong> ${representante.cedula} <br>
                <strong>Email:</strong> ${representante.email} <br>
                <strong>Domicilio:</strong> ${representante.domicilio} <br>
                <strong>Teléfono:</strong> ${representante.telefono} <br>
                <strong>Empresas:</strong> 
                ${representante.empresas.map(empresa => `${empresa.empresa} (Domicilio: ${empresa.domicilio}) <br>`).join(', ')} <br>
                <a href="#" class="add-empresa-link" data-representante-id="${representante.id}" data-representante-nombre="${representante.nombre} ${representante.apellido}">Agregar Empresa</a>
                <hr>
            `;
            representantesList.appendChild(representanteInfo);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
    .finally(() => {
        cargarPopup();
    });
}

function cargarPopup(){
    const addEmpresaLinks = document.querySelectorAll('.add-empresa-link');
    const empresaPopup = document.getElementById('empresa-popup');
    const closePopup = document.getElementById('close-popup');
    const empresaSelect = document.getElementById('empresa-select');
    const selectEmpresaForm = document.getElementById('select-empresa-form');
    const representanteIdInput = document.getElementById('representante-id-input');
    const representanteNombreInput = document.getElementById('representante-nombre-input');
    
    addEmpresaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const representanteId = link.getAttribute('data-representante-id');
            const representanteNombre = link.getAttribute('data-representante-nombre');
            representanteIdInput.value = representanteId;
            representanteNombreInput.textContent = representanteNombre;
            empresaPopup.style.display = 'block';
        });
    });

    closePopup.addEventListener('click', (e) => {
        e.preventDefault();
        empresaPopup.style.display = 'none';
        representanteNombreInput.textContent = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === empresaPopup) {
            empresaPopup.style.display = 'none';
        }
    });

    fetch('/empresa')
        .then(response => response.json())
        .then(data => {
            const empresaSelect = document.getElementById('empresa-select');
            data.body.forEach(empresa => {
                const option = document.createElement('option');
                option.value = empresa._id;
                option.textContent = empresa.nombre;
                empresaSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching empresa data:', error);
        });

    selectEmpresaForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const selectedEmpresa = document.getElementById('empresa-select').value;
        const representanteId = representanteIdInput.value;

        const data = {
            empresaId: selectedEmpresa,
            id: representanteId,
        };

        fetch(`/representante_legal`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('PATCH request successful:', data);
            })
            .catch(error => {
                console.error('Error sending PATCH request:', error);
            });
        const empresaPopup = document.getElementById('empresa-popup');
        empresaPopup.style.display = 'none';
    });
}