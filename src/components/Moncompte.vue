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
							<router-link :to="item.link"> <v-list-tile-title>{{item.title}}</v-list-tile-title> </router-link>
						</v-list-tile-content>
			        </v-list-tile>

				</div>
	      	</v-flex>

	      	<v-flex xs9>

	      		<div>
	      			<v-form ref="form" v-model="valid" lazy-validation>

	      				<p class="font-weight-bold display-2 titrepage"> Mes informations :</p>

	      				<v-flex xs8 offset-xs2>
							<v-text-field :rules="nameRules"  label="Nom" v-model="user.nom" required ></v-text-field>
							<v-text-field :rules="nameRules"  label="Prénom" v-model="user.prenom" required ></v-text-field>

							<v-text-field :rules="emailRules" label="Email" v-model="user.email" required ></v-text-field>
							<v-text-field label="Pseudo" v-model="user.pseudo" required disabled ></v-text-field>
							<v-text-field label="Mes sports" v-model="user.sports" required></v-text-field>
							
							<v-select label="Sexe" :items="sexe" v-model="user.sexe" :rules="[v => !!v || 'Choisissez votre sexe!']"></v-select>

							<v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">

								<v-text-field slot="activator" v-model="user.birth" label="Date de naissance" persistent-hint @blur="date = parseDate(dateFormatted)" ></v-text-field>

		          				<v-date-picker v-model="date" no-title @input="menu1 = false" required></v-date-picker>

	        				</v-menu>

	        				<v-text-field label="Telephone" v-model="user.phone" required :rules="[v => !!v || 'Renseignez votre téléphone !']"></v-text-field>

	        				<v-autocomplete ref="country" :items="countries" v-model="user.country" label="Country" placeholder="Select..." required></v-autocomplete>

	        				<v-textarea v-model="user.description" label="Description" auto-grow counter maxlength="1000">
	        					
	        				</v-textarea>




							<v-btn :disabled="!valid" @click="submit" >
							submit
							</v-btn>

						</v-flex>
						<!--<v-btn @click="clear">clear</v-btn>-->

						</v-form>

	      		</div>
				
	      	</v-flex>

      	</v-layout>
      	
	</div>


</template>

<script>

import axios from 'axios'

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
	        user: {nom : "Robert", prenom :"Alphonsy", pseudo : "Robert54", id : "0", email : "robert@gmail.com", sexe : "", phone : "", description : "", langage : "", birth : "", country : "", sports : ""},
	        
	        	//Pays
	        countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],

	        //Règles des champs

	        valid: true,
			name: '',
			nameRules: [
			v => !!v || 'Renseignez votre nom',
			v => (v && v.length <= 30) || 'Name must be less than 30 characters'
			],
			email: '',
			emailRules: [
			v => !!v || 'E-mail is required',
			v => /.+@.+/.test(v) || 'E-mail invalide'
			],
			select: null,

			//Gestion des dates picker

			date: new Date().toISOString().substr(0, 10),
		    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
		    menu1: false,
		    menu2: false,
			

	    }),

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
	            name: this.name,
	            email: this.email,
	            select: this.select,
	            checkbox: this.checkbox
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