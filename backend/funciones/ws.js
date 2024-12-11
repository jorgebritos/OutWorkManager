const emitir_evento =(io,canal)=>{
    io.on("conectado",(id)=>{
        console.log("usuario conectado " + id)
    })
}

const desconectar_evento =(io)=>{

}

const escuchar_evento =(io)=>{

}

export{
    emitir_evento,
    desconectar_evento,
    escuchar_evento
}