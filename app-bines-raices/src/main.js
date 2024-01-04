import './assets/main.css'

//Importar funciones y recursos de Vue y otras bibliotecas
import { createApp } from 'vue'
import { createPinia } from 'pinia'


// Vuetify: importar estilos y componentes
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Firebase: importar VueFire y configuración de Firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '../config/firebase'

// Importar componente principal, enrutador y estilos de iconos
import App from './App.vue'
import router from './router'
//Icons de material Desingicons
import '@mdi/font/css/materialdesignicons.css'


// Crear la instancia de la aplicación Vue
const app = createApp(App)

// Configuración de Vuetify
const vuetify = createVuetify({
    components,
    directives
})

// Integración de VueFire (Firebase) en la aplicación Vue
app.use(VueFire, {
    firebaseApp,
    modules: [ VueFireAuth() ]
})

// Uso de plugins y configuración adicional en la aplicación Vue
app.use(vuetify) // Uso de Vuetify como plugin
app.use(createPinia()) // Uso de Pinia como sistema de manejo de estado
app.use(router) // Uso del enrutador

// Montar la aplicación en el elemento del DOM con el ID 'app'
app.mount('#app')
