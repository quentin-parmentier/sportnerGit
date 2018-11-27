<template>
    <div id="app" layout="column">
        <router-view name="top"></router-view>
        <router-view name="body" :key="$route.fullPath" flex class="mt64"></router-view>
    </div>
</template>


<script>
    export default {
    }
</script>