const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usersRouter = express.Router();

const { createOrder, createUser, createAdmin, getUserByUsername } = require("../db");
const { requireAdmin } = require('./utils');

// build some routes here

usersRouter.post("/adminify", async (req, res, next) => {
    try {
        const { username, password, admin } = req.body;
        console.log(req.body);
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
                const user = await createAdmin({
                    username,
                    password: securedPassword,
                    admin: true
                });

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
                res.send({ message: "The user was successfully created", user, token });
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next({
            name: "Missing Credentials",
            message: "Please supply a username and a password "
        })
    }

    try {
        const user = await getUserByUsername(username);
        const isAdmin = user.admin;
        const customer = user.username
        const hashedPassword = user.password;
        bcrypt.compare(password, hashedPassword, function (err, passwordsMatch) {
            if (passwordsMatch) {
                const token = jwt.sign({
                    id: user.id,
                    username
                }, process.env.JWT_SECRET, {
                    expiresIn: '1w'
                });

                res.send({
                    message: "You are logged in!",
                    token: token,
                    admin: isAdmin,
                    customer
                })
            } else {
                next({
                    name: 'incorrect Credentials',
                    message: 'Username or password is incorrect'
                })
            }
        })

    } catch ({ name, message }) {
        next({ name, message });
    }

})

usersRouter.post('/', async (req, res, next) => {
    const customer = req.user.username
    console.log('Customer Cart', customer)
    try {
        if (customer) {
            const cart = await createOrder(customer);
            res.send({
                cart
            });
        } else {
            console.log('Please Log in')
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
})

module.exports = usersRouter;