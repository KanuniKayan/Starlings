// Main access for queries
// Contains join queries

// Requires a database connection
const { query } = require('../database.js');

let client;
async function setDbClient(cl) {
    client = cl;
    console.log(`Client retrieved for queries`);
}

async function fetchGuild(guild)
{
    return await query("SELECT * FROM servers WHERE server_id = $1;", [guild.id]);
}

async function addGuild(guild)
{
    await query("BEGIN;");
    await query("INSERT INTO servers (server_id, server_name, member_count) VALUES ($1, $2, $3);",
        [guild.id, guild.name, guild.memberCount]);
    return await query("COMMIT;");

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

async function getRestriction(server_id)
{
    const result = await query("SELECT channel_id FROM restrictions WHERE server_id = $1;", [server_id]);
    return result.rows;
}

async function setRestriction(server_id, channel_id)
{
    return await query("INSERT INTO restrictions(server_id, channel_id) VALUES($1, $2)", [server_id, channel_id]);
}

async function removeRestriction(server_id, channel_id)
{
    return await query("DELETE FROM restrictions WHERE server_id = $1 AND channel_id = $2;", [server_id, channel_id]);
}





/*
   Reminder for id usage:
   Id's used by discord and the bot's client is a snowflake number.
   The id's used to query the database must be a string.
*/

// Accessible from other code
module.exports = {
    setDbClient,
    fetchGuild, addGuild,
    getPrefix, setPrefix,
    getRestriction, setRestriction, removeRestriction,

};