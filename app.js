#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql');

// execute single connection

// const connection = mysql.createConnection({
//     host: 'ubuntupi',
//     user: 'networkuser',
//     password: process.env.DBPASS,
//     database: 'ubuntupidb'
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
    host: 'ubuntupi',
    user: 'networkuser',
    password: process.env.DBPASS,
    database: 'ubuntupidb'
});

pool.query('select * from family', (error, data, fields) => {
    if (error) throw error;
    console.log(data);
});

pool.on('release',(connection) => {
    // console.log('Connection released');
    pool.end();
})