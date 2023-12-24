import { NextFunction, Request, Response } from 'express';
import { sendErrorResponse } from '../custom/ErrorResponse';
import { AuthenticationErrorCodes } from '../enums/AuthenticationErrorCodes';
import { ErrorMessages } from '../enums/ErrorMessages';
import * as CryptoJS from 'crypto-js';
import { StatusCodes } from '../enums/StatusCode';
import { Roles } from '../enums/Roles';
import userService from '../api/auth/user/services/user.service';

export default class Auth {
    private static async verifyUserRole(
        req: Request,
        res: Response,
        next: NextFunction,
        allowedRoles: string[]
    ) {
        try {
            const { adminEmail } = req.body || {};

            if (adminEmail) {
                console.log('admin email', adminEmail);
                // get the user deails from the user table on the bases of the email
                const user = await userService.getUserFromEmail(adminEmail);
                // if the user is not found or user role is not edmin then exit from the if state ment
                if (
                    (user && user.role == Roles.ADMIN) ||
                    user.role == Roles.SUPER_ADMIN
                ) {
                    req['user'] = user;
                    return next();
                }
            }

            console.log('e1');

            const token = req.headers['user-token'] as string;
            if (!token) {
                console.log('e2');

                return sendErrorResponse(
                    res,
                    AuthenticationErrorCodes.BAUTH1001,
                    ErrorMessages.USER_INVALID,
                    ErrorMessages.USER_INVALID,
                    StatusCodes.UNAUTHORISED
                );
            }

            const cu = CryptoJS.AES.decrypt(token, process.env.CRYPTO_KEY);
            const user = JSON.parse(cu.toString(CryptoJS.enc.Utf8));

            if (!allowedRoles.includes(user.role)) {
                return sendErrorResponse(
                    res,
                    AuthenticationErrorCodes.BAUTH1001,
                    ErrorMessages.USER_INVALID,
                    ErrorMessages.USER_INVALID,
                    StatusCodes.UNAUTHORISED
                );
            }

            req['user'] = user;
            next();
        } catch (err) {
            console.log(err);
            return sendErrorResponse(
                res,
                AuthenticationErrorCodes.BAUTH1001,
                ErrorMessages.USER_INVALID,
                ErrorMessages.USER_INVALID,
                StatusCodes.UNAUTHORISED
            );
        }
    }

    static async superAdminToken(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        await Auth.verifyUserRole(req, res, next, ['super-admin']);
    }

    static async adminToken(req: Request, res: Response, next: NextFunction) {
        await Auth.verifyUserRole(req, res, next, ['admin']);
    }

    static async userToken(req: Request, res: Response, next: NextFunction) {
        await Auth.verifyUserRole(req, res, next, ['entrepreneur', 'investor']);
    }

    static async verifyToken(req: Request, res: Response, next: NextFunction) {
        await Auth.verifyUserRole(req, res, next, [
            'entrepreneur',
            'investor',
            'admin',
            'super-admin'
        ]);
    }

    static async adminOrSuperAdminToken(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        await Auth.verifyUserRole(req, res, next, ['admin', 'super-admin']);
    }

    static async verifyResetPasswordToken(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        await Auth.verifyUserRole(req, res, next, [
            'entrepreneur',
            'investor',
            'admin'
        ]);
    }
}
