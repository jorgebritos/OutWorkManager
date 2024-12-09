const validar_campos = (usuario, correo, contra) => {
    const regex = /[<>]|script/i;
    const comprobar_usuario = regex.test(usuario) 
        ? "El usuario contiene caracteres inválidos o la palabra prohibida 'script'" 
        : true;
    const comprobar_correo = regex.test(correo) 
        ? "El correo contiene caracteres inválidos o la palabra prohibida 'script'" 
        : true;
    const comprobar_contra = regex.test(contra) 
        ? "La contraseña contiene caracteres inválidos o la palabra prohibida 'script'" 
        : true;

    return [comprobar_usuario, comprobar_correo, comprobar_contra];
};

const validar_usuario = (usuario) => {
    return usuario.length < 6 
        ? "El usuario debe tener al menos 6 caracteres" 
        : true;
};

const validar_correo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(correo) 
        ? "El correo electrónico no es válido" 
        : true;
};

const validar_contraseña = (contra) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w<>]).{6,}$/;
    return !regex.test(contra) 
        ? "Verifique la contraseña (debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial)"
        : true;
};

const validar_datos = (req, res, next) => {
    const { usuario, correo, contra } = req.body;

    const [comprobar_usuario, comprobar_correo, comprobar_contra] = validar_campos(usuario, correo, contra);
    const usuarioValido = validar_usuario(usuario);
    const correoValido = validar_correo(correo);
    const contraValida = validar_contraseña(contra);

    const errores = [
        comprobar_usuario !== true ? comprobar_usuario : null,
        comprobar_correo !== true ? comprobar_correo : null,
        comprobar_contra !== true ? comprobar_contra : null,
        usuarioValido !== true ? usuarioValido : null,
        correoValido !== true ? correoValido : null,
        contraValida !== true ? contraValida : null
    ].filter(Boolean); // Filtrar los errores nulos

    // Si hay errores, enviar la respuesta con los mensajes de error
    if (errores.length > 0) {
        return res.status(400).json({ mensaje: errores });
    }

    // Si no hay errores, continuar al siguiente middleware
    next();
};

export {
    validar_datos
};
