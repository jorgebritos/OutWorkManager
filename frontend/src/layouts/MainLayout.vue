<template>
 <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" style="padding: 10px 10px;">
      <q-header
      elevated
      :style="{ padding: '0 20px', backgroundColor: '#085d71' }"
      class="row justify-between items-center"
    >
        <div>
             <q-toolbar class="row items-center">
        
          <div class="q-mx-auto" style="display: flex; justify-content: center">
            <img
              src="src/assets/LogoCamcel.jpg"
              alt="Logo Camcel"
              width="287"
              height="65"
            />
          </div>
        </q-toolbar>
        </div>
      </q-header>
    <q-page-container class="ola">
      <router-view />
    </q-page-container>
  </q-layout> 
  </div>
</template>
<style scoped>
.ola{
  margin: 0 !important;
  width: 100%;

}
  
</style>
<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
defineOptions({
  name: 'MainLayout'
})

</script>
