const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

import { CONSULTATION_STATUS, SLOTS } from '../../../enums/ConsultationEnums';
import { ErrorMessages } from '../../../enums/ErrorMessages';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import ConsultantService from '../services/consultant.service';
import { StatusCodes } from '../../../enums/StatusCode';
import ValidationError from '../../../../custom/validationErrors';
export default class UpdateConsultationController extends MasterController {
    static doc() {
        return {
            tags: ['Consultation'],
            description: 'Update Consultant',
            summary: 'Update Consultant'
        };
    }

    static secured() {
        return false;
    }

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                id: Joi.string().required(),

                name: Joi.string().min(3).max(100).optional(),
                name_ar: Joi.string().min(3).max(100).optional(),
                image: Joi.string().optional(),
                description: Joi.string().min(3).max(2000).optional(),
                description_ar: Joi.string().min(3).max(2000).optional(),
                title: Joi.string().min(3).max(1000).optional(),
                title_ar: Joi.string().min(3).max(1000).optional(),
                email: Joi.string().email().optional(),
                phone: Joi.string().min(3).max(100).optional(),
                fees: Joi.number().min(0).optional(),
                type_of_slots: Joi.array()
                    .items(
                        Joi.valid(
                            SLOTS.THIRTY,
                            SLOTS.SIXTY,
                            SLOTS.NINETY,
                            SLOTS.ONE_TWENTY
                        )
                    )
                    .optional(),
                default_timings: Joi.object({
                    start_time: Joi.string().optional(),
                    end_time: Joi.string().optional()
                }).optional(),
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

    async controller() {
        const data = this.data;

        // check if consultant exists or not
        const consultant = await ConsultantService.getConsultant({
            id: data.id
        });

        if (!consultant) {
            throw new ValidationError(ErrorMessages.CONSULTANT_NOT_FOUND);
        }

        // upload image of the consultant

        // upload resume of the consultant

        // if isTeam is true, then set isTeam of all consultants to false
        console.log('data.isTeam', data.isTeam);
        await ConsultantService.updateAllIsTeamTofalse(data);

        // update consultant
        const updatedConsultant = await ConsultantService.updateConsultant(
            data
        );

        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            updatedConsultant,
            SuccessMessages.SUCCESS
        );
    }
}
