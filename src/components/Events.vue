<!-- my events -->

<template>
  <div>
    <v-layout row wrap>
      <v-flex xs3 class="borderR">
        <div class="pt40 pl40 full-height fixed">
          <v-list-tile v-for="item in items" :key="item.title">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <router-link :to="item.link">
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </router-link>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-flex>

      <v-flex xs9 class="main_container">
        <v-flex lg8 md10 sm12 xs12 offset-lg1>
          <v-card flat tile color="transparent" class="section_header">
            <v-toolbar flat tile tabs class="account_toolbar">
              <v-toolbar-title class="v-toolbar-title">
                <p class="section_title">{{titlePage}}</p>
              </v-toolbar-title>

              <v-tabs v-model="active" right color="000" class="tabs">
                <!-- Clés -->
                <v-tab :key="0" ripple>En cours</v-tab>
                <v-tab :key="1" ripple>Historique</v-tab>
              </v-tabs>
            </v-toolbar>

            <!-- Gestion des En cours -->
            <v-tabs-items v-model="active">
              <v-tab-item :key="0">
                <v-flex>
                  <v-layout
                    align-space-around
                    column
                    v-for="event in events"
                    :key="event.id_event"
                    class="item_row"
                  >
                    <v-card height="100%">
                      <v-layout>
                        <!--<v-layout align-center>
                         Image de l'event -->
                        <v-flex xs4 fill-height class="event_image">
                          <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7" height="100%"></v-img>
                        </v-flex>
                        <!-- Informations Event -->
                        <v-flex xs4 fill-height>
                          <v-card-text class="event_infos_wrapper">
                            <p class="event_title">{{event.titre}}</p>
                            <p class="event_infos">le {{event.date}} à {{event.time}}</p>
                            <p class="event_description">{{event.description}}</p>
                          </v-card-text>
                        </v-flex>

                        <!-- BDD Event -->
                        <v-flex xs4 fill-height height="100%">
                          <v-card-text class="event_participate">
                            <p class="text-xs-right" align-top>{{event.nb_max}} Participants</p>

                            <!-- Boutons -->
                            <p class="text-xs-right buttons">

                                <v-btn :to="`/event/${event.id_event}`" small class="first_button">Voir
                                  <v-icon small>trending_flat</v-icon>
                                </v-btn>

                              <v-btn small @click="deleteevent(event.id_event)">
                                {{clears}}
                                <v-icon small>clear</v-icon>
                              </v-btn>
                            </p>
                          </v-card-text>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-layout>
                </v-flex>
              </v-tab-item>

              <!-- Gestion des Historiques-->
              <v-tab-item :key="1">
                <v-flex >
                  <v-layout
                    align-space-around
                    column
                    v-for="oldevent in oldevents"
                    :key="oldevent.id"
                    class="item_row"
                  >
                    <v-card height="100%">
                      <v-layout>
                        <!-- Image de l'event -->
                        <v-flex xs4 fill-height class="event_image">
                          <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7" height="100%"></v-img>
                        </v-flex>
                        <!-- Information sur l'event -->
                        <v-flex xs4 fill-height>
                          <v-card-text class="event_infos_wrapper">
                            <p class="event_title">{{oldevent.titre}}</p>
                            <p class="event_infos">le {{oldevent.date}} à {{oldevent.time}}</p>
                            <p class="event_description">{{oldevent.description}}</p>
                          </v-card-text>
                        </v-flex>

                        <!-- BDD event -->
                        <v-flex xs4>
                          <v-card-text class="event_participate">
                            <p class="text-xs-right">{{oldevent.nb_max}} Participants</p>
                            
                            <!-- Boutons -->
                            <p class="text-xs-right buttons">
                              <v-btn :to="`/event/${oldevent.id_event}`" small class="first_button">Voir
                                <v-icon small>trending_flat</v-icon>
                              </v-btn>
                            </p>
                          </v-card-text>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-layout>
                </v-flex>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>

<style scope>
p {
  margin: 0px;
}

.v-card__text {
  padding-bottom: 10px;
}

