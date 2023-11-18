const express = require('./../config/express');
import { sign, SignOptions } from 'jsonwebtoken';
// import RedisConnections from '../config/conf/RedisConnections';
// const { initRedis } = require('@fozdeal/base-packages');

class TestServer {
    private static TestServerObj = null;

    static async initiate() {
        if (this.TestServerObj) return { app: this.TestServerObj };
        // await initRedis(RedisConnections.connections);
        const app = express();
        this.TestServerObj = app;
        const ENV_CONFIG = process.env;
        const accessToken = await this.getAccessToken();
        return { app, accessToken, ENV_CONFIG };
    }

    private static async getAccessToken() {
        const payload = {
            clientId: process.env.SERVICE_CLIENT_ID,
            clientSecret: process.env.SERVICE_CLIENT_SECRET
        };
        const token = sign(payload, process.env.TOKEN_SECRET, <SignOptions>{
            expiresIn: process.env.TOKEN_EXPIRY_DURATION,
            algorithm: process.env.ACCESS_TOKEN_ALGO
        });
        return token;
    }

    private static async toTimestamp(strDate: string) {
        const timeStampMiliSec = Date.parse(strDate);
        return timeStampMiliSec / 1000;
    }

    static async getXAccessToken(data) {
        data.iat = await this.toTimestamp(data.iat);
        data.exp = await this.toTimestamp(data.exp);
        const xToken = sign(data, process.env.TOKEN_SECRET);
        return xToken;
    }
}

export default TestServer;
