const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

import { CONSULTATION_STATUS, SLOTS } from '../../../enums/ConsultationEnums';
import userService from '../../auth/user/services/user.service';
import { ErrorMessages } from '../../../enums/ErrorMessages';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ConsultantService from '../services/consultant.service';
import { StatusCodes } from '../../../enums/StatusCode';
import ValidationError from '../../../../custom/validationErrors';

export default class CreateConsultationController extends MasterController {
    static doc() {
        return {
            tags: ['Consultation'],
            description: 'Create Consultation',
            summary: 'Create Consultation'
        };
    }

    static secured() {
        return true;
    }

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                name: Joi.string().min(3).max(100).required(),
                name_ar: Joi.string().min(3).max(100).required(),
                image: Joi.string().optional(),
                description: Joi.string().min(3).max(2000).required(),
                description_ar: Joi.string().min(3).max(2000).required(),
                title: Joi.string().min(3).max(1000).required(),
                title_ar: Joi.string().min(3).max(1000).required(),
                email: Joi.string().email().required(),
                phone: Joi.string().min(3).max(100).required(),
                fees: Joi.number().min(0).required(),
                type_of_slots: Joi.array()
                    .items(Joi.number().min(0).max(120))
                    .default([
                        SLOTS.THIRTY,
                        SLOTS.SIXTY,
                        SLOTS.NINETY,
                        SLOTS.ONE_TWENTY
                    ]),
                default_timings: Joi.object({
                    start_time: Joi.string().required(),
                    end_time: Joi.string().required()
                }).required(),
                status: Joi.string()
                    .valid(
                        CONSULTATION_STATUS.PENDING,
                        CONSULTATION_STATUS.ACTIVE,
                        CONSULTATION_STATUS.INACTIVE
                    )
                    .optional(),
                isTeam: Joi.boolean().optional(),
                resume: Joi.string().optional(),
                website: Joi.string().optional(),
                facebook: Joi.string().optional(),
                linkedin: Joi.string().optional(),
                twitter: Joi.string().optional()
            })
        );
        return payload;
    }
    // controler
    async controller() {
        //
        const data = this.data;
        console.log('data', data);
        data.email = data.email.toLowerCase();
        // check if the user from the user table
        const user = await userService.getUserFromEmail(data.email);
        // if the user is not found
        if (!user) {
            throw new ValidationError(ErrorMessages.USER_DETAILS_NOT_FOUND);
        }

        // search consultant of the basec of the user id in the consultant table
        const consultant = await ConsultantService.getConsultant({
            email: data.email
        });
        // if the consultant is found
        if (consultant) {
            // throw error
            throw new ValidationError(ErrorMessages.USER_ALREADY_CONSULTANT);
        }
        // upload the image and get the url

        // uplaoad the resume and get the url

        // // make thr role of the user to consultant and save the user
        // user.role = Roles.CONSULTANT;
        // // save the user
        // await user.save();

        // if the user is a team then making all the consultant to false

        await ConsultantService.updateAllIsTeamTofalse(data);

        // create the consultant
        const newConsultant = await ConsultantService.createConsultant({
            ...data,
            user_id: user.id
        });

        user.consultant_id = newConsultant.id;
        user.isConsultant = true;
        // save the user
        await user.save();

        return new this.ResponseBuilder(
            StatusCodes.CREATED,
            newConsultant,
            SuccessMessages.SUCCESS
        );
    }
}
