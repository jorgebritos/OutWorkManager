const axios = require("axios");
const { Op } = require("sequelize");
const { Usuarios } = require("../../Base_De_Datos/Esquemas/Usuarios.js");
import bcryptjs from "bcryptjs"

// const getUser = async (req, res) => {
//     const { name } = req.query;
//     let userTable = await Usuarios.findAll({
//         order: [['id', 'ASC']],
//     });
//     if (userTable.length > 1) return res.send(userTable);
//     if (userTable.length === 0) {
//         try {
//             let users = require("../JSON/users.json")
//             users = users.map((u) => {
//                 return {
//                     firstname: u.name['firstname'],
//                     lastname: u.name['lastname'],
//                     email: u.email,
//                     username: u.username,
//                     password: u.password,
//                     admin: u.admin ? u.admin : false
//                 };
//             });
//             await User.bulkCreate(users);

//             userTable = await User.findAll({
//                 order: [['id', 'ASC']],
//             });

//             return res.send(userTable);
//         } catch (error) {
//             res.status(404).send(error);
//         }
//     } else {
//         if (name) {
//             const specificUser = await Product.findAll({
//                 where: {
//                     name: { [Op.iLike]: `%${name}%` },
//                 },
//             });

//             if (specificUser.length > 0) return res.status(200).send(specificUser);

//             return res.status(404).send('No such User');
//         }
//     }
// }

// const getUserByID = async (req, res) => {
//     const selectedUser = await User.findOne({
//         where: {
//             id: req.params.id
//         },
//         include: [{
//             model: Product,
//             as: "favorites",
//             attributes: ["id", "name", "price", "image"],
//             through: {
//                 attributes: []
//             }
//         },
//         {
//             model: Product,
//             as: "cart",
//             attributes: ["id", "name", "price", "image"],
//             through: {
//                 attributes: []
//             }
//         }]
//     })
//     if (selectedUser) {
//         res.status(200).send(selectedUser)
//     } else {
//         res.sendStatus(404)
//     }
// }

// const putUser = async (req, res) => {
//     const selectedUser = await User.findOne({
//         where: {
//             id: req.params.id
//         }
//     });
//     if (selectedUser) {
//         let data = { ...req.body }

//         let keys = Object.keys(data);

//         keys.forEach(k => {
//             selectedUser[k] = data[k]
//         });

//         await selectedUser.save()

//         res.status(200)
//     } else {
//         res.status(404)
//     }
// }

const postUser = async (req, res) => {

    const encriptar_contra = (contra) => {
        const llave = process.env.llave
        const vueltas = bcryptjs.genSaltSync(11)
        const contra_con_llave = contra + llave
        const contraEncriptada = bcryptjs.hashSync(contra_con_llave, vueltas)

        return contraEncriptada
    }

    const datos = req.body
    let { usuario, contra, correo } = datos

    const existeCorreo = await Usuarios.findOne({ correo })
    if (!existeCorreo) {
        contra = encriptar_contra(contra)
        const datos = {
            usuario,
            contra,
            correo,
            rol: "usuario",

        }
        const agregar_usuario = new Usuarios(datos)
        agregar_usuario.save()
        res.status(200).json({ mensaje: "usuario guardado" })
    }
    else {
        res.status(400).json({ msg: "Correo ya existe" })
    }
}

// const deleteUser = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedUser = await User.findOne({
//             where: {
//                 id: req.params.id
//             }
//         })
//         if (!deletedUser) return 0;
//         await User.destroy({ where: { id: id } });

//         return res.status(200).json("User deleted");
//     }
//     catch (err) {
//         return res.status(500).send(`User could not be deleted (${err})`);
//     }
// }

module.exports = {
    getUser,
    getUserByID,
    putUser,
    postUser,
    deleteUser
}