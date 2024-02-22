const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      {
        path:'/registrarUsuario',
        name:'registro',
        component: () => import('../pages/registrarUsuario.vue')
      },
      {
        path:'/editarUsuario/:id?',
        name: 'editar',
        component: () => import('../pages/editarUsuario.vue')
      },
      {
        path:'/informacion-docentes',
        name: 'docentes',
        component: () => import('../pages/docentes.vue')
      },
      {
        path:'/informacion-horarios',
        name: 'horarios',
        component: () => import('../pages/horarios.vue')
      },
      {
        path:'/login',
        name: 'login',
        component: () => import('../pages/login.vue')
      },

    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }

]


export default routes
