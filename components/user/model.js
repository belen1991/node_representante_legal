const mongoose = require('mongoose') 
const bcryptjs = require('bcryptjs') 
const Schema = mongoose.Schema

const rol_schema = new Schema({
    rol: {
        type: Schema.ObjectId,
        ref: 'rol',
    }
})

const userSchema = new Schema({
    username: { 
        type: String, 
        unique: true 
    },
    email: { 
        type: String, 
        unique: true },
    password: { 
        type: String, 
        required: true },
    roles: [rol_schema]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encrypted_password = (password) => {
    const salt = bcryptjs.genSaltSync()
    return bcryptjs.hashSync(password, salt)
}

userSchema.statics.compare_password = (password, received_password) => {
    return bcryptjs.compareSync(password, received_password)
}


const model = mongoose.model('user', userSchema)
module.exports = model