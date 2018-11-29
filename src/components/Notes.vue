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

      <v-flex xs9>
        <p class="font-weight-bold display-2">Mes notes :</p>

        <v-layout align-space-around column v-for="note in notes" :key="note.note" class="item">
          <v-card>
            <v-flex >
              <v-layout row wrap>
                <v-flex xs3>
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
                    ></v-rating>
                  </div>
                </v-flex>
                <v-flex xs9>
                  <v-card-text class="com">{{note.commentaire}}</v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card>
        </v-layout>
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
      { title: "Rewards", icon: "question_answer", link: "/rewards" }
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