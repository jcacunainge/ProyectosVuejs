<script setup>
   import usePropiedades from '@/composables/usePropiedades';
   import { priceProperty } from '@/helpers/';

   const { propiedadesCollection, deleteItem} = usePropiedades()


</script>

<template>
   <h2 class="text-center text-h3 my-5 font-weight-bold">Panel Administrativo</h2> 

   <v-btn
   color="blue"
   variant="flat"
   :to="{name: 'nueva-propiedad'}"
   
   >Nueva Propiedad</v-btn>

   <v-card class="mx-auto mt-10" flat>
      <v-list>
         <v-list-item
            v-for="propiedad in propiedadesCollection"
            :key="propiedad.id"
            border
            class="mt-3"
            >

            <template v-slot:prepend>
               <v-list-item-media :start="true">
                  <img width="200" :src="propiedad.image" alt=""/>
               </v-list-item-media>
            </template>

            <v-list-item-title class="font-weight-bold">{{ propiedad.titulo }}</v-list-item-title>
            <v-list-item-subtitle> {{ priceProperty(propiedad.precio) }}</v-list-item-subtitle>

            <template v-slot:append>
               <v-btn
                  color="info"
                  variant="flat"
                  class="mr-3"
                  :to="{ name: 'editar-propiedad', params: { id: propiedad.id } }"
               >Editar
               </v-btn>
               <v-btn
                  color="red-darken-3"
                  variant="flat"
                  @click="deleteItem(propiedad.id, propiedad.image)"
               >Eliminar
               </v-btn>
            </template>
         </v-list-item>
      </v-list>
   </v-card>
</template>



