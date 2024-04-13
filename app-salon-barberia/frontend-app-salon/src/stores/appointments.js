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

    onMounted(() => {
        const startHour = 10
        const endHour = 19
        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    // watch(date, async () => {
    //     const { data } = await AppointmentApi.getByDate(date.value)
    //     console.log(data)
    // })

    function clearAppointmentData(){
        services.value = [],
        date.value = '',
        time.value = ''
    }

    async function createAppointment() {
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
    const isServiceSelected = computed(() => {
        return (id) => services.value.some(service => service._id === id)
    })
    const noServicesSelected = computed(() => services.value.length === 0)

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })

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