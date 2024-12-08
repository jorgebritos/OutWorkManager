import { bd ,mongoose } from "./bd.js"
bd()
// Definir el esquema
const UsuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"],
        minlength: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
        maxlength: [20, "El nombre de usuario no debe exceder los 20 caracteres"],
    },
    contra: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "El correo debe tener un formato válido",
        ],
    },
}, { timestamps: true }); // Agrega createdAt y updatedAt automáticamente

// Crear el modelo
const Usuario = mongoose.model('Usuario', UsuarioSchema);

export { 
    Usuario
}
