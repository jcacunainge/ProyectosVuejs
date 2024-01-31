// Importar las dependencias necesarias
import mongoose from "mongoose";
import { uniqueId } from "../utils/index.js"; 
import bcrypt from 'bcrypt'; 

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    token: {
        type: String,
        default: () => uniqueId() 
    },
    verified: {
        type: Boolean,
        default: false 
    },
    admin: {
        type: Boolean,
        default: false 
    }
})

// Middleware (pre-hook) ejecutado antes de guardar un usuario en la base de datos
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { next(); }
    // Generar un salt (valor aleatorio) y cifrar la contraseña utilizando bcrypt
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); 
});

userSchema.methods.checkPassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;
