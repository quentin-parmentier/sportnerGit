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
      <v-flex xs9>
        <v-flex xs8 offset-sm1>
          <p class="font-weight-bold display-2 py-4">Mes Rewards :</p>
          <v-card class="mb-4">
            <v-container grid-list-xl fluid>
              <v-layout row wrap>
                <v-flex v-for="reward in rewards" :key="reward" xs4 class="reward_spacing">
                  <v-card flat tile class="d-flex" xs2>
                    <v-img
                      :src="`https://image.flaticon.com/icons/svg/1069/1069122.svg`"
                      aspect-ratio="1"
                      
                      
                    >
                      <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </v-img>
                  </v-card>
                  <div>
                    <h3 class="reward_title">{{ reward.title }}</h3>
                    <p class="reward_description">{{ reward.description }}</p>
                  </div>
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
.reward_spacing {
  padding-right: 40px!important;
  padding-left: 40px!important;
}
.reward_title {
  text-align: center;
  margin-top: 10px;
  font-size: 18px;
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
      { title: "Rewards", icon: "question_answer", link: "/rewards" }
    ],
    rewards: [
      {
        title: "Membre de la famille",
        description: "Inscris-toi sur Sportner"
      },
      { title: "Bébé créateur", description: "Créer un événement" },
      { title: "Créateur en herbe", description: "Créer 15 événements" },
      { title: "Super créateur", description: "Créer 50 événements" },
      { title: "Bébé rejoigniste", description: "Rejoindre un événement" },
      { title: "Rejoigniste en herbe", description: "Rejoindre 15 événement" },
      { title: "Super rejoigniste", description: "Rejoindre 50 événement" }
    ]
  })
};
</script>