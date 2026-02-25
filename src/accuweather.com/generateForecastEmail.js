export function generateForecastEmail(forecast) {
    const { Headline, DailyForecasts } = forecast;
    const dailyForecast = DailyForecasts[0];

    const formattedDate = new Date(dailyForecast.Date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const emailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Daily Weather Forecast</title>
    </head>
    <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f9;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background-color: #4a90e2; padding: 20px; text-align: center; color: white;">
                <h2 style="margin: 0;" class="weatherHeader">Weather Forecast for ${formattedDate}</h2>
            </div>

            <!-- Headline Section -->
            <div style="padding: 20px;">
                <p style="font-size: 1.1em; color: #555;"><strong>Headline:</strong> ${Headline.Text}</p>
                <p style="color: #888;"><strong>Effective Date:</strong> ${new Date(Headline.EffectiveDate).toLocaleString()}</p>
            </div>

            <!-- Today's Weather Section -->
            <div style="background-color: #f0f7fd; padding: 20px;">
                <h3 style="color: #333; margin-top: 0;">Today's Weather</h3>
                <p><strong>Day Conditions:</strong> ${dailyForecast.Day.IconPhrase}</p>
                <p><strong>Night Conditions:</strong> ${dailyForecast.Night.IconPhrase}</p>
            </div>

            <!-- Temperature Section -->
            <div style="padding: 20px;">
                <h3 style="color: #333; margin-top: 0;">Temperature</h3>
                <p><strong>Min Temperature:</strong> ${dailyForecast.Temperature.Minimum.Value}°C</p>
                <p><strong>Max Temperature:</strong> ${dailyForecast.Temperature.Maximum.Value}°C</p>
            </div>

            <!-- Precipitation Section -->
            <div style="background-color: #f0f7fd; padding: 20px;">
                <h3 style="color: #333; margin-top: 0;">Precipitation</h3>
                <p><strong>Precipitation Probability:</strong> ${dailyForecast.Day.PrecipitationProbability}%</p>
            </div>

            <!-- Wind Section -->
            <div style="padding: 20px;">
                <h3 style="color: #333; margin-top: 0;">Wind</h3>
                <p><strong>Wind Speed:</strong> ${dailyForecast.Day.Wind.Speed.Value} km/h (${dailyForecast.Day.Wind.Direction.Localized})</p>
            </div>

            <!-- Weather Summary Section -->
            <div style="background-color: #f0f7fd; padding: 20px;">
                <h3 style="color: #333; margin-top: 0;">Weather Summary</h3>
                <p><strong>Description:</strong> ${dailyForecast.Day.LongPhrase}</p>
            </div>

            <!-- Air Quality Section -->
            <div style="padding: 20px;">
                <h3 style="color: #333; margin-top: 0;">Air Quality</h3>
                <p><strong>Air Quality Index:</strong> ${dailyForecast.AirAndPollen[0].Value} (${dailyForecast.AirAndPollen[0].Category})</p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 20px; background-color: #e6eff8;">
                <p style="margin: 0; font-size: 0.9em; color: #555;">For more details, visit the <a href="${
                    Headline.Link
                }" style="color: #4a90e2; text-decoration: none;">weather link</a>.</p>
            </div>
        </div>
    </body>
    </html>

    `;

    return emailBody;
}
