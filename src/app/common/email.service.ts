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

            console.log(JSON.stringify(error.response.body.errors));
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
                    <p>Click on the follwing button given below to reset your password:</p>
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
        let html;
        let name;
        let note;

        if (
            emailData.project_status === 'approved' &&
            emailData.language === 'en'
        ) {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'projectaccptedstatus.html'
            );
            html = await fs.readFile(htmlPath, 'utf8');

            name = emailData.name;
        }
        if (
            emailData.project_status === 'approved' &&
            emailData.language === 'ar'
        ) {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'projectaccptedstatusArabic.html'
            );
            html = await fs.readFile(htmlPath, 'utf8');

            name = emailData.name;
        }
        if (
            emailData.project_status === 'rejected' &&
            emailData.language === 'en'
        ) {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'projectrejectionstatus.html'
            );
            html = await fs.readFile(htmlPath, 'utf8');

            name = emailData.name;
            note = emailData.note;
        }
        if (
            emailData.project_status === 'rejected' &&
            emailData.language === 'ar'
        ) {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'projectrejectionstatusArabic.html'
            );
            html = await fs.readFile(htmlPath, 'utf8');

            name = emailData.name;
            note = emailData.note;
        }

        if (
            emailData.project_status === 'modification_required' &&
            emailData.language === 'en'
        ) {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'projectmodificationstatus.html'
            );
            html = await fs.readFile(htmlPath, 'utf8');

            name = emailData.name;
            note = emailData.note;
        }
        if (
            emailData.project_status === 'modification_required' &&
            emailData.language === 'ar'
        ) {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'projectmodificationstatusArabic.html'
            );
            html = await fs.readFile(htmlPath, 'utf8');

            name = emailData.name;
            note = emailData.note;
        }

        let populatedHtml = html.replace('${name}', name);
        if (note) {
            populatedHtml = populatedHtml.replace('${note}', note);
        }

        const msg = {
            to: emailData.email,
            from: 'amani@aiqatar.qa',

            subject:
                emailData.language === 'en'
                    ? 'Project Status Email'
                    : 'رسالة حالة المشروع',
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
            subject:
                emailData.language === 'en'
                    ? 'Registration Email'
                    : 'رسالة تسجيل',
            html: populatedHtml
        };

        const response = await this.sendEmail(msg);
        return response;
    }

    async sendPaymentEmail(emailData) {
        let htmlPath;

        if (emailData.language === 'en') {
            htmlPath = path.join(__dirname, '..', 'views', 'payment.html');
        } else {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'paymentArabic.view.html'
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
            subject:
                emailData.language === 'en' ? 'Payment Email' : 'رسالة الدفع',
            html: populatedHtml
        };

        const response = await this.sendEmail(msg);
        return response;
    }

    async sendContactEmailToAdmin(emailData) {
        let htmlPath;

        htmlPath = path.join(__dirname, '..', 'views', 'contact.html');

        const html = await fs.readFile(htmlPath, 'utf8');

        const note = emailData.note;

        const populatedHtml = html.replace(
            '${note}',
            note + '\nThis email is From: ' + emailData.sender_email
        );

        const msg = {
            to: 'amani@aiqatar.qa',
            from: 'amani@aiqatar.qa',
            subject: 'Contact Email',
            html: populatedHtml
        };

        const response = await this.sendEmail(msg);
        return response;
    }

    async sendProductUploadEmail(emailData) {
        let htmlPath;

        if (emailData.language === 'en') {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'projectupload.html'
            );
        } else {
            htmlPath = path.join(
                __dirname,
                '..',
                'views',
                'projectuploadArabic.html'
            );
        }

        const html = await fs.readFile(htmlPath, 'utf8');

        const name = emailData.name;

        const populatedHtml = html.replace('${name}', name);

        const msg = {
            to: emailData.email,
            from: 'amani@aiqatar.qa',
            subject:
                emailData.language === 'en'
                    ? 'Project Upload Email'
                    : 'رسالة تحميل المشروع',
            html: populatedHtml
        };

        const response = await this.sendEmail(msg);

        return response;
    }
}
export default new GridEmailService();
