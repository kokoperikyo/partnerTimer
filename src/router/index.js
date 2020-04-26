import Vue from 'vue'
import VueRouter from 'vue-router'
import First from '../components/pages/First.vue'
import Top from '../components/pages/Top.vue'
import Test from '../components/pages/Test.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'first',
    component: First,
  },
  {
    path: '/top',
    name: 'top',
    component: Top,
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router