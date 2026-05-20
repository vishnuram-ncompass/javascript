const express = require( 'express' );
const { responseHandler } = require('../../middleware/auth' );
const pool = require( '../../utils/db' );
const appError = require( '../../middleware/app-error' );

const getAllQuery = `
    SELECT 
            o.order_id AS orderId,
            o.customer_id AS customerId,
            o.item_name AS itemName,
            o.order_amount AS orderAmount,
            o.order_date AS orderDate
        FROM orders o;`;
        
const getOrderCustomersQuery = `
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
            
const getOrderAndPartCustomerQuery = `
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
            
            
const getAllOrders = async ( req , res , next ) => {
                
    let [result] = await pool.query( getAllQuery );
    
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

const getAllOrderCustomers = async ( req , res , next ) => {

    const orderId = Number(req.params.orderId);

    if( isNaN(orderId) )
        return next( 
            new appError( 
                "Invalid order ID" , 
                404
            )
        );

    let [result] = 
        await pool.query( getOrderCustomersQuery , [oid] );

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
        
const getOrderCustomer =  async ( req , res , next ) => {
        
    const oid = 
        Number(req.params.orderId);

    const uid = 
        Number(req.params.customerId);
    
    if( isNaN(customerId) ){
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
            [orderId , customerId] 
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

module.exports = { 
    getAllOrders  , 
    getAllOrderCustomers , 
    getOrderCustomer 
};