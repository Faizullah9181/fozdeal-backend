/*// @Route /api/consultants
router
    .route("/")
    .post(protect, addConsultant)
    .put(protect, updateConsultant)
    .delete(protect, removeConsultant)
    .get(getAllConsultants);

// @ROUTE  PUT /api/consultants/reorder
router.route("/reorder").put(protect, reorderConsultants);

// @Route /api/consultants/:id
router.route("/:id").get(getConsultantById);

*/

import CreateConsultationController from '../api/consultation/controller/create.consultation.controller';
import UpdateConsultationController from '../api/consultation/controller/update.consultation.controller';

import Auth from '../middlewares/Auth';

// function just to send hii am working
function test(req, res) {
    res.send('hii am working');
}

module.exports = function (app) {
    app.get('/api/consultant/v1/test', test);

    // route for creating a new consultant
    CreateConsultationController.post(app, '/api/consultant/v1/create', [
        Auth.verifyToken
    ]);

    UpdateConsultationController.put(app, '/api/consultant/v1/update', [
        // Auth.verifyToken
    ]);
    // route just to testing
    // route for updating the consultant
    // route for updating its status
};
