process.env.TZ = "America/New_York";
import { createTransport } from "nodemailer";

if (!process.env.GITHUB_ACTIONS) {
    process.loadEnvFile();
}

export async function main() {
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
        text: "hello world",
    });
}

await main();
