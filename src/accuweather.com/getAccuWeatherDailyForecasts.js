export const getAccuWeatherDailyForecasts = async (locationKey, apiKey, language = "en-us", details = true, metric = true) => {
    if (!locationKey || !apiKey) {
        console.error("Missing required parameters: apiKey, latitude, or longitude");
        return null;
    }
    // "http://dataservice.accuweather.com/forecasts/v1/daily/1day/{locationKey}" // 328167
    const dataUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}&language=${language}&details=${details}&metric=${metric}`;

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
