<template>
  <div>
    <v-alert
    :value="alertN"
    type="error"
    transition="scale-transition"
    class="alerte"
    >

      {{alerte}}

    </v-alert>
    <v-layout justify-center>
      <!--  -->
      <v-flex xs12 lg7>
        <v-card class="card_container">
          <v-container fluid grid-list-lg fill-height>
            <v-layout row wrap fill-height>
              <v-flex lg5 class="pa-0">
                <v-card class="form_presentation white--text" height="100%">
                  <v-card-title>
                    <div class="content">
                      <div class="headline">Inscription</div>
                      <p>Bienvenue sur Sportner.</p>
                      <p>Trouvez rapidement et</p>
                      <p>facilement des gens avec qui</p>
                      <p>faire du sport autour de</P>
                      <p>chez vous.</p>
                      <a href="/signIn"><span>Déjà inscrit ? Connectez-vous</span></a>
                      
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>

              <v-flex lg7 class="pa-0">
                <v-card class="form_card" height="100%">
                  <v-form v-model="form.valid" lazy-validation class="pa-5">
                    <!--<v-text-field v-model="form.user.pseudo" :rules="nameRules" label="Pseudo" required></v-text-field>
                    <v-text-field v-model="form.user.email" :rules="emailRules" label="E-mail" required></v-text-field>-->
                    <v-text-field v-model="form.user.pseudo" label="Pseudo" :rules="form.rules.pseudoRules" required></v-text-field>
                    <v-text-field v-model="form.user.mail" label="E-mail" required></v-text-field>
                    <v-text-field
                      v-model="form.user.password"
                      label="Mot de passe"
                      min="6"
                      :rules="form.rules.passwordRules"
                      :append-icon="form.isPasswordVisible ? 'visibility' : 'visibility_off'"
                      @click:append="() => (form.isPasswordVisible = !form.isPasswordVisible)"
                      :type="form.isPasswordVisible ? 'text' : 'password'"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="form.user.passwordConfirm"
                      label="Confirmation"
                      :rules="form.rules.passwordConfirmRules"
                      :append-icon="form.isPassConfirmVisible ? 'visibility' : 'visibility_off'"
                      @click:append="() => (form.isPassConfirmVisible = !form.isPassConfirmVisible)"
                      :type="form.isPassConfirmVisible ? 'text' : 'password'"
                      required
                    ></v-text-field>
                    <!--<v-checkbox label="Je souhaite recevoir des offres des partenaires de Sportner"></v-checkbox>
                    <v-checkbox
                      :rules="[v => !!v || 'Vous devez accetper les conditions générales avant de continuer']"
                      label="J'ai lu et j'accepte les conditions générales d'utilisation"
                      required
                    ></v-checkbox>-->

                    <div class="submit_button">
                      <v-btn :disabled="!form.valid" @click="inscription">Inscription</v-btn>
                    </div>
                    <div class="other_buttons text-xs-center">
                      <v-btn>
                        <v-icon left>fab fa-twitter</v-icon>
                        Twitter
                      </v-btn>
                      <v-btn>
                        <v-icon left>fab fa-google</v-icon>
                        Google
                      </v-btn>
                      <v-btn>
                        <v-icon left>fab fa-facebook</v-icon>
                        Facebook
                      </v-btn>
                    </div>
                  </v-form>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<style>
.card_container {
  font-family: "Open Sans";
  box-shadow: none;
  background-color: transparent!important;
  margin-top: 3rem;
}

.form_presentation {
  color: #fff;
  background-image: linear-gradient(to right, #FB6B53 , #DA536D);
}

.form_presentation .content {
  padding: 5rem 0 5rem 3rem;
}

.form_presentation .headline {
  font-weight: bold;
  margin-bottom: 2rem;
  font-size: 2rem!important;
}

.form_presentation span {
  position: absolute;
  bottom: 5rem;
  color: white;
}

.form_card {
  color: #636363;
  margin: 0px;
  /*margin-top: 40px;
  margin-bottom: 40px;*/
}

.form_card .submit_button {
  text-align: center;
  /*margin-top: 2rem;
  margin-bottom: 2rem;*/
}

.form_card .submit_button .v-btn {
  width: 100%;
  padding: 1.7rem;
  color: #fff;
  background-image: linear-gradient(to right, #FB6B53 , #DA536D);
  border-radius: 50px;
}

.form_card .other_buttons .v-btn {
  width: 28%;
  color: #636363;
  background-color: #F7FAFC;
  text-transform: none;
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
    /* FORM */
    form: {
      valid: false,
      /* User informations */
      user: {
        pseudo: "",
        email: "",
        password: "",
        passwordConfirm: "",
        partnersOffers: false
      },
      /* Password section (validation rules) */
      isPasswordVisible: false,
      isPassConfirmVisible: false,
      rules: {
        passwordRules: [
          v => !!v || "Le mot de passe est obligatoire"
          /*v => v.length >= 6 || "Le mot de passe doit contenir au moins 6 caractères",*/
        ],
        passwordConfirmRules: [
          v => !!v || "La confirmation du mot de passe est obligatoire"
          /*v => v == this.form.user.password || "Les mots de passe ne correspondent pas"*/
        ],

        pseudoRules: [
          v => !!v || "Le pseudo est obligatoire"
          /*v => v == this.form.user.password || "Les mots de passe ne correspondent pas"*/
        ],
      }
    },

      alertN : false,

      alerte: "",
  }),

  mounted: function(){

    localStorage.removeItem('globaliduser');

    this.getLocation();

  },

  methods: {

    inscription(){

      if(this.form.user.password == this.form.user.passwordConfirm){

        axios.post('http://api.test/api/inscription',
        {
          
          pseudo : this.form.user.pseudo,
          email : this.form.user.mail,
          password : this.form.user.password,
          
        })
        .then(response => {

          if(response.data.code == "OK"){

            localStorage.globaliduser = response.data.user;
            document.location.href="/";
            //document.location.href="/event/"+response.data.id;

          }else{
          
            this.popup(response.data.code,0);

          }

        });

      }else{

        this.popup("Les mots de passe sont différents",0);
      }
    },

    popup(code,num){

      this.alerte = code;

      if(num==1){
        

      }else{
        
        this.alertN = true;
      }

      setTimeout(()=>{ this.alertN=false; }, 3000);

    },

    getLocation() {

      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(this.showPosition);

      } else {
        alert('Geolocation non supportée');
      }

    },

    showPosition(position) {

      localStorage.lat = position.coords.latitude;
      localStorage.lng = position.coords.longitude

    },

  }


};
</script>