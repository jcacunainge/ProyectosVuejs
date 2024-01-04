import { computed } from 'vue'
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { uid } from 'uid' //Modulo para generar un id automatico y difierentes para cada imagen. 

// Definición del módulo useImage como una función
export default function useImage() {
    // Uso de Firebase Storage mediante vuefire
    const storage = useFirebaseStorage();
    
    // Creación de una referencia al almacenamiento con una ruta específica y un identificador único generado por 'uid'
    const storageRefPath = storageRef(storage, `/propiedades/${uid()}.jpg`);

    // Uso de la función useStorageFile para interactuar con el archivo en el almacenamiento
    const {
        url, // URL de la imagen almacenada
        upload // Función para subir un archivo al almacenamiento
    } = useStorageFile(storageRefPath);

    // Función para subir una imagen al almacenamiento cuando se selecciona un archivo
    function uploadImage(e) {
        const data = e.target.files[0]; // Obtiene el archivo seleccionado

        if (data) {
            upload(data); // Sube el archivo al almacenamiento
        }
    }

    // Creación de una propiedad reactiva 'image' que devuelve la URL de la imagen o null si no hay ninguna
    const image = computed(() => {
        return url.value ? url.value : null; // Devuelve la URL de la imagen si está disponible, de lo contrario, null
    });

    // Retorna las propiedades y funciones que se pueden utilizar externamente
    return {
        url, // Propiedad reactiva que contiene la URL de la imagen
        uploadImage, // Función para subir una imagen al almacenamiento
        image // Propiedad computada que contiene la URL de la imagen o null
    }
}
