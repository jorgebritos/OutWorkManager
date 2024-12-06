<template>
    <q-card class="fondo_azul col-xs-12 col-md-6 col-lg-5 row justify-center items-center">
            <q-card class="my-card col-sm-7 col-xs-10 col-md-11 col-lg-10 row">
                <q-card-section class="col-12 flex flex-center">
                    <q-avatar size="128px" font-size="100px"  class="avatar" text-color="white" icon="mdi-account-check-outline" />
                </q-card-section>
                <q-card-section class="col-12 row flex flex-center">
                    <q-input v-for="(entrada,index) in entradas"
                            :key="index"  
                            filled
                            v-model="entrada.valor"
                            :type="entrada.tipo"
                            :placeholder="entrada.placeholder"
                            class="col-9"
                            color="teal-9"
                            :rules="entrada.reglas"
                            
                            >
                    <template v-slot:before>
                        <q-icon :class="{animar: entrada.nombre ==='password' || entrada.nombre==='repetir_password'}" size="32px" :name="entrada.icono" v-if="entrada.estado" @click="cambiar_estado(entrada.nombre)"/>
                         <q-icon class="animar teal-9" name="mdi-lock-open-variant-outline" size="32px" @click="cambiar_estado(entrada.nombre)" v-if='!entrada.estado && entrada.nombre=="password" || !entrada.estado && entrada.nombre==="repetir_password"' />
                    </template>
                </q-input>
                </q-card-section>
                <q-card-section class="col-12 flex justify-center">
                    <q-btn label="Enviar" type="submit" class="boton_enviar q-mr-md" @click="enviar"/>
                    <q-btn :label="pagina" type="submit" class="boton_enviar" @click="enviar_registro"/>
                </q-card-section>
            </q-card>
        </q-card>
</template>
<script setup>
    import { inject, ref } from "vue"
    import { useRouter } from "vue-router"
    const router = useRouter()  
    const icono_login = ref("mdi-account-check-outline")
    
    const entradas = inject("entradas")
    const pagina = inject("pagina")
    const alto = inject("alto")
    const enviar = inject("enviar")
    const cambiar_estado = (nombre,estado) => {
    let entrada = entradas.find((e) => e.nombre === nombre)
        if(nombre==="password"){
            entrada.estado = !entrada.estado
            if(entrada.tipo==="password"){
                entrada.tipo="text"
            }
            else{
                entrada.tipo="password"
            }
        }
         if(nombre==="repetir_password"){
            entrada.estado = !entrada.estado
            if(entrada.tipo==="password"){
                entrada.tipo="text"
            }
            else{
                entrada.tipo="password"
            }
        }
  
    }

    const enviar_registro = () => {
        router.push(`/${pagina.value}`)
    }

   
</script>
<style scoped>
   
    .fondo_azul{
        height: 100vh;
        background-color: rgba(18, 68, 139, 0.5);
    }
    .my-card{
        max-width: 550px;
        max-height: 650px;
        height: v-bind(alto);
        backdrop-filter: blur(15px);
        background-color: rgba(255, 255, 255, 0.3);
        box-shadow: 3px 3px 5px rgba(151, 175, 209, 0.5);
        border-radius: 5% !important;
        box-shadow: 1px 1px 1px rgb(73, 73, 73),2px 2px 2px rgb(29, 98, 68),
        3px 3px 3px rgb(101, 101, 101),4px 4px 2px rgb(29, 98, 68),5px 5px 2px rgb(15, 15, 15) !important;
    }
    .animar:hover{
  animation: animar .5s;
  transform: scale(1.1);
 color: rgb(8, 93,112);
}
@keyframes animar {
  from{
    transform: scale(1);
    
  }
  to{
    transform: scale(1.1);
    
  }
}
.boton_enviar{
    width: 40%;
    background-color: rgb(8, 93,112);
    color: white;
    box-shadow: 1px 1px 1px rgb(73, 73, 73),2px 2px 2px rgb(255, 255, 255),
    3px 3px 3px rgb(101, 101, 101),4px 4px 2px rgb(255, 255, 255),5px 5px 2px rgb(15, 15, 15);
    height: 40px; 
    font-weight: bold;
    font-size: 1rem;
}
.boton_enviar:hover{
    transition: .5s;
    background-color: rgb(8, 93,112);
    color: white;
    
}
.q-field__messages col{
    color: white;
}
.botones{
  background-color: rgb(8, 93,112);
}
.avatar{
    background-color: rgb(8, 93,112);
}
</style>