const express = 
    require( 'express' );

const {responseHandler } = 
    require( './middleware/auth');

const logger = 
    require( './middleware/logger');
    
const globalErrorHandler = 
    require( './middleware/global-error-handler');

const customerRouter = 
    require( './customers/routes/customer-router');

const orderRouter = 
    require( './orders/routes/order-router');

const appError = 
    require( './middleware/app-error' );

const app = express();

app.use( express.json() );

app.use( logger );

app.use( '/customers' , customerRouter );

app.use( '/orders' , orderRouter );

app.use((req, res, next) => {
    next(
        new appError( 
            "Can't find the path...", 
            404
        )
    );
});

app.use( globalErrorHandler );

app.listen( 8080 , () => {
    console.log( "App is listening Port : 8080" );
});