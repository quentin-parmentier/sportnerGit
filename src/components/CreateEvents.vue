<style>
	
	.map_create{
		height: 50vh;
	}

</style>

<template>
	
	
	<div>
		<!-- Alertes -->
		<v-alert
		:value="alertN"
		type="error"
		transition="scale-transition"
		class="alerte"
		>

			{{alerte}}

		</v-alert>
		
		<v-layout row wrap>

			<v-flex xs12>

				<div> <!-- Form -->
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

							<v-textarea v-model="event.description" label="Description" auto-grow counter maxlength="1000" class="mb20"> </v-textarea>
							<!-- Map -->
							<div id="js_map" class="map_create" ref="mamap"> </div>

							<v-btn :disabled="!valid" @click="submit" class="mt20"> Créer </v-btn>

	      				</v-flex>

	      			</v-form>

	      		</div>

			</v-flex>

		</v-layout>

	</div>

</template>

<script>

	import axios from 'axios'

	class leafletMap{

	    constructor(){
	      this.map = null;
	    }

	    async load(element,pos_user){
	      return new Promise((resolve,reject) => {
	        this.map = L.map(element).setView(pos_user,13);
	        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	            maxZoom: 17,
	            minZoom:5,
	            id: 'mapbox.streets',
	            accessToken: 'pk.eyJ1Ijoic2Vva3V5bWkiLCJhIjoiY2pscDVlYmc1MXY3MjNrcGJ6anBrcWJydSJ9.CwS7tQsy-GzvIZpkVw9qBw'
	        }).addTo(this.map);
	        resolve();
	      });
	    }

	    addMarker(lat,lng,text){
	      let point = [lat,lng];
	      let marker = new leafletMarker(point,text,this.map);
	      return marker;
	    }

	    getCenter(){
	      return this.map.getCenter();
	    }
	    cleanMap(){

	      this.map.eachLayer((layer)=>{

	        if(layer.options.pane == "markerPane"){
	          layer.remove();
	        }

	      });

	      return true;

	    }
	}

	export default {

		data: vm => ({
			
			sports: [
				
	        ],

	        	//User
	        event: {sport : "", name : "", date : "", hour:"", number:"", description : "", lat: "", lng: ""},

	        user : {name : "Paul", lat : "48.692054", lng : "6.184417"},

	        pos_user : null,

	        map : null,

	        menu1 : null,

	        valid: true,

	        alertN: false,

	        alerte: "",

	        globaliduser: ""


		}),

		mounted: function(){

			if(localStorage.globaliduser){
				this.globaliduser = localStorage.globaliduser;
			}

			axios.get('http://api.test/api/toutesvilles').then(response => {

		      this.sports = response.data.sports

		    });

			this.initMap();

		},

		methods: {

			initMap(){
				this.map = new leafletMap();
				this.pos_user = {"lat":this.user.lat,"lng":this.user.lng};
				this.map.load('js_map',this.pos_user);
				this.map.map.addEventListener('click',(e)=>{

				  	//Setup le nouveau point comme point actu
				  	this.event.lat = e.latlng.lat;
				  	this.event.lng = e.latlng.lng;

				  	//Nettoie la map
						this.map.cleanMap();

				  	//Ajoute un point sur la position lat,lng
					L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map.map)

					console.log(this.event);
				});

			},

	      	submit(){

		      	axios.post('http://api.test/api/events',
				{
					
					sport : this.event.sport,
					dateevent : this.event.date,
					heure : this.event.hour,
					desc : this.event.description,
					titre : this.event.name,
					createur : this.globaliduser,
					lat : this.event.lat,
					lng : this.event.lng,
					nbmax : this.event.number,
					
			    })
				.then(response => {

					if(response.data.code == "OK"){

						document.location.href="/event/"+response.data.id;

					}else{
					
						this.popup(response.data.code,0);

					}
				});

	      	},

			popup(code,num){

				this.alerte = code;

				if(num==1){
					

				}else{
					
					this.alertN = true;
				}

				setTimeout(()=>{ this.alertN=false; }, 3000);

			}
	    }
	}

</script>