<script setup>
   // Importación de módulos y utilidades necesarios
   import { useForm, useField } from 'vee-validate'; // Vee-Validate para validación de formularios
   import { collection, addDoc } from 'firebase/firestore'; // Firestore para interactuar con la base de datos
   import { useFirestore } from 'vuefire'; // Vuefire para la integración de Firestore con Vue
   import { useRouter } from 'vue-router'; // Vue Router para navegación
   import { validationSchema, imageSchema } from '@/validation/propiedadSchema'; // Esquemas de validación
   import useImage from '@/composables/useImage'; // Composable para manejar imágenes
   import useLocationMap from '@/composables/useLocationMap'; // Composable para manejar ubicación en mapas
   import "leaflet/dist/leaflet.css"; // Estilos de Leaflet
   import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"; // Componentes de Leaflet para Vue
   
   // Datos iniciales
   const items = [1, 2, 3, 4, 5]; // Array con valores del 1 al 5

   // Composables
   const { url, uploadImage, image } = useImage(); // Uso del composable para manejar imágenes
   const { zoom, center, pin } = useLocationMap(); // Uso del composable para manejar ubicación en mapas
   
   const router = useRouter(); // Instancia del enrutador de Vue Router
   const db = useFirestore(); // Instancia de Firestore

   // Configuración del formulario con Vee-Validate
   const { handleSubmit } = useForm({
      validationSchema: {
         ...validationSchema, // Schema de validación para los campos del formulario
         ...imageSchema, // Schema de validación para las imágenes
      }
   });

   // Instancias de campos del formulario utilizando Vee-Validate
   const titulo = useField('titulo'); // Campo 'titulo' del formulario
   const imagen = useField('imagen'); // Campo 'imagen' del formulario
   const precio = useField('precio'); // Campo 'precio' del formulario
   const habitaciones = useField('habitaciones'); // Campo 'habitaciones' del formulario
   const wc = useField('wc'); // Campo 'wc' del formulario
   const estacionamiento = useField('estacionamiento'); // Campo 'estacionamiento' del formulario
   const descripción = useField('descripcion'); // Campo 'descripcion' del formulario
   const alberca = useField('alberca', null, { // Campo 'alberca' del formulario con opciones personalizadas
      initialValue: false // Valor inicial por defecto es 'false'
   });

   // Función para manejar el envío del formulario
   const submit = handleSubmit(async (values) => {
      const { imagen, ...propiedad } = values; // Extrae la imagen del objeto 'values'
      const docRef = await addDoc(collection(db, 'propiedades'), { // Agrega un documento a la colección 'propiedades' en Firestore
         ...propiedad, // Añade los datos de la propiedad
         image: url.value, // Añade la URL de la imagen
         ubicacion: center.value // Añade la ubicación de la propiedad
      });
      if (docRef.id) { // Si se agregó correctamente el documento
         router.push({ name: 'admin-propiedades' }); // Redirige a la página de administración de propiedades
      }
   });
</script>

<template>
   <v-card max-width="800" flat class="mx-auto my-10">
      <v-card-title
         class="text-h4 font-weight-bold">
         Nueva vivienda en venta
      </v-card-title>
      <v-card-subtitle class="text-h6 ">
         Crea una nueva propiedad llenando el siguiente formulario
      </v-card-subtitle>

      <v-form class="mt-8">
         <v-text-field 
         class="mb-2"
         label="Título de la vivienda:"
         v-model="titulo.value.value"
         :error-messages="titulo.errorMessage.value"
         />
        
         <v-file-input
            accept="image/jpeg"
            label="Fotografia de la vivienda:"
            prepend-icon="mdi-camera" 
            class="mb-2"
            v-model="imagen.value.value"
            :error-messages="imagen.errorMessage.value"
            @change="uploadImage"
         />
         <div v-if="image" class="my-5">
            <p class="font-weight-bold">Imagen de la vivienda:</p>
            <img class="w-50" :src="image" alt="Imagen propiedad"/>
         </div>
         <v-text-field 
            class="mb-2"
            label="Precio de la vivienda:"
            v-model="precio.value.value"
            :error-messages="precio.errorMessage.value"
         />
         <v-row>
            <v-col
               cols="12"
               md="4">
                  <v-select
                  label="Número de habitaciones:"
                  class="mb-2"
                  :items="items"
                  v-model="habitaciones.value.value"
                  :error-messages="habitaciones.errorMessage.value"
               />
            </v-col>
            <v-col
               cols="12"
               md="4">
                  <v-select
                  label="Número de baños:"
                  class="mb-2"
                  :items="items"
                  v-model="wc.value.value"
                  :error-messages="wc.errorMessage.value"
               />
            </v-col>
            <v-col
               cols="12"
               md="4">
                  <v-select
                  label="Lugares de parqueadero:"
                  class="mb-2"
                  :items="items"
                  v-model="estacionamiento.value.value"
                  :error-messages="estacionamiento.errorMessage.value"
               />
            </v-col>
         </v-row>
         <v-textarea 
            class="mb-2" 
            label="Descripción"
            v-model="descripción.value.value"
            :error-messages="descripción.errorMessage.value"
         />
         <v-checkbox 
            label="Tiene Alberca"
            v-model="alberca.value.value"
         />

         <h2 class="font-weight-bold text-center my-5">Ubicación de la vivienda</h2>
         <div style="height:300px; margin-bottom: 1.5rem;">
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
               <l-tile-layer
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               ></l-tile-layer>
            </LMap>
         </div>
         
         <v-btn
            color="pink-accent-3"
            block
            @click="submit"
         >
            Agregar vivienda
         </v-btn>

      </v-form>
      
   </v-card>
</template>