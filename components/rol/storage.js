const model = require('./model')

function get_rol( filtro_rol ) {
    let filtro = {}
    if (filtro_rol) {
        filtro = { nombre: filtro_rol }
    }
    const objeto = model.find( filtro )
    return objeto
}

function add_rol( rol ) {
    const objeto = new model( rol )
    objeto.save()
}

module.exports = {
    add: add_rol,
    get: get_rol
}