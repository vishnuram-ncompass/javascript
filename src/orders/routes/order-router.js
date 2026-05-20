const express = require( 'express' );
const router = express.Router();
const {authenticate} = 
require( '../../middleware/auth');
const { getAllOrders , getAllOrderCustomers , getOrderCustomer } = 
require( '../controller/order-controller')
const validate = require( '../../middleware/validation')
const { getOrderSchema , getCustAndOrderSchema } = require( '../schema/order-id.schema')
const customerIdSchema = require( '../../customers/schema/customer-id.schema')

let pool = require( '../../utils/db' );

router.use( authenticate('NC-ORDERS') )

router.get( '/get-all-orders' , getAllOrders);
router.get( 
    '/:orderId/customers' , 
    validate( getOrderSchema , 'params' ),
    getAllOrderCustomers
);
router.get( 
    '/:orderId/customers/:customerId' , 
    validate( getCustAndOrderSchema , 'params' ),
    getOrderCustomer 
);


module.exports = router;