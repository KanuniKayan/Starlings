// Main access for queries
// Contains join queries

// Requires a database connection
const { query } = require('../database.js');

let client;

// Fetching client after bot is fully ready
async function setDbClient(cl) {
    client = cl;
    console.log(`Client retrieved for queries`);
}

/*
   Reminder for id usage:
   Id's used by discord and the bot's client is a snowflake number.
   The id's used to query the database must be a string.
*/

// Accessible from other code
module.exports = {
    setDbClient,
};