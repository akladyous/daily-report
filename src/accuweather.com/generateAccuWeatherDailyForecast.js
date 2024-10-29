import { getAccuWeatherGeocodingCoordinates } from "./getAccuWeatherGeocodingCoordinates.js";
import { getAccuWeatherDailyForecasts } from "./getAccuWeatherDailyForecasts.js";
import { generateForecastEmail } from "./generateForecastEmail.js";

export const generateAccuWeatherDailyForecast = async () => {
    const apiKey = process.env.ACCUWEATHER_API_KEY;
    const geoLocation = {
        country: "US",
        state: "florida",
        city: "West Palm Beach",
        zip: "33417",
    };

    // const coordinates = await getAccuWeatherGeocodingCoordinates(apiKey, geoLocation);
    const coordinates = { latitude: 26.715, longitude: 26.715, locationKey: "328167" };
    if (!coordinates) {
        console.error("Failed to retrieve coordinates. Please check the location details.");
        return;
    }
    console.log("Coordinates:", coordinates);

    const forecast = await getAccuWeatherDailyForecasts(coordinates.locationKey, apiKey);
    if (!forecast) {
        console.error("Failed to retrieve weather data.");
        return;
    }
    console.log("Weather:\n", forecast);

    const email = generateForecastEmail(forecast);
    return email;
};
