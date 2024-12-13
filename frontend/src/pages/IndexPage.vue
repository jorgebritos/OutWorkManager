<template>
  <q-page>
    <div class="ola q-mx-auto">
      <q-list bordered>
        <q-item>
          <q-item-section class="col-2"> 
            <q-item-label header>Nombre Empresa</q-item-label>
          </q-item-section>
          <q-item-section class="col-2"> 
            <q-item-label header>Trabajo a realizar</q-item-label>
          </q-item-section>
          <q-item-section class="col-2 text-center"> 
            <q-item-label header>Fecha</q-item-label>
          </q-item-section>
          <q-item-section class="col-1 text-center"> 
            <q-item-label header>Hora de Entrada</q-item-label>
          </q-item-section>
          <q-item-section class="col-1 text-center"> 
            <q-item-label header>Hora de Salida</q-item-label>
          </q-item-section>
          <q-item-section class="col-2 text-center"> 
            <q-item-label header>Confirmación-Entrada</q-item-label>
          </q-item-section>
          <q-item-section class="col-2 text-center"> 
            <q-item-label header>Confirmación-Salida</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-for="(actividad, index) in actividadesFiltradas" :key="index" :class="{'bg-grey-4': index % 2 === 0}">
          <q-item-section class="col-2"> 
            {{ actividad.nombre }} 
          </q-item-section>
          <q-item-section class="col-2"> 
            {{ actividad.trabajo }}
          </q-item-section>
          <q-item-section class="col-2 text-center"> 
            {{ actividad.fecha }}
          </q-item-section>
          <q-item-section class="col-1 text-center">
            {{ actividad.horaEntrada }}
            <q-btn v-if="!actividad.entradaConfirmada" color="green" @click="marcarHoraActualEntrada(index)" class="q-mx-md">Entro</q-btn>
            <q-btn v-if="actividad.entradaConfirmada && !actividad.salidaConfirmada" color="red" @click="resetearEntrada(index)" class="q-mx-md">Cancelar</q-btn>
          </q-item-section>
          <q-item-section class="col-1 text-center">
            {{ actividad.horaSalida }}
            <q-btn v-if="actividad.entradaConfirmada && !actividad.salidaConfirmada" color="green" @click="marcarHoraActualSalida(index)" class="q-mx-md">Salió</q-btn>
            <q-btn v-if="actividad.salidaConfirmada" color="red" @click="resetearSalida(index)" class="q-mx-md">Cancelar</q-btn>
          </q-item-section>
          <q-item-section class="col-2 text-center">
            <div v-if="actividad.entradaConfirmada" style="display: flex; align-items: center; justify-content: center;">
              Confirmado: {{ actividad.horaEntrada }} ({{ actividad.fechaEntradaConfirmada }})
            </div>
          </q-item-section>
          <q-item-section class="col-2 text-center">
            <div v-if="actividad.salidaConfirmada" style="display: flex; align-items: center; justify-content: center;">
              Confirmado: {{ actividad.horaSalida }} ({{ actividad.fechaSalidaConfirmada }})
            </div>
          </q-item-section>
        </q-item> 
      </q-list> 
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const actividades = ref([
  { 
    nombre: "Los Pinos", 
    trabajo: "Revisar sistema eléctrico", 
    horaEntrada: "8:00", 
    horaSalida: "17:00", 
    horaEntradaOriginal: "8:00", 
    horaSalidaOriginal: "17:00", 
    entradaConfirmada: false, 
    salidaConfirmada: false, 
    fecha: "2024-12-11", 
    fechaEntradaConfirmada: null, 
    fechaSalidaConfirmada: null, 
  },
  { 
    nombre: "El Roble", 
    trabajo: "Reparar sistema de agua", 
    horaEntrada: "9:00", 
    horaSalida: "18:00", 
    horaEntradaOriginal: "9:00", 
    horaSalidaOriginal: "18:00", 
    entradaConfirmada: false, 
    salidaConfirmada: false, 
    fecha: "2024-12-13", 
    fechaEntradaConfirmada: null, 
    fechaSalidaConfirmada: null, 
  },
]);

const actividadesFiltradas = computed(() => actividades.value);

function marcarHoraActualEntrada(index) {
  const ahora = new Date();
  actividades.value[index].horaEntrada = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  actividades.value[index].fechaEntradaConfirmada = ahora.toISOString().split('T')[0]; // Fecha actual
  actividades.value[index].entradaConfirmada = true;
}

function marcarHoraActualSalida(index) {
  const ahora = new Date();
  actividades.value[index].horaSalida = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  actividades.value[index].fechaSalidaConfirmada = ahora.toISOString().split('T')[0]; // Fecha actual
  actividades.value[index].salidaConfirmada = true;
}

function resetearEntrada(index) {
  actividades.value[index].horaEntrada = actividades.value[index].horaEntradaOriginal;
  actividades.value[index].fechaEntradaConfirmada = null;
  actividades.value[index].entradaConfirmada = false;
}

function resetearSalida(index) {
  actividades.value[index].horaSalida = actividades.value[index].horaSalidaOriginal;
  actividades.value[index].fechaSalidaConfirmada = null;
  actividades.value[index].salidaConfirmada = false;
}

function borrarActividadesFiltradas() {
  const hoy = new Date().toISOString().split('T')[0];
  actividades.value = actividades.value.filter(
    actividad => actividad.fecha >= hoy || actividad.entradaConfirmada
  );
}


onMounted(() => {
  borrarActividadesFiltradas();
});
</script>

<style scoped>
@media only screen and (max-width: 1022px) {
  .ola {
    overflow-x: scroll;
    width: 900px;
  }
}
</style>
