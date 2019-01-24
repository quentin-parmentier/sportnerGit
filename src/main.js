import Vue from 'vue'

import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

import './styles/main.css'
import './styles/flexbox.css'

Vue.config.productionTip = false

//Infos users à définir à la connexion
Vue.prototype.globaliduser = 10;
Vue.prototype.globallatuser = 48.692054;
Vue.prototype.globalnguser = 6.184417;



//Class store
class TopStore {

  constructor() {

    this.state = {

      sport : [],
      heure : "",
      dateevent : "",
      search : "",
      
    }

  }

  set_sport(sports) {

    this.state.sport = sports;

  }


  set_heure(heure){

    this.state.heure = heure;

  }
}

var top_store = new TopStore();

new Vue({

	router,
	data: {

		choixsport : top_store.state.sport,
		choixheure : top_store.state.heure,
		choixsearch : top_store.state.search,
    choixdate : top_store.state.dateevent,

	},


	render: h => h(App)

}).$mount('#app')
