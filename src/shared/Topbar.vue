<template>
  <div class="topbar">
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn flat to="/">
        <v-toolbar-title>Sportners</v-toolbar-title>
      </v-btn>


      <v-flex xs10 sm6 md3 class="ml50">

        <v-layout column class="mt15">

          <v-text-field v-model="searchbar" label="Sport, Ville, Heure" append-icon="search" class="toto" solo> </v-text-field>

          <v-flex xs1>
            <v-btn @click.stop="searchplus = !searchplus" class="buttonplus">
              <v-icon dark>{{iconsearch}}</v-icon> de critères
            </v-btn>
          </v-flex>


        </v-layout>

      </v-flex>

      <v-flex xs1 class="ml10">

        <v-btn @click="verification" :to="{ path: '/'}"> Recherche </v-btn>
        
      </v-flex>


      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-divider vertical></v-divider>
        <v-btn flat to="/create">
          <v-icon>add_box</v-icon>
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat to="/notifications">
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat class="avatar" to="/account">
          <v-avatar>
            <img v-bind:src="'https://randomuser.me/api/portraits/men/'+globaliduser+'.jpg'">
          </v-avatar>
        </v-btn>
        <v-divider vertical></v-divider>
      </v-toolbar-items>
    </v-toolbar>

    <v-layout wrap>
      <v-navigation-drawer v-model="drawer" temporary class="leftbar">
        <v-list class="pa-1">
          <v-list-tile avatar>

            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{user.pseudo}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>

          <v-list-tile v-for="item in items" :key="item.title" @click :to="item.link">

            <v-list-tile-action>
              
                <v-icon>{{ item.icon }}</v-icon>

            </v-list-tile-action>

            <v-list-tile-content>
              
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              
            </v-list-tile-content>

          </v-list-tile>

        </v-list>
      </v-navigation-drawer>
    </v-layout>

    <v-layout wrap>

      <v-navigation-drawer v-model="searchplus" class="searchplus" height="20%" width="2500">
        

        <v-layout row wrap class="mt15">

          <v-flex xs4 class="ml20">

            <v-combobox v-model="chips" :items="sports" label="Vos sports" chips clearable solo multiple class="topbarplus">

              <template slot="selection" slot-scope="data">

                <v-chip :selected="data.selected" close @input="remove(data.item)">

                  <strong>{{ data.item }}</strong>&nbsp;

                </v-chip>

              </template>

            </v-combobox>

          </v-flex>

          <v-flex xs3>
            <v-menu
              :close-on-content-click="false"
              v-model="menu2"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="datetop"
                label="Date de l'événement"
                prepend-icon="event"
                
                class="ml20"
              ></v-text-field>
              <v-date-picker first-day-of-week="1" v-model="datetop" @input="menu2 = false"></v-date-picker>
            </v-menu>

          </v-flex>

          <v-flex xs2 class="ml20">
            <v-text-field prepend-icon="access_time" label="Après :" v-model="choixheuremodel" type="time"></v-text-field>
          </v-flex>

        </v-layout>
        


      </v-navigation-drawer>

    </v-layout>

  </div>
</template>

<style>
  .avatar {
    padding: 0px;
  }

  .v-text-field.v-text-field--solo .v-input__control{

    min-height: 30px;
    margin-top: -10px;
  }
</style>

<script>



export default {
  data : vm => ({
      
      chips: [], //On récupère ça dans les likes
      choixheuremodel : "",
      searchbar : "",
      datetop: new Date().toISOString().substr(0, 10),

      sports: [
        "Accrobranche","Aerobic","Aéromodélisme","Aérostation","Agility","Aikido","Airsoft","Alpinisme","Apnée","Athlétisme","Aviation","Aviron","Badminton","Baseball","Basketball","Biathlon","Billard","BMX","Bobsleigh","Boccia","Bodyboard","Boomerang","Bowling","Boxe","Bridge","Canoë","Canoë-kayak","Canyonisme","Capoeira","Carrom","Catch","Chanbara","Cheerleading","Cirque","Claquettes","Combat","Course","Cricket","Croquet","Crosse","Crossfit","Curling","Cyclisme","Danse","Danse orientale","Deltaplane","Echecs","Equitation","Escalade","Escrime","Fitness","Flag","Fléchettes","Football","Footing","Funboard","Futsal","Giraviation","Golf","Gouren","Grappling","Gymnastique","Haltérophilie","Handball","Handisport","Hapkido","Hockey","Iaïdo","Jetski","Jodo","Jorkyball","Joutes","Ju-Jitsu","Judo","Karaté","Karting","Kempo","Kendo","Kenjutsu","Kitesurf","Kobudo","Krav-maga","Kyudo","Lancer du javelot","Lancer du marteau","Lancer du poids","Luge","Lutte","Marche","Monocycle","Moto","Motoneige","Mountainboard","Musculation","Naginata","Natation","Natation synchronisée","Ninjitsu","Nunchaku","Omnikin","Padel","Paintball","Pancrace","Parachutisme","Paramoteur","Parapente","Patinage","Pêche","Pentathlon","Pétanque","Peteca","Planche à voile","Plongée","Plongeon","Polo","Qi gong","Quad","Quilles","Rafting","Ragga","Raid","Rallye","Randonnée","Rock","Roller","Rugby","Salsa","Samba","Sambo","Sarbacane","Sauvetage","Skateboard","Skeleton","Ski","Snowboard","Softball","Spéléologie","Squash","Sumo","Surf","Taekwondo","Tambourin","Tango","Tennis","Tir","Tir à l'arc","Traîneaux","Trampoline","Triathlon","Trottinette","Tumbling","ULM","Ultimate","Ultimate fresbee","Varappe","Vélo","Voile","Volleyball","Voltige","VTT","Wakeboard","Waterpolo","Yoga"
      ],

      drawer: false,
      searchplus: false,
      iconsearch: 'add',
      items: [
        { title: "Accueil", icon: "home", link: "/" },
        { title: "Mon compte", icon: "account_box", link: "/account" },
        { title: "Créer un événement", icon: "add_box", link: "/create" },
        {
          title: "Mes événements",
          icon: "event_note",
          link: "/events/created"
        },
        {
          title: "Mes notifications",
          icon: "notifications",
          link: "/notifications"
        },
        { title: "About", icon: "question_answer", link: "/about" },
        { title: "Déconnexion", icon: "power_off", link: "/disconnect" }
      ],
      user: { pseudo: "Robert" },


      menu: false,
      modal: false,
      menu2: false
 
   
  }),

  methods: {

    remove (item) {


      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];


    },

    verification(){

      //console.log(this.$root.$data);
      //console.log(this.$root.$data);
      this.$root.$emit('Home') //like this

    }

  },

  mounted: function(){

    this.chips = this.$root.$data.choixsport;
    this.choixheuremodel = this.$root.$data.choixheuremodel;
    this.datetop = "";


  },

  updated: function(){

    this.$root.$data.choixheure = this.choixheuremodel;
    this.$root.$data.choixsport = this.chips;
    this.$root.$data.choixsearch = this.searchbar;
    this.$root.$data.choixdate = this.datetop;

  }


};
</script>