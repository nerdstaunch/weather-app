<template>
  <v-app dark>
    <v-main class="mainContainer">
        <v-container>
            <nuxt />
        </v-container>
    </v-main>
    <v-footer>
        Luke De Vuono, July 2020
    </v-footer>
  </v-app>
</template>

<script>
export default {
    created() {
        // On load of any page we want to fetch the weather data
        this.$store.dispatch('weatherstore/fetchWeatherData');
    }
}
</script>

<style scoped>
.mainContainer {
    max-height: calc(100vh - 36px);
    overflow-y: scroll;
}

.mainContainer::-webkit-scrollbar {
  display: none;
}

</style>