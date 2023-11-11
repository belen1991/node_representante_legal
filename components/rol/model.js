const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
    nombre: String
}, {
    versionKey: false
})

const model = mongoose.model('role', roleSchema)
module.exports = model