const joi = require( 'joi' );

exports.addNewCustomerSchema = joi.object({
    
    customerName : joi.string()
                    .required(),
    
    customerEmail : joi.string()
                        .email(),

    customerPassword : joi.string()
                        .required()
})

exports.customerEmailSchema = joi.object({
    customerEmail : joi.string()
                        .email()
})