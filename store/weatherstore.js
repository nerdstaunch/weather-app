import axios from 'axios'

export const state = () => ({
    isLoading: false,
    allWeatherData: [],
    alphabeticalWeatherData: [],
    temperatureWeatherData: [],
    lastUpdatedWeatherData: [],
    countryList: [],
    weatherConditionList: [],
    lastLoaded: null,
    sortType: "alphabet",
});

export const mutations = {
    SET_LOADING_STATUS(state, status) {
        state.isLoading = status;
    },
    SET_ALL_WEATHER_DATA(state, weatherData) {
        // Load all the weatherObjects
        state.allWeatherData = weatherData;

        // The countryList should only include countries actually in the data, not every single country
        for(let weatherObject of weatherData) {
            let index = state.countryList.findIndex(element => element._countryID == weatherObject._country._countryID);
            if(index == -1) {
                state.countryList.push(weatherObject._country)
            }

            // Populate the weatherConditionList in the same loop
            if(!state.weatherConditionList.includes(weatherObject._weatherCondition) && weatherObject._weatherCondition != undefined) {
                state.weatherConditionList.push(weatherObject._weatherCondition)
            }
        }
    },
    SET_LAST_LOADED(state, time) {
        state.lastLoaded = time;
    },
    SET_SORT_TYPE(state, sortType) {
        state.sortType = sortType;
    },
    SET_ALPHABETICAL_WEATHER_DATA(state, weatherData) {
        let localWeatherData = JSON.parse(JSON.stringify(weatherData));

        function compareAlphabet(a, b) {
            if(a._name < b._name) {
                return -1;
            }
            if(a._name > b._name) {
                return 1;
            }
            return 0;
        }

        let sortedArray = localWeatherData.sort(compareAlphabet);
        state.alphabeticalWeatherData = sortedArray;
    },
    SET_TEMPERATURE_WEATHER_DATA(state, weatherData) {
        let localWeatherData = JSON.parse(JSON.stringify(weatherData));

        // Remove all the places that dont give us temperature >:(
        localWeatherData = localWeatherData.filter(obj => Object.keys(obj).includes('_weatherTemp'));

        function compareTemp(a, b) {
            if (parseInt(a._weatherTemp) > parseInt(b._weatherTemp)) {
                return -1;
            }
            if(parseInt(a._weatherTemp) < parseInt(b._weatherTemp)) {
                return 1;
            }
            return 0;
        }

        let sortedArray = localWeatherData.sort(compareTemp);
        state.temperatureWeatherData = sortedArray;
    },
    SET_LAST_UPDATED_WEATHER_DATA(state, weatherData) {
        let localWeatherData = JSON.parse(JSON.stringify(weatherData));

        function compareLastUpdate(a, b) {
            if(a._weatherLastUpdated > b._weatherLastUpdated) {
                return -1;
            }
            if(a._weatherLastUpdated < b._weatherLastUpdated) {
                return 1;
            }
            return 0;
        }

        let sortedArray = localWeatherData.sort(compareLastUpdate);
        state.lastUpdatedWeatherData = sortedArray;
    }

}

export const actions = {
    fetchWeatherData(context) {
        // Getting errors with CORS, not too sure how to fix without access to the server
        // As a workaround I have decided to use a free proxy server (fingers crossed it stays online)
        let proxyURL = 'https://cors-anywhere.herokuapp.com/';
        let dataURL = 'https://dnu5embx6omws.cloudfront.net/venues/weather.json';
        let fullURL = proxyURL + dataURL;

        context.commit('SET_LOADING_STATUS', true);
        axios.get(fullURL)
        .then(response => {
            let time = new Date()
            let weatherData = response.data.data;
            context.commit('SET_LOADING_STATUS', false);
            context.commit('SET_ALL_WEATHER_DATA', weatherData);
            context.commit('SET_LAST_LOADED', time);

            context.commit('SET_ALPHABETICAL_WEATHER_DATA', weatherData);
            context.commit('SET_TEMPERATURE_WEATHER_DATA', weatherData);
            context.commit('SET_LAST_UPDATED_WEATHER_DATA', weatherData);
        })
        .catch(err => {
            console.log(err);
            context.commit('SET_LOADING_STATUS', false);
        });
    },
    sortWeatherData(context, sortType) {
        context.commit('SET_SORT_TYPE', sortType)
    }
}

export const getters = {
    getIsLoading(state) {
        return state.isLoading;
    },
    getAllWeatherData(state) {
        // This one is used for the /weather/id page
        return state.allWeatherData;
    },
    getWeatherData(state) {
        switch(state.sortType) {
            case "alphabet":
                return state.alphabeticalWeatherData;
            case "temperature":
                return state.temperatureWeatherData;
            case "lastUpdated":
                return state.lastUpdatedWeatherData;
        }
    },
    getCountries(state) {
        return state.countryList;
    },
    getWeatherConditions(state) {
        return state.weatherConditionList;
    },
    getLastLoaded(state) {
        return state.lastLoaded;
    },
    getSortType(state) {
        return state.sortType;
    }
}