// code to build and initialize DB goes here
const { client, createUser, createProduct} = require('./index');

async function buildTables() {
    try {
        client.connect();

        await client.query(`
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS users;
        `);

        console.log('start building users');
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR (255) UNIQUE NOT NULL,
                password VARCHAR (255)NOT NULL,
                "firstName" VARCHAR (255),
                "lastName" VARCHAR (255),
                "houseNumber" INTEGER,
                "streetName" VARCHAR (255),
                city VARCHAR (255),
                state VARCHAR (255),
                zipcode INTEGER,
                admin BOOLEAN
            );
        `);
        console.log('end building users');

        console.log('start building products');

        // ADD CONSTRAINT type CHECK (type = "Cheese" or type = "Meat" or type = "Fruit" or type = "Pre-Made Board"),

        await client.query(`
            CREATE TABLE products (
                id SERIAL PRIMARY KEY,
                name VARCHAR (255) UNIQUE NOT NULL,
                description TEXT NOT NULL,
                price NUMERIC (6, 2) NOT NULL,
                type VARCHAR (255) NOT NULL,
                origin VARCHAR (255),
                hardness VARCHAR (255),
                odor VARCHAR (255)
            );
        `);
        console.log('end building products');

        console.log('start building orders');

        // ADD CONSTRAINT status CHECK (status = "Empty Cart" or status = "Incompleted/Abandoned Cart" or status = "Completed

        await client.query(`
            CREATE TABLE orders (
                id SERIAL PRIMARY KEY,
                customer VARCHAR (255) REFERENCES users (username),
                item VARCHAR (255) REFERENCES products (name),
                quantity INTEGER,
                status VARCHAR (255),
                subtotal NUMERIC (6, 2),
                modifier1 NUMERIC (3, 2),
                modifier2 NUMERIC (3, 2),
                modifier3 NUMERIC (3, 2),
                modifier4 NUMERIC (3, 2),
                shipping NUMERIC (5, 2),
                handling NUMERIC (5, 2),
                total Numeric (6, 2),
                urgency VARCHAR (255)
            );
        `);
        console.log('end building orders');
    } catch (error) {
        throw error;
    }
}

async function createInitialUsers() {
    try {
        console.log('start creating initial users');

        const userOne = await createUser({
            username: 'sebas@sebas.com',
            password: 'password',
        });
        console.log(userOne);

        console.log('end creating initial user');
    } catch (error) {
        throw error;
    }
}

async function createInitialProducts() {
    try {
        console.log('start creating initial products');

        const productOne = await createProduct({
            name: 'Mayonaise Cheese',
            description: 'This is a really high fat cheese for you Keto fans.',
            price: '5.00',
            type: 'Cheese',
            
        });
        console.log(productOne);

        console.log('end creating initial products');
    } catch (error) {
        throw error;
    }
}

async function populateInitialData() {
    try {
        console.log('start populating initial users');
        await createInitialUsers();
        await createInitialProducts();
        console.log('end populating initial users');
    } catch (error) {
        throw error;
    }
}

buildTables()
    .then(populateInitialData)
    .catch(console.error)
    .finally(() => client.end());
