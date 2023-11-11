const model = require('./model')
const Role = require('../rol/model')
const storageRole = require('../rol/storage')

function get_user( filtro_user ) {
    let filtro = {}
    if (filtro_user) {
        filtro = { email: filtro_user }
    }
    const objeto = model.find( filtro )
    return objeto
}

async function add_user( user ) {
    const roles_found = await Role.find({ nombre: {$in: user.roles} })
    const objeto = new model({ 
        username: user.username, 
        email: user.email, 
        password: user.password, 
        roles: roles_found.map( (role) => role._id ) })
    objeto.password = await model.encrypted_password(user.password)
    objeto.save()
}

async function update_user( user ) {
    const objeto = await model.findOne( {email: user.email} )

    if ( objeto ) {
        objeto.username = user.username
        objeto.password = user.password
        objeto.roles = user.roles
    
        return resultado = await objeto.save()    
    } else {
        return null
    }
}

async function delete_user( email ) {
    return await model.deleteOne({email: email})
}

module.exports = {
    add: add_user,
    get: get_user,
    update: update_user,
    delete: delete_user,
}