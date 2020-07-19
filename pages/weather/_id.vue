<template>
    <v-container class="pt-0">
        <v-row class="pt-0">
            <SuburbNavBar/>
        </v-row>
        <v-row>
            <v-col>
                <SuburbCard v-if="this.weatherObject" :weatherObject="this.weatherObject"/>
                <div v-else-if="this.isLoading">
                    <v-progress-circular
                        class="progressCircle"
                        indeterminate
                        :size='120'
                        :width='8'
                        color="primary"
                    ></v-progress-circular>
                </div>
                <div v-else>
                    No Weather Found
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SuburbNavBar from '~/components/SuburbNavBar.vue';
import SuburbCard from '~/components/SuburbCard.vue';

export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
    computed: {
        weatherObject() {
            let weatherData = this.$store.getters['weatherstore/getAllWeatherData'];
            let cloneWeatherData = JSON.parse(JSON.stringify(weatherData));
            let foundWeather = cloneWeatherData.filter(obj => obj._venueID == this.id);

            return foundWeather[0];
        },
        isLoading() {
            return this.$store.getters['weatherstore/getIsLoading'];
        },
    }
}
</script>

<style scoped>
.progressCircle{
    transform: translate(calc(50vw - 75%) , calc(10vh - 50%));
}


</style>