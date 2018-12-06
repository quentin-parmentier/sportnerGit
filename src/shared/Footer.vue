<template>
  <v-footer dark height="auto">
    <v-card flat tile class="indigo lighten-1 white--text text-xs-center flex">
      <v-card-text class="text-xs-center">
        <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        <a href="mailto:contact@sportners.com" class="white--text">contact@sportners.com</a>
        <br>Nancy, France
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="grey darken-3 white--text">
        &copy;2018 —<strong>&nbsp;Sportners&reg;</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["fab fa-facebook", "fab fa-twitter", "fab fa-instagram"]
  })
};
</script>