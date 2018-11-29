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
				
				<v-tabs fixed-tabs>
					<v-tab>
						En cours
					</v-tab>

					<v-tab>
						Historique
					</v-tab>
				</v-tabs>


				<v-container grid-list-md>

					<v-layout v-bind="binding" v-for="event in events" :key="events.title">
					
						<v-flex>
							<v-card dark >
						
								<v-card-text>{{event.title}}</v-card-text>

							</v-card>

						</v-flex>

					</v-layout>

				</v-container>

			</v-flex>

      	</v-layout>
      	

	</div>
</template>


<script>

import axios from 'axios'

    export default {

    	data: vm => ({

    		items: [
	          { title: 'Modifier le profil', icon: 'account_box', link: '/account' },
	          { title: 'Evénements créés', icon: 'event', link: '/events/created' },
	          { title: 'Evénements rejoints', icon: 'event_note', link: '/events/join' },
	          { title: 'Notes', icon: 'star', link: '/notes' },
	          { title: 'Rewards', icon: 'question_answer', link: '/rewards' },
	        ],

    		events : [
    			{title : "Sport 1 ICI", date : "27 Nov", hour : "14h" , NbPart : "3"},
    			{title : "Sport 2 ICI", date : "28 Nov", hour : "15h" , NbPart : "4"},
    			{title : "Sport 3 ICI", date : "29 Nov", hour : "16h" , NbPart : "5"},
    			{title : "Sport 4 ICI", date : "30 Nov", hour : "17h" , NbPart : "6"},
    			{title : "Sport 5 ICI", date : "30 Nov", hour : "18h" , NbPart : "7"},
    			{title : "Sport 6 ICI", date : "31 Nov", hour : "19h" , NbPart : "8"},
    			{title : "Sport 7 ICI", date : "31 Nov", hour : "20h" , NbPart : "9"},
    			]
		})


	}

</script>