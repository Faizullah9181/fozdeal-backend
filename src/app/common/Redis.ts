/**
 * Used to fetch Student Data
 * */
import { Config } from '../../config/conf';

const Redis = require('ioredis');

export class Cache {
    private static _client: any;
    static async delFromRedis(key) {
        if (!key) return false;
        let redis = null;
        try {
            redis = await this.redisClient();
            await redis.del(key);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async setInRedis(
        key,
        payload,
        expiry,
        timeInSecondOrMs = 'ex',
        exists = null
    ) {
        // value of exists can be
        // NX − Only sets the key if it does not already exist.
        // XX − Only sets the key if it already exists.
        if (!key) return false;
        let redis = null;
        try {
            redis = await this.redisClient();
            let expireTime = expiry || 86400; // default is 1 day in seconds
            if (exists) {
                return await redis.set(
                    key,
                    JSON.stringify({ data: payload }),
                    timeInSecondOrMs,
                    expireTime,
                    exists
                );
            } else {
                return await redis.set(
                    key,
                    JSON.stringify({ data: payload }),
                    timeInSecondOrMs,
                    expireTime
                );
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async getFromRedis(key) {
        if (!key) return false;
        let redis = null;
        let response = null;
        try {
            redis = await this.redisClient();
            response = await redis.get(key);
            if (response) response = JSON.parse(response);
            if (response && response.data) return response.data;
            return null;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async redisClient() {
        if (Cache._client) return Cache._client;
        const redisStoreUrl = Config.redisUrl;
        if (!redisStoreUrl)
            throw new Error('Can not connect without a redis store url!');
        let redisStore = null;
        redisStore = new Redis(redisStoreUrl, { connectTimeout: 500 });
        return new Promise((res, rej) => {
            redisStore.on('error', (err) => {
                rej(err);
            });
            redisStore.on('connect', () => {
                console.log('Connected to Redis!');
                Cache._client = redisStore;
                res(redisStore);
            });
        });
    }

    static async ifHashFieldExists(hashKey, field) {
        if (!hashKey || !field) return false;
        let redis = null;
        try {
            redis = await this.redisClient();
        } catch (e) {
            console.error(e);
            return null;
        }
        return await redis.hexists(hashKey, field);
    }

    static async getHashFieldValueFromRedis(hashKey, field) {
        if (!hashKey || !field) return false;
        let redis = null;
        try {
            redis = await this.redisClient();
        } catch (e) {
            console.error(e);
            return null;
        }
        return await redis.hget(hashKey, field);
    }

    static async hashSetInRedis(hashKey, field, value) {
        if (!field || !hashKey || !value) return false;
        let redis = null;
        try {
            redis = await this.redisClient();
        } catch (e) {
            console.error(e);
            return null;
        }
        return await redis.hset(hashKey, field, value);
    }
}
