function authenticate( roleToken ){
    return function( req , res , next ){    
        if( 
            req.headers['auth'] 
            && 
            req.headers['auth'] === roleToken
        )
            next();

        else{
            return res.status( 401 ).json({ 
                message : "Not Authorized... "
            })
        }
    }
}
//for sql queries too..

function responseHandler(  res , message , data , statusCode ) {
    
    return res.status( statusCode ).json({
        data,
        success: true,
        message
    });
}
//response handler before the globalerrorhandler in app.js...

module.exports = {       
    authenticate,
    responseHandler  
};