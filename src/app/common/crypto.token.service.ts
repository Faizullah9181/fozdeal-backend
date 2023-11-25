import * as CryptoJS from 'crypto-js';
export default class CryptoTokenService {
    static makeToken(user: any, role: string) {
        const cryptoToken = CryptoJS.AES.encrypt(
            JSON.stringify(user.toJSON()),
            process.env.CRYPTO_KEY
        ).toString();

        return {
            ...user.toJSON(),
            ['user-token']: cryptoToken
        };
    }

    static makeResetPasswordToken(user: any, role: string) {
        const cryptoToken = CryptoJS.AES.encrypt(
            JSON.stringify(user.toJSON()),
            process.env.CRYPTO_KEY
        ).toString();

        return {
            'reset-token': cryptoToken
        };
    }
}
