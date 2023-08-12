<script setup>
    import { onMounted,ref } from 'vue';
    import axios from 'axios'
    import RouterLink from '../components/UI/RouterLink.vue';
    import Heading from '../components/UI/Heading.vue';

    const clientes = ref([])

    onMounted(() =>{
        axios('http://localhost:4000/clientes')
            .then(({data}) => clientes.value = data)
            .catch(error => console.log('Hubo un error'))

    })

    defineProps({
        titulo:{
            type: String
        }
    })
</script>
<template>
    <div>
        <div class="flex justify-end">
            <router-link to="agregar-cliente">Agregar Clientes</router-link>
        </div>
        <Heading>{{ titulo }}</Heading>
    </div> 
</template>
