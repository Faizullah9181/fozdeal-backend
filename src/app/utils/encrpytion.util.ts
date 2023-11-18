import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid';
export default class EncryptionUtil {
    static get raw(): any {
        return {
            bcrypt,
            jwt
        };
    }

    static async hashData(data, salt: number = 10) {
        return await bcrypt.hash(data, salt);
    }

    static async comparePassword(
        enteredPassword,
        dbPassword
    ): Promise<boolean> {
        return bcrypt.compare(enteredPassword, dbPassword);
    }

    static generateUUID() {
        return uuid.v4().toString();
    }
}
