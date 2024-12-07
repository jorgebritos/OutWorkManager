import { ref } from "vue"
export const validar = ()=>{
    const contraseña = ref('')
    const reglas_usuario = [
      (val) => (val && val.length > 6 ) || "Ingrese un nombre de al menos  6 caracteres",
              
    ]
    const reglas_correo = [
        (val) => (val && /.+@.+\..+/.test(val)) || "Correo inválido"
    ]
    
    const reglas_contra = [
        (val) => {
          contraseña.value = val; // Almacena el valor de la contraseña
          return (val && val.length >= 8) || "La contraseña debe tener al menos 8 caracteres"; // Verifica la longitud
        },
        (val) => (val && /[A-Z]/.test(val)) || "Debe incluir al menos una letra mayúscula",
        (val) => (val && /[a-z]/.test(val)) || "Debe incluir al menos una letra minúscula",
        (val) => (val && /\d/.test(val)) || "Debe incluir al menos un número",
        (val) => (val && /[!@#$%^&*(),.?":{}|<>]/.test(val)) || "Debe incluir al menos un carácter especial"
       
      ]
      const reglas_repetir_contra = [
        (val) => (val && val.length >= 8) || "La contraseña debe tener al menos 8 caracteres",
        (val) => (val && /[A-Z]/.test(val)) || "Debe incluir al menos una letra mayúscula",
        (val) => (val && /[a-z]/.test(val)) || "Debe incluir al menos una letra minúscula",
        (val) => (val && /\d/.test(val)) || "Debe incluir al menos un número",
        (val) => (val && /[!@#$%^&*(),.?":{}|<>]/.test(val)) || "Debe incluir al menos un carácter especial",
        (val) => (val === contraseña.value) || "Las contraseñas no coinciden" // Comparar con el campo de Contraseña
      ];
    const enviar_post =async (url,datos)=>{
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({datos}) // Convertir los datos a JSON
      })
      .then(response => response.json())
      .then(data => console.log(data))
    }    
    return{
        reglas_usuario,
        reglas_correo,
        reglas_contra,
        reglas_repetir_contra,
        enviar_post
    }
}
