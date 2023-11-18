const express = require('express');
const client = require('prom-client');

const prometheusServerPort = process.env.PROMETHEUS_SERVER_PORT || 9100;
const app = express();

export const restApisResponseTimeHistogram = new client.Histogram({
    name: 'rest_apis_response_time_duration_seconds',
    help: 'Rest APIs Histogram for the duration in seconds.',
    labelNames: ['method', 'route', 'status_code']
});

export const dbResponseTimeHistogram = new client.Histogram({
    name: 'db_response_time_duration_seconds',
    help: 'DB Histogram for the duration in seconds.',
    labelNames: ['operation', 'success']
});

export const startPrometheusMetricsServer = () => {
    const collectDefaultMetrics = client.collectDefaultMetrics;
    collectDefaultMetrics();

    app.get('/promMetrics', async (req, res) => {
        res.set('Content-Type', client.register.contentType);
        return res.send(await client.register.metrics());
    });

    app.listen(prometheusServerPort, () =>
        console.log(
            `Prometheus metrics server started on port: ${prometheusServerPort}`
        )
    );
};
