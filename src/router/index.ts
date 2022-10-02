import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import SignIn from '../views/SignIn.vue'
import createEvent from '../views/CreateEvent.vue'
import Forgot from '../views/Forgot.vue'
import eventDetails from '../views/EventDetails.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signIn',
    name: 'sign in',
    component: SignIn
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: Forgot

  },
  {
    path: '/createEvent',
    name: 'create Event',
    component: createEvent
  },
  {
    path: '/event',
    name: 'event details',
    component: eventDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
