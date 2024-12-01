<template>
  <q-page>
    <q-toolbar class="titulo row items-center">
        <q-btn flat @click="ver_menu = !ver_menu" round dense icon="menu" color="white"/>
           <img
          src="src/assets/LogoCamcel.jpg"
          alt="Logo Camcel"
          width="287"
          height="65"
          class="q-ml-xl"
        />
    <div  class="botones">
    <Notificaciones2/>
    <chat/>
      <q-btn flat icon="person" color="white" class="q-mr-md">
          <q-menu>
            <q-list>
              <q-item clickable v-close-popup to="/Configuracion">
                <q-item-section>Configuracion</q-item-section>
              </q-item>
              <q-item clickable @click="handleLogout" v-close-popup>
                <q-item-section >Cerrar Sesion</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
    </div>    
    </q-toolbar>
     <q-drawer
      v-model="ver_menu"
      overlay
      :width="200"
      :breakpoint="500"
      bordered
     class="menu"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              clickable
              v-ripple
              class="text-white separador"
              :to="{ name: menuItem.href }"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" class="icono"/>
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator"  />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <slot/>
  </q-page>
 <!--<div class="q-pa-md">

    <q-header
      elevated
      :style="{padding: '0 20px', backgroundColor: '#085d71'}"
      class="row justify-between items-center titulo"
    >
      <div>
        <q-toolbar class="row items-center">
          <q-btn flat @click="ver_menu = !ver_menu" round dense icon="menu" />
           <img
          src="src/assets/LogoCamcel.jpg"
          alt="Logo Camcel"
          width="287"
          height="65"
          class="q-ml-xl"
        />
        </q-toolbar>
      </div>

   

     
      <div class="row">
        <Notificaciones2/>
        <chat/>
        <q-btn flat icon="person">
          <q-menu>
            <q-list>
              <q-item clickable v-close-popup to="/Configuracion">
                <q-item-section>Configuracion</q-item-section>
              </q-item>
              <q-item clickable @click="handleLogout" v-close-popup>
                <q-item-section >Cerrar Sesion</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-header>
    
   
    <q-page-container>
      <q-page class="q-mx-auto" style="max-width: 2000px;">
        <slot/>
      </q-page>
    </q-page-container>
  </div>-->
</template>

<script setup>
import { inject, ref } from "vue";
import Chat from 'src/components/Chat.vue'
import notificaciones from 'src/components/Notificaciones.vue' 
import Notificaciones2 from 'src/components/Notificaciones2.vue';
const ver_menu=inject("ver_menu")
const search = ref("");
const menuList = [
  {
    icon: "business_center",
    label: "Empresas",
    href: "enterprises",
    separator: false,
      },
      {
        icon: "mdi-account",
        label: "Usuarios",
        href: "users",
        separator: false,
      },
      {
        label: "His. trabajo",
        icon: "mdi-folder-multiple",
        href: "his.trabajo",
      },
     { label: "Trabajos", icon: "mdi-account-hard-hat", href: "trabajos" },
      {
        label: "Soporte",
        icon: "mdi-cog-outline",
        href: "soporte",
        separator: false,
      },
    ];

  

</script>
<style scoped>
/*
q-scrollarea__content absolute
q-scrollarea__container scroll relative-position fit hide-scrollbar
*/

.titulo{
  box-shadow: 1px 1px 1px rgb(73, 73, 73),2px 2px 2px rgb(245, 245, 245),
        3px 3px 3px rgb(255, 255, 255),4px 4px 2px rgb(217, 217, 217),5px 5px 2px rgb(15, 15, 15);
  background-color: #085d71;
}
.botones{
  position: absolute;
  right: 0;
}
::v-deep(aside){
  background-color: transparent !important;
  box-shadow: 1px 1px 1px rgb(73, 73, 73),2px 2px 2px rgb(245, 245, 245),
        3px 3px 3px rgb(101, 101, 101),4px 4px 2px rgb(217, 217, 217),5px 5px 2px rgb(15, 15, 15);
  margin-top: 65px;      
}
.q-scrollarea{
  background-color: rgba(8, 93, 113, .8) !important;
  
}
.icono{
  color: white;
}

.separador:hover::before{
  content: " ";
  position: absolute;
  bottom: 0;
  width: 80%;
  border-bottom:2px solid white;
  box-shadow: 1px 1px 3px white;
  animation: animar .5s;
}
@keyframes animar {
   from{
    width: 0;
   } 
   to{
    width: 80%;
   }
}
@media screen and (min-width: 0) and (max-width:600px) {
  ::v-deep(.botones){
    position: fixed;
    width: 100%;
    height: 64px;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: #085d71;
    display: flex;
    justify-content: center;
    align-items: center;
   
  }
  
}
/*
 .fit{
    background-color: transparent !important;
    
  }*/
</style>