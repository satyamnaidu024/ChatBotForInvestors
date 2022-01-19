const express = require('express');
const router = express.Router();

const {getFaqs,
    newFaq,
    getSingleFaq,
    updateFaq,
    deleteFaq} = require('../controllers/faqController');

const { isAuthenticatedUser,authorizedRoles } = require('../middlewares/auth')   

router.route('/faqs').get(getFaqs);
router.route('/faq/:id').get(getSingleFaq);
router.route('/admin/faq/:id').put(isAuthenticatedUser,authorizedRoles('admin'),updateFaq)
                                  .delete(isAuthenticatedUser,authorizedRoles('admin'),deleteFaq);;
router.route('/admin/faq/new').post(isAuthenticatedUser,authorizedRoles('admin'),newFaq);

module.exports = router;