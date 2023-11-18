import { Config } from './config/conf';
// import { startPrometheusMetricsServer } from './app/utils/prometheusMetricsServer.utils';
import ProcessMonitor from './processMonitor';
// import bulkUploadProducts from './scripts/bulk.upload.products.script';

require('dotenv').config();

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

// Init the express application
let app = require('./config/express')();
// Init base packages
// require('./config/basePackages')();
if (parseInt(process.env.ENABLE_CRON)) {
    // require('./app/crons/demoCronFile');
}

process.on('uncaughtException', function (err) {
    console.log('Error:', err);
});

// Start the app by listening on <port>
app.get('server').listen(Config.port, () => {
    // bulkUploadProducts();
});
// for monitoring the application at run time
// if (Config.enablePrometheus) {
//     startPrometheusMetricsServer();
// }

ProcessMonitor.start();

// Expose app
exports = module.exports = app;

// Logging initialization
console.log(
    `${Config.appInfo.title} started on ${Config.hostname} : ${
        Config.port
    } in ${process.env.NODE_ENV} mode on ${new Date().toISOString()}`
);
