
const empresa = require('../components/empresa/interface')
const representante_legal = require('../components/representante_legal/interface')
const auth = require('../components/auth/controller')
const user = require('../components/user/interface')
const rol = require('../components/rol/interface')

const routes = function(server) {
    server.use('/empresa', empresa)
    server.use('/representante_legal', representante_legal)
    server.use('/user', user)
    server.use('/rol', rol)
    server.use('/signin', auth.sign_in)
}

module.exports = routes