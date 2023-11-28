import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import emailService from '../../../common/email.service';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class UpdateAdminProfileController extends MasterController {
    static doc() {
        return {
            tags: ['Utilites'],
            description: 'Send Contact Email',
            summary: 'Send Contact Email to Admin'
        };
    }

    static secured() {
        return false;
    }

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                sender_email: Joi.string().required(),
                note: Joi.string().required(),
                language: Joi.string().valid('en', 'ar').required()
            })
        );
        return payload;
    }

    async controller() {
        const { sender_email, note, language } = this.data;
        await emailService.sendContactEmailToAdmin({
            sender_email,
            language,
            note
        });
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            'Email Sent Successfully',
            SuccessMessages.UPDATE_ADMIN_PROFILE
        );
    }
}
