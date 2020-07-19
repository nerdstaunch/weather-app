<template>
    <v-card elevation="0" class="weatherCard d-flex flex-column justify-center">
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title>
                   {{this.weatherObject._country._name}} - {{this.weatherObject._name}}
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
        <div class="subtitleArea d-flex flex-no-wrap justify-space-around py-2">
            <div>
                <v-card-text class="py-0">
                    Feels like
                </v-card-text>
                <v-card-subtitle class="py-0">
                    {{this.feelsLike}}
                </v-card-subtitle>
            </div>
            <div>
                <v-card-text class="py-0">
                    Humidity
                </v-card-text>
                <v-card-subtitle class="py-0">
                    {{this.humidity}}
                </v-card-subtitle>
            </div>
            <div>
                <v-card-text class="py-0">
                    Wind
                </v-card-text>
                <v-card-subtitle class="py-0">
                    {{this.wind}}
                </v-card-subtitle>
            </div>
        </div>
        <div class="d-flex justify-center py-2">
            <div>
                <v-card-subtitle class="py-0">
                    Last updated: {{ this.lastUpdated }}
                </v-card-subtitle>
            </div>
        </div>
    </v-card>
</template>
<script>
export default {
    name: "SuburbCard",
    props:{
        weatherObject: Object
    },
    computed: {
        temperature() {
            if(this.weatherObject._weatherTemp) {
                return this.weatherObject._weatherTemp + '°C';
            }
            else {
                return "No Temp Data";
            }
        },
        humidity() {
            if(this.weatherObject._weatherHumidity) {
                let humidity = this.weatherObject._weatherHumidity.split(' ')[1];
                return humidity;
            }
            else {
                return "No Humidity Data";
            }
        },
        feelsLike() {
            if(this.weatherObject._weatherFeelsLike) {
                return this.weatherObject._weatherFeelsLike + '°C';
            }
            else {
                return "No Temp Data";
            }
        },
        wind() {
            if(this.weatherObject._weatherWind) {
                return this.weatherObject._weatherWind.replace('Wind: ', '');
            }
            else {
                return "No Wind Data";
            }
        },
        lastUpdated() {
            if(this.weatherObject._weatherLastUpdated) {
                let date = new Date(this.weatherObject._weatherLastUpdated * 1000);
                return date.toLocaleString();
            }
            else {
                return "No Date Data";
            }
        }
    }
}
</script>

<style scoped>
.weatherCard {
    padding: 20px;
    margin-bottom: 10px;
    transition: 200ms;
    min-height: 126px;
}

.subtitleArea {
    border-top: 1px solid #4f4f4f;
    border-bottom: 1px solid #4f4f4f;
    border-radius: 0 !important;
}

.temperature {
    font-size: 28px;
    margin: 0;
}

</style>
