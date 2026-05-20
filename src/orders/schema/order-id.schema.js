const joi = require( 'joi' );

exports.getOrderSchema = joi.object({
    orderId: joi.number()
        .integer()
        .positive()
        .required()
    });
    
exports.getCustAndOrderSchema = joi.object({
    orderId: joi.number()
        .integer()
        .positive()
        .required(),

    customerId: joi.number()
        .integer()
        .positive()
        .required()
    
})
