const express = require( 'express' );

const router = express.Router();

let pool = require( '../../utils/db' );

const {authenticate} = 
    require( '../../middleware/auth');

const { getAllOrders , getAllOrderCustomers , getOrderCustomer } = 
    require( '../controller/order-controller')

router.use( authenticate('NC-ORDERS') )

router.get( '/get-all-orders' , getAllOrders);

router.get( '/:oid/customers' , getAllOrderCustomers);

router.get( '/:oid/customers/:uid' , getOrderCustomer );

module.exports = router;