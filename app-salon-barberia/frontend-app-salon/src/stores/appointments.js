import { ref, computed, onMounted, inject, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { format } from 'date-fns'  // para formatear fechas
import AppointmentApi from '@/api/AppointmentApi'
// import { convertToISO } from '@/helpers/date'

export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')
    const toast = inject('toast')
    const router = useRouter()

    // Lógica ejecutada al montar el componente
    onMounted(() => {
        const startHour = 10
        const endHour = 19
        // Genera las horas disponibles en formato 'HH:00'
        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    watch(date, () => {
        // const { data } = await AppointmentApi.getByDate(date.value)
        console.log(date.value)
    })

    function clearAppointmentData(){
        services.value = [],
        date.value = '',
        time.value = ''
    }

    // Función para crear una cita
    async function createAppointment() {
        // const formattedDate = format(new Date(date.value), 'yyyy-MM-dd')
        const appointments = {
            services: services.value.map(service => service._id),
            date: date.value,
            time: time.value,
            totalAmount: totalAmount.value
        }
        
        try {
            const { data } = await AppointmentApi.create(appointments)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            clearAppointmentData()
            router.push({name:'my-appointments'})
        } catch (error) {
            console.log(error)
        }
    }
    

    // Función para manejar la selección de servicios
    function onServiceSelected(service) {
        if (services.value.some(selectedService => selectedService._id === service._id)) {
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        } else {
            if (services.value.length === 3) {
                alert('Máximo 3 servicios por cita')
                return
            }
            services.value.push(service)
        }
    }

    // Computed property para verificar si un servicio está seleccionado por su ID
    const isServiceSelected = computed(() => {
        return (id) => services.value.some(service => service._id === id)
    })

    // Computed property para verificar si no hay servicios seleccionados
    const noServicesSelected = computed(() => services.value.length === 0)

    // Computed property para calcular el monto total de los servicios seleccionados
    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })

    // Computed property para verificar si la reserva es válida
    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length
    })

    const isDateSelected = computed(() =>{
        return date.value ? true : false
    })

    return {
        services,
        date,
        hours,
        time,
        createAppointment,
        onServiceSelected,
        isServiceSelected,
        noServicesSelected,
        totalAmount,
        isValidReservation,
        isDateSelected
    }

})