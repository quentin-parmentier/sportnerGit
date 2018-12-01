<template>
	
	<div>
		
		<v-layout row wrap>

			<v-flex xs12>

				<div>
	      			<v-form ref="form" v-model="valid" lazy-validation>

	      				<p class="font-weight-bold display-2 titrepage"> Créer un événement :</p>

	      				<v-flex xs8 offset-xs2>

	      					<v-flex xs4>
	      						<v-img
                  :src="`https://picsum.photos/500/300?image=${1 * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  max-width="33%"
                ></v-img>
	      					</v-flex>

	      					<v-flex xs4>
	      						<v-img
                  :src="`https://picsum.photos/500/300?image=${1 * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  max-width="33%"
                ></v-img>
	      					</v-flex>

	      					<v-flex xs4>
	      						<v-img
                  :src="`https://picsum.photos/500/300?image=${1 * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  max-width="33%"
                ></v-img>
	      					</v-flex>

	      				</v-flex>


	      			</v-form>

	      		</div>


			</v-flex>

		</v-layout>

	</div>

</template>