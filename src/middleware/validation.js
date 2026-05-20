const appError = require('./app-error');

const validate = (schema, property) => {

    return (req, res, next) => {
        const { error } = schema.validate( req[property] );
        
        if (error) {
            throw new appError(
                error.details[0].message,
                400
            );
        }
        next();
    };
};

module.exports = validate;