const express = require( 'express' );
require( 'dotenv' ).config();
const { responseHandler } = require( './middleware/auth');
const logger = require( './middleware/logger'); 
const globalErrorHandler = 
    require( './middleware/global-error-handler');
const customerRouter = 
    require( './customers/routes/customer-router');
const orderRouter = 
    require( './orders/routes/order-router');
const appError = require( './middleware/app-error' );
const { validationResult , query } = 
    require( 'express-validator' );
const AppError = require('./middleware/app-error');

const app = express();

app.use( express.json() );
app.use( logger );

// app.get( '/hello' , query('person').notEmpty() , ( req , res , next ) => {
//     const result = validationResult( req );
//     if( result.isEmpty() ){
//         res.send( `Hello , ${req.query.person}!` );
//     }
//     else{
//         // res.send( {errors : result.array() });
//         return next(
//             new AppError(
//                 result.array()[0].msg,
//                 400
//             )
//         )
//     }
// });

app.use( '/customers' , customerRouter );
app.use( '/orders' , orderRouter );

app.use((req, res, next) => {
    next(
        new appError.NotFoundError( 
            "Can't find the path..."
        )
    );
});

app.use( globalErrorHandler );

app.listen( 8080 , () => {
    console.log( "App is listening Port : 8080" );
});