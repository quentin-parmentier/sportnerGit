<template>
  <div>
    <v-layout row wrap>

      <v-flex xs12 class="main_container">

        <v-flex lg8 md8 sm10 xs10 offset-xs2>
          <!-- Title of the page -->
          <v-card flat tile class="section_header">
            <v-layout justify-space-between align-center>
              <v-flex xs12 sm4>
                <p class="section_title">Profil</p>
              </v-flex>
            </v-layout>
          </v-card>

          <!-- Main part -->
          <!-- Personal informations -->
          <v-card flat tile color="transparent">
            <div>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container class="pa-0">
                  <v-card flat tile class="form_card">
                    <div class="section_title_container">
                      <span class="section_decoration"></span>
                      <h4>Informations personnelles</h4>
                    </div>
                    <v-layout row>
                      <v-flex xs12 md6 class="form_field">
                        <v-text-field label="Pseudo" v-model="user.pseudo" disabled disabled></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6 class="form_field">
                        <v-text-field
                          :rules="emailRules"
                          label="Email"
                          v-model="user.mail"
                          disabled
													color="#fb6b53"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs12 md6 class="form_field">
                        <v-text-field
                          :rules="nameRules"
                          label="Prénom"
                          v-model="user.prenom"
                          disabled
													color="#fb6b53"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6 class="form_field">
                        <v-text-field :rules="nameRules" label="Nom" v-model="user.nom" disabled color="#fb6b53"></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs12 md4 class="form_field">
                        <v-select
                          label="Sexe"
                          :items="sexe"
                          v-model="user.sexe"
                          :rules="[v => !!v || 'Choisissez votre sexe!']"
													color="#fb6b53"
                          disabled
                        ></v-select>
                      </v-flex>

                      <v-flex xs12 md4 class="form_field">
                        <v-menu
                          ref="menu1"
                          :close-on-content-click="false"
                          v-model="menu1"
                          :nudge-right="40"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          max-width="290px"
                          min-width="290px"
													color="#fb6b53"
                          disabled
                        >
                          <v-text-field
                            slot="activator"
                            v-model="date"
                            label="Date de naissance"
                            persistent-hint
                            @blur="date = parseDate(dateFormatted)"
														color="#fb6b53"
                            disabled
                          ></v-text-field>
                          <v-date-picker v-model="date" no-title @input="menu1 = false" disabled></v-date-picker>
                        </v-menu>
                      </v-flex>

                      <v-flex xs12 md4 class="form_field">
                        <v-text-field
                          label="Telephone"
                          v-model="user.telephone"
                          disabled
                          :rules="[v => !!v || 'Renseignez votre téléphone !']"
													color="#fb6b53"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-card>

                  <v-card flat tile class="form_card">
                    <div class="section_title_container">
                      <span class="section_decoration"></span>
                      <h4>Centres d'intérêts</h4>
                    </div>
                    <v-layout row>
                      <v-flex xs12 class="form_field">
                        <v-text-field label="Mes sports" v-model="sports" disabled color="#fb6b53"></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs12 class="form_field">
                        <v-textarea
                          v-model="user.description"
                          label="Description"
                          auto-grow
                          disabled
                          maxlength="1000"
													color="#fb6b53"
                        ></v-textarea>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-container>
              </v-form>
            </div>
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


.form_card {
  background-color: #fff;
	padding: 2rem;
	padding-bottom: 0;
	margin: 2rem 0;
	border-radius: 2px;
}
.form_field {
  padding: 1.5rem 2.5rem;
}
/* Change field style *
.v-text-field__slot {
	border: 1px solid #cccccc;
	border-radius: 5px;
	box-shadow: 0 0 5px -3px #000;
	padding: 5px 10px;
}
.v-label {
	top: -25px!important;
	font-size: 12px;
}
.v-label--active {
	transform: none!important;
}
.v-input__slot::before, .v-input__slot::after {
	border: none!important;
	display: none!important;
}
.primary--text {
	color: #fb6b53!important;
}
/*********************/

.section_title_container {
	display: table;
	margin-bottom: 1rem;
}
.section_decoration {
  width: 40px;
  height: 1px;
  background-color: #fb6b53;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
h4 {
  font-size: 1rem;
  font-weight: 400;
  color: #fb6b53;
  text-transform: uppercase;
  display: table-cell;
}
</style>

<script>
import axios from "axios";

export default {

	data: vm => ({
     	
     	//Différentes variables

        drawer: false,

        	//Champs
        sexe: ['Homme', 'Femme'],

        	//Menu de gauche
        items: [
          { title: 'Modifier le profil', icon: 'account_box', link: '/account' },
          { title: 'Evénements créés', icon: 'event', link: '/events/created' },
          { title: 'Evénements rejoints', icon: 'event_note', link: '/events/join' },
          { title: 'Notes', icon: 'star', link: '/notes' },
          { title: 'Rewards', icon: 'fa-medal', link: '/rewards' },
        ],

        	//User
        user: '',
        
        	//Pays
        countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],

        sports : "",

        //Règles des champs

        valid: true,
		name: '',
		nameRules: [
		v => !!v || 'Renseignez votre nom',
		v => (v && v.length <= 30) || 'Name must be less than 30 characters'
		],
		email: '',
		emailRules: [
		v => !!v || 'E-mail is disabled',
		v => /.+@.+/.test(v) || 'E-mail invalide'
		],
		select: null,

		//Gestion des dates picker

		date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    }),

    mounted : function(){

    	axios.get('http://api.test/api/profil/'+this.$route.params.id).then(response => {

	      this.user = response.data.user[0];
        this.sports = response.data.sport;

        console.log(this.user);

	    });

    },

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },

    methods: {

      submit () {

        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            user : this.user
          })
        }
      },

      clear () {
        this.$refs.form.reset()
      },

      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },

    }
}
  

</script>