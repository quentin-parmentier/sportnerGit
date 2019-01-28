<template>
    <div id="app" layout="column">
    	<v-app>
	        <router-view name="top"></router-view>
	        <router-view name="body" :key="$route.fullPath" flex class=""></router-view>
          <router-view name="bottom"></router-view>
	    </v-app>
    </div>
</template>


<script>

  export default {
   	mounted : function(){

      if(!localStorage.globaliduser && (this.$route.name != "signin" && this.$route.name != "signup")){

        document.location.href="/signIn";

      }

    }
  }

</script>