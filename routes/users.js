const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usersRouter = express.Router();

const { createUser, getUsers } = require("../db");

// build some routes here

usersRouter.post("/register", async (req, res, next) => {  
    try {
        const { username, password } = req.body;
        const SALT_COUNT = 11;
        let securedPassword;
        const _user = await getUserByUsername({ username });
        
        if (_user) {
            next({
                name: "UserExistsError",
                message: "A user by that username already exists.",
            });
        }
        
        if (password.length <= 7) {
            next({
                name: "PasswordLengthError",
                message: "The password must be a minimum of at least 8 characters.",
            });
        } else {
            bcrypt.hash(password, SALT_COUNT, async (err, hashedPassword) => {
                securedPassword = hashedPassword;
                const user = await createUser({ username, password: securedPassword });

                const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
                    expiresIn: "1w",
                });
                delete user.password;
                delete user.id;
                user.token = token;
                res.send({ message: "The user was successfully created", user });
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

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



module.exports = usersRouter;