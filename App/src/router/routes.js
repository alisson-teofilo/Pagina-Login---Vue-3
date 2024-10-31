
const routes = [

  { path: '/', component: () => import('pages/login.vue') }, 
  { path: '/home', component: () => import('pages/home.vue') },
  { path: '/recuperar-senha', component: () => import ('pages/recuperar-senha.vue')}
]

export default routes
