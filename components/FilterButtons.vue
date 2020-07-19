<template>
    <v-container class="px-0 py-0">
        <v-row class="px-0 py-0">
            <v-col>
                <v-menu top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                        >
                            Country
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                            v-for="(item, index) in this.countryList"
                            :key="index"
                            @click="changeCountryFilter(item)"
                        >
                            <v-list-item-title>{{ item._name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-chip
                    v-if="selectedCountry"
                    class="ml-2"
                    close
                    @click:close="selectedCountry = null"
                >
                    {{ selectedCountry._name }}
                </v-chip>

            </v-col>
            <v-col>
                <v-menu top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                        >
                            Weather
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                            v-for="(item, index) in this.weatherList"
                            :key="index"
                            @click="changeWeatherFilter(item)"
                        >
                            <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-chip
                    v-if="selectedWeather"
                    close
                    class="ml-2"
                    @click:close="selectedWeather = null"
                >
                    {{ selectedWeather }}
                </v-chip>
            </v-col>
        </v-row>
    </v-container>
                    
</template>

<script>
export default {
    name: "FilterButtons",
    data() {
        return {
            selectedCountry: null,
            selectedWeather: null,
        }
    },
    computed: {
        countryList() {
            return this.$store.getters['weatherstore/getCountries'];
        },
        weatherList() {
            return this.$store.getters['weatherstore/getWeatherConditions'];
        }
    },
    methods: {
        changeCountryFilter(country) {
            this.selectedCountry = country;
        },
        changeWeatherFilter(weather) {
            this.selectedWeather = weather;
        }
    },
    watch: {
        selectedCountry() {
            this.$emit('countryFilter', this.selectedCountry);
        },
        selectedWeather() {
            this.$emit('weatherFilter', this.selectedWeather);
        }
    }


}
</script>

<style scoped>

</style>