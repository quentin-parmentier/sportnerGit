<template>
   <div id="app" layout="column">
       <v-app>
            <router-view name="top"></router-view>
            <router-view name="body" :key="$route.fullPath" flex class="mt64"></router-view>
        </v-app>
   </div>
</template>


<script>
   export default {
   }
</script>