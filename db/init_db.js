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
            CREATE TYPE choice AS ENUM ('Cheese', 'Meat', 'Fruit', 'Board');
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
                addresstwo VARCHAR (255),
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
                "imageUrl" VARCHAR (255),
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
        console.log('end building orders_products');

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
        });
        console.log(userTwo);

        const userThree = await createUser({
            username: 'duffy@duffy.com',
            password: 'password',
        });
        console.log(userThree);

        const userFour = await createUser({
            username: 'carolyn@carolyn.com',
            password: 'password'
        });
        console.log(userFour);

        console.log('end creating initial user');
    } catch (error) {
        throw error;
    }
}

async function createInitialProducts() {
    try {
        console.log('start creating initial products');

        const productTwo = await createProduct({
			name: 'Asiago', 
            description: 'Nutty, spicy variant of Parmesan',
            price: 3.78,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Italy',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productTwo);
		
		const productThree = await createProduct({
			name: 'Allium Piper', 
            description: 'Goat milk from Towerview and Oskjberg dairies is used for making the Chevre (meaning Goat in French). After pasteurization the milk is allowed to set using traditional method. Very next day curd is drained for several hours. Very small amount of salt, crushed garlic cloves and little black pepper is added to the curd, and then the mixture is allowed to drain for about 10 days in a controlled environment. This elegant, fresh, white cheese is perfect for cheese board. There is no intense goaty taste, typically associated with goat milk cheeses. It has a characteristic spicy flavour with notes of garlic and pepper. This delicious cheese can be eaten with crusty bread.',
            price: 9.78,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Austria',
            hardness: 'Fresh Soft',
			odor: 'Fresh, garlicky, spicy'});
		console.log(productThree);
		
		const productFour = await createProduct({
			name: 'Anari', 
            description: 'Anari is a fresh ricotta style soft, mild whey cheese, made from goat or sheep’s milk. In Cyprus, Anari is among the lesser-known cheeses but has started growing its popularity after public exposure. ',
            price: 5.22,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Cyprus',
            hardness: 'Fresh Soft',
			odor: 'Mild'});
		console.log(productFour);
		
		const productFive = await createProduct({
			name: 'Baladi', 
            description: ' It is a soft unripened cheese with a sweet and slightly salty flavour. This artisan cheese can be eaten with local bread or served with a drizzle of olive oil and fresh herbs.',
            price: 7.69,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Lebanon',
            hardness: 'Fresh Soft',
			odor: 'Fresh'});
		console.log(productFive);
		
		const productSix = await createProduct({
			name: "Boulette D'avesnes", 
            description: 'This creamy, fresh cheese is well known for its stinky flavour and is best consumed with a good beer or traditional gin.',
            price: 8.22,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Fresh Soft',
			odor: 'Stinky'});
		console.log(productSix);
		
		const productSeven = await createProduct({
			name: 'Brocciu', 
            description: 'Brocciu is a whey cheese served as a lactose-free alternative to Italian – Ricotta. ',
            price: 11.12,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Corsica',
            hardness: 'Soft Fresh',
			odor: 'Sweet'});
		console.log(productSeven);
		
		const productEight = await createProduct({
			name: 'Burgos', 
            description: ' Burgos cheese is usually accompanied by other foods like honey, quince or walnuts.',
            price: 7.23,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Spain',
            hardness: 'Fresh Soft',
			odor: 'Fresh'});
		console.log(productEight);
		
		const productNine = await createProduct({
			name: 'Burrata', 
            description: ' The outside thin shell is a pasta filata curd made of buffalo and/or cow milk mozzarella while the insides contain a soft, doughy, stringy, mixture of curd and fresh cream.',
            price: 8.99,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Italy, US',
            hardness: 'Fresh Soft',
			odor: 'Fresh, Milky'});
		console.log(productNine);
		
		const productTen = await createProduct({
			name: 'Creamy Lancashire', 
            description: 'The Creamy Lancashire cheese is very popular as a spread on toast. In fact, in some areas it is called toastie. It also goes well with Welsh rarebit, sandwiches and pastas.',
            price: 8.78,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'England',
            hardness: 'Fresh Soft',
			odor: 'Rich'});
		console.log(productTen);
		
		const productEleven = await createProduct({
			name: 'Fresh Chevre', 
            description: 'It is a very versatile piece of cooking ingredient and can be used in both savoury and sweet dishes. It will taste delicious with pasta, salads, in a cheesecake. Fresh Chevre goes well with Sparkling wine.',
            price: 6.23,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'US',
            hardness: 'Fresh Soft',
			odor: 'Mild, Tangy'});
		console.log(productEleven);
		
		const productTwelve = await createProduct({
			name: 'Fromage Blanc', 
            description: 'Pure Fromage Blanc is almost fat free but cream is added to agument its flavour, which also increases its fat content making it nearly eight percent of total weight. It has a smooth, slightly citric flavour with a texture similar to ricotta. It is used in pastry fillings, pastas or served as a dessert with fruits.',
            price: 6.91,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'US',
            hardness: 'Fresh Soft',
			odor: 'Fresh'});
		console.log(productTwelve);
		
		const productThirteen = await createProduct({
			name: 'Mascarpone', 
            description: 'Mascarpone is used in both sweet and savory dishes. It is added to enhance the flavour of the dish without overwhelming the original taste. The cheese tastes best with anchovies, mustard and spices, or mixed with cocoa or coffee. ',
            price: 9.45,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Italy',
            hardness: 'Fresh Soft',
			odor: 'Fresh'});
		console.log(productThirteen);
		
		const productFourteen = await createProduct({
			name: 'Myzithra', 
            description: 'The snowy white cheese with a flavour similar to Ricotta Salata is used by Cretans to spread on paximadia or prepare tyropitas and kaltsounakia cheese pies.',
            price: 5.45,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Greece',
            hardness: 'Fresh Soft',
			odor: 'Mild, Pungent'});
		console.log(productFourteen);
		
		const productFifteen = await createProduct({
			name: "Pave D'affinois", 
            description: 'Though similar to Brie in appearance and flavour, this soft-ripened cheese is actually much creamier and takes less time to ripen. ',
            price: 11.19,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Fresh Soft',
			odor: 'Fresh, Milky'});
		console.log(productFifteen);
		
		const productSixteen = await createProduct({
			name: 'Queso Blanco', 
            description: 'It softens without melting, a characteristic very important in Latin American cooking. One can crumble Queso Blanco on salads, over rice and beans or serve it as a table cheese with fresh fruit, marmalade or chutney.',
            price: 8.22,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Mexico',
            hardness: 'Fresh Soft',
			odor: 'Aromatic, Fresh'});
		console.log(productSixteen);
		
		const productSeventeen = await createProduct({
			name: 'Queso Fresco', 
            description: 'Queso Adobera can be eaten as a cold snack, crumbled on soups and salads, chopped in sandwiches, tacos and melted on Mexican quesadillas.',
            price: 5.76,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Mexico',
            hardness: 'Fresh Soft',
			odor: 'Fresh'});
		console.log(productSeventeen);
		
		const productEighteen = await createProduct({
			name: 'Roule', 
            description: 'The cheese has a respectable place on cheeseboard but can also be spread on a toast or used as an ingredient in cooking.',
            price: 6.92,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Fresh Soft',
			odor: 'Herbal, Rich'});
		console.log(productEighteen);
		
		const productNineteen = await createProduct({
			name: 'Cotija', 
            description: 'Since, Cotija cheese is very salty, strongly flavoured, firm and does not actually melt, it is used for grating on salads, soups, casseroles, tacos, tostadas and chilli. ',
            price: 4.54,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Mexico',
            hardness: 'Fresh Firm',
			odor: 'Mild'});
		console.log(productNineteen);
		
		const productTwenty = await createProduct({
			name: 'Ricotta di Bufala', 
            description: 'It is a firm-textured, soft and melting ricotta made with whey gathered while processing buffalo milk. Flavours are delicate and sweet with a distinct aroma.',
            price: 8.22,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Italy',
            hardness: 'Fresh Firm',
			odor: 'Fresh, Rich'});
		console.log(productTwenty);
		
		const productTwentyone = await createProduct({
			name: 'Shanklish', 
            description: 'Shanklish is common meze dish often accompanied with finely chopped tomato, onion, and olive oil. It is also eaten mashed with eggs, pita bread with cucumbers, mint, and olive oil for breakfast.',
            price: 19.09,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Egypt',
            hardness: 'Fresh Firm',
			odor: 'Fresh, Pungent, Strong'});
		console.log(productTwentyone);
		
		const productTwentytwo = await createProduct({
			name: 'Wensleydale', 
            description: 'Wensleydale with Cranberries is a hand-made Yorkshire cheese that is sold fresh & young at only three weeks old. The cheese has a sweet flavour of the fruity succulence of juicy cranberries with honeyed undertones.',
            price: 4.22,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Wensleydale with Cranberries is a hand-made Yorkshire cheese that is sold fresh & young at only three weeks old. The cheese has a sweet flavour of the fruity succulence of juicy cranberries with honeyed undertones.',
            hardness: 'Fresh Firm',
			odor: 'Mild'});
		console.log(productTwo);
		
		const productTwentythree = await createProduct({
			name: "Afuega'l Pitu", 
            description: 'This type of Afuega’L Pitu has very strong, spicy flavour as it is always eaten when matured. ',
            price: 6.77,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Spain',
            hardness: 'Soft',
			odor: 'Mild'});
		console.log(productTwentythree);
		
		const productTwentyfour = await createProduct({
			name: 'Baby Brie', 
            description: 'Baby Brie, Petit Brie, Mini Brie all are same as the regular Brie, but their diameters are smaller, giving different names. ',
            price: 9.09,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Aromatic'});
		console.log(productTwentyfour);
		
		const productTwentyfive = await createProduct({
			name: 'Banon', 
            description: 'Banon goes well with crusty baguette, fresh fruits and a glass of dry white wine.',
            price: 7.46,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Strong'});
		console.log(productTwo);
		
		const productTwentysix = await createProduct({
			name: 'Baron Bigod', 
            description: 'Baron Bigod has a smooth, delicate silky texture and golden paste with long-lasting warm earth, farmyard and mushroom flavours.',
            price: 8.44,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'England',
            hardness: 'Soft',
			odor: 'Barnyard, Mushroom'});
		console.log(productTwentysix);
		
		const productTwentyseven = await createProduct({
			name: 'Bavaria Blu', 
            description: 'The cheese tastes great on its own, but you could also try pairing it with mango chutney, aromatic red wines such as Dornfelder or Lagrein, or whites such as Riesling or Silvaner.',
            price: 11.07,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Germany',
            hardness: 'Soft',
			odor: 'Aromatic, Rich'});
		console.log(productTwentyseven);
		
		const productTwentyeight = await createProduct({
			name: 'Blythedale Camembert', 
            description: 'The edible bloomy rind is covered with a soft paste that has a mushroomy and earthy flavour. This is a breakfast or a dessert cheese that can be served slices of baguette.',
            price: 6.86,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'US',
            hardness: 'Soft',
			odor: 'Mild'});
		console.log(productTwentyeight);
		
		const productTwentynine = await createProduct({
			name: 'Boursault', 
            description: 'Try pairing this cheese with grapes or pears and light, fruity wines like Vouvray.',
            price: 5.56,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Italy',
            hardness: 'Soft',
			odor: 'Earthy'});
		console.log(productTwentynine);
		
		const productThirty = await createProduct({
			name: 'Brie', 
            description: 'Brie, one of the great dessert cheeses, comes as either a 1 or 2-kilogram wheel and is packed in a wooden box. In order to enjoy the taste fully, Brie must be served at room temperature.',
            price: 12.21,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Pronounced, Strong'});
        console.log(productThirty);

        const productThirtyone = await createProduct({
			name: 'Buche de Chevre', 
            description: '. The white pate of Buche de Chevre reveals a complex yet typical, bold taste of French goat cheeses underlined by sweet notes of caramel. Soft and creamy with a flaky centre, the cheese instantly melts in the mouth.',
            price: 7.87,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Goaty'});
		console.log(productThirtyone);
		
		const productThirtytwo = await createProduct({
			name: 'Caciocavallo', 
            description: 'With persistent aging, the cheese picks up intense, earthy undertones and fruity aromas. Along the way, it turns from a milky white to a darker yellow in colour and becomes more salty. The result is a cheese with profound tasting notes and perfect accompaniment to a glass of Primitivo red wine.',
            price: 16.06,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Italy',
            hardness: 'Soft',
			odor: 'Earthy, Strong'});
		console.log(productThirtytwo);
		
		const productThirtythree = await createProduct({
			name: 'Camembert', 
            description: 'This cheese is best paired with a light red wine such as Beaujolais, Chenin Blanc, St Emilion, St Estephe or traditionally a glass of Normandy cider.',
            price: 13.12,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Earthy'});
		console.log(productThirtythree);
		
		const productThirtyfour = await createProduct({
			name: 'Casu Marzu', 
            description: 'The cheese contains live maggots and is a part of the Sardinian food heritage. After fermentation, the cheese is left to decompose with the help of the digestive action of the cheese fly larvae which are introduced in the cheese solely for this purpose. Due to the action of the larvae, the cheese becomes very soft and liquid.',
            price: 12.07,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Italy',
            hardness: 'Soft',
			odor: 'Mild'});
		console.log(productThirtyfour);     
        		
		const productThirtyfive = await createProduct({
			name: 'Cure Nantais', 
            description: 'Nantais is served along with fish dishes, or over pears and apples. It can also be used as an ingredient for various dishes such as gratins or tarts. Moreover, it can be made a part of a cheese platter. If paired with white wine, Gros Plant or Muscadet, Nantais cheese tastes the best.',
            price: 9.04,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Mild'});
		console.log(productThirtyfive);
		
		const productThirtysix = await createProduct({
			name: 'Delice de Bourgogne', 
            description: 'The mushroomy aroma of thin rind adds a playful contrast to the rich, creamy, buttery and tangy notes of the interior. This high fat cheese pairs very well with Champagne or Ciders and Wheat Beers.',
            price: 13.87,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Mushroom, Pungent, Strong'});
		console.log(productThirtysix);
		
		const productThirtyseven = await createProduct({
			name: 'Dolcelatte', 
            description: 'The fat content in Dolcelatte is higher than Gorgonzola at about 50%. Suitable for vegetarians, it is served with grapes, used in a rich pasta sauce, and paired with Rose or Juicy Red, Port wine, and Venetian Merlot wines.',
            price: 8.24,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Italy',
            hardness: 'Soft',
			odor: 'Mild'});
		console.log(productThirtyseven);
		
		const productThirtyeight = await createProduct({
			name: 'Filetta', 
            description: 'A filetta is a delectable cheese with a slightly crunchy, salty and edible rind coating the soft and supple pate. It is mushroomy, earthy and herbal to taste with a faint hint of the fern spring.',
            price: 12.03,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Herbaceous, Mild, Mushroomy'});
		console.log(productThirtyeight);
		
		const productThirtynine = await createProduct({
			name: 'Flor de Guia', 
            description: 'NFlor de Guia has reddish rind, soft and elastic texture, pale yellow colour and small eyes. It is manufactured in cylindrical but flat shape with round edges. It has a buttery taste and is easily melted.',
            price: 18.02,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Spain',
            hardness: 'Soft',
			odor: 'Mild'});
		console.log(productThirtynine);
		
		const productForty = await createProduct({
			name: 'Fresh Truffles', 
            description: 'These cheeses taste delicious with condiments, for example Truffle and Porto Sauce, Black Truffle Mustard, Black Truffle Sherry Vinegar and many others.',
            price: 14.11,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Aromatic, Earthy'});
		console.log(productForty);
		
		const productFortyone = await createProduct({
			name: 'Fromage Corse', 
            description: ' The crusty, washed rind has orange and yellow moulds. Flavour of wild and herbs growing on the local mountains are reflected in the cheese. ',
            price: 16.43,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Herbal'});
		console.log(productFortyone);
		
		const productFortytwo = await createProduct({
			name: 'Gorgonzola Dolce DOP', 
            description: 'It has a pale yellow, buttery and melty paste speckled with a homogeneous distribution of blue and green veins. The rind is compact, rough, hard and grey/pinkish in colour but not edible. Flavours are not very assertive but sweet, mild with notes of sour cream and lactic tang.',
            price: 14.08,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Italy',
            hardness: 'Soft',
			odor: 'Mild, Milky'});
		console.log(productFortytwo);
		
		const productFortythree = await createProduct({
			name: 'Grey Owl', 
            description: 'The interior paste is firm, crumbly and dense, softening at the edge of the rind. As it melts in your mouth, the smooth and silky texture of the cheese offers pleasing sharp and lemony flavours that go perfectly well with a dry Riesling or a nice crisp dry Sauvignon Blanc.',
            price: 9.22,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Canada',
            hardness: 'Soft',
			odor: 'Fresh, Goaty'});
		console.log(productFortythree);
		
		const productFortyfour = await createProduct({
			name: 'Harbison', 
            description: 'When ripe, Harbison has a very spoonable texture that continues to soften until consumed. It’s woodsy and sweet with lemony, mustardy, and vegetal flavours. Oaked white wine or barrel-aged sour beers make great accompaniments. Also, don’t forget some fruit mostarda and crusty bread.',
            price: 14.11,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'US',
            hardness: 'Soft',
			odor: 'Floral, Fruity, Mushroom, Rich'});
		console.log(productFortyfour);
		
		const productFortyfive = await createProduct({
			name: 'Herve', 
            description: ' When young, Herve is sweet and becomes spicy as it ages. Since it is fully flavoured, it is usually eaten with dark bread and beers.',
            price: 9.08,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Belgium',
            hardness: 'Soft',
			odor: 'Pungent'});
		console.log(productFortyfive);
		
		const productFortysix = await createProduct({
			name: 'La Serena', 
            description: 'A fully matured La Serena has a creamy consistency that can be scooped out after cutting out the circular lid. The intense bitter yet pleasant flavour tastes best with bread or toast.',
            price: 16.32,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Spain',
            hardness: 'Soft',
			odor: 'Pleasant, Strong'});
		console.log(productFortysix);
		
		const productFortyseven = await createProduct({
			name: 'Le Sendrillon', 
            description: 'This triangular, log-shaped cheese has got a smooth ivory body enveloped by a marble-textured rind. The flavour is fairly strong, acidic and slightly sour. When young, the overall taste is mild, but as it ripens, the flavour becomes more pronounced with the rind acquiring a bit of spice.',
            price: 13.84,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Canada',
            hardness: 'Soft',
			odor: 'Goaty'});
		console.log(productFortyseven);
		
		const productFortyeight = await createProduct({
			name: 'Macconais', 
            description: 'Mâconnais gives away a light herbal, salty flavour and smell. The longer the maturation process, the harder and saltier, Mâconnais will become. The cheese perfectly goes with a glass of Chablis, Macon Red or a Beaujolais, Wheat beer, crackers and fruit.',
            price: 16.01,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Herbal'});
		console.log(productFortyeight);
		
		const productFortynine = await createProduct({
			name: 'Milawa White', 
            description: 'Milawa White is made from cow milk and is generally loved by the cheddar lovers. The cheese melts beautifully in a toasted cheese sandwich or cheese sauce. Marries well with Champagne or lighter style wines.',
            price: 8.20,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Australia',
            hardness: 'Soft',
			odor: 'Earthy, Yeasty'});
		console.log(productFortynine);
		
		const productFifty = await createProduct({
			name: 'Mothais a ls Feuille', 
            description: 'Mothais a la Feuille has a soft, runny texture that becomes dense as it ages. The unique combination of earthy, lemony and mold flavours of the leaf become intense as the cheese matures. Mothais a la Feuille pairs well with Champagne or a single-malt whisky. ',
            price: 16.68,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Earthy'});
		console.log(productFifty);
		
		const productFiftyone = await createProduct({
			name: 'Wagyu Beef Bresaola', 
            description: 'This Italian-style charcuterie is hand-crafted and dry-cured with simple ingredients - nothing but beef, salt and spices. No nitrates or nitrites added.',
            price: 149.99,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Beef',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftyone);
		
		const productFiftytwo = await createProduct({
			name: 'Duck Leg Confit', 
            description: 'We make our duck leg confit with all-natural ingredients, using traditional methods perfected in Southwest France. Duck legs are slowly cooked in their own juices for classic confit that is flavorful, tender, and a great addition to your favorite dishes. ',
            price: 12.99,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Duck',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftytwo);
		
		const productFiftythree = await createProduct({
			name: 'Smoked Magret Duck Breast', 
            description: ' Fully-cooked and ready-to-eat our duck breast is smoked over real wood chips and made without any preservatives, nitrates, nitrites, fillers or artificial flavors.',
            price: 22.99,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Duck',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftythree);
		
		const productFiftyfour = await createProduct({
			name: 'Duck Terrine Mousquetaire', 
            description: ' Made with all-natural ingredients, including prunes and Armagnac, and inspired by the flavors of Southwest France, this country-style pâté makes a wonderful addition to a charcuterie board.',
            price: 9.99,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Duck, Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftyfour);
		
		const productFiftyfive = await createProduct({
			name: 'Wild Boar Lonza', 
            description: 'Nothing but wild boar, salt and spices are used to make this in this unique and tasty addition to our line of charcuterie.',
            price: 59.99,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Wild Boar',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftyfive);
		
		const productFiftysix = await createProduct({
			name: 'Saucisson Sec', 
            description: ' With its meaty texture and delightful flavor, this cured sausage is a must for any charcuterie board and makes for a delicious snack on its own.',
            price: 10.99,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftysix);
		
		const productFiftyseven = await createProduct({
			name: 'Terrine of Duck Foie Gras', 
            description: 'Our terrine is made of whole foie gras with only salt, pepper and sugar to accent the rich flavor. The result is an incredibly creamy, delicate bloc of foie gras, with a firm texture that can be easily sliced.',
            price: 49.99,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Duck',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftyseven);
		
		const productFiftyeight = await createProduct({
			name: 'Boneless Iberico Ham', 
            description: "Our Ibérico ham is crafted by fourth-generation maestro jamoneros - literally 'masters of ham'- who oversee curing rooms at high altitudes in the fresh, clean air of the Rasillo de Cameros Mountains.",
            price: 589.99,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftyeight);
		
		const productFiftynine = await createProduct({
			name: 'Tasso Ham', 
            description: 'Cured and ready-to-eat, this Cajun-style ham is made from humanely-raised pork. Coated in zesty spices and smoked over hardwood chips, our tasso ham is cured for only a short time',
            price: 14.99,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftynine);
		
		const productSixty = await createProduct({
			name: 'Coppa, Coppicola', 
            description: 'We cure our Coppa for two weeks with salt, sugar, crushed red pepper, and garlic. After curing, we stuff the Coppa into a large beef casing and then dry it for more than four months. When finished, Coppa is meaty and rich with luscious and soft fat marbled throughout.',
            price: 10.00,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixty);
		
		const productSixtyone = await createProduct({
			name: 'Lonzino', 
            description: 'We cure our Lonzino for one week with salt, sugar, and ground coffee. After curing, we stuff the Lonzino into a pork casing and then dry it for a couple months. When finished, Lonzino is subtle with an added earthiness from the coffee cure.',
            price: 10.00,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtyone);
		
		const productSixtytwo = await createProduct({
			name: 'Finnocchiona', 
            description: 'Our Finocchiona is made from pork and seasoned with fennel pollen and fennel seed. The ground sausage is stuffed into pork casing and then aged for more than three months.',
            price: 8.25,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtytwo);
		
		const productSixtythree = await createProduct({
			name: 'Sopressata', 
            description: 'Our Sopressata is made from pork and seasoned with crushed red pepper and Tellicherry peppercorn. After we fill beef casing with the ground sausage, we press the Sopressata to create the traditional flat shape.',
            price: 8.25,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork, Beef Casing',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtythree);
		
		const productSixtyfour = await createProduct({
			name: " 'Nduja", 
            description: 'Our Nduja swaps out the traditional Calabrian chile for a blend of New Mexico Red, Ancho, Serrano, and Chiptole chiles. We add this chile mix to finely ground pork and then stuff the sausage into pork casing. The Nduja ages for three months. When ready, Nduja is still soft and perfect to eat spread on top of toasted sourdough.',
            price: 16.25,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtyfour);
		
		const productSixtyfive = await createProduct({
			name: 'Beef and Juniper', 
            description: 'Made with lean meat from the Chuck and Round of grass fed beef from Duell Hollow farms. Half of the meat is ground through a large die, half through a medium die giving the sausage a nice bite but smoth texture. Spiced with Juniper and Tellicherry peppercorns. This sausage is dried for four months and is best with casing on.',
            price: 8.25,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Beef',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtyfive);
		
		const productSixtysix = await createProduct({
			name: 'Trail Bologna', 
            description: 'A chunky bologna, made with coarse cuts of meat. Trail Bologna originates from the Troyer family in a tiny town of Trail, Ohio.  One of the best flavors of Amish Country! Enjoy the smoky taste of Trail Bologna.',
            price: 8.49,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork, Beef',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtysix);
		
		const productSixtyseven = await createProduct({
			name: 'Duck Breast Prosciutto', 
            description: 'All natural Magret du Moulard duck breast seasoned with juniper, garlic, bay leaf, and Tellicherry black pepper, and dry cured for 2 months. Despite what anyone tells you, this is our favorite child! We sliced it so you don’t have to. Just open and enjoy!',
            price: 9.99,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Duck',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtyseven);
		
		const productSixtyeight = await createProduct({
			name: 'One Wild Fennel', 
            description: 'A traditional Italian salami with a delightful hint of fennel, using the pollen from the fennel flower instead of the seeds, which gives this salami a milder, sweeter taste.',
            price: 14.00,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtyeight);
		
		const productSixtynine = await createProduct({
			name: 'Cacciatorini', 
            description: 'Cacciatore (the hunter). This salami was made for the hunters to fit inside their pocket giving them something to chew on while they wait. Ground fine like a sausage, with special accents of garlic, wine, and black pepper.',
            price: 8.00,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtynine);
		
		const productSeventy = await createProduct({
			name: 'Guanciale', 
            description: 'The jowl of the hog; great for making the famous “amatriciana” sauce! Naturally cured in salt, pepper, and rosemary. Any gravy or sauce started with this meat will have a deep and unique flavor.',
            price: 9.00,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventy);
		
		const productSeventyone = await createProduct({
			name: 'Prosciutto di Parma', 
            description: 'Thinly sliced, and layered, wrapped perfectly for parties or snack. Always best served at room temperature for maximuim flavor.',
            price: 16.00,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventyone);
		
		const productSeventytwo = await createProduct({
			name: 'Mortadella', 
            description: 'Italian bologna, but not really. This meat is cooked similarly, with the addition of cured fat pieces and roasted pistacios to amplify favor.',
            price: 8.00,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventytwo);
		
		const productSeventythree = await createProduct({
			name: 'Messina Salami', 
            description: 'Traditional Sicilian salami, ground fine and made with whole peppercorns and a special blend of spices to highlight Sicilian flavor.',
            price: 10.00,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventythree);
		
		const productSeventyfour = await createProduct({
			name: 'Milanese Salamio', 
            description: 'Famous from Northern Italy as a dry cured salami ground very fine. Ingredients specific to the Northern region make the flavor unique and tasty.',
            price: 12.00,
            type:'Meat',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventyfour);
		
		const productSeventyfive = await createProduct({
			name: 'Oldani Salami', 
            description: 'Very unique salami, made in St Louis for many years. In the 1970s and 1980s, it was the number one salami in Little Italy. The new owner is doing a fabulous job of bringing back this one of a kind salami. Ground fine and finished with red wine and garlic, it is great as an appetizer or in a panino.',
            price: 15.00,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventyfive);
		
		const productSeventysix = await createProduct({
			name: 'Bosc Pears', 
            description: 'Honey sweet pear with firm texture. Great for baking and poaching, or fresh eating or add to a salad.',
            price: 6.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Fix Brothers Fruit Farm',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventysix);
		
		const productSeventyseven = await createProduct({
			name: 'Dates', 
            description: 'This gift box has our natural "Fancy" Medjool Dates in a smaller portion. Our "Fancy" grade of Medjools are slightly smaller than our "Jumbos". The flavor and texture, however, are almost the same. You get more dates for your buck!',
            price: 34.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Ellet Medjool',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventyseven);
		
		const productSeventyeight = await createProduct({
			name: 'Dragonfruit', 
            description: 'Best served chilled, I like to make melon balls from them. You eat the flesh and seeds inside skin by cutting the fruit in half first. The flavor is mild and refreshing - a cross between a Kiwi and Watermelon.',
            price: 79.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventyeight);
		
		const productSeventynine = await createProduct({
			name: 'Strawberries', 
            description: 'From mid-June through Thanksgiving most of our fruits and vegetables are grown in New Jersey, Pennsylvania, and New York States. As the growing seasons change, so do our sources.',
            price: 15.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Mountain Lakes Organic',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventynine);
		
		const productEighty = await createProduct({
			name: 'McIntosh Apples', 
            description: 'A juicy, sweet and tangy-tart apple.',
            price: 5.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Fix Brothers Fruit Farms',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEighty);
		
		const productEightyone = await createProduct({
			name: 'Jujube', 
            description: 'Crunchy texture, sweet apple tasting; green ripening to brown skin ; this fruit is either the Sherwood or Li variety. Sometimes known as chinese dates',
            price: 40.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Herb Fresh',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightyone);
		
		const productEightytwo = await createProduct({
			name: 'Guanabana Soursop', 
            description: 'This fruit goes by many names in many countries, mostly indigenous to the South and Central America and Southeastern Asia. The fruit has a wonderful flavor, sort of a cross between pineapple and strawberry, and a texture a banana and coconut combined. The seeds are not edible - please discard.',
            price: 99.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightytwo);
		
		const productEightythree = await createProduct({
			name: 'Mangos', 
            description: 'Florida Mangoes are some of the worlds best tasting. They are so flavorful why shop anywhere else. Ready for shipping now!',
            price: 69.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightythree);
		
		const productEightyfour = await createProduct({
			name: 'Hass Avocados', 
            description: 'Creamy in texture, nutty in flavor, with a small to medium seed. The Hass skin is easy to peel and darkens from green to purplish-black as it ripens.',
            price: 14.50,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Frog Hollow Farm',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightyfour);
		
		const productEightyfive = await createProduct({
			name: 'Muscat Grapes', 
            description: 'These heirloom grapes have a stronger "grape" flavor than their table grape relatives. With their firm, tart skin and unctious sweet flesh they are a very special treat. The Muscat family is among the oldest of grape varieties. A gorgeous green to golden blush color gives way to a perfumey and sweet',
            price: 4.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Frog Hollow Farm',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightyfive);
		
		const productEightysix = await createProduct({
			name: 'Passion Fruits', 
            description: 'Passion fruit is a beneficial fruit with a healthful nutrition profile: It contains high levels of vitamin A (important for skin, vision, and the immune system), and vitamin C, which is an important antioxidant and a low glycemic index. The fruit is also rich in magnesium and dietary fibers.',
            price: 1.40,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Organic Essentials',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightysix);
		
		const productEightyseven = await createProduct({
			name: 'Peaches', 
            description: 'Peaches are a fuzzy fruit native to northwest China. They are a member of the stone fruit family, which means that their flesh surrounds one large middle seed.',
            price: 3.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Laguna Farm',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightyseven);
		
		const productEightyeight = await createProduct({
			name: 'Raspberries', 
            description: 'Raspberries are a versatile fruit that can be incorporated into breakfast, lunch, dinner or dessert',
            price: 3.50,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Laguna Farm',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightyeight);
		
		const productEightynine = await createProduct({
			name: 'Thai Guava', 
            description: 'Tai White guavas are high in vitamin C and are quickly becoming known for their health benefits. Try some today!',
            price: 55.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightynine);
		
		const productNinety = await createProduct({
			name: 'Starfruit', 
            description: 'Be the star at your next party. The sweetest carambola you will ever eat . Ready for the Barbque sliced thick!',
            price: 55.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinety);
		
		const productNinetyone = await createProduct({
			name: 'Black Sapote', 
            description: 'The Black Sapote is a very interesting tropical fruit. We call it the chocolate pudding fruit. Makes a wonderful ice cream.',
            price: 95.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetyone);
		
		const productNinetytwo = await createProduct({
			name: 'Cherimoya', 
            description: 'The flesh of the Cherimoya is white, melting, juicy, sweet and fragrant.',
            price: 61.95,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'McManigle Grove',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetytwo);
		
		const productNinetythree = await createProduct({
			name: 'Persimmons', 
            description: 'Fresh picked Fuju Persimmons sweet fruity taste eaten like an apple. Bright orange color.',
            price: 57.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'McManigle Grove',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetythree);
		
		const productNinetyfour = await createProduct({
			name: 'Sapodilla', 
            description: 'If your looking for something really different this should be your choice. Tastes like a Pear dipped in brown sugar - delicious!',
            price: 99.00,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetyfour);
		
		const productNinetyfive = await createProduct({
			name: 'Plapple Plumcot', 
            description: 'What looks and tastes like a cross between a plum and an apple; but is not a cross between a plum and an apple? It is called a Plapple. Once you taste the super-juicy, sweet and crisp flesh, you will agree that no other name would work for this special piece of fruit. ',
            price: 1.49,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Family Tree Farms',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetyfive);
		
		const productNinetysix = await createProduct({
			name: 'Blueberries', 
            description: 'Blueberries are one of the few fruits native to North America. They are also known as the only naturally blue food item.',
            price: 5.99,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Family Tree Farms',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetysix);
		
		const productNinetyseven = await createProduct({
			name: 'Black Plums', 
            description: 'Shiny and slightly bumpy on the outside, a sweet, juicy yellow-red on the inside. Besides being exceptionally good eating, this is one of the best cooking plums. Use black plums for preserves, compotes, sauces, or tarts. ',
            price: 3.99,
            type:'Cheese',
            "imageUrl": 'https://image.com',
            origin: 'Fruit',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetyseven);
		
		const productNinetyeight = await createProduct({
			name: 'White Peaches', 
            description: 'The white peach is a soft, smooth, honey-flavored version of its orange cousin. The flavor is mild, delicate, and deliciously sweet. The aroma is like a flower store.',
            price: 3.49,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Family Tree Farms',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetyeight);
		
		const productNinetynine = await createProduct({
			name: 'Yellow Nectarines', 
            description: 'The nectarine is close kin to a peach. The family resemblance is obvious from the first bite. Its golden flesh is soft and juicy; its flavor is sweet, with just enough tang to keep everything in balance. The biggest difference? No fuzz. ',
            price: 4.99,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Fresh Direct',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetynine);
		
		const productOnehundred = await createProduct({
			name: 'Honeydew Melon', 
            description: 'The most versatile melon around, the aptly named honeydew is both sweet and succulent. Its celery-colored flesh looks like a green-tinged precious stone. We like the contrast of flavors when the honeydew is wrapped with a slice of prosciutto.',
            price: 5.99,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Fresh Direct',
            hardness: 'Hard, aged',
			odor: 'Mild'});
        console.log(productOnehundred);
        
        		
		const productOnehundredone = await createProduct({
			name: 'Dulcinea Tuscan Melon', 
            description: 'Hailing from the Italian countryside, this sweet, orange cantaloupe is known for its netted exterior and deep, distinct grooves. The patterns on its outer rind is a flavor indicator of its exceptionally sweet and seductively musky, orange inner flesh.',
            price: 4.99,
            type:'Fruit',
            "imageUrl": 'https://image.com',
            origin: 'Fresh Direct',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredone);


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
