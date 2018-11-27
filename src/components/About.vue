<template>

	<div>
		
        <v-select label="Sexe" :items="sexe" v-model="user.sexe" :rules="[v => !!v || 'Choisissez votre sexe!']"></v-select>



	</div>

</template>

<script>
	
	export default {

		data: () => ({
	        
	        sexe: ['Foo', 'Bar', 'Fizz', 'Buzz'],

	        	//User
	        user: {nom : "Robert", prenom :"Alphonsy", pseudo : "Robert54", id : "0", email : "robert@gmail.com", sexe : "", phone : "", description : "", langage : "", birth : "", country : "", sports : ""}
	    })

	}

</script>