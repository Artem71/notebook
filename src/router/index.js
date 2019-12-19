import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Create from '../views/Create.vue'
import Update from '../views/Update.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  },
  {
    path: '/update/:id',
    name: 'update',
    component: Update
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
