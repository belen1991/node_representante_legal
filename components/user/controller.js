const storage = require('./storage')

function get_user( filtrouser ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( filtrouser ) )
    })
}

function add_user( user ) {
    return new Promise((resolve, reject) => {
        if (!user.username || !user.email || !user.password || !user.roles) {
            return reject('No hay datos suficientes.')
        }
        storage.add( user )
        resolve( user )        
    })
}

function update_user( user ) {
    return new Promise((resolve, reject) => {
        let resultado = storage.update( user )
        if (resultado) {
            return resolve( user )
        } else {
            return reject('No existe el user.')
        }
    })
}

function delete_user( email ) {
    return new Promise((resolve, reject) => {
        storage.delete( email )
        resolve( email )
    })
}

module.exports = {
    get_user,
    add_user,
    update_user,
    delete_user,
}