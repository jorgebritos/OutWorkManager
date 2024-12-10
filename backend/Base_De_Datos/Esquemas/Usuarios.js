import { bd, mongoose } from "../bd.js"
bd()
// Definir el esquema
const UsuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"],
        minlength: [6, "El nombre de usuario debe tener al menos 6 caracteres"],
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
    rol: {
        type: String,
        enum: ['prevencionista', 'guarda', 'empresa', 'usuario'], // Valores permitidos
        required: true, // Opcional: asegúrate de que el campo sea obligatorio
    },
    documentos: [
        {
            id: { type: BigInt },
            url: {
                type: String,
                required: true
            },
            titulo: {
                type: String,
                required: true
            },
            tipo: {
                type: String,
                required: true
            },
            vencimiento: { type: Date },
            es_valido: { type: Number },
        }
    ],
    mensajeria: {
        type: mongoose.Schema.Types.ObjectId, // Identificador de otra colección
        ref: 'Mensajeria', // Nombre del modelo al que hace referencia

    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId, // Identificador de otra colección
        ref: 'Empresas', // Nombre del modelo al que hace referencia

    },
}, { timestamps: true }); // Agrega createdAt y updatedAt automáticamente

// Crear el modelo
const Usuarios = mongoose.model('Usuarios', UsuarioSchema, "Usuarios");

export {
    Usuarios
}
