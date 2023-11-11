const storage = require('./storage')

function get_rol( filtrorol ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( filtrorol ) )
    })
}

function add_rol( rol ) {
    return new Promise((resolve, reject) => {
        if (!rol.nombre) {
            return reject('No hay datos suficientes.')
        }
        storage.add( rol )
        resolve( rol )        
    })
}

module.exports = {
    get_rol,
    add_rol
}