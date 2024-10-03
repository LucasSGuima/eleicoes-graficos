import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Vote from '../views/Vote.vue'

const routes = [
    { path: '/', component: Vote },
    { path: '/admin', component: Dashboard },
    { path: '/login', component: Login }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Guard para verificar o token antes de acessar as rotas
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.path === '/admin' && !token) {
      next('/login'); // Redireciona para a página de login se não houver token
    } else {
      next(); // Prossegue para a rota se houver token ou se a rota não for protegida
    }
  })

export default router