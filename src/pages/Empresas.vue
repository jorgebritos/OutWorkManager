<template>
  <q-page class="row justify-center">
    <q-input
      filled
      class="custom-input col-6"
      v-model="search"
      label="Busqueda"
    >
      <template v-slot:prepend>
        <q-btn flat round dense class="icono_de_busqueda" icon="search" />
      </template>
    </q-input>

    <div class="col-12 q-mt-xl row justify-center">
      <div class="q-mt-xl col-xs-12 col-md-8 row">
        <div class="col-xs-10 col-md-8 flex justify-evenly items-center alto_fila">
          <q-btn flat bordered @click="filter(null)">
            Todos
          </q-btn>
          <q-btn flat bordered @click="filter(true)">
            <q-avatar icon="mdi-check" class="bg-green text-white q-mr-md" :size="iconos"/>Validados
          </q-btn>
          <q-btn flat bordered @click="filter(false)">
            <q-avatar icon="mdi-close" class="bg-red text-white q-mr-md" :size="iconos"/>No Validados
          </q-btn>
        </div>
        <div class="col-xs-2 col-md-4 alto_fila flex justify-center">
          <q-btn flat bordered @click="enterpriseCreateMenu = true">
            <q-avatar icon="mdi-plus-circle-outline" class="icono"/>
          </q-btn>
          <create-empresa
            v-if="enterpriseCreateMenu"
            :show="enterpriseCreateMenu"
            @handleCloseCreateEnterprise="handleCloseEnterpriseCreateMenu"
          />
        </div>
      </div>
    </div>
    <!-- 
         <div class="coso  col-7 items-center">
          <q-btn flat bordered @click="filter(null)" class="q-mt-xl"> Todos </q-btn>
          <q-btn flat bordered @click="filter(true)">
            <q-avatar icon="mdi-check" class="bg-green text-white" />Validados
          </q-btn>
          <q-btn flat bordered @click="filter(false)">
            <q-avatar icon="mdi-close" class="bg-red text-white" />No Validados
          </q-btn>
        </div>

        <div>
          <q-btn flat bordered @click="enterpriseCreateMenu = true">
            <q-avatar icon="mdi-plus-circle-outline" />
          </q-btn>
          <create-empresa
            v-if="enterpriseCreateMenu"
            :show="enterpriseCreateMenu"
            @handleCloseCreateEnterprise="handleCloseEnterpriseCreateMenu"
          />
        </div>
     
   

    <div v-if="!isLoading" class="q-pa-md row justify-center">
      <div v-for="enterprise in enterprises" :key="enterprise.id">
        <div v-if="enterprise.name.toLowerCase().includes(search.toLowerCase())" class="q-mx-sm">
          <card-enterprise
            :enterprise="enterprise"
          />
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="text-center">loading ...</div>
        
        -->
  </q-page>
</template>

<script>
import CardEnterprise from "src/components/enterprises/CardEnterprise.vue";
import CreateEmpresa from "src/components/enterprises/CreateEnterprise.vue";
import { useEnterprises } from "src/hooks/api/enterprises.hooks";
import { computed, ref } from "vue";

export default {
  components: {
    CardEnterprise,
    CreateEmpresa,
  },
  setup() {
    
const iconos = computed(() => {
  const obtenerAnchoPantalla = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
  if (obtenerAnchoPantalla() < 536) {
    return "24px";
  } else {
    return "48px";
  }
});

    
    const { isLoading, enterprises, refetch } = useEnterprises();
    const search = ref("");
    let filter_tag = true;

    const filter = async (filter = null) => {
      refetch(filter);
      filter_tag = filter;
    };

    const enterpriseCreateMenu = ref(false);

    const handleCloseEnterpriseCreateMenu = () => {
      enterpriseCreateMenu.value = false;
      refetch(filter_tag);
    };

    return {
      isLoading,
      enterprises,
      search,
      enterpriseCreateMenu,
      filter,
      handleCloseEnterpriseCreateMenu,
      iconos
    };
  },
};
</script>
<style scoped>
.coso{
  background-color: brown;
}
.alto_fila{
   height: 70px;
  
}
.custom-input {
  height: 40px;
  position: absolute;
}
::v-deep(.main) {
  min-height: 0 !important;
}
.icono{
  color: #085d71;
}

</style>