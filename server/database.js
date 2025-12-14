const Pool = require('pg').Pool; // Importing the pg module to interact with PostgreSQL


const pool = new Pool({
    user: "postgres",
    password: "", // Enter your password here
    database: "", // Enter your database name here
    host: "localhost",
    port: "5432" // Default port for postgresql is 5432
});

// A function to execute queries
const execute = async(query1, query2) => {
    try {
        await pool.connect(); // Gets connection
        // Sends queries
        await pool.query(query1);
        await pool.query(query2); 
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

// Query to create tables if they do not exist
const createTblQuery1 = `
    CREATE TABLE IF NOT EXISTS "posts" (
	    "id" SERIAL PRIMARY KEY,
	    "body" VARCHAR(200) NOT NULL,
        "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
    );`;

const createTblQuery2 = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL
    );`;

// A function to execute the previous query   
execute(createTblQuery1, createTblQuery2).then(result => {
    if (result) {
        console.log('If does not exists, table "users" and  table "posts" are created');
    }
});

module.exports = pool;