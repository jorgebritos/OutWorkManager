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
          <q-item-section class="col-1 text-center"> 
            <q-item-label header>Fecha de Entrada</q-item-label>
          </q-item-section>
          <q-item-section class="col-1 text-center"> 
            <q-item-label header>Fecha de Salida</q-item-label>
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
            {{ actividad.enterprise }} 
          </q-item-section>
          <q-item-section class="col-2"> 
            {{ actividad.description }}
          </q-item-section>
          <q-item-section class="col-1 text-center">
            {{ actividad.in_datetime }}
            <q-btn v-if="!actividad.in_datetime_confirm" color="green" @click="marcarHoraActualEntrada(index)" class="q-mx-md">Confirmar</q-btn>
          </q-item-section>
          <q-item-section class="col-1 text-center">
            {{ actividad.out_datetime }}
            <q-btn v-if="actividad.in_datetime_confirm && !actividad.out_datetime_confirm" color="green" @click="marcarHoraActualSalida(index)" class="q-mx-md">Salió</q-btn>
            <q-btn v-if="actividad.out_datetime_confirm" color="red" @click="resetearSalida(index)" class="q-mx-md">Cancelar</q-btn>
          </q-item-section>
          <q-item-section class="col-2 text-center">
            <div v-if="actividad.in_datetime_confirm">
              Confirmado: {{ actividad.confirm_in_datetime }}
              <q-btn color="red" @click="resetearEntrada(index)" class="q-mx-md">Cancelar Entrada</q-btn>
            </div>
          </q-item-section>
          <q-item-section class="col-2 text-center">
            <div v-if="actividad.out_datetime_confirm">
              Confirmado: {{ actividad.out_datetime }} 
            </div>
          </q-item-section>
        </q-item> 
      </q-list> 
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

export const getJobs = async () => {
  const isLoading = ref(true);
  const data = ref(null);

  await fetch("http://localhost:8000/api/v1/guard/")
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      isLoading.value = false;
      data.value = res.data;
    })
    .catch((err) => {
      console.error(err);
    });

  return { isLoading, data };
};


const actividadesFiltradas = computed(() => actividades.value);

function marcarHoraActualEntrada(index) {
  const ahora = new Date().toLocaleString();
  actividades.value[index].confirm_in_datetime = ahora;
  actividades.value[index].in_datetime_confirm = true;
}

function marcarHoraActualSalida(index) {
  const ahora = new Date().toLocaleString();
  actividades.value[index].out_datetime = ahora;
  actividades.value[index].out_datetime_confirm = true;
}

function resetearEntrada(index) {
  // Restablecer datos de entrada
  actividades.value[index].confirm_in_datetime = "";
  actividades.value[index].in_datetime_confirm = false;

  // Si la salida está confirmada, restablecer también la salida
  if (actividades.value[index].out_datetime_confirm) {
    actividades.value[index].out_datetime = "";
    actividades.value[index].out_datetime_confirm = false;
  }
}

function resetearSalida(index) {
  // Restablecer datos de salida
  actividades.value[index].out_datetime = "";
  actividades.value[index].out_datetime_confirm = false;
}
</script>

<style scoped>
@media only screen and (max-width: 1022px) {
  .ola {
    overflow-x: auto;
    width: 900px;
  }
}
</style>