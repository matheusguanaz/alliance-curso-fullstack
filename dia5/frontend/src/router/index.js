import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/ativos',
    name: 'ativos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ativos" */ '../views/Ativos.vue')
  },
  {
    path: '/bicicletas',
    name: 'bicicletas',
    component: () => import(/* webpackChunkName: "bicicletas" */ '../views/Bicicletas.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router