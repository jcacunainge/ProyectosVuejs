// Importación de los módulos necesarios
import { createRouter, createWebHistory } from 'vue-router'; // Importa funcionalidades de Vue Router
import { onAuthStateChanged } from 'firebase/auth'; // Importa función de Firebase para escuchar cambios en la autenticación
import { useFirebaseAuth } from 'vuefire'; // Importa utilidad para trabajar con la autenticación de Firebase
import HomeView from '../views/HomeView.vue'; // Importa la vista principal de Home


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Define el historial basado en la URL
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true }, // Esta metadata indica que la ruta '/admin' requiere autenticación
      children: [
        {
          path: '/admin/propiedades',
          name: 'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/admin/nueva',
          name: 'nueva-propiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/admin/editar/:id',
          name: 'editar-propiedad',
          component: () => import('../views/admin/EditarPropiedadView.vue'),
          meta: { requiresAuth: true },
        },

      ]
    
    }

  ]
})
// Guardia de Navegación: Verificación de autenticación antes de cada cambio de ruta
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth); // Verifica si la ruta requiere autenticación
  if (requiresAuth) {
    // Si la ruta requiere autenticación, se comprueba la autenticación del usuario
    try {
      await authenticateUser(); // Intenta autenticar al usuario
      next(); // Continúa con la navegación si el usuario está autenticado
    } catch (error) {
      console.log(error); // Muestra un error en la consola si falla la autenticación
      next({ name: 'Login' }); // Redirige al usuario a la página de inicio de sesión (login)
    }
  } else {
    // Si la ruta no requiere autenticación, se permite el acceso directamente
    next(); // Continúa con la navegación
  }
});


// Función para autenticar al usuario
function authenticateUser() {
  const auth = useFirebaseAuth(); // Obtiene la instancia de autenticación de Firebase
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Detiene la escucha de cambios en la autenticación
      if (user) {
        resolve(user); // Resuelve la promesa si el usuario está autenticado
      } else {
        reject(); // Rechaza la promesa si el usuario no está autenticado
      }
    });
  });
}

export default router
