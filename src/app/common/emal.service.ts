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

        if (response) {
            return true;
        } else {
            return false;
        }
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
        
                        <div class="container" dir="rtl" lang="ar">
                            <h1>رسالة نسيان كلمة المرور</h1>
                            <p>تلقيت هذا البريد الإلكتروني لأننا تلقينا طلب إعادة تعيين كلمة المرور الخاصة بحسابك.</p>
                            <p>انقر فوق الزر أدناه لإعادة تعيين كلمة المرور الخاصة بك:</p>
                            <a href="${process.env.DOMAIN_URL}/reset-password/${token}">إعادة تعيين كلمة المرور</a>
                        </div>
                    </body>
                </html>
            `
        };

        const response = await this.sendEmail(msg);

        return response;
    }

    async sendProjectStatusEmail(emailData) {
        const msg = {
            to: emailData.email,
            from: 'amani@aiqatar.qa',
            subject: 'Project Status Email',
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
                                border-radius: 5px;
                                padding: 10px 20px;
                                text-decoration: none;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Project Status Email</h1>
                            <p>Your project ${emailData.project_name} has been ${emailData.project_status}</p>
                        </div>
    
                        <div class="container" dir="rtl" lang="ar">
                            <h1>رسالة حالة المشروع</h1>
                            <p>تم تحديث حالة مشروعك ${emailData.project_name} إلى ${emailData.project_status}</p>
                        </div>
                    </body>
                </html>
            `
        };

        const response = await this.sendEmail(msg);

        return response;
    }

    async sendRegistrationEmail(emailData) {
        const msg = {
            to: emailData.email,
            from: 'amani@aiqatar.qa',
            subject: 'Registration Email',
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
                                border-radius: 5px;
                                padding: 10px 20px;
                                text-decoration: none;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Registration Email</h1>
                            <p>Your registration is successful for fozdeal for ${emailData.email}</p>
                        </div>
    
                        <div class="container" dir="rtl" lang="ar">
                            <h1>رسالة تأكيد التسجيل</h1>
                            <p>تم التسجيل بنجاح لـ fozdeal لـ ${emailData.email}</p>
                        </div>
                    </body>
                </html>
            `
        };

        const response = await this.sendEmail(msg);

        return response;
    }

    async sendPaymentEmail(emailData) {
        const msg = {
            to: emailData.email,
            from: 'amani@aiqatar.qa',
            subject: 'Payment Email',
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
                                border-radius: 5px;
                                padding: 10px 20px;
                                text-decoration: none;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Payment Email</h1>
                            <p>Your payment is ${emailData.status} for transaction number ${emailData.transaction_number}</p>
                        </div>
    
                        <div class="container" dir="rtl" lang="ar">
                            <h1>رسالة الدفع</h1>
                            <p>تم ${emailData.status} دفعك للعملية رقم ${emailData.transaction_number}</p>
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
