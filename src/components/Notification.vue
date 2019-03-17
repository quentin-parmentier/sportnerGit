<style>
	
	.centeringMsg{
		text-align: center;
		width: 100%;

	}

</style>

<template>
	
	<div>

		<v-flex xs8 offset-xs2>

			<v-layout align-space-around column v-for="notification in notifications" 	class="item">

				<v-card>

					<v-layout>

						<v-flex xs1> 

							<v-container fill-height class="pa0">
								<p class="centeringMsg"><v-icon>{{notification.type}}</v-icon></p>
							</v-container>

						</v-flex>

						<v-flex xs11> 

							<div>
								{{notification.text}}
							</div>
							<div>
							 
								{{notification.date}}
								
							</div>
						</v-flex>

					</v-layout>

					

				</v-card>

      		</v-layout>

  		</v-flex>

	</div>

</template>

<script>

import axios from 'axios'

    export default {

    	data: vm => ({

			notifications: [

	          { date: '12 janvier 8h' , text: " Jean Michel est parti de l'événement" , type: "message"},
	          { date: '12 janvier 8h' , text: " Marc Benoit a rejoint l'événement Foot2Rue" , type: "message"},
	          { date: '12 janvier 8h' , text: " L'événement Piscine a été supprimé par Bernard Dubois " , type: "message"},
	          { date: '12 janvier 8h' , text: " Vous été kick de l'événement" , type: "message"}, //Notification de msg / notes / leave / Nouveaux event près de chez nous
	        ],
		}),

	    computed: {

		},
		methods: {

		}

    }
</script>