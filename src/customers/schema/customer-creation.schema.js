const joi = require( 'joi' );

exports.addNewCustomerSchema = joi.object({
    
    customerName : joi.string()
                    .required(),
    
    customerEmail : joi.string()
                        .email()
                        .lowercase()
                        .required(),

    customerPassword : joi.string()
                        .min( 8 )
                        .max( 20 )
                        .required()
})

exports.customerEmailSchema = joi.object({
    customerEmail : joi.string()
                        .email()
                        .lowercase()
                        .required(),
    customerPassword : joi.string()
                        .min( 8 )
                        .max( 20 )
                        .required()
})