<template>

	<div class="topbar">
		<v-toolbar>
			<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title>Logo</v-toolbar-title>
			<v-flex xs12 sm6 md3 class="ml50">
			  <v-text-field label="Solo" solo></v-text-field>
			</v-flex>
			<v-spacer></v-spacer>
			<v-toolbar-items class="hidden-sm-and-down">
			  <v-icon>add_box</v-icon>
			  <v-icon>notifications</v-icon>
			  <v-btn flat>Link Three</v-btn>
			</v-toolbar-items>
		</v-toolbar>

	  <v-layout wrap>

	    <v-navigation-drawer v-model="drawer" absolute class="leftbar">
	      <v-list class="pa-1">
	        <v-list-tile avatar>
	          <v-list-tile-avatar>
	            <img src="https://randomuser.me/api/portraits/men/85.jpg">
	          </v-list-tile-avatar>

	          <v-list-tile-content>
	            <v-list-tile-title>{{user.pseudo}}</v-list-tile-title>
	          </v-list-tile-content>
	        </v-list-tile>
	      </v-list>

	      <v-list class="pt-0" dense>
	        <v-divider></v-divider>

	        <v-list-tile v-for="item in items" :key="item.title" @click="">
				<v-list-tile-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-tile-action>

				<v-list-tile-content>
					<router-link :to="item.link"> <v-list-tile-title>{{item.title}}</v-list-tile-title> </router-link>
				</v-list-tile-content>
	        </v-list-tile>

	      </v-list>

	    </v-navigation-drawer>
	  </v-layout>

	</div>

</template>

<script>
	
	export default {

		data () {
		    return {

		        drawer: false,
		        items: [
		          { title: 'Home', icon: 'dashboard', link: '/home' },
		          { title: 'Mon compte', icon: 'dashboard', link: '/account' },
		          { title: 'About', icon: 'question_answer', link: '/about' }
		        ],
		        user: {pseudo : "Robert"}
		        
		    }
	    }

	}



</script>