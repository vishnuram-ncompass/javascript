const express = require( 'express' );
const appError = require( '../../middleware/app-error' );
const { responseHandler } = require( '../../middleware/auth' );
const idSchema = require( '../schema/customer-id.schema' )

let pool = require( '../../utils/db' );

const getUserById = `
    SELECT 
                c.customer_id AS customerId,
                c.customer_name AS customerName,
                c.customer_email AS customerEmail
            FROM customers c
        WHERE c.customer_id = ?;`;

const getAllQuery = 
    `SELECT 
            c.customer_id AS customerId,
            c.customer_name AS customerName,
            c.customer_email AS customerEmail
        FROM customers c;`;
        
const query = `
    SELECT 
            c.customer_id AS customerId,
            c.customer_name AS customerName,
            c.customer_email AS customerEmail,
            o.order_id AS orderId,
            o.item_name AS itemName,
            o.order_amount AS orderAmount,
            o.order_date AS orderDate
        FROM customers c
    JOIN orders o
    ON c.customer_id = o.customer_id
    WHERE c.customer_id = ?;`;
    
const getCustomerAndPartOrderQuery = `
    SELECT 
            c.customer_id AS customerId,
            o.order_id AS orderId,
            c.customer_name AS customerName,
            c.customer_email AS customerEmail,
            o.item_name AS itemName,
            o.order_amount AS orderAmount,
            o.order_date AS orderDate
        FROM customers c
    JOIN orders o
        ON c.customer_id = o.customer_id
    WHERE c.customer_id = ? AND o.order_id = ?; `;

const getAllCustomers = async (req , res , next) => {

    let [result] = await pool.query( getAllQuery );
    
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

    const customerId = req.params.customerId;
    let [result] = await pool.query( 
            query , 
            [customerId] 
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
    
    const customerId = req.params.customerId;
    const orderId = req.params.orderId;

    if( isNaN( orderId ) ){
        return next( 
            new appError( 
                "Invalid order ID" , 
                404 
            )
        )
    }

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
            getCustomerAndPartOrderQuery , 
            [customerID,orderId] 
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