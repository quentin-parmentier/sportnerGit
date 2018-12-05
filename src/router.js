//Imports pour vue

import Vue from 'vue'
import Router from 'vue-router'

import axios from 'axios'
import VueAxios from 'vue-axios'

//Mes pages

  //Shared

import Topbar from './shared/Topbar.vue'

  //Components

import Home from './components/Home.vue'
import CreateEvents from './components/CreateEvents.vue'

import Event from './components/Event.vue'

import About from './components/About.vue'

  //Regroupement de mon compte
import Moncompte from './components/Moncompte.vue'
import Events from './components/Events.vue'
import Notes from './components/Notes.vue'
import Rewards from './components/Rewards.vue'


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
      name: 'connexion',

      components: {

        top : Topbar,
        body : Home

      }
    },
    {

      path: '/home',
      name: 'home',

      components: {

        top : Topbar,
        body : Home

      }

    },

    {

      path: '/create',
      name: 'createevents',

      components: {

        top : Topbar,
        body : CreateEvents

      }
    },

    {

      path: '/about',
      name: 'about',

      components: {

        top : Topbar,
        body : About

      }

    },

    {

      path: '/account',
      name: 'moncompte',

      components: {

        top : Topbar,
        body : Moncompte

      }
    },
    {

      path: '/events/:id',
      name: 'events',

      components: {

        top : Topbar,
        body : Events

      }

    },
    {

      path: '/notes',
      name: 'notes',

      components: {

        top : Topbar,
        body : Notes

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
        body : Rewards

      }

    },

]
})
