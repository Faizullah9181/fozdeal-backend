require('dotenv').config();
import { sequelize } from './sequelize';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// require('./config/basePackages')();
try {
    (async () => {
        await sequelize.sync({ alter: false }); // # force : true will drop if tables exists
    })();
} catch (err) {
    console.error('error in syncing: ', err);
}

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());

app.get('/v1/health', (req, res) => {
    res.status(200).send({ message: 'Orca consumer is healthy' });
});

app.listen(process.env.PORT, () =>
    console.info(`Listening on port ${process.env.PORT}`)
);

new (class InitiateConsumer {
    readonly demoConsumerEnabled = process.env.DEMO_CONSUMER_ENABLED;

    constructor() {
        this.demoConsumer();
    }

    demoConsumer() {
        if (parseInt(this.demoConsumerEnabled)) {
            console.log('starting enabled consumer');
            // new (require('./app/consumers/filename'))();
        }
    }
})();
