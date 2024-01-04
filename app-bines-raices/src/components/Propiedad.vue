<script setup>
defineProps({
    propiedad: {
        type: Object
    },
    price: {
        type: Function
    }

})

</script>
<template>
    <v-col
        cols="12"
        md="4"
    >
        <v-card border flat>
            <v-img :src="propiedad.image" height="250" cover/>
            <v-card-title class="font-weight-bold text-center">{{ propiedad.titulo }}</v-card-title>
            <v-card-text class="text-truncate">{{ propiedad.descripcion }}</v-card-text>
            <v-card-text class="text-h7"> Precio: {{ price(propiedad.precio) }}</v-card-text>
            <template v-slot:actions>
                <v-btn
                    block  
                    color="info"
                    variant="outlined" 
                    :to="{name: 'propiedad', params: { id: propiedad.id } }"                 
                >
                    Ver Información
                </v-btn>
            </template>
        </v-card>
    </v-col>
</template>