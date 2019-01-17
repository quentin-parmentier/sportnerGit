<template>
  <div class="topbar">
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn flat to="/">
        <v-toolbar-title>Sportners</v-toolbar-title>
      </v-btn>


      <v-flex xs10 sm6 md3 class="ml50">
        <v-text-field label="Rechercher" append-icon="search" solo> </v-text-field>
      </v-flex>

      <v-flex xs1 class="ml10">
        <v-btn @click.stop="searchplus = !searchplus">
          <v-icon dark>{{iconsearch}}</v-icon> de critères
        </v-btn>
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
 
      </v-navigation-drawer>

    </v-layout>

  </div>
</template>

<style>
  .avatar {
    padding: 0px;
  }
</style>

<script>
export default {
  data() {
    return {
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
      user: { pseudo: "Robert" }
    };
  }
};
</script>