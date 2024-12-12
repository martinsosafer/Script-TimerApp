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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Co-Producer by Script-Timer</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

        body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, Arial, sans-serif;
            line-height: 1.5;
            color: #000000;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
            font-weight: 500;
        }
        .container {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            padding: 30px;
        }
        .header {
            background-color: #0066FF;
            color: white;
            text-align: center;
            padding: 15px;
            border-radius: 20px;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 500;
            font-family: 'Poppins', sans-serif, Arial, sans-serif;
        }
        .features {
            margin-top: 15px;
        }
        .feature {
            background-color: #f8f9fa;
            border-left: 4px solid #0066FF;
            padding: 10px 15px;
            margin-bottom: 10px;
            border-radius: 0 5px 5px 0;
        }
        .feature h3 {
            margin-top: 0;
            margin-bottom: 5px;
            color: #0066FF;
            font-size: 16px;
            font-weight: 500;
            font-family: 'Poppins', sans-serif, Arial, sans-serif;
        }
        .feature p {
            margin: 0;
            font-size: 14px;
            font-weight: 500;
            color: #000000;
            font-family: 'Poppins', sans-serif, Arial, sans-serif;
        }
        .signature {
            margin-top: 20px;
            text-align: center;
            color: #000000;
        }
        .signature p {
            font-weight: 500;
            font-family: 'Poppins', sans-serif, Arial, sans-serif;
        }
        .footer {
            margin-top: 15px;
            text-align: center;
            font-size: 11px;
            color: #000000;
            font-family: 'Poppins', sans-serif, Arial, sans-serif;
        }
        p {
            font-weight: 500;
            margin-bottom: 10px;
            color: #000000;
            font-family: 'Poppins', sans-serif, Arial, sans-serif;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Co-Producer</h1>
        </div>

        <p>Hi,</p>

        <p>We are happy you're here! Co-Producer (by Script-Timer) makes it easy to save time and money creating.</p>

        <a href="${url}" style="
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #FF9900;
            color: white; /* Ensuring white text color */
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 700;
            font-family: 'Poppins', sans-serif, Arial, sans-serif;
            font-size: 16px;
        ">
            Click here to login
        </a>

        <div class="features">
            <div class="feature">
                <h3>✍️ Write with a Pro</h3>
                <p>Our writing assistant will help you formulate your ideas to compelling scripts, checked for plagiarism if you'd like!</p>
            </div>

            <div class="feature">
                <h3>🎙️ Voice-over Magic</h3>
                <p>Bring your message to life with hundreds of voices.</p>
            </div>

            <div class="feature">
                <h3>🖼️ Image Creation</h3>
                <p>Create slides, storyboards, images to share your vision.</p>
            </div>
        </div>

        <p>More time and money saving tips & tricks in the coming days, so keep us in your inbox.</p>

        <p>Your voice matters!</p>

        <div class="signature">
            <p>Cheers,<br>
            Maury Rogow<br>
            <strong>Founder & CEO</strong></p>
        </div>

        <div class="footer">
            <p>© Script-Timer | Empowering Creators</p>
        </div>
    </div>
</body>
</html>

      `,
    });
  } catch (error) {
    console.log({ error });
  }
};
