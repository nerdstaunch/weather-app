<template>
    <v-card elevation="0" class="weatherCard d-flex flex-column justify-center">
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title>
                    {{this.weatherObject._name}}
                </v-card-title>
                <v-card-subtitle>
                    {{this.weatherObject._weatherCondition}}
                </v-card-subtitle>
            </div>
            <div class="d-flex flex-column justify-center">
                <v-card-title class="temperature">
                    {{this.temperature}}
                </v-card-title>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    name:"WeatherCard",
    props: {
        weatherObject: Object
    },
    computed: {
        temperature() {
            if(this.weatherObject._weatherTemp) {
                return this.weatherObject._weatherTemp + '°C';
            }
            else {
                return "No Temp data"
            }
        }
    },

}
</script>

<style scoped>
.weatherCard {
    padding: 20px;
    margin-bottom: 10px;
    transition: 200ms;
    min-height: 126px;
}
.weatherCard:hover {
    background: #4f4f4f;
    cursor: pointer;
}

.temperature {
    font-size: 28px;
    margin: 0;
}

</style>
