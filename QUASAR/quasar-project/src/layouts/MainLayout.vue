<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar - CRUD
        </q-toolbar-title>

         <DarkModeToogle/> <!--Componentente DarkMode-->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Navegación
        </q-item-label>
        <DarkMode></DarkMode>

        <router-link v-for="link in essentialLinks" :key="link.title" :to="link.path">
          <EssentialLink v-bind="link" />
        </router-link>

        <q-list class="rounded-borders">
          <q-expansion-item expand-separator icon="auto_stories" label="Información Academica">
            <q-btn class="full-width" flat no-caps to="/informacion-docentes">
              <q-icon name="assignment" class="icon" style="margin-left: -53px;"></q-icon>
              <span class="label" style="margin-left: 31px; font-weight: normal;">Docentes por asignaturas</span>
            </q-btn>

            <q-btn class="full-width" flat no-caps to="/informacion-horarios">
              <q-icon name="schedule" class="icon" style="margin-left: -85px;"></q-icon>
              <span class="label" style="margin-left: 31px; font-weight: normal;">Horarios disponibles</span>
            </q-btn>
          </q-expansion-item>
        </q-list>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import DarkModeToogle from 'components/DarkMode.vue'

const linksList = [
  {
    title: 'Pagina principal',
    icon: 'home',
    path: '/'
  },
  {
    title: 'Login',
    icon: 'home',
    path: '/login'
  },
  {
    title: 'Registrar estudiante',
    icon: 'add',
    path: '/registrarUsuario'
  }

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    DarkModeToogle

  },

  setup() {
    const leftDrawerOpen = ref(false)


    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

    }
  }
})
</script>
