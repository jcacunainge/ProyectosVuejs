<script setup>
  // Importación de módulos y funciones necesarias
  import { watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useFirestore, useDocument } from 'vuefire'
  import { doc, updateDoc } from 'firebase/firestore'
  import { useField, useForm } from 'vee-validate'
  import "leaflet/dist/leaflet.css"; //Mapa
  import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
  import useImage from '@/composables/useImage' // Funciones para manejar imágenes
  import useLocationMap from '@/composables/useLocationMap' // Funciones para manejar ubicación en el mapa
  import { validationSchema } from '@/validation/propiedadSchema' // Esquema de validación

  // Array de elementos de ejemplo
  const items = [1, 2, 3, 4, 5]

  // Uso de funciones y variables de composable
  const { url, uploadImage, image } = useImage() // Funciones relacionadas con imágenes
  const { zoom, center, pin } = useLocationMap() // Funciones relacionadas con la ubicación en el mapa

  // Manejo del formulario y campos individuales
  const { handleSubmit } = useForm({ validationSchema }) // Configuración del formulario y su esquema de validación
  const titulo = useField('titulo') // Campo para el título
  const imagen = useField('imagen') // Campo para la imagen
  const precio = useField('precio') // Campo para el precio
  const habitaciones = useField('habitaciones') // Campo para las habitaciones
  const wc = useField('wc') // Campo para el número de baños
  const estacionamiento = useField('estacionamiento') // Campo para el estacionamiento
  const descripcion = useField('descripcion') // Campo para la descripción
  const alberca = useField('alberca') // Campo para la piscina

  // Variables para manejar la ruta actual y la navegación
  const route = useRoute()
  const router = useRouter()

  // Obtener la referencia al documento específico desde Firestore
  const db = useFirestore()
  const docRef = doc(db, 'propiedades', route.params.id) // Referencia al documento de una propiedad en Firestore
  const propiedad = useDocument(docRef) // Obtener y manejar la propiedad desde Firestore

  // Observador para la propiedad: actualiza los campos cuando cambia la propiedad en Firestore
  watch(propiedad, (propiedad) => {
    titulo.value.value = propiedad.titulo
    precio.value.value = propiedad.precio
    habitaciones.value.value = propiedad.habitaciones
    wc.value.value = propiedad.wc
    estacionamiento.value.value = propiedad.estacionamiento
    descripcion.value.value = propiedad.descripcion
    alberca.value.value = propiedad.alberca
    center.value = propiedad.ubicacion // Actualizar la ubicación en el mapa
  })

  // Función para manejar el envío del formulario
  const submit = handleSubmit(async values => {
    const { imagen, ...propiedad } = values // Extraer imagen y otras propiedades

    if (image.value) {
      // Lógica para manejar la imagen (no especificada en el código)
      const data = {
        ...propiedad,
        imagen: url.value,
        ubicacion: center.value // Agregar la ubicación al objeto de datos a actualizar en Firestore
      }
      await updateDoc(docRef, data) // Actualizar el documento en Firestore con los nuevos datos
    
   
   } else {
      const data = {
        ...propiedad,
        ubicacion: center.value // Agregar la ubicación al objeto de datos a actualizar en Firestore
      }
      await updateDoc(docRef, data) // Actualizar el documento en Firestore con los nuevos datos
    }
    router.push({ name: 'admin-propiedades' }) // Redirigir al usuario a una ruta específica después de procesar el formulario
  })
</script>

<template>
   <v-card max-width="800" flat class="mx-auto my-10">
      <v-card-title class="mt-5">
         <h1 class="text-h4 font-weight-bold">Editar Propiedad</h1>
      </v-card-title>
      <v-card-subtitle > 
         <p class="text-h5">Edita los detalles de la propiedad</p>
      </v-card-subtitle>

      <v-form class="mt-10">
         <v-text-field
            v-model="titulo.value.value"
            :error-messages="titulo.errorMessage.value"
            label="Titulo"
            class="mb-5"
         ></v-text-field>

         <v-file-input
            v-model="imagen.value.value"
            :error-messages="imagen.errorMessage.value"
            accept="image/jpeg"
            prepend-icon="mdi-camera"
            label="Fotografía"
            class="mb-5"
            @change="uploadImage"
         ></v-file-input>

         <div class="my-5">
            <img
               v-if="image"
               class="w-50"
               :src="image" 
            />
            <img 
               v-else
               class="w-50"
               :src="propiedad?.image" 
            />
         </div>

         <v-text-field
            v-model="precio.value.value"
            :error-messages="precio.errorMessage.value"
            label="Precio"
            class="mb-5"
         ></v-text-field>

         <v-row>
            <v-col
               cols="12"
               md="4"
            >
               <v-select 
                  label="Habitaciones"
                  class="mb-5"
                  :items="items"
                  v-model="habitaciones.value.value"
                  :error-messages="habitaciones.errorMessage.value"
               />
            </v-col>

            <v-col
               cols="12"
               md="4"
            >
               <v-select 
                  label="WC"
                  class="mb-5"
                  :items="items"
                  v-model="wc.value.value"
                  :error-messages="wc.errorMessage.value"
               />
            </v-col>

            <v-col
               cols="12"
               md="4"
            >
               <v-select 
                  label="Lugares Estacionamiento"
                  class="mb-5"
                  :items="items"
                  v-model="estacionamiento.value.value"
                  :error-messages="estacionamiento.errorMessage.value"
               />
            </v-col>
         </v-row>

         <v-textarea
            v-model="descripcion.value.value"
            :error-messages="descripcion.errorMessage.value"
            label="Descripción"
            class="mb-5"
         ></v-textarea>

         <v-checkbox 
            v-model="alberca.value.value"
            label="Alberca"
         ></v-checkbox>
         <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
         <div class="pb-10">
               <div style="height:400px">
                  <LMap 
                     v-model:zoom="zoom" 
                     :center="center" 
                     :use-global-leaflet="false" 
                  >
                     <LMarker
                           :lat-lng="center"
                           draggable
                           @moveend="pin"
                     />
                     <LTileLayer
                           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     ></LTileLayer>
                  </LMap>
               </div>
         </div>
         <v-btn
            color="pink-accent-3"
            block
            @click="submit"
         >
            Guardar Cambios
         </v-btn>
      </v-form>
   </v-card>
</template>