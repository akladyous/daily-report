export const getAccuWeatherGeocodingCoordinates = async (apiKey, geoLocation) => {
    if (!apiKey || !geoLocation) {
        console.error("Missing required parameters: apiKey, geoLocation");
        return null;
    }

    const query = `${geoLocation.city},${geoLocation.state},${geoLocation.country}`;
    const encodedQuery = encodeURIComponent(query);

    // `http://dataservice.accuweather.com/locations/v1/cities/${country}/search?q=${encodedCity}&apikey=${process.env.ACCUWEATHER_API_KEY}`;
    const coordinatesByLocationNameUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?q=${encodedQuery}&apikey=${apiKey}`;

    try {
        const response = await fetch(coordinatesByLocationNameUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            console.error("Error fetching geocoding data:", response.statusText);
            return null;
        }

        const coordinatesData = await response.json();
        if (!Array.isArray(coordinatesData) || coordinatesData.length === 0) {
            console.error("No data found for the provided location.");
            return null;
        }
        const coordinates = coordinatesData[0];
        const latitude = coordinates.GeoPosition.Latitude;
        const longitude = coordinates.GeoPosition.Latitude;
        const locationKey = coordinates["Key"];

        if (!latitude || !longitude || !locationKey) {
            return null;
        }
        return { latitude, longitude, locationKey };
    } catch (error) {
        console.error("Error fetching geocoding data:", error);
        return null;
    }
};

// Example usage:
// const apiKey = process.env.ACCUWEATHER_API_KEY;
// const geoLocation = { city: "New York", state: "NY", country: "US" };
// const coordinates = await getAccuWeatherGeocodingCoordinates(apiKey, geoLocation);
// console.log(coordinates);
