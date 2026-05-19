const express = 
    require( 'express' );

const router = 
    express.Router();

let pool = 
    require( '../../utils/db' );

const { authenticate } = 
    require( '../../middleware/auth');

const { getAllCustomers , getAllCustomerOrders , getCustomerOrder } = 
    require( '../controller/customer-controller')

router.use( authenticate("NC-CUSTOMER") );

router.get( '/get-all-customers' , getAllCustomers );

router.get( '/:uid/orders' , getAllCustomerOrders );

router.get( '/:uid/orders/:oid' , getCustomerOrder);

module.exports = router;