const express = require("express");

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const usersRouter = express.Router();

const { getUsers } = require("../db");

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await getUsers();
        res.send({
            users
        });
    } catch (error) {
        throw error;
    }
})

// build some routes here

module.exports = usersRouter;