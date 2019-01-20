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

      <!-- Grid of rewards section -->
      <v-flex lg9 md10 xs12 class="main_container">
        <v-flex lg8 md10 sm12 xs12 offset-lg1>
          <v-card flat tile class="section_header">
            <v-layout justify-space-between align-center>
              <v-flex xs12 sm4>
                <p class="section_title">Récompenses</p>
              </v-flex>
              <v-flex xs12 sm5 class="tabs">
                <div>
                  <span class="active_tab">Toutes</span>
                  <span>Obtenues</span>
                  <span>Restantes</span>
                </div>
              </v-flex>
            </v-layout>
          </v-card>

          <v-card flat tile color="transparent" class="mb-4">
            <v-container grid-list-xl fluid class="pa-0">
              <v-layout row wrap>
                <v-flex
                  d-flex
                  v-for="reward in rewards"
                  :key="reward.id"
                  lg3
                  md4
                  sm6
                  xs12
                  class="reward_spacing"
                >
                  <v-card>
                    <v-card-title primary class="reward_image">
                      <v-img
                        :src="`https://image.flaticon.com/icons/svg/1069/1069122.svg`"
                        contain
                        aspect-ratio="1"
                      ></v-img>
                    </v-card-title>
                    <v-card-text class="pa-0">
                      <p class="reward_title">{{ reward.title }}</p>
                    </v-card-text>
                  </v-card>
                  <!--<div>
                    <h3 class="reward_title">{{ reward.title }}</h3>
                    <p class="reward_description">{{ reward.description }}</p>
                  </div>-->
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>

<style scope>
.section_header {
  background-color: transparent !important;
  color: #858585;
  margin: 2rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #a3a3a3 !important;
}
.section_title {
  color: #858585;
  font-size: 1.5rem;
  font-weight: bold;
}
.tabs {
  text-align: right;
}
.tabs span {
  margin: 0 1.2rem;
  color: #858585;
}
.tabs .active_tab {
  color: #fb6b53;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #fb6b53;
}

.reward_image {
  padding: 2rem 3rem 0 3rem;
}
.reward_title {
  color: #858585;
  text-align: center;
  padding: 1rem 2rem 2rem 2rem;
}
.reward_description {
  text-align: center;
}
</style>


<script>
import axios from "axios";

export default {
  data: vm => ({
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
    rewards: [
      {
        id: 0,
        title: "Membre de la famille",
        description: "Inscris-toi sur Sportner"
      },
      { 
        id: 1,
        title: "Créateur débutant",
        description: "Créer un événement"
      },
      { 
        id: 2,
        title: "Créateur en herbe",
        description: "Créer 15 événements"
      },
      { 
        id: 3,
        title: "Super créateur",
        description: "Créer 50 événements"
        },
      {
        id: 4,
        title: "Amateur d'événements",
        description: "Rejoindre un événement"
      },
      {
        id: 5,
        title: "Spécialiste des événements",
        description: "Rejoindre 15 événement"
      },
      {
        id: 6,
        title: "Expert en événements",
        description: "Rejoindre 50 événement"
      },
      {
        id: 7,
        title: "Amateur d'événements",
        description: "Rejoindre 50 événement"
      },
      {
        id: 8,
        title: "Amateur d'événements",
        description: "Rejoindre 50 événement"
      },
      {
        id: 9,
        title: "Amateur d'événements",
        description: "Rejoindre 50 événement"
      },
      {
        id: 10,
        title: "Amateur d'événements",
        description: "Rejoindre 50 événement"
      },
      {
        id: 11,
        title: "Amateur d'événements",
        description: "Rejoindre 50 événement"
      },
      {
        id: 12,
        title: "Amateur d'événements",
        description: "Rejoindre 50 événement"
      },
      {
        id: 13,
        title: "Amateur d'événements",
        description: "Rejoindre 50 événement"
      },
      {
        id: 14,
        title: "Amateur d'événements",
        description: "Rejoindre 50 événement"
      },
      {
        id: 15,
        title: "Amateur d'événements",
        description: "Rejoindre 50 événement"
      }
    ]
  })
};
</script>