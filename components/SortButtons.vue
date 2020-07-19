<template>
    <v-btn-toggle
        v-model="text"
        tile
        color="blue accent-3"
        group
        mandatory
    >
        <v-btn value="alphabet">
            Alphabetical
        </v-btn>

        <v-btn value="temperature">
            Temperature
        </v-btn>

        <v-btn value="lastUpdated">
            Last Updated
        </v-btn>
    </v-btn-toggle>
</template>

<script>
export default {
    name: "SortButtons",
    data() {
        return {
            text: null
        }
    },
    watch: {
        text() {
            this.$store.dispatch('weatherstore/sortWeatherData', this.text);
        }
    },
    created() {
        this.text = this.$store.getters['weatherstore/getSortType'];
    }
}
</script>

<style>

</style>