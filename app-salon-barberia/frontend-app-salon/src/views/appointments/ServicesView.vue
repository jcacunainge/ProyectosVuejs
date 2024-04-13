<script setup>
    import Serviceitem from '@/components/Serviceitem.vue';
    import { useServicesStore } from '../../stores/services'
    const store = useServicesStore()

</script>
<template>
    <h2 class="text-4xl font-extrabold text-white mt-10">Servicios</h2>
    <p class="text-white text-lg mt-5"> A continuación elige almenos un servicio para tu cita</p>
    <div class="grid grid-cols-2 gap-5 mt-5">
    <Serviceitem
        v-for="service in store.services"
        :key="service._id"
        :service="service"
        class="service-item"
    />
</div>

</template>