// code to build and initialize DB goes here
const {
  client,
  createUser
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
    `)

    // build tables in correct order
    await client.query(`
      
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR (255),
        "lastName" VARCHAR (255),
        username VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR (255),
        "houseNumber" INTEGER,
        "streetName" VARCHAR (255),
        city VARCHAR (255),
        state VARCHAR (255),
        zipcode INTEGER,
        admin BOOLEAN
      );
    
     `);

  } catch (error) {
    throw error;
  }
}


async function createInitialUsers(){
  try {
    console.log('creating initial users')
    const userOne = await createUser({
      username: 'Sebas@sebas.com',
      password: 'password'
    })
    console.log(userOne)
    console.log('finised creating initial user')
  } catch (error) {
    throw error
  }
}


// async function createInitialProducts(){
//   try {
//     console.log('creating initial products')
//   } catch (error) {
//     throw error
//   }
// }

async function populateInitialData() {
  try {
  console.log('creating initial usersx2')
   await createInitialUsers()
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());