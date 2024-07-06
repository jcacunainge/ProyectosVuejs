<script setup>

    import { formatCurrency } from '../helpers'
    import { useAppointmentsStore } from '../stores/appointments'

    const appointments = useAppointmentsStore()

    defineProps({
        service: {
            type: Object
        }
    })

</script>
<template>
    <div 
        class="p-4 space-y-1 rounded-lg cursor-pointer"
        :class="appointments.isServiceSelected(service._id) ? 'bg-blue-600 text-white' : 'bg-white'"
        @click="appointments.onServiceSelected(service)"
    >
        <p class="f">{{ service.name }}</p>
        <p class="font-light">{{ service.description }}</p>
        <p 
            class=" font-black"
            :class="appointments.isServiceSelected(service._id) ? 'text-white' : 'text-blue-600'"
        
        >{{ formatCurrency(service.price) }}</p>
    </div>
</template>