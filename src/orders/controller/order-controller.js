const express = require( 'express' );

const { responseHandler } = require('../../middleware/auth' );

let pool = require( '../../utils/db' );

const appError = require( '../../middleware/app-error' );

const getAllOrders = async ( req , res , next ) => {
    
    const query = `
        SELECT 
                o.order_id AS orderId,
                o.customer_id AS customerId,
                o.item_name AS itemName,
                o.order_amount AS orderAmount,
                o.order_date AS orderDate
            FROM orders o;`;

    try{        
        let [result] = 
            await pool.query( query );

        if( result.length === 0 )
            return next( 
                new appError( 
                    "No order found" , 
                    404
                )
            );



        return responseHandler( 
            res , 
            "Get all orders..." , 
            result , 
            200 
        );
    }
    catch( error ){
        next( error );
    }
            
}

const getAllOrderCustomers = async ( req , res , next ) => {
    const query = `
        SELECT 
                o.order_id AS orderId,
                o.customer_id AS customerId,
                u.customer_name AS customerName,
                u.customer_email AS customerEmail,
                o.item_name AS itemName,
                o.order_amount AS orderAmount,
                o.order_date AS orderDate
            FROM orders o
        JOIN customers u
            ON u.customer_id = o.customer_id
        WHERE o.order_id = ?;`

    try{

        const oid = 
            Number(req.params.oid);

        if( isNaN(oid) )
            return next( 
                new appError( 
                    "Invalid order ID" , 
                    404
                )
            );


        let [result] = 
            await pool.query( query , [oid] );

        if( result.length === 0 )
            return next( 
                new appError( 
                    "No order found with that ID" , 
                    404
                )
            );

        return responseHandler( 
            res , 
            "Customers of particular order..." , 
            result , 
            200
        );
    }
    catch( error ){
        next( error );
    }
}
        
const getOrderCustomer =  async ( req , res , next ) => {
    const query = `
        SELECT 
                o.order_id,
                o.customer_id,
                u.customer_name,
                u.customer_email,
                o.item_name,
                o.order_amount AS orderAmount,
                o.order_date
            FROM orders o
        JOIN customers u
            ON u.customer_id = o.customer_id
        WHERE o.order_id = ? AND u.customer_id = ?`;
        
    try{
        const oid = 
            Number(req.params.oid);
    
        const uid = 
            Number(req.params.uid);
        
        if( isNaN(uid) ){
            return next( 
                new appError( 
                    "Invalid customer ID" , 
                    404 
                )
            );
        }

        let [result] = 
            await pool.query( 
                query , 
                [oid , uid] 
            );

        if( result.length === 0 )
            return next( 
                new appError( 
                    "No order found with that ID" , 
                    404 
                )
            );
        
        return responseHandler( 
            res , 
            "Particular customer of particular order..." , 
            result , 
            200 
        );
    }
    catch( error ){
        next( error );
    }
}

module.exports = { 
    getAllOrders  , 
    getAllOrderCustomers , 
    getOrderCustomer 
};