<template>
  <div>
    <v-layout row wrap>
      <v-flex xs3 class="borderR">
        <div class="pt40 pl40 full-height fixed">
          <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile-content>
              </v-list-tile>

        </div>
      </v-flex>

      <v-flex xs9>
      
        <p class="font-weight-bold display-2 titrepage">Mes notes :</p>

        <v-tabs v-model="active" centered>

              <!-- Clés -->

              <v-tab :key="0" ripple> Notes reçues </v-tab>

              <v-tab :key="1" ripple> Notes attribuées </v-tab>

              <!-- Gestion des En cours -->

              <v-tab-item :key="0">

                <v-flex xs8 offset-xs2>

                  <v-layout align-space-around column v-for="note in notesM" :key="note.id_notation" class="item">
                    <v-card>
                      <v-flex >
                        <v-layout row wrap>
                          <v-flex xs4>
                            <div class="text-xs-center">
                              <v-avatar class="avatar">
                                <router-link tag="img" v-bind:src="'https://randomuser.me/api/portraits/men/'+note.id_emetteur+'.jpg'" alt="${note.id_emetteur}" v-bind:to="'/user/' + note.id_emetteur"> </router-link>
                              </v-avatar>
                              <v-card-text class="profil">{{note.prenom}}</v-card-text>
                              <v-rating
                                half-increments
                                background-color="orange lighten-3"
                                color="orange"
                                v-model="note.id_notation"
                                readonly
                              ></v-rating>
                            </div>
                          </v-flex>
                          <v-flex xs8>
                            <v-card-text class="com">{{note.message}}</v-card-text>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-card>
                  </v-layout>

                </v-flex>
              
              </v-tab-item>

              <!-- Gestion des Historiques-->

              <v-tab-item :key="1">

                <v-flex xs8 offset-xs2>

                  <v-layout align-space-around column v-for="note in notesG" :key="note.id_notation" class="item">
                    <v-card>
                      <v-flex >
                        <v-layout row wrap>
                          <v-flex xs4>
                            <div class="text-xs-center">

                              <v-avatar class="avatar">
                                <router-link tag="img" v-bind:src="'https://randomuser.me/api/portraits/men/'+note.id_receveur+'.jpg'" alt="${note.id_receveur}" v-bind:to="'/user/' + note.id_receveur"> </router-link>
                              </v-avatar>
                              <v-card-text class="profil">{{note.prenom}}</v-card-text>
                              <v-rating
                                half-increments
                                background-color="orange lighten-3"
                                color="orange"
                                v-model="note.id_notation"
                                readonly
                              ></v-rating>
                            </div>
                          </v-flex>
                          <v-flex xs8>
                            <v-card-text class="com">{{note.message}}</v-card-text>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-card>
                  </v-layout>

                </v-flex>

              </v-tab-item>

        </v-tabs>

      </v-flex>

    </v-layout>
  </div>
</template>

<style scope>
.avatar {
  padding: 0px;
  margin-top: 20px;
}

.com {
  padding: 0px;
  margin-top: 40px;
}

.profil {
  padding: 0px;
}
</style>

<script>
import axios from "axios";

export default {
  data: vm => ({
    items: [
      { title: "Modifier le profil", icon: "account_box", link: "/account" },
      { title: "Evénements créés", icon: "event", link: "/events/created" },
      { title: "Evénements rejoints", icon: "event_note", link: "/events/join" },
      { title: "Notes", icon: "star", link: "/notes" },
      { title: "Rewards", icon: "fa-medal", link: "/rewards" }
    ],
    notesG: [],
    notesM: [],
    globaliduser : 0,

  }),

  mounted: function(){

    if(localStorage.globaliduser){
      this.globaliduser = localStorage.globaliduser;
    }

    axios.get('http://api.test/api/mynotes/'+this.globaliduser).then(response => {


      this.notesM = response.data.mynotes;
      console.log(response.data.giftnotes);
      this.notesG = response.data.giftnotes;

      console.log(this.noteG);
      //userspart = response.data.users;

    });

  }

};
</script>