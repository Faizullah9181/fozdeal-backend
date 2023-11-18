'use strict';

import { initSwagger, getFinalSwagger } from '@orca/base-packages';
/**
 * Module dependencies.
 */

let fs = require('fs'),
    http = require('http'),
    https = require('https'),
    path = require('path');

let express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    helmet = require('helmet'),
    mustacheExpress = require('mustache-express'),
    responseTime = require('response-time'),
    xss = require('xss-clean'),
    swaggerUi = require('swagger-ui-express'),
    // YAML = require('yamljs'),
    glob = require('glob');
const swaggerDocument = require('./../../swagger.json');
import { log } from '../app/utils/error.utils';
import { sequelize } from '../sequelize';
import { Config } from './conf';
// import cors from 'cors';

// const i18n = require('../config/localisation');

const {
    restApisResponseTimeHistogram
} = require('../app/utils/prometheusMetricsServer.utils');

// let schema = require('../schema/schema').schema;

// import {schema as schema} from '../schema/schema';

module.exports = function () {
    // Initialize express app
    let app = express();
    // app.use(i18n.init);
    initSwagger(swaggerDocument);

    // Setting application local variables
    app.locals.title = Config.appInfo.title;
    app.locals.description = Config.appInfo.description;

    app.use(
        responseTime((req, res, time) => {
            if (req?.route?.path) {
                restApisResponseTimeHistogram.observe(
                    {
                        method: req.method,
                        route: req.route.path,
                        status_code: res.statusCode
                    },
                    time * 1000
                );
            }
        })
    );

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        if (Config.appInfo.url) {
            app.locals.url = Config.appInfo.url + ':' + Config.port;
        } else {
            res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        }
        next();
    });

    // Showing stack errors
    app.set('showStackError', true);

    // Config View Engine , server side rendering
    app.engine('server.view.html', mustacheExpress());
    app.set('view engine', 'server.view.html');
    app.set('views', path.join(__dirname, '../app/views/'));

    // Environment dependent middleware
    if (
        process.env.NODE_ENV === 'staging' ||
        process.env.NODE_ENV === 'preprod' ||
        process.env.NODE_ENV === 'production'
    ) {
        let morgan = require('morgan');
        // Enable logger (morgan)
        app.use(morgan('common'));
        // Disable views cache
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    } else if (process.env.NODE_ENV === 'alpha') {
        app.locals.cache = 'memory';
    } else if (process.env.NODE_ENV === 'secure') {
        let morgan = require('morgan');
        app.use(morgan('dev'));
    }

    // Request body parsing middleware should be above methodOverride
    // BODY PARSER
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(bodyParser.json());
    app.use(xss());
    app.use(methodOverride());

    // Use helmet to secure Express headers
    // app.use(helmet.frameguard());
    app.use(
        helmet({
            frameguard: false
        })
    );
    //  set fake user for all the api
    app.use((req, res, next) => {
        req.user = {
            id: 1,
            email: 'fozdeal@gmail.com',
            name: 'fozdeal'
        };
        next();
    });

    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.disable('x-powered-by');

    app.use((req, res, next) => {
        // Expose the custom headers so that browser can allow to use it
        // res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS,PUT, PATCH, DELETE'
        );
        res.header(
            'Access-Control-Allow-Headers',
            'domain,region,Api-Version,DNT,X-CustomHeader,Keep-Alive,user-agent,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,authorization,device-id,ETag,region,device-type,accept-language,mobile-agent,x-chrome-version,x-webview-version,super-admin-token,user-token,restaurant-token,restaurant-outlet-token'
        );
        res.header('Access-Control-Max-Age', 1728000);

        if (req.method == 'OPTIONS') {
            res.header('Content-Type', 'text/plain charset=UTF-8');
            res.header('Content-Length', 0);
            return res.sendStatus(204);
        }
        next();
    });

    app.set('jsonp callback', true);

    // Globbing routing files
    glob.sync('./**/routes/*.js').forEach(function (routePath) {
        console.log(routePath, 'routePath');
        require(path.resolve(routePath))(app);
    });

    // config.getGlobbedFiles('./**/routes/**/*.js').forEach(function(routePath) {
    //     require(path.resolve(routePath))(app);
    // });

    // Config Public Folder for Static Content
    app.use(express.static(path.join(__dirname, '../app/public')));

    if (Config.enableAPIDoc) {
        app.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(getFinalSwagger())
        );
    }

    // Assume 404 since no middleware responded
    app.use(function (req, res) {
        log('error', {
            message: 'Page Not Found'
        });
        res.render(path.join(__dirname, '../app/views/error/404'), {
            head: {
                title: 'Page Not Found'
            },
            content: {
                title: 'OOPS!',
                description: 'Page Not Found. Error Code: 404'
            }
        });
    });

    let server;

    if (process.env.NODE_ENV === 'secure') {
        // Log SSL usage
        console.log('Securely using https protocol');

        // Load SSL key and certificate
        let privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
        let certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');

        // Create HTTPS Server
        server = https.createServer(
            {
                key: privateKey,
                cert: certificate
            },
            app
        );
    } else {
        server = http.createServer(app);
    }

    app.set('server', server);
    try {
        (async () => {
            await sequelize.authenticate();
            console.log(
                'Database connection has been established successfully.'
            );
            await sequelize.sync({ alter: false }); // # force : true will drop if tables exists
        })();
    } catch (err) {
        console.error('Database Error: ', err);
    }

    // @ts-ignore
    delete Object.prototype.swaggerDocumentGlobal;
    // Return Express server instance
    return app;
};

export {};
