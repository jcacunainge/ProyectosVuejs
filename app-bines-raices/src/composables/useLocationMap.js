import { ref } from 'vue'

// Definición del módulo useLocationMap como una función
export default function useLocationMap() {
    // Creación de referencias reactivas para zoom y center del mapa
    const zoom = ref(16); // Referencia reactiva para el nivel de zoom, con valor inicial de 10
    const center = ref([10.872638, -74.772170]); // Referencia reactiva para el centro del mapa, con coordenadas iniciales
    
    // Función 'pin' para actualizar la posición del centro del mapa al colocar un marcador
    function pin(e) {
        const marker = e.target.getLatLng(); // Obtiene las coordenadas del marcador en el evento
        center.value = [marker.lat, marker.lng]; // Actualiza el centro del mapa con las nuevas coordenadas del marcador
    }

    // Retorna los datos y funciones que se pueden utilizar externamente
    return {
        zoom, // Propiedad reactiva del nivel de zoom
        center, // Propiedad reactiva del centro del mapa
        pin, // Función para actualizar el centro del mapa al colocar un marcador
    }
}
