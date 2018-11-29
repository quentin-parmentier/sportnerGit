import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Topbar from './shared/Topbar.vue'
import About from './components/About.vue'


import Moncompte from './components/Moncompte.vue'
import Events from './components/Events.vue'
import Notes from './components/Notes.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Router)
Vue.use(VueAxios, axios)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {

      path: '/',
      name: 'home',

      components: {

        top : Topbar,
        body : Home

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

      path: '/home',
      name: 'home',

      components: {

        top : Topbar,
        body : Home

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

    }

  ]
})
