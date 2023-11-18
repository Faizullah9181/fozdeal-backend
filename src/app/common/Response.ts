import { IRequestResponse } from './interface';

export class Response {
    static success({ response }): IRequestResponse {
        return {
            status: response.status,
            statusCode: response.code,
            message: response.message,
            data: response.data
        };
    }
}
