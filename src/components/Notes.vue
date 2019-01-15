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

                  <v-layout align-space-around column v-for="note in notes" :key="note.note" class="item">
                    <v-card>
                      <v-flex >
                        <v-layout row wrap>
                          <v-flex xs4>
                            <div class="text-xs-center">
                              <v-avatar class="avatar">
                                <img src="https://randomuser.me/api/portraits/men/85.jpg">
                              </v-avatar>
                              <v-card-text class="profil">{{note.profil}}</v-card-text>
                              <v-rating
                                half-increments
                                background-color="orange lighten-3"
                                color="orange"
                                v-model="note.note"
                                readonly
                              ></v-rating>
                            </div>
                          </v-flex>
                          <v-flex xs8>
                            <v-card-text class="com">{{note.commentaire}}</v-card-text>
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
                  <v-layout align-space-around column v-for="note in notes" :key="note.note" class="item">
                    <v-card>
                      <v-flex >
                        <v-layout row wrap>
                          <v-flex xs4>
                            <div class="text-xs-center">
                              <v-avatar class="avatar">
                                <img src="https://randomuser.me/api/portraits/men/85.jpg">
                              </v-avatar>
                              <v-card-text class="profil">{{note.profil}}</v-card-text>
                              <v-rating
                                half-increments
                                background-color="orange lighten-3"
                                color="orange"
                                v-model="note.note"
                                readonly
                              ></v-rating>
                            </div>
                          </v-flex>
                          <v-flex xs8>
                            <v-card-text class="com">{{note.commentaire}}</v-card-text>
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
      {
        title: "Evénements rejoints",
        icon: "event_note",
        link: "/events/join"
      },
      { title: "Notes", icon: "star", link: "/notes" },
      { title: "Rewards", icon: "fa-medal", link: "/rewards" }
    ],
    notes: [
      {
        note: "5",
        profil: "Julien",
        commentaire:
          "Contemnendos qui quodam fere arbitrantur in etiam Sunt quidam superiores qui amicitias sunt opere extollere nisi putant ipsi modo se."
      },
      {
        note: "3.5",
        profil: "Chloé",
        commentaire:
          "Contemnendos qui quodam fere arbitrantur in etiam Sunt quidam superiores qui amicitias sunt opere extollere nisi putant ipsi modo se."
      },
      {
        note: "1",
        profil: "Patrick",
        commentaire:
          "Praesertim quid a inter dissentias ille esse quid ob potest dissentias disputando reprehensiones reprehensiones ludus mihi in contentiones a illa se ut diceret solent vituperandae Quam probes Triari videri iracundiae quo dissentientium mihi dissentientium ut probarem a sunt ludus indignae a iracundiae in Epicureum esse pertinaces quo mihi reprehensiones tum."
      },
      {
        note: "4",
        profil: "Jean",
        commentaire:
          "Leges venerabilis frugi parens cervices parens et oppressas libertatis venerabilis."
      }
    ]
  })
};
</script>