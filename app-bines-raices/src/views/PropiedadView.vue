<script setup>
    import { watch } from 'vue';
    import { useRoute } from  'vue-router'
    import { doc } from 'firebase/firestore'
    import { useDocument, useFirestore } from 'vuefire'
    import { priceProperty } from '@/helpers';

    import useLocationMap from '@/composables/useLocationMap'; // Composable para manejar ubicación en mapas
    import "leaflet/dist/leaflet.css"; // Estilos de Leaflet
    import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet"; // Componentes de Leaflet para Vue


    const { zoom, center } = useLocationMap()

    const route = useRoute()
    const db = useFirestore()
    const docRef = doc(db, 'propiedades', route.params.id)
    const propiedad = useDocument(docRef)


    watch(propiedad, (propiedad) => {
        center.value = propiedad.ubicacion
    })

</script>

<template>
    <v-card flat >
        <v-card-title class="mt-5 text-h4 text-center py-5 font-weight-bold">
            {{ propiedad?.titulo}}
        </v-card-title>
        <v-img :src="propiedad?.image" height="500" cover/>
        
        <v-card
            class="mx-auto"
            block
            flat
        >
            <v-card-item>
                <v-card-title class="py-5 font-weight-bold">Descripción General</v-card-title>
            </v-card-item>

            <v-card-text> 
                <p class="text-justify">{{ propiedad?.descripcion }}</p>
            </v-card-text>
        </v-card>
        

        <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row justify-content-between text-center">
            <v-card-text class="card-text">
                <v-icon size="26">mdi-currency-usd</v-icon> <!-- Icono para representar precio -->
                Precio:
                <span class="font-weight-bold">{{ priceProperty(propiedad?.precio) }}</span>
            </v-card-text>
            
            <v-card-text>
                <v-icon size="26">mdi-bathtub</v-icon> <!-- Icono para representar baños -->
                Baños:
                <span class="font-weight-bold">{{ propiedad?.wc }}</span>
            </v-card-text>

            <v-card-text>
                <v-icon size="26">mdi-car</v-icon> <!-- Icono para representar estacionamiento -->
                Estacionamiento:
                <span class="font-weight-bold">{{ propiedad?.estacionamiento }}</span>
            </v-card-text>

            <v-card-text>
                <v-icon size="26">mdi-door-closed</v-icon> <!-- Icono para representar habitaciones -->
                Habitaciones:
                <span class="font-weight-bold">{{ propiedad?.habitaciones }}</span>
            </v-card-text>
        </div>


        <div>
            <v-card-title class="py-5 font-weight-bold">Ubicación</v-card-title>

            <div style="height:300px; margin-bottom: 1.5rem;">
                <LMap 
                v-model:zoom="zoom" 
                :center="center" 
                :use-global-leaflet="false"
                >
                <LMarker
                    :lat-lng="center"
                >
                    <LPopup>{{ propiedad.titulo }}</LPopup>
                </LMarker>
                <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ></l-tile-layer>
                </LMap>
            </div>

        </div>
    </v-card>
</template>

