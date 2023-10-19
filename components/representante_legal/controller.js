const storage = require('./storage')

function get_representante_legal( filtro_representante_legal ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( filtro_representante_legal ) )
    })
}

function add_representante_legal( representante_legal ) {
    return new Promise((resolve, reject) => {
        if (!representante_legal.ruc) {
            return reject('No hay datos suficientes.')
        }
        storage.add( representante_legal )
        resolve( representante_legal )        
    })
}

function update_representante_legal( representante_legal ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.update( representante_legal )
        if (resultado) {
            return resolve( representante_legal )
        } else {
            return reject('No existe el representante_legal.')
        }
    })
}

function add_empresa( id, empresaId ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.addEmpresa( id, empresaId )
        if (resultado) {
            return resolve( resultado )
        } else {
            return reject('No existe el representante_legal.')
        }
    })
}

function delete_representante_legal( ruc ) {
    return new Promise((resolve, reject) => {
        storage.delete( ruc )
        resolve( ruc )
    })
}

module.exports = {
    get_representante_legal,
    add_representante_legal,
    update_representante_legal,
    add_empresa,
    delete_representante_legal
}