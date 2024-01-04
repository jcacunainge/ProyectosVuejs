// Importar funciones y utilidades necesarias
import { computed, ref } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore' // Importa 'collection' de Firestore para acceder a una colección
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire' // Importa funciones de Vuefire para la integración de Firestore con Vue

// Definición del módulo usePropiedades
export default function usePropiedades() {
    const alberca = ref(false)
    const storage =  useFirebaseStorage()


    // Obtener la instancia de Firestore
    const db = useFirestore()
    // Obtener la colección 'propiedades' de Firestore
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    async function deleteItem(id, urlImage){
        if(confirm('¿Deseas eliminar esta propiedad?')){
            const docRef = doc(db, 'propiedades', id)
            const imageRef = storageRef(storage, urlImage)
            
            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])
        }
    } 

    const propiedadesFiltradas = computed(() => {
        return alberca.value ?
            propiedadesCollection.value.filter( propiedad => propiedad.alberca) :
            propiedadesCollection.value
    })
    // Retorna la colección de propiedades y la propiedad computada para el precio
    return {
        alberca,
        propiedadesFiltradas,
        propiedadesCollection, // Colección de propiedades desde Firestore
        deleteItem,
    }    
}