.account_toolbar {
  background-color: transparent;
  border-bottom: 1px solid #858585;
}
.account_toolbar div {
  padding: 0!important;
}
.account_toolbar .v-toolbar__content {
  background-color: transparent!important;
  margin-top: 2rem;
  height: 49px!important;
}

.v-toolbar-title {
  width: 100%;
}

.account_toolbar .v-tabs div {
  background-color: transparent;
}

.account_toolbar .v-tabs .v-tab {
  text-transform: none;
}
.account_toolbar .accent {
  background-color: #FB6B53!important;
}

.item-row:nth-child(1) {
  margin-top: 2rem;
}
.item_row {
  margin: 10px 0;
}
.event_infos_wrapper {
  padding: 1.5rem 1.2rem;

}
.event_image {
  padding: 1.5rem 1.2rem;
}
.event_title {
  font-size: 1.3rem;
  color: #636363;
}
.event_infos {
  color: #999999;
  margin: .7rem 0;
}
.event_participate {
  padding: 1.5rem 1.2rem 1.5rem 0;
}
.buttons {
  position: absolute;
  bottom: 1.5rem;
  right: 1rem;
}
.buttons .v-btn {
  color: #fff;
  border-radius: 5px;
  font-size: 12px;
  text-transform: none;
  background-color: #000000!important;
}
.buttons .first_button {
  background-color: #FB6B53!important;
  min-width: 0;
}
.buttons .v-btn .v-icon {
  margin-left: 5px;
}
</style>

<script>
import axios from "axios";

export default {

  data: vm => ({
    typeEvent: "",

    titlePage: "",

    clears: "",

    active: null,

    globaliduser: 0,

    items: [
      { title: "Modifier le profil", icon: "account_box", link: "/account" },
      { title: "Evénements créés", icon: "event", link: "/events/created" },
      {
        title: "Evénements rejoints",
        icon: "event_note",
        link: "/events/join"
      },
      { title: "Notes", icon: "star", link: "/notes" },
      { title: "Rewards", icon: "fa-medal", link: "/rewards" }
    ],

    events: [
      
    ],

    oldevents: [
      
    ]
  }),

  methods : {

    deleteevent($id){

      if (this.$route.params.id == "join") {

        axios.delete('http://api.test/api/leaveevent/'+$id , {

          params: {iduser: this.globaliduser}

        }).then(response => {

          console.log(response);
          this.titlePage = "Mes événements rejoints";
          this.typeEvent = "joined";
          this.clears = "Annuler";

          axios.get('http://api.test/api/joinedevents/'+this.globaliduser).then(response => {

            this.oldevents = response.data.passed;
            this.events = response.data.futur;

          });

        });

      } else if (this.$route.params.id == "created") {

        axios.delete('http://api.test/api/events/'+$id , {

          params: {iduser: this.globaliduser}}


          ).then(response => {

          console.log(response);

          this.titlePage = "Mes événements créés";
          this.typeEvent = "created";
          this.clears = "Supprimer";

          axios.get('http://api.test/api/myevents/'+this.globaliduser).then(response => {

              this.oldevents = response.data.passed;
              this.events = response.data.futur;
              console.log(response.data.futur);

          });

        });

      }

    }

  },

  mounted: function() {

    if(localStorage.globaliduser){
      this.globaliduser = localStorage.globaliduser;
    }

    if (this.$route.params.id == "join") {

      this.titlePage = "Mes événements rejoints";
      this.typeEvent = "joined";
      this.clears = "Annuler";

      axios.get('http://api.test/api/joinedevents/'+this.globaliduser).then(response => {

        this.oldevents = response.data.passed;
        this.events = response.data.futur;

      });

    } else if (this.$route.params.id == "created") {

      this.titlePage = "Mes événements créés";
      this.typeEvent = "created";
      this.clears = "Supprimer";

      axios.get('http://api.test/api/myevents/'+this.globaliduser).then(response => {

          this.oldevents = response.data.passed;
          this.events = response.data.futur;
          console.log(response.data.futur);
      });

    }

  }
};
</script>

