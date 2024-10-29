process.env.TZ = "America/New_York";
import { createTransport } from "nodemailer";
import { generateAccuWeatherDailyForecast } from "./accuweather.com/generateAccuWeatherDailyForecast.js";

if (!process.env.GITHUB_ACTIONS) {
    process.loadEnvFile();
}

async function sendEmail(content) {
    const transporter = createTransport({
        service: "gmail",
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: "Daily Report",
        html: content,
    });
}

export async function main() {
    try {
        const email = await generateAccuWeatherDailyForecast();
        if (email) {
            await sendEmail(email);
        } else {
            console.error("Failed to generate email content. Please check the weather data retrieval.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

await main();
