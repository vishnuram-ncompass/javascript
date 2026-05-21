const jwt = require( 'jsonwebtoken' );
const { AppError, UnauthorizedError } = require('./app-error');

function authenticate( roleToken ){
    return function( req , res , next ){    
        if( 
            req.headers['auth'] 
            && 
            req.headers['auth'] === roleToken
        )
            next();

        else
            throw new UnauthorizedError( " Not Authorized... ");
    }
}
//for sql queries too...

function responseHandler(res, statusCode, message, data = null) {

    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
}
//response handler before the globalerrorhandler in app.js...

function verifyToken( req , res , next ){
    const token = req.headers['auth'];
    if( !token ){
        throw new UnauthorizedError(
            "Token not found, Please login again"
        );
    }
    const decoded = jwt.verify( token , process.env.JWT_SECRET_KEY );
    req.user = decoded;
    next();
}

module.exports = {       
    authenticate,
    responseHandler  
};