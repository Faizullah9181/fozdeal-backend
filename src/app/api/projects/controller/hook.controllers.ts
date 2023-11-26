import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';

const { MasterController, RequestBuilder } = require('@orca/base-packages');

export default class HookController extends MasterController {
    static doc() {
        return {
            tags: ['Webhook'],
            description: 'Webhook',
            summary: 'A webhook'
        };
    }

    static validate() {
        return new RequestBuilder();
    }

    async controller() {
        console.log('WEBHOOK', JSON.stringify(this.data));
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            {},
            SuccessMessages.ADMIN_DETAILS_FETCHED_SUCCESS
        );
    }
}
