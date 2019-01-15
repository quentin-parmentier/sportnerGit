<!-- Visualisation d'un event -->

<template>
	
	<div>
		
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

							
			        		<v-img v-bind:src="'https://randomuser.me/api/portraits/men/' + participant.id + '.jpg'" alt="${participant.id}"></v-img>
				        	
				        </v-avatar>

				        <v-avatar v-for="n in leftplaces" :size="40" color="grey lighten-4" class="avatars">

				        </v-avatar>

					</div>

					<div class="mt10">
						
						{{leftplaces}} place restante

					</div>

					<div class="mt10">
						
						<v-btn @click="submit" >
							Rejoindre
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

    		event : {id:"" ,title : "", date : "", hour : "" , nbPart : "" , text : "", creator : "" , participants : "", lat:"48.692054" , lng: "6.184417"},
    		leftplaces : "",

    		pos_event : null
		}),

		mounted: function(){

			var idevent = this.$route.params.id;
			this.getEvent(idevent);

			this.initMap();

		},

	    methods: {

			getEvent(id) {

				/*axios.get('http://api.test/api/events/'+id+'/').then(response => {

					this.event.id = id;
					this.event.title = response.titre;
					this.event.date = "17 nov 2018";
					this.event.hour = "14h30";
					this.event.nbPart = "3";
					this.event.text = "Viens jouez c'est super cool en plus y'aura des pompomgrills";
					this.event.creator = "Maxime Laurent";
					this.event.participants = [{name:"Maxime" , id:"85"},{name:"Bernard" , id:"84"}];

					this.leftplaces = parseInt(this.event.nbPart) - this.event.participants.length;

				})*/

				this.event.id = id;
				this.event.title = "TOTO";
				this.event.date = "17 nov 2018";
				this.event.hour = "14h30";
				this.event.nbPart = "3";
				this.event.text = "Viens jouez c'est super cool en plus y'aura des pompomgrills";
				this.event.creator = "Maxime Laurent";
				this.event.participants = [{name:"Maxime" , id:"85"},{name:"Bernard" , id:"84"}];

				this.leftplaces = parseInt(this.event.nbPart) - this.event.participants.length;

			},

			initMap(){
				this.map = new leafletMap();
				this.pos_event = {"lat":this.event.lat,"lng":this.event.lng};
				this.map.load('js_map',this.pos_event);

				L.marker([this.pos_event.lat, this.pos_event.lng]).addTo(this.map.map)

			},

			submit(){


			}

		}

	}

</script>