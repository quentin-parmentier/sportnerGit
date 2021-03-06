//Imports pour vue

import Vue from 'vue'
import Router from 'vue-router'

import axios from 'axios'
import VueAxios from 'vue-axios'

//Mes pages

  //Shared

import Topbar from './shared/Topbar.vue'
import Footer from './shared/Footer.vue'

  //Components

import Home from './components/Home.vue'
import CreateEvents from './components/CreateEvents.vue'
import Notifications from './components/Notification.vue'

import Event from './components/Event.vue'

import About from './components/About.vue'

  //Regroupement de mon compte
import Moncompte from './components/Moncompte.vue'
import User from './components/User.vue'
import Events from './components/Events.vue'
import Notes from './components/Notes.vue'
import Rewards from './components/Rewards.vue'

  //Connexion - inscription
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import LogOut from './components/LogOut.vue'


//Instanciations
Vue.use(Router)
Vue.use(VueAxios, axios)

//Mes routes
export default new Router({

  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {

      path: '/',
      name: 'home',

      components: {

        top : Topbar,
        body : Home,
        bottom : Footer

      }
    },
    {

      path: '/connexion',
      name: 'connexion',

      components: {

        top : Topbar,
        body : Home,
        bottom : Footer

      }

    },

    {

      path: '/create',
      name: 'createevents',

      components: {

        top : Topbar,
        body : CreateEvents,
        bottom : Footer

      }
    },

    {

      path: '/about',
      name: 'about',

      components: {

        top : Topbar,
        body : About,
        bottom : Footer

      }

    },

    {

      path: '/account',
      name: 'moncompte',

      components: {

        top : Topbar,
        body : Moncompte,
        bottom : Footer

      }
    },
    {

      path: '/user/:id',
      name: 'vuecompte',

      components: {

        top : Topbar,
        body : User,
        bottom : Footer

      }
    },
    {

      path: '/events/:id',
      name: 'events',

      components: {

        top : Topbar,
        body : Events,
        bottom : Footer

      }

    },
    {

      path: '/notes',
      name: 'notes',

      components: {

        top : Topbar,
        body : Notes,
        bottom : Footer

      }

    },
    {

      path: '/event/:id',
      name: 'event',

      components: {

        top : Topbar,
        body : Event

      }

    },
    {

      path: '/rewards',
      name: 'rewards',

      components: {

        top : Topbar,
        body : Rewards,
        bottom : Footer

      }
    },
    {

      path: '/signup',
      name: 'signup',

      components: {

        body : SignUp

      }
    },
    {

      path: '/signin',
      name: 'signin',

      components: {

        body : SignIn

      }
    },

    {

      path: '/disconnect',
      name: 'disconnect',

      components: {

        body : LogOut

      }
    },

    {
      path : '/notifications',
      name : 'notifications',

      components: {

        top : Topbar,
        body : Notifications,
        bottom : Footer

      }

    },

]
})
