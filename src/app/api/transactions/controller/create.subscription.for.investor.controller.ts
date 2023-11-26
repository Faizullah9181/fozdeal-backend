import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import TransactionsService from '../services/transactions.service';

const { MasterController } = require('@orca/base-packages');

export default class CreateProjectController extends MasterController {
    static doc() {
        return {
            tags: ['Project'],
            description: 'Create Project',
            summary: 'create project for investor as entrepreneur'
        };
    }

    static secured() {
        return false;
    }

    async controller() {
        const { user } = this.data;
        const response = await TransactionsService.createPayment(user.id);
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROJECT_CREATED
        );
    }
}
