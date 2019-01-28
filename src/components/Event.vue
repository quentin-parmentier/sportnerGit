<!-- Visualisation d'un event -->

<template>
	
	<div>
		
		<v-alert
		:value="alertR"
		type="success"
		transition="scale-transition"
		class="alerte"
		>

			{{alerte}}
		</v-alert>

		<v-alert
		:value="alertN"
		type="error"
		transition="scale-transition"
		class="alerte"
		>

			{{alerte}}

		</v-alert>

		<v-flex xs12>

			<div>
				<v-img src="https://picsum.photos/510/300?15" aspect-ratio="1" max-height="200px"></v-img>
			</div>

		</v-flex>

		<v-layout row wrap>

			<v-flex xs8>

				<v-layout row wrap class="pt20">

					<v-flex xs3 class="text-xs-center">

						{{event.date}} {{event.hour}}

					</v-flex>

					<v-flex xs9>
						<p>{{event.title}}</p>
						<p>Organisé par : {{event.creator}}</p>

						<p class="mt50 mb20"> {{event.text}} </p>

						<div id="js_map" class="map_create" ref="mamap"> </div>

					</v-flex>

				</v-layout>


			</v-flex>

			<v-flex xs4 class="pt20 pl20">

				<div class="full-height rightbar">

					<p> Participants</p>

					<div class="mt10">
						
						<v-avatar v-for="participant in event.participants" :size="40" color="grey lighten-4" class="avatars" >

							<router-link tag="img" v-bind:src="'https://randomuser.me/api/portraits/men/' + participant.id_user + '.jpg'" alt="${participant.id_user}" v-bind:to="'/user/' + participant.id_user"> </router-link>
				        	
				        </v-avatar>

				        <v-avatar v-for="n in leftplaces" :size="40" color="grey lighten-4" class="avatars">

				        </v-avatar>

					</div>

					<div class="mt10">
						
						{{leftplacestext}}

					</div>

					<div class="mt10">
						
						<v-btn @click="submit">
							{{textbouton}}
						</v-btn>

					</div>
				</div>

			</v-flex>

		</v-layout>


	</div>

</template>

<style scoped>
	
	.avatars {

		margin: 5px;

	}

</style>

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

    		event : {id:"", sport: "" ,title : "", date : "", hour : "" , nbPart : "" , text : "", creator : "" , participants : "", lat:"" , lng: ""},
    		leftplaces : "",
    		leftplacestext : "",
    		textbouton : "Rejoindre",
    		alerte: "",
    		alertR: false,
    		alertN: false,

    		pos_event : null,
    		globaliduser : 0,

		}),

		mounted: function(){

			if(localStorage.globaliduser){
				this.globaliduser = localStorage.globaliduser;
			}

			var idevent = this.$route.params.id;

			this.getEvent(idevent);

		},

	    methods: {

			getEvent(id) {

				axios.get('http://api.test/api/events/'+id).then(response => {

					let eventget = response.data.events[0];
					let userspart = [];

					userspart = response.data.users;

					this.event.id = eventget.id_event;
					this.event.sport = eventget.sport;
					this.event.title = eventget.titre;
					this.event.date = eventget.date;
					this.event.hour = eventget.time;
					this.event.nbPart = eventget.nb_max;
					this.event.text = eventget.description;
					this.event.creator = "" + eventget.prenom + " " + eventget.nom;
					this.event.lat = eventget.lat;
					this.event.lng = eventget.lng;
					this.event.participants = userspart;

					this.leftplaces = parseInt(this.event.nbPart) - this.event.participants.length;



					if(this.leftplaces < 2){

						this.leftplacestext = this.leftplaces + " place restante";

					}else{

						this.leftplacestext = this.leftplaces + " places restantes";
					}

					userspart.forEach((element) => {

						if(this.globaliduser == element.id_user){
							this.leftplacestext = "Vous participez déjà à l'évènement";
							this.textbouton = "Annuler";
						}
						
					});

					this.initMap();

				})

			},

			initMap(){
				
				this.map = new leafletMap();
				this.pos_event = {"lat":this.event.lat,"lng":this.event.lng};
				this.map.load('js_map',this.pos_event);

				L.marker([this.pos_event.lat, this.pos_event.lng]).addTo(this.map.map)

			},

			submit(){

				if(this.textbouton == "Rejoindre"){

					axios.post('http://api.test/api/join',
					{
						idevent: this.event.id,
						iduser: this.globaliduser,
				    })
					.then(response => {

						if(response.data.code == "OK"){

							let userspart = response.data.users

							this.event.participants = userspart;

							console.log(this.event);

							this.leftplaces = parseInt(this.event.nbPart) - this.event.participants.length;

							if(this.leftplaces < 2){

								this.leftplacestext = this.leftplaces + " place restante";

							}else{

								this.leftplacestext = this.leftplaces + " places restantes";
							}

							userspart.forEach((element) => {

								if(this.globaliduser == element.id_user){
									this.leftplacestext = "Vous participez déjà à l'évènement";
									this.textbouton = "Annuler";
								}
								
							});

							this.popup("Inscription réussie",1);

						}else{

							this.popup(response.data.code,0);

						}

					});

				}else{

					axios.post('http://api.test/api/leave',
					{
						idevent: this.event.id,
						iduser: this.globaliduser,
				    })
					.then(response => {
						
						let userspart = response.data.users

						this.event.participants = userspart;

						this.leftplaces = parseInt(this.event.nbPart) - this.event.participants.length;

						if(this.leftplaces < 2){

							this.leftplacestext = this.leftplaces + " place restante";

						}else{

							this.leftplacestext = this.leftplaces + " places restantes";
						}

						this.textbouton = "Rejoindre";

						userspart.forEach((element) => {

							if(this.globaliduser == element.id_user){
								this.leftplacestext = "Vous participez déjà à l'évènement";
								this.textbouton = "Annuler";
							}
							
						});

					});

				}

			},

			popup(code,num){

				this.alerte = code;

				if(num==1){
					this.alertR = true;

				}else{
					this.alertN = true;
				}

				setTimeout(()=>{ this.alertR=false; this.alertN=false; }, 3000);

			}

		}

	}

</script>