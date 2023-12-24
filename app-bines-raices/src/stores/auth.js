//Para entender un poco más la funciones de firebase auth busca el archivo txt

import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia'; // Importa la función para definir una tienda con Pinia
import { useFirebaseAuth } from 'vuefire'; // Importa la utilidad para trabajar con la autenticación de Firebase
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'; // Importa funciones de Firebase para autenticación
import { useRouter } from 'vue-router'; // Importa el enrutador de Vue Router

// Define y exporta la tienda 'auth' usando Pinia
export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth(); // Obtiene la instancia de autenticación de Firebase
    const authUser = ref(null); // Referencia reactiva para almacenar información del usuario autenticado
    const router = useRouter(); // Obtiene la instancia del enrutador de Vue Router

    const errorMsg = ref(); // Referencia reactiva para almacenar mensajes de error
    const errorCodes = {
        'auth/invalid-credential': 'El correo o la contraseña son incorrectos',
        'auth/wrong-password': 'El password es incorrecto',
    }; // Objeto que contiene mensajes de error según el código de error de Firebase

    // Recuperar la sesión del usuario al cargar el componente
    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                authUser.value = user; // Almacena la información del usuario autenticado
            }
        });
    });

    // Función para iniciar sesión
    const login = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                authUser.value = user; // Almacena la información del usuario autenticado
                router.push({ name: 'admin-propiedades' }); // Redirige al usuario a la ruta 'admin-propiedades'
            })
            .catch(error => {
                console.log(error);
                errorMsg.value = errorCodes[error.code]; // Asigna el mensaje de error correspondiente al código de error
            });
    };

    // Función para cerrar sesión
    const logout = () => {
        signOut(auth)
            .then(() => {
                authUser.value = null; // Borra la información del usuario autenticado
                router.push({ name: 'login' }); // Redirige al usuario a la ruta 'login'
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Computed property para verificar si hay un mensaje de error
    const hasError = computed(() => {
        return errorMsg.value;
    });

    // Computed property para verificar si el usuario está autenticado
    const isAuth = computed(() => {
        return authUser.value;
    });

    // Retorna las funciones y propiedades que se pueden utilizar fuera de la tienda
    return {
        login,
        logout,
        hasError,
        errorMsg,
        isAuth,
    };
});

