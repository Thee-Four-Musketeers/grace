const client = require('./client');

async function createUser({ username, password }) {
    try {
        const { rows: [user]  } = await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            ON CONFLICT (username) DO NOTHING 
            RETURNING *;
        `,[username, password]);
        return user;
    } catch (error) {
        throw error
    }
}

async function createAdmin({ username, password, admin = true }){
    try {
        const { rows: [user]  } = await client.query(`
            INSERT INTO users (username, password, admin)
            VALUES ($1, $2, $3)
            ON CONFLICT (username) DO NOTHING 
            RETURNING *;
        `,[username, password, admin]);
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUsers(){
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM users;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getUserById(id){
    try {
        const { rows: [user] } = await client.query(`
            SELECT * 
            FROM users
            WHERE id = $1;
        `, [id])
        if (!user || user.length === 0) {
            return null;
        }
        return user;
    } catch (error) {
        throw error 
    }
}

async function getUserByUsername(username){
    try {
        const {rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE username = $1;
        `, [username]);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    createAdmin,
    getUsers,
    getUserById,
    getUserByUsername
  }