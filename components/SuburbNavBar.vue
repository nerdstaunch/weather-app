<template>
    <v-app-bar fixed app>
        <nuxt-link to='/'>
            <v-btn>
                <v-icon dark>mdi-arrow-left</v-icon>
            </v-btn>
        </nuxt-link>
    </v-app-bar>
  
</template>

<script>
export default {
    name: "SuburbNavBar"
}
</script>

<style scoped> 
a {
    text-decoration: none !important;
}
</style>