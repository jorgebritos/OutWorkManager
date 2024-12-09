import {bd, mongoose} from "./bd.js"
bd()

const EmpresasSchema = new mongoose.Schema({
    nombre: {
        type: String
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
            id: {type: BigInt},
            url: {type: String},
            titulo: {type: String},
            tipo: {type: String},
            vencimiento: {type: Date},
            es_valido: {type: String},
        }
    ],
    trabajos: [
        {
            id: {type: BigInt},
            nombre: {type: String},
            conf_prev: {type: Boolean},
            conf_empresa: {type: Boolean},
            fechas: [
                {
                    fecha_entrada: {type: Date},
                    fecha_salida: {type: Date},
                    //solo se usa la hora, pero no existe un tipo de dato solo para la hora
                    hora_entrada: {type: Time},
                    hora_salida: {type: Time},
                    estado_entrada: {type: String},
                    estado_entrada: {type: String}
                }
            ],
            documentos: [
                {
                    id: {type: BigInt},
                    idOperario: {type: BigInt},
                    url: {type: String},
                    titulo: {type: String},
                    tipo: {type: String},
                    vencimiento: {type: Date},
                    es_valido: {type: String},
                }
            ],
        },
    ]
}, {timestamps: true});

const Empresas = mongoose.model('Empresas', EmpresasSchema, "Empresas")

export {
    Empresas
}