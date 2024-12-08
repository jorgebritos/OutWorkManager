<template>
 <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" style="padding: 10px 10px;">
      <q-header elevated style="padding: 0 20px;" class="row justify-between bg-teal-10">
        <div>
          <q-toolbar class="row items-center">
            <q-toolbar-title>Camcel-Guarda</q-toolbar-title>
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
