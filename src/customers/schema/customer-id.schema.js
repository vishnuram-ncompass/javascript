const joi = require( 'joi' );

exports.getCustomerValidation = joi.object({
    customerId: joi.number()
        .integer()
        .positive()
        .required()
});