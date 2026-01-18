// Main access for queries
// Contains join queries

// Requires a database connection
const { query } = require('../database.js');

let client;
async function setDbClient(cl) {
    client = cl;
    console.log(`Client retrieved for queries`);
}

async function addGuild(guild)
{
    await query("INSERT INTO servers (server_id, server_name, member_count) VALUES ($1, $2, $3);",
        [guild.id, guild.name, guild.memberCount]);
}

async function getPrefix(server_id)
{
    const result = await query ("SELECT prefix FROM servers WHERE server_id = $1;", [server_id]);
    return result.rows[0].prefix;
}

async function setPrefix(server_id, prefix)
{
    return await query ("UPDATE servers SET prefix = $2 WHERE server_id = $1;", [server_id, prefix]);
}





/*
   Reminder for id usage:
   Id's used by discord and the bot's client is a snowflake number.
   The id's used to query the database must be a string.
*/

// Accessible from other code
module.exports = {
    setDbClient,
    addGuild,
    setPrefix,
    getPrefix,
};