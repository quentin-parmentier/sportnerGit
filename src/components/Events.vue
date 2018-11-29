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
				
				<p class="font-weight-bold display-2"> {{titlePage}} :</p>

					<v-tabs v-model="active">

						<!-- Clés -->

						<v-tab :key="0" ripple> En cours </v-tab>

						<v-tab :key="1" ripple> Historique </v-tab>

						<!-- Gestion des En cours -->

						<v-tab-item :key="0">

							<v-layout align-space-around column v-for="event in events" :key="event.id" class="item">

								<v-card>

									<v-layout>

										<!-- Informations Event -->

										<v-flex xs5>

											<v-card-text>

												<p class="font-weight-bold">{{event.title}}</p>
												<p class="font-weight-bold">{{event.date}} {{event.hour}}</p>

											</v-card-text>

										</v-flex>

										<!-- BDD Event -->

										<v-flex xs7>

											<v-card-text> 

												<p class="text-xs-right font-weight-bold"> {{event.NbPart}} Participants </p>

												<!-- Boutons -->

												<p class="text-xs-right buttons"> 

													<v-btn small round> Voir <v-icon small right>arrow_forward</v-icon></v-btn>
													<v-btn small round> {{clears}} <v-icon small right>clear</v-icon></v-btn>

												</p>

											</v-card-text>

										</v-flex>
										
									</v-layout>


								</v-card>
								
			          		</v-layout>
						
						</v-tab-item>

						<!-- Gestion des Historiques-->

						<v-tab-item :key="1">

							<v-layout align-space-around column v-for="oldevent in oldevents" class="item" :key="oldevent.id">

								<v-card>

									<v-layout>

										<!-- Information sur l'event -->

										<v-flex xs5>

											<v-card-text>

												<p class="font-weight-bold">{{oldevent.title}}</p>
												<p class="font-weight-bold">{{oldevent.date}} {{oldevent.hour}}</p>

											</v-card-text>

										</v-flex>

										<!-- BDD event -->

										<v-flex xs7>

											<v-card-text> 

												<p class="text-xs-right font-weight-bold"> {{oldevent.NbPart}} Participants </p>
												<p class="text-xs-right buttons"> 

													<!-- Boutons -->

													<v-btn small round> Voir 
														<v-icon small right>arrow_forward</v-icon>
													</v-btn>

												</p>

											</v-card-text>

										</v-flex>
										
									</v-layout>


								</v-card>
								
			          		</v-layout>

						</v-tab-item>

					</v-tabs>

			</v-flex>

      	</v-layout>
      	

	</div>
</template>

<style scope>
	
	p{
		margin:0px;

	}

	.v-card__text{

		padding-bottom: 10px;
	}

</style>

<script>

	import axios from 'axios'

    export default {

    	data: vm => ({

    		typeEvent : '',

    		titlePage: '' ,

    		clears : '',

    		active: null,

    		items: [
	          { title: 'Modifier le profil', icon: 'account_box', link: '/account' },
	          { title: 'Evénements créés', icon: 'event', link: '/events/created' },
	          { title: 'Evénements rejoints', icon: 'event_note', link: '/events/join' },
	          { title: 'Notes', icon: 'star', link: '/notes' },
	          { title: 'Rewards', icon: 'question_answer', link: '/rewards' },
	        ],

    		events : [
    			{id:"0" ,title : "Sport 1 ICI", date : "27 Nov", hour : "14h" , NbPart : "3" , text : " Lorem Ipsum"},
    			{id:"1" ,title : "Sport 2 ICI", date : "28 Nov", hour : "15h" , NbPart : "4" , text : " Lorem Ipsum"},
    			{id:"2" ,title : "Sport 3 ICI", date : "29 Nov", hour : "16h" , NbPart : "5" , text : " Lorem Ipsum"},
    			{id:"3" ,title : "Sport 4 ICI", date : "30 Nov", hour : "17h" , NbPart : "6" , text : " Lorem Ipsum"},
    			{id:"4" ,title : "Sport 5 ICI", date : "30 Nov", hour : "18h" , NbPart : "7" , text : " Lorem Ipsum"},
    			{id:"5" ,title : "Sport 6 ICI", date : "31 Nov", hour : "19h" , NbPart : "8" , text : " Lorem Ipsum"},
    			{id:"6" ,title : "Sport 7 ICI", date : "31 Nov", hour : "20h" , NbPart : "9" , text : " Lorem Ipsum"},
    			],

    		oldevents : [
    			{id:"7" ,title : "Sport Passé ICI", date : "27 Nov", hour : "14h" , NbPart : "3" , text : " Lorem Ipsum"},
    			{id:"8" ,title : "Sport Passé ICI", date : "28 Nov", hour : "15h" , NbPart : "4" , text : " Lorem Ipsum"},
    			{id:"9" ,title : "Sport Passé ICI", date : "29 Nov", hour : "16h" , NbPart : "5" , text : " Lorem Ipsum"},
    			{id:"10" ,title : "Sport Passé ICI", date : "30 Nov", hour : "17h" , NbPart : "6" , text : " Lorem Ipsum"}
    			]
		}),

		mounted: function (){

			if( this.$route.params.id == "join"){

				this.titlePage = "Mes événements rejoints";
				this.typeEvent = "joined";
				this.clears = "Annuler";

			}else if(this.$route.params.id == "created"){

				this.titlePage = "Mes événements créés";
				this.typeEvent = "created";
				this.clears = "Supprimer";
			}

		}


	}

</script>

