const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const auth_jwt = require('../../middlewares/auth.jwt');

const route = express.Router()

route.get('/', auth_jwt.verify_token, function(req, res) {
    const filtro_representante_legal = req.query.ruc || null
    controller.get_representante_legal( filtro_representante_legal )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 500) )
})

route.post('/', [auth_jwt.verify_token, auth_jwt.is_admin], function(req, res) {
    controller.add_representante_legal( req.body )
        .then( (data) => response.success(req, res, data, 201) )
        .catch( (error) => response.error(req, res, error, 500) )
})

route.patch('/', [auth_jwt.verify_token, auth_jwt.is_admin], function(req, res) {
    controller.add_empresa( req.body.id, req.body.empresaId )
        .then( (data) => 
            {
                const io = require('../../server.js')
                io.emit('empresaAdded', 'Una empresa ha sido añadida al representante_legal.')
                response.success(req, res, data, 200)
            })
        .catch( (error) => {
            console.log('ERROR:', error);
            response.error(req, res, error, 500) 
        })
})

route.delete('/', [auth_jwt.verify_token, auth_jwt.is_admin], function(req, res) {
    controller.delete_representante_legal( req.body.ruc )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 500) )
})

module.exports = route