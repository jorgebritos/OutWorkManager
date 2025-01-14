<template>
  <q-toolbar class="menu row items-center text-white q-py-sm">
    <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
    <img
      src="src/assets/LogoCamcel.jpg"
      alt="Logo Camcel"
      style="max-width: 200px"
      class="q-ml-xl"
    />
    <div class="menu_toolbar">
      <Notificaciones2 />
      <chat />
      <q-btn flat icon="person" class="q-mr-md">
        <q-menu>
          <q-list>
            <q-item clickable v-close-popup to="/account">
              <q-item-section>Tú cuenta</q-item-section>
            </q-item>
            <q-item clickable @click="handleLogout" v-close-popup>
              <q-item-section>Cerrar Sesion</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </q-toolbar>
  <q-drawer
    v-model="drawer"
    show-if-above
    :width="200"
    :breakpoint="800"
    bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
    <q-scroll-area class="fit">
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable v-ripple :to="{ name: menuItem.href }">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
  <q-page-container
    class="q-pt-md q-mx-auto q-px-md"
    style="max-width: 1500px; padding-bottom: 70px"
  >
    <slot />
  </q-page-container>
</template>
<script>
import { computed, ref } from "vue";
import Chat from "src/components/Chat.vue";
import notificaciones from "src/components/Notificaciones.vue";
import Notificaciones2 from "src/components/Notificaciones2.vue";
import { useUserStore } from "src/store/user.store";
import { useRouter } from "vue-router";

export default {
  components: {
    Chat,
    notificaciones,
    Notificaciones2,
  },
  setup() {
    const search = ref("");
    const router = useRouter();

    const userStore = useUserStore();
    const user = computed(() => userStore.getUser);

    const menuList = computed(() => {
      if (user.value.rol === "Admin") {
        return [
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
            label: "Trabajos",
            icon: "mdi-account-hard-hat",
            href: "jobs",
          },
          {
            label: "His. trabajo",
            icon: "mdi-folder-multiple",
            href: "his.jobs",
            separator: true,
          },
          {
            label: "Tú Cuenta",
            icon: "mdi-cog-outline",
            href: "user-config",
            separator: false,
          },
        ];
      } else {
        const menu = [
          {
            icon: "business_center",
            label: "Mi Empresa",
            href: "enterprise_home",
            separator: false,
          },
        ];

        if (user.value.enterprise) {
          menu.push({
            label: "Trabajos",
            icon: "business",
            href: "jobs-enterprise",
          });
        }

        menu.push({
          label: "Tú Cuenta",
          icon: "mdi-cog-outline",
          href: "user-config",
        });

        return menu;
      }
    });

    const handleLogout = () => {
      userStore.setAuth(false);
      router.push({ name: "login" });
    };

    return {
      drawer: ref(false),
      search,
      menuList,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.menu {
  position: sticky;
  top: 0;
  z-index: 10;

  background-color: #085d71;
}
.menu_toolbar {
  position: absolute;
  right: 0;
}
::v-deep(aside) {
  background-color: transparent !important;

  margin-top: 65px;
}

.separador:hover::before {
  content: " ";
  position: absolute;
  bottom: 0;
  width: 80%;
  animation: animar 0.5s;
}
@keyframes animar {
  from {
    width: 0;
  }
  to {
    width: 80%;
  }
}
@media screen and (min-width: 0) and (max-width: 600px) {
  ::v-deep(.menu_toolbar) {
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
</style>
