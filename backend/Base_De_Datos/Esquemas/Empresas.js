import { bd, mongoose } from "../bd.js"
bd()

const Enterprise = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    rut: {
        type: String
    },
    slug: {
        type: String
    },
    imagen: {
        type: String
    },
    is_valid: {
        type: Boolean
    },
    id_encargado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios'
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
    trabajos: [
        {
            id: {
                type: BigInt,
                required: true
            },
            nombre: {
                type: String,
                required: true
            },
            conf_prev: { type: Boolean },
            conf_empresa: { type: Boolean },
            fechas: [
                {
                    fecha_entrada: { type: Date },
                    fecha_salida: { type: Date },
                    //solo se usa la hora, pero no existe un tipo de dato solo para la hora
                    hora_entrada: { type: Date },
                    hora_salida: { type: Date },
                    estado_entrada: { type: String },
                    estado_entrada: { type: String }
                }
            ],
            documentos: [
                {
                    id: {
                        type: BigInt,
                        required: true
                    },
                    idOperario: {
                        type: BigInt,
                        required: true
                    },
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
                    es_valido: { type: String },
                }
            ],
        },
    ]
}, { timestamps: true });
export default mongoose.model('Empresas', Enterprise, "Empresas");