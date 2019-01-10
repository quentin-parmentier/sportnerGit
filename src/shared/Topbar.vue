<template>
  <div class="topbar">
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn flat>
        <v-toolbar-title>Sportners</v-toolbar-title>
      </v-btn>
      <v-flex xs12 sm6 md3 class="ml50">
        <v-text-field label="Solo" solo></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-divider vertical></v-divider>
        <v-btn flat>
          <v-icon>add_box</v-icon>
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat>
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat class="avatar">
          <v-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
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

          <v-list-tile v-for="item in items" :key="item.title" @click>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <router-link :to="item.link">
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </router-link>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<style scope>
.avatar {
  padding: 0px;
}
</style>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "Accueil", icon: "home", link: "/home" },
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
      user: { pseudo: "Robert" }
    };
  }
};
</script>