<script setup>
   import { useForm, useField } from 'vee-validate';
   import { collection, addDoc } from 'firebase/firestore';
   import { useFirestore } from 'vuefire'

   import { validationSchema, imageSchema } from '@/validation/propiedadSchema'

   const items = [1,2,3,4,5]

   const db = useFirestore()

   const { handleSubmit } = useForm({
      validationSchema : {
         ...validationSchema,
         ...imageSchema
      }
   })

   const titulo = useField('titulo')
   const imagen = useField('imagen')
   const precio = useField('precio')
   const habitaciones = useField('habitaciones')
   const wc = useField('wc')
   const estacionamiento = useField('estacionamiento')
   const descripción = useField('descripcion')
   const alberca = useField('alberca')

   const submit = handleSubmit( async (values) => {
      const docRef = await addDoc(collection(db, 'propiedades'))
   })

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
         />

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
            ></v-textarea>
         <v-checkbox 
            label="Tiene Alberca"
            v-model="alberca.value.value"/>
         
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