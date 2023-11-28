import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import transactionsService from '../services/transactions.service';
import ValidationError from '../../../../custom/validationErrors';
const { MasterController } = require('@orca/base-packages');

export default class CraeteBuyInvestMentController extends MasterController {
    static doc() {
        return {
            tags: ['Investor'],
            description: 'Get Project Analytics',
            summary: 'get project analytics '
        };
    }

    static secured() {
        return false;
    }

    async controller() {
        const { user } = this.data;
        const response = await transactionsService.createSubscription(user.id);

        if (!response) throw new ValidationError('Project not found');

        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.PROJECT_FETCHED
        );
    }
}
