<template>
    <v-container class="pt-0" >
        <v-row class="pt-0">
            <IndexNavBar/>
        </v-row>
        <v-row>
            <v-col>
                <div v-if="this.isLoading == false">
                    <FilterButtons
                        @countryFilter="changeCountryFilter"
                        @weatherFilter="changeWeatherFilter"
                    />
                    <p>Last Refreshed: {{this.lastLoaded.toLocaleString()}}</p>

                    <nuxt-link v-for="(weatherObject, index) in this.weatherData" :key="index" :to="{path: `weather/${weatherObject._venueID}`}" >
                        <WeatherCard :weatherObject='weatherObject'/>
                    </nuxt-link>

                    <p v-if="this.weatherData.length == 0">
                        0 Results for {{ this.countryFilter._name }} and {{ this.weatherFilter }}
                    </p>
                </div>
                <div v-else class="d-flex justify-center">
                    <v-progress-circular
                        class="progressCircle"
                        indeterminate
                        :size='120'
                        :width='8'
                        color="primary"
                    ></v-progress-circular>
                </div>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import WeatherCard from '~/components/WeatherCard.vue';
import IndexNavBar from '~/components/IndexNavBar.vue';
import FilterButtons from '~/components/FilterButtons.vue';

export default {
    name: "Index",
    components: {
        WeatherCard,
        IndexNavBar,
        FilterButtons
    },
    data() {
        return {
            title: "Weather App",
            countryFilter: null,
            weatherFilter: null,
        }
    },
    methods: {
        changeCountryFilter(country) {
            this.countryFilter = country;
        },
        changeWeatherFilter(weather) {
            this.weatherFilter = weather;
        }
    },
    computed: {
        weatherData() {
            let weatherData = this.$store.getters['weatherstore/getWeatherData'];

            if(this.countryFilter == null && this.weatherFilter == null) {
                return weatherData;
            }

            // Make a clone of the weatherData when we are going to apply filters
            // because we may get unexpected results due to passing by reference
            let filteredData = JSON.parse(JSON.stringify(weatherData));

            if(this.countryFilter) {
                filteredData = filteredData.filter(obj => {
                    if(obj._country._countryID == this.countryFilter._countryID) {
                        return true;
                    }
                });
            }

            if(this.weatherFilter) {
                filteredData = filteredData.filter(obj => {
                    if(obj._weatherCondition == this.weatherFilter) {
                        return true;
                    }
                });
            }

            return filteredData;
        },
        isLoading() {
            return this.$store.getters['weatherstore/getIsLoading'];
        },
        lastLoaded() {
            return this.$store.getters['weatherstore/getLastLoaded']
        },
    },
}
</script>

<style scoped>
.progressCircle{
    transform: translateY(calc(25vh - 50%));
}

a {
    text-decoration: none !important;
}
</style>