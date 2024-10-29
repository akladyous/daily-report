export const getGeocodingCoordinates = async (apiKey, geoLocation) => {
    if (!apiKey || !geoLocation) {
        console.error("Missing required parameters: apiKey, geoLocation");
        return null;
    }

    const query = `${geoLocation.city},${geoLocation.state},${geoLocation.country}`;
    const encodedQuery = encodeURIComponent(query);
    const coordinatesByLocationNameUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodedQuery}&limit=1&appid=${apiKey}`;

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
        const latitude = coordinates.lat;
        const longitude = coordinates.lon;

        if (!latitude || !longitude) {
            return null;
        }
        return { latitude, longitude };
    } catch (error) {
        console.error("Error fetching geocoding data:", error);
        return null;
    }
};
