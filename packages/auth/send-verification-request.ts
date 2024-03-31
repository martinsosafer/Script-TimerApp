import type { SendVerificationRequestParams } from "next-auth/providers";

import { resend } from "@voiceai/email/resend/client";

export const sendVerificationRequest = async ({
  identifier,
  url,
}: SendVerificationRequestParams) => {
  try {
    await resend.emails.send({
      from: "login@script-timer.ai",
      to: identifier,
      subject: "LogIn to Script Timer",
      html: `
         <html>
        <head>
          <style>
            h2 {
              color: #333;
            }
            p {
              color: #666;
            }
            a {
              color: #007bff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <h2>Hi, ${identifier},</h2>
          <p>Glad you're here.</p>
          <p>Script-Timer makes it super easy to turn any idea into a script and give that script a voice.</p>
          <h2>To get started:</h2>
          <ul>
            <li><a href="${url}">Click here to login</a></li>
            <li><a href="https://script-timer.ai/">Click here to watch our walkthrough video guide</a></li>
          </ul>
          <h2>When you're logged in:</h2>
          <ul>
            <li><strong>✍️ Write like a Pro:</strong> Our AI-driven writing assistant will help you formulate your ideas into compelling scripts. Whether you're crafting a speech, a marketing video, or a podcast, you'll find your words flowing effortlessly. Need grammar or spelling support - that's in here too!</li>
            <li><strong>🎙️ Voice-over Magic:</strong> Once your script is penned, you're just a few clicks away from turning text into lifelike speech. Our diverse range of AI voices is designed to captivate your audience, bringing your message to life. Once you hit CREATE, the voice generates. Voila, your voice awaits, and you can edit, change, adjust, and improve.</li>
          </ul>
          <p>I'll be sending more tips & tricks over the coming days, so keep an eye out!</p>
          <p>I'm always here if you have any questions or feedback.</p>
          <p>Your voice matters!</p>
          <p>Cheers,</p>
          <p>Maury Rogow</p>
          <p>Founder & CEO</p>
        </body>
        </html>
      `,
    });
  } catch (error) {
    console.log({ error });
  }
};
