import { i18n } from '@orca/base-packages';
const path = require('path');
/**
 * configure shared state
 */
// console.log(',.,.,.,', __dirname, path.join(__dirname, '/../../../locales'));

i18n.configure({
    locales: ['en', 'hi'],
    directory: path.join(__dirname, '/../../../locales')
});
// console.log(i18n.__('Hello'));

module.exports = i18n;
