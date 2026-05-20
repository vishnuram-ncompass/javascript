const express = require( 'express' );
const router = express.Router();
const { authenticate } = 
    require( '../../middleware/auth');
const { 
    getAllCustomers ,
    getAllCustomerOrders , 
    getCustomerOrder 
} = require( '../controller/get-customer.controller')
const validate = 
    require( '../../middleware/validation' );
const customerIdSchema = 
    require( '../schema/customer-id.schema')
const { addNewCustomerSchema , customerEmailSchema } = 
    require( '../schema/customer-creation.schema')
const {
    addNewCustomer
} = require( '../controller/post-customer.controller');
const { addCustomer , loginCustomer } = 
    require( '../controller/post-customer.controller' );

let pool = require( '../../utils/db' );

router.use( authenticate("NC-CUSTOMER") );

router.get( '/get-all-customers' , getAllCustomers );
router.get( 
    '/:customerId/orders' , 
    validate( customerIdSchema , 'params' ) , 
    getAllCustomerOrders 
);
router.get( 
    '/:customerId/orders/:orderId' , 
    validate( customerIdSchema , 'params' ) , 
    getCustomerOrder
);
router.post(
    '/add-customer', 
    validate( addNewCustomerSchema , 'body' ) , 
    addCustomer
);
router.post(
    '/login',
    validate( customerEmailSchema , 'body' ) ,
    loginCustomer
)


module.exports = router;