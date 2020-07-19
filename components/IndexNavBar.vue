<template>
    <v-app-bar fixed app>
        <v-toolbar-title v-text="title" />
        <v-spacer></v-spacer>
        <SortButtons/>
        <v-spacer></v-spacer>
        <v-btn @click="reloadData">
            <v-icon dark>mdi-refresh</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import SortButtons from '~/components/SortButtons.vue'

export default {
    name: "IndexNavBar",
    components: {
        SortButtons
    },
    data() {
        return {
            title: "Weather App"
        }
    },
    methods:{
        reloadData() {
            this.$store.dispatch('weatherstore/fetchWeatherData');
        }
    }
}
</script>

<style>

</style>