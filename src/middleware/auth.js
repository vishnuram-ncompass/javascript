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

function responseHandler(  res , message , data , statusCode ) {
    
    return res.status( statusCode ).json({
    
        data,
        success: true,
        message
    
    });
}

module.exports = {       
    authenticate,
    responseHandler  
};