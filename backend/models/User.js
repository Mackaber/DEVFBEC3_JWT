const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            trim: true, 
            required: [true, "El nombre de usuario es obligatorio"],
            min: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
            unique: [true, "El nombre de usuario que elegiste ya está registrado"]
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
        },
    },
    { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = { User }