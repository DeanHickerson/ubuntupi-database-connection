#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql');

// execute single connection

// const connection = mysql.createConnection({
    // host: process.env.HOST,
    // user: process.env.USER,
    // password: process.env.DBPASS,
    // database: process.env.DB
// });


// connection.connect();
// connection.query('select * from family',(err,data,fields) => {
//     if(err) {
//         console.log(err);
//         return
//     } else {
//         // console.log(fields,data);
//         fs.promises.writeFile('family.json',JSON.stringify(data),'utf-8');
//     }
// });

// connection.end();

// execute a connection pool

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DBPASS,
    database: process.env.DB
});

pool.query(`select * from ${process.env.TABLE}`, (error, data, fields) => {
    if (error) throw error;
    console.log(data);
});

pool.on('release',(connection) => {
    // console.log('Connection released');
    pool.end();
})