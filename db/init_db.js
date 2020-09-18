// code to build and initialize DB goes here
const client = require("./client")

const {
    createUser,
    createProduct,
    getUsers,
    getUserById,
    getProducts,
    getProductById
} = require('./index');

async function buildTables() {
    try {
        client.connect();

        await client.query(`

            DROP TABLE IF EXISTS orders_products;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS users;
            DROP TYPE IF EXISTS choice;
            DROP TYPE IF EXISTS urgency;
            DROP TYPE IF EXISTS status;
            CREATE TYPE choice AS ENUM ('Cheese', 'Meat', 'Fruit', 'Pre-Made Board');
            CREATE TYPE urgency AS ENUM ('Overnight', 'Two Day', 'Ground', 'USPS');
            CREATE TYPE status AS ENUM ('Cart', 'Order', 'Paid', 'Shipped', 'Complete', 'History');
        `);

        console.log('start building users');
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR (255) UNIQUE NOT NULL,
                password VARCHAR (255) NOT NULL,
                "firstName" VARCHAR (255),
                "lastName" VARCHAR (255),
                address VARCHAR (255),
                address2 VARCHAR (255),
                city VARCHAR (255),
                state VARCHAR (255),
                zipcode INTEGER,
                admin BOOLEAN DEFAULT false
            );
        `);
        console.log('end building users');

        console.log('start building products');
        await client.query(`
        
            CREATE TABLE products (
                id SERIAL PRIMARY KEY,
                name VARCHAR (255) UNIQUE NOT NULL,
                description TEXT NOT NULL,
                price NUMERIC (6, 2) NOT NULL,
                type choice NOT NULL DEFAULT 'Cheese',
                "imageUrl" NOT NULL VARCHAR (255),
                origin VARCHAR (255),
                hardness VARCHAR (255),
                odor VARCHAR (255)
            );
        `);
        console.log('end building products');

        console.log('start building orders');
        await client.query(`

            CREATE TABLE orders (
                id SERIAL PRIMARY KEY,
                customer VARCHAR (255) REFERENCES users (username),
                status status DEFAULT 'Cart',
                subtotal NUMERIC (6, 2),
                tax NUMERIC (3, 2) DEFAULT 1.08,
                discount NUMERIC (3, 2) DEFAULT 1,
                loyalty NUMERIC (3, 2) DEFAULT 1,
                "largeOrder" NUMERIC (3, 2) DEFAULT 1,
                shipping NUMERIC (5, 2) DEFAULT 200*random(),
                total NUMERIC (6, 2),
                urgency urgency NOT NULL DEFAULT 'USPS'
            );
        `);
        console.log('end building orders');
        
        console.log('start building orders_products');
        await client.query(`
            CREATE TABLE orders_products (
                id SERIAL PRIMARY KEY,
                "productId" INTEGER REFERENCES products(id),
                "orderId" INTEGER REFERENCES orders(id),
                "productIdQuantity" INTEGER
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

        const userTwo = await createUser({
            username: 'john@john.com',
            password: 'password'
        
        })

        const userThree = await createUser({
            username: 'carolyn@carloyn.com',
            password: 'password'
        
        })

        const userFour = await createUser({
            username: 'duffy@duffy.com',
            password: 'password'
        
        })

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

        const productTwo = await createProduct({
            name: 'FrankenCheese',
            description: 'Smells like home',
            price: '3.99',
            type: 'Cheese'
        })

        console.log('end creating initial products');
    } catch (error) {
        throw error;
    }
}

async function testDB(){

    console.log("calling getAllUsers")
        const allUsers = await getUsers()
    console.log('users:', allUsers)

    console.log('calling getProducts')
        const AllProducts = await getProducts()
    console.log('products:', AllProducts)

    console.log("calling getUserById")
        const userById = await getUserById(2)
    console.log('user2:', userById)

    console.log('calling getProductById')
        const product2 = await getProductById(2)
    console.log('product2:', product2)
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
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());
