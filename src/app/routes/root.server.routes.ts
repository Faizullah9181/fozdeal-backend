'use strict';
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            head: {
                title: 'Orca backend'
            },
            content: {
                title: 'Orca backend',
                description:
                    'This is Orca backend service, see /api-docs for api details'
            }
        });
    });
};
