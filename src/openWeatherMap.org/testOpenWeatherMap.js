import { getGeocodingCoordinates } from "./getGeocodingCoordinates.js";
import { getOpenWeatherMap } from "./getOpenWeatherMap.js";

export const testOpenWeatherMap = async () => {
    const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
    const geoLocation = {
        country: "US",
        state: "florida",
        city: "West Palm Beach",
        zip: "33417",
    };

    const coordinates = await getGeocodingCoordinates(apiKey, geoLocation);
    if (!coordinates) {
        console.error("Failed to retrieve coordinates. Please check the location details.");
        return;
    }

    console.log("Coordinates:", coordinates);

    debugger;
    const weather = await getOpenWeatherMap(coordinates.latitude, coordinates.longitude, apiKey);
    if (!weather) {
        console.error("Failed to retrieve weather data.");
        return;
    }

    console.log("Weather:\n", weather);
};
