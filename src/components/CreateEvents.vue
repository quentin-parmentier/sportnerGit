<template>
	
	<div>
		
		<v-layout row wrap>

			<v-flex xs12>

				<div>
	      			<v-form ref="form" v-model="valid" lazy-validation>

	      				<p class="font-weight-bold display-2 titrepage"> Créer un événement :</p>

	      				<v-flex xs8 offset-xs2>

	      					<v-img :src="`https://picsum.photos/400/300?image=${event.sport}`" :lazy-src="`https://picsum.photos/10/6?image=${15}`" max-height="200px" class="grey lighten-2"></v-img>

	      					<v-autocomplete ref="sport" :items="sports" v-model="event.sport" label="Sport" placeholder="Select ..." required :rules="[v => !!v || 'Choisissez un sport !']"></v-autocomplete>

	      					<v-text-field label="Nom de l'événement" v-model="event.name" required :rules="[v => !!v || 'Donnez un nom à votre événement !']"></v-text-field>

	      					<v-layout row wrap>

		      					<v-flex xs7>
			      					<v-menu ref="menu1" :close-on-content-click="false" v-model="menu1" :nudge-right="40" lazy transition="scale-transition" full-width max-width="290px" >

										<v-text-field slot="activator" v-model="event.date" label="Date" placeholder="Select ..." :rules="[v => !!v || 'Choisissez une date !']" append-icon="event_note" readonly> 
										</v-text-field>

										<v-date-picker v-model="event.date" no-title @input="menu1 = false" locale="fr" first-day-of-week="1"></v-date-picker>

									</v-menu>
								</v-flex>

								<v-flex xs4 offset-xs1>
									<v-text-field label="Heure" v-model="event.hour" type="time" required :rules="[v => !!v || 'Choisissez une heure !']"></v-text-field>
								</v-flex>

							</v-layout>

							<v-text-field label="Nombre de place" v-model="event.number" type="number" required :rules="[v => !!v || 'Définissez le nombre maximal de participant !']">	
							</v-text-field>

							<v-textarea v-model="event.description" label="Description" auto-grow counter maxlength="1000"> </v-textarea>

							<v-btn :disabled="!valid" @click="submit" > Créer </v-btn>

	      				</v-flex>




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
			
			sports: [
				"Accrobranche","Aerobic","Aéromodélisme","Aérostation","Agility","Aikido","Airsoft","Alpinisme","Apnée","Athlétisme","Aviation","Aviron","Badminton","Baseball","Basketball","Biathlon","Billard","BMX","Bobsleigh","Boccia","Bodyboard","Boomerang","Bowling","Boxe","Bridge","Canoë","Canoë-kayak","Canyonisme","Capoeira","Carrom","Catch","Chanbara","Cheerleading","Cirque","Claquettes","Combat","Course","Cricket","Croquet","Crosse","Crossfit","Curling","Cyclisme","Danse","Danse orientale","Deltaplane","Echecs","Equitation","Escalade","Escrime","Fitness","Flag","Fléchettes","Football","Footing","Funboard","Futsal","Giraviation","Golf","Gouren","Grappling","Gymnastique","Haltérophilie","Handball","Handisport","Hapkido","Hockey","Iaïdo","Jetski","Jodo","Jorkyball","Joutes","Ju-Jitsu","Judo","Karaté","Karting","Kempo","Kendo","Kenjutsu","Kitesurf","Kobudo","Krav-maga","Kyudo","Lancer du javelot","Lancer du marteau","Lancer du poids","Luge","Lutte","Marche","Monocycle","Moto","Motoneige","Mountainboard","Musculation","Naginata","Natation","Natation synchronisée","Ninjitsu","Nunchaku","Omnikin","Padel","Paintball","Pancrace","Parachutisme","Paramoteur","Parapente","Patinage","Pêche","Pentathlon","Pétanque","Peteca","Planche à voile","Plongée","Plongeon","Polo","Qi gong","Quad","Quilles","Rafting","Ragga","Raid","Rallye","Randonnée","Rock","Roller","Rugby","Salsa","Samba","Sambo","Sarbacane","Sauvetage","Skateboard","Skeleton","Ski","Snowboard","Softball","Spéléologie","Squash","Sumo","Surf","Taekwondo","Tambourin","Tango","Tennis","Tir","Tir à l'arc","Traîneaux","Trampoline","Triathlon","Trottinette","Tumbling","ULM","Ultimate","Ultimate fresbee","Varappe","Vélo","Voile","Volleyball","Voltige","VTT","Wakeboard","Waterpolo","Yoga"
	        ],

	        	//User
	        event: {sport : "", name : "", date : "", hour:"", number:"", description : ""},

	        menu1 : null,

	        valid: true,
		}),

		methods: {

	      submit () {

	      }
	    }
	}

</script>