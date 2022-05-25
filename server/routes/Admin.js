var express = require( 'express' );
var router = express.Router();
const AdminController = require( '../Controllers/Admin/admin' );
const auth = require( '../MiddleWare/auth' );


/* GET home page. */
router.get( '/', AdminController.adminrespond );

/* POST otp  getting... */
router.post( '/otpsending', AdminController.otpsending );

/* POST OTP verifing. */
router.post( '/otpverifing', AdminController.otpverifing );

/* GET user Data. */
router.get( '/userdata',  AdminController.userdata );

/* GET Post Data. */
router.get( '/postdata',  AdminController.postdata );

/* PUT Block user. */
router.put( '/block/:id', AdminController.block );

/* PUT Unblock user. */
router.put( '/unblock/:id', AdminController.unblock );

/* DELETE  delete Post. */
router.delete( '/post/delete/:id', AdminController.deletePost );

/* GET Transaction Data. */
router.get( '/transactionsdata',  AdminController.transactionsdata );

/* GET Contract Data. */
router.get( '/contractsdata',  AdminController.contractsdata );

/* GET Active user Data. */
router.get( '/userstatics',  AdminController.userstatics );

/* GET LatestTransaction Data. */
router.get( '/latesttransactions',  AdminController.latesttransactions );

/* GET Reports Data. */
router.get( '/fetchsalesreport', AdminController.fetchsalesreport );

/* GET filterReports Data. */
router.post( '/fetchfilterReport', AdminController.fetchfilterReport );

/* GET day Reports Data. */
router.post( '/fetchdayReport', AdminController.fetchdayReport );

/* GET week Reports Data. */
router.post( '/fetchweekReport', AdminController.fetchweekReport );

/* GET month Reports Data. */
router.post( '/fetchmonthReport', AdminController.fetchmonthReport );

/* GET  year Reports Data. */
router.post( '/fetchyearlyReport', AdminController.fetchyearlyReport );








module.exports = router;
