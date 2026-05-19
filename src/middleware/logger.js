function logger( req , res , next ){
    res.on( 'finish' , () => {
        console.log( "-----------------------------------")

        console.log( "Status Code : " + res.statusCode);

        console.log( "Method : " + req.method);

        console.log("URL : " + req.url);

        console.log("Time : " + new Date().toLocaleTimeString());

        console.log("Date: " + new Date().toLocaleDateString() );

        console.log( "-----------------------------------")
    
    });
    
    next();
}

module.exports = logger;