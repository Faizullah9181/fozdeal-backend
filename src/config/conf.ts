export class Config {
    static get log() {
        return {
            files: process.env.ENABLE_LOG_FILE || true,
            console: process.env.ENABLE_CONSOLE || true
        };
    }

    static get enableAPIDoc() {
        return process.env.TOGGLE_APIDOC || true;
    }

    static get appInfo() {
        return {
            title: 'Orca Backend',
            description: 'Orca Backend service',
            url: 'http://localhost:' + process.env.PORT
        };
    }

    static get port() {
        return process.env.PORT || 8080;
    }

    static get hostname() {
        return process.env.NODEJS_IP || 'localhost';
    }

    static get appEnvironment() {
        return process.env.NODE_ENV || 'staging';
    }

    static get authorization() {
        return 'x-access-token';
    }

    static get jaegerHost() {
        return process.env.JAEGER_HOST || 'localhost';
    }

    static get jaegerPort() {
        return process.env.JAEGER_PORT || 6832;
    }

    static get redisUrl() {
        return process.env.REDIS_STORE_URL || `redis://localhost:6379`;
    }

    static get refundSubscription() {
        return process.env.REFUND_SUB;
    }

    static get gatewayTimeout() {
        return process.env.GATEWAY_TIMEOUT || 15 * 60;
    }

    static get getFrontendErrorRedirectUrl() {
        return process.env.FRONTEND_ERROR_URL || 'https://www.google.com';
    }
    static getClientConfig(
        keyName: string,
        secretName: string,
        saltName: string
    ) {
        return {
            key: process.env[keyName],
            secret: process.env[secretName],
            salt: process.env[saltName]
        };
    }
    static getGatewayWebhookSecretConfig(webhookSecret) {
        return {
            webhookSecret: process.env[webhookSecret]
        };
    }
    static getGatewayConfig(keyName, secretName) {
        return {
            key: process.env[keyName],
            secret: process.env[secretName]
        };
    }

    static get enablePrometheus() {
        return process.env.ENABLE_PROMETHEUS;
    }

    static get walnutEnabledOrgs() {
        try {
            return process.env.WALNUT_ENABLED_ORGS
                ? JSON.parse(process.env.WALNUT_ENABLED_ORGS)
                : [];
        } catch (e) {
            return [];
        }
    }

    static get rapydSenderId() {
        return process.env.RAPYD_SENDER_ID;
    }

    static get utilityAuthenticationKey() {
        return process.env.UTILITY_AUTHENTICATION_KEY;
    }
}
