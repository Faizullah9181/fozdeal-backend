import { Config } from '../../config/conf';

const { Tags } = require('opentracing');
const logger = require('winston');

let transports = [];

let dateStr = new Date().toISOString();

if (Config.log.files) {
    transports.push(
        new logger.transports.File({
            filename: 'logs/' + dateStr + '-error.log',
            level: 'error'
        })
    );

    transports.push(
        new logger.transports.File({
            filename: 'logs/' + dateStr + '-info.log',
            level: 'info'
        })
    );
}

if (Config.log.console) {
    transports.push(new logger.transports.Console());
}

logger.configure({
    transports: transports
});

/**
 * @param level
 * @param payload
 * @param span
 * @param tagObj
 */
export const log = function (
    level,
    payload,
    span = undefined,
    tagObj = undefined
) {
    if (span && tagObj) {
        for (let tag in tagObj) {
            if (Object.prototype.hasOwnProperty.call(tagObj, tag)) {
                span.setTag(tag, tagObj[tag]);
            }
        }
    }

    if (span && level === 'error') {
        span.setTag(Tags.ERROR, true);
    }

    logger.log(level, JSON.stringify(payload));

    if (span) {
        span.log(payload);
    }
};
