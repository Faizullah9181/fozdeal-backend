import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import S3Service from '../../../common/storage.service';

const {
    MasterController,
    Joi,
    RequestBuilder
} = require('@orca/base-packages');

export default class CreateSignedUrlController extends MasterController {
    static doc() {
        return {
            tags: ['Utilites'],
            description: 'Create Signed Url',
            summary: 'create signed url for uploading files'
        };
    }

    static secured() {
        return false;
    }

    static validate() {
        const payload = new RequestBuilder();
        payload.addToBody(
            Joi.object().keys({
                image_count: Joi.number().required()
            })
        );
        return payload;
    }

    async controller() {
        const { user, image_count } = this.data;

        let response = null;
        for (let i = 0; i < image_count; i++) {
            const signedUrl = await S3Service.create({ user_id: user.id });
            if (response === null) {
                response = [];
            }

            response.push(signedUrl);
        }

        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.SIGNED_URL_CREATED
        );
    }
}
