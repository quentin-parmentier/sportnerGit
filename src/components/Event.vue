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

						<p class="mt50"> {{event.text}} </p>

						<p class="mt30"> Carte : 

							<p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p><p> p </p>

						</p>

					</v-flex>

				</v-layout>


			</v-flex>

			<v-flex xs4 class="pt20">

				<div class="full-height rightbar">

					<p> Participants</p>

					<div class="mt10">
						
						<v-avatar v-for="participant in event.participants" :size="40" color="grey lighten-4" class="avatars">

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

    export default {

    	data: vm => ({

    		event : {id:"" ,title : "", date : "", hour : "" , nbPart : "" , text : "", creator : "" , participants : ""},
    		leftplaces : ""
		}),

		mounted: function(){

			var idevent = this.$route.params.id;
			this.getEvent(idevent);

		},

	    methods: {

			getEvent(id) {

				this.event.id = id;
				this.event.title = "Foot2rue";
				this.event.date = "17 nov 2018";
				this.event.hour = "14h30";
				this.event.nbPart = "3";
				this.event.text = "Viens jouez c'est super cool en plus y'aura des pompomgrills";
				this.event.creator = "Maxime Laurent";
				this.event.participants = [{name:"Maxime" , id:"85"},{name:"Bernard" , id:"84"}];

				this.leftplaces = parseInt(this.event.nbPart) - this.event.participants.length;

			}

		}

	}

</script>