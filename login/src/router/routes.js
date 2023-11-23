
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/login.vue') },
      { path: 'cadastro', component: () => import('pages/paginaCadastro.vue') },
      { path: 'buscaUsuario', component: () => import('pages/paginaBuscaUsuario.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
