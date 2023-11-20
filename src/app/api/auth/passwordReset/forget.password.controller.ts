// import { ErrorMessages } from '../../../enums/ErrorMessages';
// import { StatusCodes } from '../../../enums/StatusCode';
// import { SuccessMessages } from '../../../enums/SuccessMessages';

// const { MasterController, RequestBuilder, Joi } = require('@bea/base-packages');
// export default class ForgotPasswordController extends MasterController {
//     static doc() {
//         return {
//             tags: ['Admin'],
//             description: 'Forgot password',
//             summary: 'Send forgot password email'
//         };
//     }

//     static secured() {
//         return false;
//     }

//     static validate() {
//         const payload = new RequestBuilder();
//         payload.addToBody(
//             Joi.object().keys({
//                 email: Joi.string().email().required()
//             })
//         );
//         return payload;
//     }

//     async controller() {
//         const { email } = this.data;
//         const token = await authService.generateForgotPasswordToken(user);
//         const emailData = {
//             email: email
//             brandName: 'BeA Brand',
//             domain: 'admin.beabrand.app',
//             token: token
//         };
//         const response = await emailService.sendForgotPasswordEmail(emailData);
//         return new this.ResponseBuilder(
//             StatusCodes.SUCCESS,
//             response,
//             SuccessMessages.FORGOT_PASSWORD_EMAIL_SENT
//         );
//     }
// }

// //https://medium.com/@chiragmehta900/sending-template-email-using-sendgrid-with-node-js-4132ea5d6256
