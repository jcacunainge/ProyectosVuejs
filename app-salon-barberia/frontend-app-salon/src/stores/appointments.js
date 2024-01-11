import { ref, computed, onMounted} from 'vue'
import { defineStore } from 'pinia'
import { format } from 'date-fns'  // Importa la función format de date-fns para formatear fechas

export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([])       // Servicios seleccionados
    const date = ref('')           // Fecha seleccionada
    const hours = ref([])           // Horas disponibles
    const time = ref('')            // Hora seleccionada

    // Lógica ejecutada al montar el componente
    onMounted(() => {
        const startHour = 10
        const endHour = 19

        // Genera las horas disponibles en formato 'HH:00'
        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    // Función para crear una cita
    function createAppointment() {
        // Formatea la fecha a 'yyyy-MM-dd'
        const formattedDate = format(new Date(date.value), 'yyyy-MM-dd')

        // Objeto que representa la cita
        const appointments = {
            services: services.value.map(service => service._id),
            date: formattedDate,
            time: time.value,
            totalAmount: totalAmount.value
        }

        console.log(appointments)  // Imprime la cita en la consola
    }

    // Función para manejar la selección de servicios
    function onServiceSelected(service) {
        // Verifica si el servicio ya está seleccionado
        if (services.value.some(selectedService => selectedService._id === service._id)) {
            // Si ya está seleccionado, lo elimina de la lista de servicios
            services.value = services.value.filter(selectedService => selectedService._id !== service._id)
        } else {
            // Si no está seleccionado
            // Verifica si ya hay 3 servicios seleccionados (límite máximo)
            if (services.value.length === 3) {
                // Muestra una alerta indicando que se ha alcanzado el máximo de servicios por cita
                alert('Máximo 3 servicios por cita')
                return
            }
            // Agrega el servicio a la lista de servicios seleccionados
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

    // Retorna las variables y funciones para ser utilizadas en el componente que importa este almacén
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
        isValidReservation
    }

})