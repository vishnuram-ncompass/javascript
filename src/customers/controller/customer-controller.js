const express = 
    require( 'express' );

let pool = 
    require( '../../utils/db' );

const appError = 
    require('../../middleware/app-error');

const { responseHandler } = 
    require('../../middleware/auth');

const getAllCustomers = async (req , res , next) => {
    const query = 
        `SELECT 
                c.customer_id AS customerId,
                c.customer_name AS customerName,
                c.customer_email AS customerEmail
            FROM customers c;`;

    let [result] = 
        await pool.query( query );
    
    if( result.length === 0 ){
        return next( 
            new appError( 
                "No customers found" ,
                404
            )
        );
    }

    return responseHandler( 
        res , 
        "Get all customers..." , 
        result,
        200
    );
}

const getAllCustomerOrders = async (req , res , next) => {
    const query = `
        SELECT 
                    c.customer_id AS customerId,
                    c.customer_name AS customerName,
                    c.customer_email AS customerEmail,
                    o.order_id AS orderId,
                    o.item_name AS itemName,
                    o.amount AS orderAmount,
                    o.order_date AS orderDate
                FROM customers c
            JOIN orders o
                ON c.customer_id = o.customer_id
            WHERE c.customer_id = ?;`;

    const uid = 
        req.params.uid;
    
    if( isNaN(uid) )
        return next( 
            new appError(
                " Invalid customer ID" , 
                404 
            )
        );

    let [result] = 
        await pool.query( 
            query , 
            [uid] 
        );
    
    if( result.length === 0 ){
        return next( 
            new appError( 
                "No orders found for that customer" , 
                404
            )
        );
    }    
    
    return responseHandler( 
        res , 
        "Get all customer orders..." , 
        result,
        200
    );
}

const getCustomerOrder =  async (req , res , next) => {
    const query = `
    SELECT 
    c.customer_id AS customerId,
    o.order_id AS orderId,
    c.customer_name AS customerName,
    c.customer_email AS customerEmail,
    o.item_name AS itemName,
    o.amount AS orderAmount,
    o.order_date AS orderDate
    FROM customers c
    JOIN orders o
    ON c.customer_id = o.customer_id
    WHERE c.customer_id = ? AND o.order_id = ?; `;
    
    const uid = req.params.uid;
    
    const oid = req.params.oid;
    
    if( isNaN( oid ) ){
        return next( 
            new appError( 
                "Invalid order ID" , 
                404 
            )
        )
    }

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
            [uid,oid] 
        );

    if( result.length === 0 )
        return next( 
            new appError( 
                "No order found with that customer" , 
                404 
            )
        );

    return responseHandler( 
        res , 
        "Get customer order..." , 
        result,
        200
    );
}

module.exports = { 
    getAllCustomers  , 
    getAllCustomerOrders , 
    getCustomerOrder 
};