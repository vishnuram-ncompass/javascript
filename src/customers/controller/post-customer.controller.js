const express = require( 'express' );
const appError = require( '../../middleware/app-error' );
const { responseHandler } = require( '../../middleware/auth' );
const idSchema = require( '../schema/customer-id.schema' )
const pool = require( '../../utils/db' );
const bcrypt = require( 'bcrypt' );

const loginCustomerQuery = `
    SELECT 
        customer_id AS customerId,
        FROM customers c
    WHERE customer_name = ? ;`;
    
const passwordLoginCheckQuery=`
    SELECT 
            p.password AS customerPassword
        FROM passwords p 
    WHERE customer_id = ? ;`

const checkCustomerSql = `
    SELECT
        c.customer_id AS customerId
    FROM customers c
    WHERE c.customer_email = ? ;`;
    
const insertCustomerSql = `
    INSERT INTO customers ( customer_name , customer_email )
    VALUES (? , ?) ;`;

const insertPasswordSql = `
    INSERT INTO passwords (
        password,
        customer_id
    )
    VALUES (?, ?) ;`;

exports.loginCustomer = async (req, res) => {

    const { customerEmail, customerPassword } = req.body;
    const [result] = await pool.query(loginCustomerQuery, [customerEmail]);
    if (result.length === 0) {
        throw new appError(
            "Invalid Credentials",
            401
        );
    }
    const customerId = result[0];

    const [ password ] = await pool.query( 
        passwordLoginCheckQuery , 
        [ customerId ] 
    );

    const isValidPassword = await bcrypt.compare(
        customerPassword,
        password[0]
    );

    if (!isValidPassword) {
        throw new appError(
            "Invalid Credentials",
            401
        );
    }

    responseHandler(res, 200, {
        message: "Login Successful",
    });
};

// Adding customer section...

exports.addCustomer = async (req, res) => {

    const {
        customerName,
        customerEmail,
        customerPassword
    } = req.body;


    const [existingCustomer] = await pool.query(
        checkCustomerSql,
        [customerEmail]
    );

    if (existingCustomer.length > 0) {
        throw new appError(
            "Customer Already Exists",
            409
        );
    }

    const hashedPassword = await bcrypt.hash(
        customerPassword,
        10
    );

    const [customerResult] = await pool.query(
        insertCustomerSql,
        [customerName , customerEmail]
    );

    const customerId = customerResult.insertId;

    await pool.query(
        insertPasswordSql,
        [
            hashedPassword,
            customerId
        ]
    );

    responseHandler(
        res,
        "Customer Added Successfully",
        {
            customerId
        },
        201
    );
};