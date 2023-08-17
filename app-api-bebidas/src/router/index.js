import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import FavoritoView from '../views/FavoritoView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'inicio',
      component: InicioView
    },
    {
      path:'/favoritos',
      name: 'favoritos',
      component: () => import('../views/FavoritoView.vue')
    }
  ]
})

export default router
