export const getOpenWeatherMap = async (latitude, longitude, apiKey, unit = "imperial") => {
    debugger;
    if (!apiKey || !latitude || !longitude) {
        console.error("Missing required parameters: apiKey, latitude, or longitude");
        return null;
    }
    const dataUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

    try {
        const response = await fetch(dataUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            const err = await response.json();
            console.error("Error fetching weather data:", response.statusText);
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};
