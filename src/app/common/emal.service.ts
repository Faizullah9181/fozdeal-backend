import * as sgMail from '@sendgrid/mail';

class GridEmailService {
    async sendEmail(message: any) {
        sgMail.setApiKey(process.env.SEND_GRID_KEY);

        const response = sgMail
            .send(message)
            .then(() => {
                console.log('Email sent');
            })
            .catch((error) => {
                console.error(error);
            });

        return response;
    }

    async sendForgotPasswordEmail(emailData) {
        const token = emailData.token;

        const msg = {
            to: emailData.email,
            from: 'amani@aiqatar.qa',
            subject: 'Forgot Password Email',
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f2f2f2;
                                padding: 20px;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 5px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            }
                            h1 {
                                color: #333333;
                                font-size: 24px;
                                margin-bottom: 20px;
                            }
                            p {
                                color: #555555;
                                font-size: 16px;
                                margin-bottom: 20px;
                            }
                            a {
                                color: #ffffff;
                                background-color: #007bff;
                                border-radius: 5px;
                                padding: 10px 20px;
                                text-decoration: none;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Forgot Password Email</h1>
                            <p>You are receiving this email because we received a password reset request for your account.</p>
                            <p>Click the button below to reset your password:</p>
                            <a href="${process.env.DOMAIN_URL}/reset-password/${token}">Reset Password</a>
                        </div>
                    </body>
                </html>
            `
        };

        const response = await this.sendEmail(msg);

        return response;
    }
}

export default new GridEmailService();
