<script setup>
    // Importaciones de Vue y componentes necesarios
    import { ref } from 'vue';
    import VueTailwindDatepicker from 'vue-tailwind-datepicker'
    import SelectedService from '@/components/SelectedService.vue';
    import { formatCurrency } from '@/helpers';
    import { useAppointmentsStore } from '@/stores/appointments';

    // Uso del almacén de citas definido con Pinia
    const appointments = useAppointmentsStore()

    // Formateador para el componente VueTailwindDatepicker
    const formatter = ref({
        data: 'DD/MM/YYYY',
        month: 'MM'
    })

    // Función para deshabilitar fechas en el calendario
    const disableDate = (date) => {
        const today = new Date()
        return date < today || date.getMonth() > today.getMonth() || [0,6].includes(date.getDay() )
    }
</script>

<template>
    <!-- Encabezado -->
    <h2 class="text-3xl font-extrabold text-white">Detalles de Cita y Resumen</h2>
    <p class="text-white text-lg mt-5"> A continuación, verifica la información y confirma tu cita</p>

    <!-- Sección de Servicios -->
    <h3 class="text-2xl font-extrabold text-white">Servicios</h3>
    <p v-if="appointments.noServicesSelected" class="text-white text-2xl text-center">No hay servicios Seleccionados</p>
    <div v-else class="grip gap-5 space-y-6">
        <!-- Componente SelectedService para mostrar servicios seleccionados -->
        <SelectedService
            v-for="service in appointments.services"
            :key="service._id"
            :service="service"
        />
        <!-- Total a pagar -->
        <p class="text-right text-white text-2xl"> 
            <span class="font-black ">Total a pagar: {{ formatCurrency(appointments.totalAmount ) }}</span>
        </p>
    </div>

    <!-- Sección de Selección de fecha y hora -->
    <div class="space-y-8" v-if="!appointments.noServicesSelected">
        <h3 class="text-2xl font-extrabold text-white">Selección de fecha y hora:</h3>
        <div class="lg:flex gap-5 items-star">
            <!-- Calendario con VueTailwindDatepicker -->
            <div class="w-full lg:w-80 bg-white flex justify-center rounded-lg">
                <VueTailwindDatepicker
                    :disable-date="disableDate"
                    i18n="es-mx"
                    as-single
                    no-input
                    :formatter="formatter"
                    v-model="appointments.date"
                />
            </div>

            <!-- Botones para selección de hora -->
            <div v-if="appointments.isDateSelected" class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
                <button
                    v-for="hour in appointments.hours"
                        class="block text-blue-500 rounded text-xl font-black  ml-10 w-3/4"
                        :class="appointments.time === hour ? 'bg-blue-500 text-white' : 'bg-white' "
                        @click="appointments.time = hour"
                >
                    {{ hour }}
                </button>
            </div>
        </div>

        <!-- Botón para confirmar reservación -->
        <div class="flex justify-end">
            <button v-if="appointments.isValidReservation"
                class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white"
                @click="appointments.createAppointment"
            >
                Confirmar reservación
            </button>
        </div>
    </div>
</template>
