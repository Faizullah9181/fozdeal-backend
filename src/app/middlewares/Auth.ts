import { NextFunction, Request, Response } from 'express';
import { sendErrorResponse } from '../custom/ErrorResponse';
import { AuthenticationErrorCodes } from '../enums/AuthenticationErrorCodes';
import { ErrorMessages } from '../enums/ErrorMessages';
import * as CryptoJS from 'crypto-js';
import { StatusCodes } from '../enums/StatusCode';

export default class Auth {
    static async superAdminToken(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            //check if authorization header present
            const token = req.headers['user-token'] as string;
            if (!token)
                return sendErrorResponse(
                    res,
                    AuthenticationErrorCodes.BAUTH1001,
                    ErrorMessages.USER_INVALID,
                    ErrorMessages.USER_INVALID,
                    StatusCodes.UNAUTHORISED
                );

            const cu = CryptoJS.AES.decrypt(token, process.env.CRYPTO_KEY);
            const superAdmin = JSON.parse(cu.toString(CryptoJS.enc.Utf8));
            if (superAdmin.role !== 'super-admin') {
                return sendErrorResponse(
                    res,
                    AuthenticationErrorCodes.BAUTH1001,
                    ErrorMessages.USER_INVALID,
                    ErrorMessages.USER_INVALID,
                    StatusCodes.UNAUTHORISED
                );
            }
            req['user'] = superAdmin;
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

    static async adminToken(req: Request, res: Response, next: NextFunction) {
        try {
            //check if authorization header present
            const token = req.headers['user-token'] as string;
            if (!token)
                return sendErrorResponse(
                    res,
                    AuthenticationErrorCodes.BAUTH1001,
                    ErrorMessages.USER_INVALID,
                    ErrorMessages.USER_INVALID,
                    StatusCodes.UNAUTHORISED
                );

            const cu = CryptoJS.AES.decrypt(token, process.env.CRYPTO_KEY);
            const admin = JSON.parse(cu.toString(CryptoJS.enc.Utf8));
            if (admin.role !== 'admin') {
                return sendErrorResponse(
                    res,
                    AuthenticationErrorCodes.BAUTH1001,
                    ErrorMessages.USER_INVALID,
                    ErrorMessages.USER_INVALID,
                    StatusCodes.UNAUTHORISED
                );
            }
            req['user'] = admin;
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

    static async userToken(req: Request, res: Response, next: NextFunction) {
        try {
            //check if authorization header present
            const token = req.headers['user-token'] as string;
            if (!token)
                return sendErrorResponse(
                    res,
                    AuthenticationErrorCodes.BAUTH1001,
                    ErrorMessages.USER_INVALID,
                    ErrorMessages.USER_INVALID,
                    StatusCodes.UNAUTHORISED
                );

            const cu = CryptoJS.AES.decrypt(token, process.env.CRYPTO_KEY);
            const user = JSON.parse(cu.toString(CryptoJS.enc.Utf8));
            if (user.role !== 'entrepreneur' && user.role !== 'investor') {
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
}
