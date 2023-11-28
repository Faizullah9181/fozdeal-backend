import * as sgMail from '@sendgrid/mail';
import * as fs from 'fs/promises';

const path = require('path');
class GridEmailService {
    async sendEmail(message: any) {
        sgMail.setApiKey(process.env.SEND_GRID_KEY);

        try {
            await sgMail.send(message);
            console.log('Email sent');
            return true;
        } catch (error) {
            console.error(error);
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
                <!-- Forgot Password Email Template -->
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
            `
        };

        const response = await this.sendEmail(msg);
        return response;
    }

    async sendProjectStatusEmail(emailData) {
        let htmlPath;

        if (emailData.language === 'en') {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'projectstatus.html'
            );
        } else {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'projectstatusArabic.html'
            );
        }

        const html = await fs.readFile(htmlPath, 'utf8');

        const name = emailData.name;
        const project_name = emailData.project_name;
        const project_status = emailData.project_status;

        const populatedHtml = html
            .replace('${name}', name)
            .replace('${projectName}', project_name)
            .replace('${projectStatus}', project_status);

        const msg = {
            to: emailData.email,
            from: 'amani@aiqatar.qa',
            subject: 'Project Status Email',
            html: populatedHtml
        };

        const response = await this.sendEmail(msg);
        return response;
    }

    async sendRegistrationEmail(emailData) {
        let htmlPath;

        if (emailData.language === 'en') {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'registerTemplate.html'
            );
        } else {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'registerTemplateArabic.html'
            );
        }

        const html = await fs.readFile(htmlPath, 'utf8');

        const name = emailData.first_name;

        const populatedHtml = html.replace('${name}', name);

        const msg = {
            to: emailData.email,
            from: 'amani@aiqatar.qa',
            subject: 'Registration Email',
            html: populatedHtml
        };

        const response = await this.sendEmail(msg);
        return response;
    }

    async sendPaymentEmail(emailData) {
        let htmlPath;
        if (emailData.language === 'en') {
            htmlPath = path.join(__dirname, '..', 'views', 'payment.html');
        }
        if (emailData.language === 'ar') {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'paymentArabic.html'
            );
        }

        const html = await fs.readFile(htmlPath, 'utf8');

        const status = emailData.status;

        const name = emailData.name;

        const populatedHtml = html

            .replace('${status}', status)
            .replace('${name}', name);

        const msg = {
            to: emailData.email,
            from: 'amani@aiqatar.qa',
            subject: 'Payment Email',
            html: populatedHtml
        };

        const response = await this.sendEmail(msg);
        return response;
    }

    async sendContactEmailToAdmin(emailData) {
        let htmlPath;
        if (emailData.language === 'en') {
            htmlPath = path.join(__dirname, '..', 'views', 'contact.html');
        }
        if (emailData.language === 'ar') {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'contactArabic.html'
            );
        }

        const html = await fs.readFile(htmlPath, 'utf8');

        const sender_email = emailData.sender_email;
        const note = emailData.note;

        const populatedHtml = html
            .replace('${sender_email}', sender_email)
            .replace('${note}', note);

        const msg = {
            to: 'anzalabidi@gmailcom',
            from: emailData.sender_email,
            subject: 'Contact Email',
            html: populatedHtml
        };

        const response = await this.sendEmail(msg);

        return response;
    }
}
export default new GridEmailService();
