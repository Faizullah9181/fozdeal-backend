import { StatusCodes } from '../../../enums/StatusCode';
import { SuccessMessages } from '../../../enums/SuccessMessages';
import categoryService from '../services/category.service';

const { MasterController } = require('@orca/base-packages');

export default class GetAllCategories extends MasterController {
    static doc() {
        return {
            tags: ['Project'],
            description: 'Get All Available Projects',
            summary: 'get all available projects for admins  for approval'
        };
    }

    static secured() {
        return false;
    }

    async controller() {
        const response = await categoryService.getCategories();
        return new this.ResponseBuilder(
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.CATEGORY_FETCHED
        );
    }
}
