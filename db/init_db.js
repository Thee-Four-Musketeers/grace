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
            "imageUrl": 'images/2.jpg',
            origin: 'Italy',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productTwo);
		
		const productThree = await createProduct({
			name: 'Allium Piper', 
            description: 'Goat milk from Towerview and Oskjberg dairies is used for making the Chevre (meaning Goat in French). After pasteurization the milk is allowed to set using traditional method. Very next day curd is drained for several hours. Very small amount of salt, crushed garlic cloves and little black pepper is added to the curd, and then the mixture is allowed to drain for about 10 days in a controlled environment. This elegant, fresh, white cheese is perfect for cheese board. There is no intense goaty taste, typically associated with goat milk cheeses. It has a characteristic spicy flavour with notes of garlic and pepper. This delicious cheese can be eaten with crusty bread.',
            price: 9.78,
            type:'Cheese',
            "imageUrl": 'images/3.jpg',
            origin: 'Austria',
            hardness: 'Fresh Soft',
			odor: 'Fresh, garlicky, spicy'});
		console.log(productThree);
		
		const productFour = await createProduct({
			name: 'Anari', 
            description: 'Anari is a fresh ricotta style soft, mild whey cheese, made from goat or sheep’s milk. In Cyprus, Anari is among the lesser-known cheeses but has started growing its popularity after public exposure. ',
            price: 5.22,
            type:'Cheese',
            "imageUrl": 'images/4.jpg',
            origin: 'Cyprus',
            hardness: 'Fresh Soft',
			odor: 'Mild'});
		console.log(productFour);
		
		const productFive = await createProduct({
			name: 'Baladi', 
            description: ' It is a soft unripened cheese with a sweet and slightly salty flavour. This artisan cheese can be eaten with local bread or served with a drizzle of olive oil and fresh herbs.',
            price: 7.69,
            type:'Cheese',
            "imageUrl": 'images/5.jpg',
            origin: 'Lebanon',
            hardness: 'Fresh Soft',
			odor: 'Fresh'});
		console.log(productFive);
		
		const productSix = await createProduct({
			name: "Boulette D'avesnes", 
            description: 'This creamy, fresh cheese is well known for its stinky flavour and is best consumed with a good beer or traditional gin.',
            price: 8.22,
            type:'Cheese',
            "imageUrl": 'images/6.jpg',
            origin: 'France',
            hardness: 'Fresh Soft',
			odor: 'Stinky'});
		console.log(productSix);
		
		const productSeven = await createProduct({
			name: 'Brocciu', 
            description: 'Brocciu is a whey cheese served as a lactose-free alternative to Italian – Ricotta. ',
            price: 11.12,
            type:'Cheese',
            "imageUrl": 'images/7.jpg',
            origin: 'Corsica',
            hardness: 'Soft Fresh',
			odor: 'Sweet'});
		console.log(productSeven);
		
		const productEight = await createProduct({
			name: 'Burgos', 
            description: ' Burgos cheese is usually accompanied by other foods like honey, quince or walnuts.',
            price: 7.23,
            type:'Cheese',
            "imageUrl": 'images/8.jpg',
            origin: 'Spain',
            hardness: 'Fresh Soft',
			odor: 'Fresh'});
		console.log(productEight);
		
		const productNine = await createProduct({
			name: 'Burrata', 
            description: ' The outside thin shell is a pasta filata curd made of buffalo and/or cow milk mozzarella while the insides contain a soft, doughy, stringy, mixture of curd and fresh cream.',
            price: 8.99,
            type:'Cheese',
            "imageUrl": 'images/9.jpg',
            origin: 'Italy, US',
            hardness: 'Fresh Soft',
			odor: 'Fresh, Milky'});
		console.log(productNine);
		
		const productTen = await createProduct({
			name: 'Creamy Lancashire', 
            description: 'The Creamy Lancashire cheese is very popular as a spread on toast. In fact, in some areas it is called toastie. It also goes well with Welsh rarebit, sandwiches and pastas.',
            price: 8.78,
            type:'Cheese',
            "imageUrl": 'images/10.jpg',
            origin: 'England',
            hardness: 'Fresh Soft',
			odor: 'Rich'});
		console.log(productTen);
		
		const productEleven = await createProduct({
			name: 'Fresh Chevre', 
            description: 'It is a very versatile piece of cooking ingredient and can be used in both savoury and sweet dishes. It will taste delicious with pasta, salads, in a cheesecake. Fresh Chevre goes well with Sparkling wine.',
            price: 6.23,
            type:'Cheese',
            "imageUrl": 'images/11.jpg',
            origin: 'US',
            hardness: 'Fresh Soft',
			odor: 'Mild, Tangy'});
		console.log(productEleven);
		
		const productTwelve = await createProduct({
			name: 'Fromage Blanc', 
            description: 'Pure Fromage Blanc is almost fat free but cream is added to agument its flavour, which also increases its fat content making it nearly eight percent of total weight. It has a smooth, slightly citric flavour with a texture similar to ricotta. It is used in pastry fillings, pastas or served as a dessert with fruits.',
            price: 6.91,
            type:'Cheese',
            "imageUrl": 'images/12.jpg',
            origin: 'US',
            hardness: 'Fresh Soft',
			odor: 'Fresh'});
		console.log(productTwelve);
		
		const productThirteen = await createProduct({
			name: 'Mascarpone', 
            description: 'Mascarpone is used in both sweet and savory dishes. It is added to enhance the flavour of the dish without overwhelming the original taste. The cheese tastes best with anchovies, mustard and spices, or mixed with cocoa or coffee. ',
            price: 9.45,
            type:'Cheese',
            "imageUrl": 'images/13.jpg',
            origin: 'Italy',
            hardness: 'Fresh Soft',
			odor: 'Fresh'});
		console.log(productThirteen);
		
		const productFourteen = await createProduct({
			name: 'Myzithra', 
            description: 'The snowy white cheese with a flavour similar to Ricotta Salata is used by Cretans to spread on paximadia or prepare tyropitas and kaltsounakia cheese pies.',
            price: 5.45,
            type:'Cheese',
            "imageUrl": 'images/14.jpg',
            origin: 'Greece',
            hardness: 'Fresh Soft',
			odor: 'Mild, Pungent'});
		console.log(productFourteen);
		
		const productFifteen = await createProduct({
			name: "Pave D'affinois", 
            description: 'Though similar to Brie in appearance and flavour, this soft-ripened cheese is actually much creamier and takes less time to ripen. ',
            price: 11.19,
            type:'Cheese',
            "imageUrl": 'images/15.jpg',
            origin: 'France',
            hardness: 'Fresh Soft',
			odor: 'Fresh, Milky'});
		console.log(productFifteen);
		
		const productSixteen = await createProduct({
			name: 'Queso Blanco', 
            description: 'It softens without melting, a characteristic very important in Latin American cooking. One can crumble Queso Blanco on salads, over rice and beans or serve it as a table cheese with fresh fruit, marmalade or chutney.',
            price: 8.22,
            type:'Cheese',
            "imageUrl": 'images/16.jpg',
            origin: 'Mexico',
            hardness: 'Fresh Soft',
			odor: 'Aromatic, Fresh'});
		console.log(productSixteen);
		
		const productSeventeen = await createProduct({
			name: 'Queso Fresco', 
            description: 'Queso Adobera can be eaten as a cold snack, crumbled on soups and salads, chopped in sandwiches, tacos and melted on Mexican quesadillas.',
            price: 5.76,
            type:'Cheese',
            "imageUrl": 'images/17.jpg',
            origin: 'Mexico',
            hardness: 'Fresh Soft',
			odor: 'Fresh'});
		console.log(productSeventeen);
		
		const productEighteen = await createProduct({
			name: 'Roule', 
            description: 'The cheese has a respectable place on cheeseboard but can also be spread on a toast or used as an ingredient in cooking.',
            price: 6.92,
            type:'Cheese',
            "imageUrl": 'images/18.jpg',
            origin: 'France',
            hardness: 'Fresh Soft',
			odor: 'Herbal, Rich'});
		console.log(productEighteen);
		
		const productNineteen = await createProduct({
			name: 'Cotija', 
            description: 'Since, Cotija cheese is very salty, strongly flavoured, firm and does not actually melt, it is used for grating on salads, soups, casseroles, tacos, tostadas and chilli. ',
            price: 4.54,
            type:'Cheese',
            "imageUrl": 'images/19.jpg',
            origin: 'Mexico',
            hardness: 'Fresh Firm',
			odor: 'Mild'});
		console.log(productNineteen);
		
		const productTwenty = await createProduct({
			name: 'Ricotta di Bufala', 
            description: 'It is a firm-textured, soft and melting ricotta made with whey gathered while processing buffalo milk. Flavours are delicate and sweet with a distinct aroma.',
            price: 8.22,
            type:'Cheese',
            "imageUrl": 'images/20.jpg',
            origin: 'Italy',
            hardness: 'Fresh Firm',
			odor: 'Fresh, Rich'});
		console.log(productTwenty);
		
		const productTwentyone = await createProduct({
			name: 'Shanklish', 
            description: 'Shanklish is common meze dish often accompanied with finely chopped tomato, onion, and olive oil. It is also eaten mashed with eggs, pita bread with cucumbers, mint, and olive oil for breakfast.',
            price: 19.09,
            type:'Cheese',
            "imageUrl": 'images/21.jpg',
            origin: 'Egypt',
            hardness: 'Fresh Firm',
			odor: 'Fresh, Pungent, Strong'});
		console.log(productTwentyone);
		
		const productTwentytwo = await createProduct({
			name: 'Wensleydale', 
            description: 'Wensleydale with Cranberries is a hand-made Yorkshire cheese that is sold fresh & young at only three weeks old. The cheese has a sweet flavour of the fruity succulence of juicy cranberries with honeyed undertones.',
            price: 4.22,
            type:'Cheese',
            "imageUrl": 'images/22.jpg',
            origin: 'Wensleydale with Cranberries is a hand-made Yorkshire cheese that is sold fresh & young at only three weeks old. The cheese has a sweet flavour of the fruity succulence of juicy cranberries with honeyed undertones.',
            hardness: 'Fresh Firm',
			odor: 'Mild'});
		console.log(productTwo);
		
		const productTwentythree = await createProduct({
			name: "Afuega'l Pitu", 
            description: 'This type of Afuega’L Pitu has very strong, spicy flavour as it is always eaten when matured. ',
            price: 6.77,
            type:'Cheese',
            "imageUrl": 'images/23.jpg',
            origin: 'Spain',
            hardness: 'Soft',
			odor: 'Mild'});
		console.log(productTwentythree);
		
		const productTwentyfour = await createProduct({
			name: 'Baby Brie', 
            description: 'Baby Brie, Petit Brie, Mini Brie all are same as the regular Brie, but their diameters are smaller, giving different names. ',
            price: 9.09,
            type:'Cheese',
            "imageUrl": 'images/24.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Aromatic'});
		console.log(productTwentyfour);
		
		const productTwentyfive = await createProduct({
			name: 'Banon', 
            description: 'Banon goes well with crusty baguette, fresh fruits and a glass of dry white wine.',
            price: 7.46,
            type:'Cheese',
            "imageUrl": 'images/25.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Strong'});
		console.log(productTwo);
		
		const productTwentysix = await createProduct({
			name: 'Baron Bigod', 
            description: 'Baron Bigod has a smooth, delicate silky texture and golden paste with long-lasting warm earth, farmyard and mushroom flavours.',
            price: 8.44,
            type:'Cheese',
            "imageUrl": 'images/26.jpg',
            origin: 'England',
            hardness: 'Soft',
			odor: 'Barnyard, Mushroom'});
		console.log(productTwentysix);
		
		const productTwentyseven = await createProduct({
			name: 'Bavaria Blu', 
            description: 'The cheese tastes great on its own, but you could also try pairing it with mango chutney, aromatic red wines such as Dornfelder or Lagrein, or whites such as Riesling or Silvaner.',
            price: 11.07,
            type:'Cheese',
            "imageUrl": 'images/27.jpg',
            origin: 'Germany',
            hardness: 'Soft',
			odor: 'Aromatic, Rich'});
		console.log(productTwentyseven);
		
		const productTwentyeight = await createProduct({
			name: 'Blythedale Camembert', 
            description: 'The edible bloomy rind is covered with a soft paste that has a mushroomy and earthy flavour. This is a breakfast or a dessert cheese that can be served slices of baguette.',
            price: 6.86,
            type:'Cheese',
            "imageUrl": 'images/28.jpg',
            origin: 'US',
            hardness: 'Soft',
			odor: 'Mild'});
		console.log(productTwentyeight);
		
		const productTwentynine = await createProduct({
			name: 'Boursault', 
            description: 'Try pairing this cheese with grapes or pears and light, fruity wines like Vouvray.',
            price: 5.56,
            type:'Cheese',
            "imageUrl": 'images/29.jpg',
            origin: 'Italy',
            hardness: 'Soft',
			odor: 'Earthy'});
		console.log(productTwentynine);
		
		const productThirty = await createProduct({
			name: 'Brie', 
            description: 'Brie, one of the great dessert cheeses, comes as either a 1 or 2-kilogram wheel and is packed in a wooden box. In order to enjoy the taste fully, Brie must be served at room temperature.',
            price: 12.21,
            type:'Cheese',
            "imageUrl": 'images/30.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Pronounced, Strong'});
        console.log(productThirty);

        const productThirtyone = await createProduct({
			name: 'Buche de Chevre', 
            description: '. The white pate of Buche de Chevre reveals a complex yet typical, bold taste of French goat cheeses underlined by sweet notes of caramel. Soft and creamy with a flaky centre, the cheese instantly melts in the mouth.',
            price: 7.87,
            type:'Cheese',
            "imageUrl": 'images/31.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Goaty'});
		console.log(productThirtyone);
		
		const productThirtytwo = await createProduct({
			name: 'Caciocavallo', 
            description: 'With persistent aging, the cheese picks up intense, earthy undertones and fruity aromas. Along the way, it turns from a milky white to a darker yellow in colour and becomes more salty. The result is a cheese with profound tasting notes and perfect accompaniment to a glass of Primitivo red wine.',
            price: 16.06,
            type:'Cheese',
            "imageUrl": 'images/32.jpg',
            origin: 'Italy',
            hardness: 'Soft',
			odor: 'Earthy, Strong'});
		console.log(productThirtytwo);
		
		const productThirtythree = await createProduct({
			name: 'Camembert', 
            description: 'This cheese is best paired with a light red wine such as Beaujolais, Chenin Blanc, St Emilion, St Estephe or traditionally a glass of Normandy cider.',
            price: 13.12,
            type:'Cheese',
            "imageUrl": 'images/33.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Earthy'});
		console.log(productThirtythree);
		
		const productThirtyfour = await createProduct({
			name: 'Casu Marzu', 
            description: 'The cheese contains live maggots and is a part of the Sardinian food heritage. After fermentation, the cheese is left to decompose with the help of the digestive action of the cheese fly larvae which are introduced in the cheese solely for this purpose. Due to the action of the larvae, the cheese becomes very soft and liquid.',
            price: 12.07,
            type:'Cheese',
            "imageUrl": 'images/34.jpg',
            origin: 'Italy',
            hardness: 'Soft',
			odor: 'Mild'});
		console.log(productThirtyfour);     
        		
		const productThirtyfive = await createProduct({
			name: 'Cure Nantais', 
            description: 'Nantais is served along with fish dishes, or over pears and apples. It can also be used as an ingredient for various dishes such as gratins or tarts. Moreover, it can be made a part of a cheese platter. If paired with white wine, Gros Plant or Muscadet, Nantais cheese tastes the best.',
            price: 9.04,
            type:'Cheese',
            "imageUrl": 'images/35.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Mild'});
		console.log(productThirtyfive);
		
		const productThirtysix = await createProduct({
			name: 'Delice de Bourgogne', 
            description: 'The mushroomy aroma of thin rind adds a playful contrast to the rich, creamy, buttery and tangy notes of the interior. This high fat cheese pairs very well with Champagne or Ciders and Wheat Beers.',
            price: 13.87,
            type:'Cheese',
            "imageUrl": 'images/36.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Mushroom, Pungent, Strong'});
		console.log(productThirtysix);
		
		const productThirtyseven = await createProduct({
			name: 'Dolcelatte', 
            description: 'The fat content in Dolcelatte is higher than Gorgonzola at about 50%. Suitable for vegetarians, it is served with grapes, used in a rich pasta sauce, and paired with Rose or Juicy Red, Port wine, and Venetian Merlot wines.',
            price: 8.24,
            type:'Cheese',
            "imageUrl": 'images/37.jpg',
            origin: 'Italy',
            hardness: 'Soft',
			odor: 'Mild'});
		console.log(productThirtyseven);
		
		const productThirtyeight = await createProduct({
			name: 'Filetta', 
            description: 'A filetta is a delectable cheese with a slightly crunchy, salty and edible rind coating the soft and supple pate. It is mushroomy, earthy and herbal to taste with a faint hint of the fern spring.',
            price: 12.03,
            type:'Cheese',
            "imageUrl": 'images/38.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Herbaceous, Mild, Mushroomy'});
		console.log(productThirtyeight);
		
		const productThirtynine = await createProduct({
			name: 'Flor de Guia', 
            description: 'NFlor de Guia has reddish rind, soft and elastic texture, pale yellow colour and small eyes. It is manufactured in cylindrical but flat shape with round edges. It has a buttery taste and is easily melted.',
            price: 18.02,
            type:'Cheese',
            "imageUrl": 'images/39.jpg',
            origin: 'Spain',
            hardness: 'Soft',
			odor: 'Mild'});
		console.log(productThirtynine);
		
		const productForty = await createProduct({
			name: 'Fresh Truffles', 
            description: 'These cheeses taste delicious with condiments, for example Truffle and Porto Sauce, Black Truffle Mustard, Black Truffle Sherry Vinegar and many others.',
            price: 14.11,
            type:'Cheese',
            "imageUrl": 'images/40.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Aromatic, Earthy'});
		console.log(productForty);
		
		const productFortyone = await createProduct({
			name: 'Fromage Corse', 
            description: ' The crusty, washed rind has orange and yellow moulds. Flavour of wild and herbs growing on the local mountains are reflected in the cheese. ',
            price: 16.43,
            type:'Cheese',
            "imageUrl": 'images/41.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Herbal'});
		console.log(productFortyone);
		
		const productFortytwo = await createProduct({
			name: 'Gorgonzola Dolce DOP', 
            description: 'It has a pale yellow, buttery and melty paste speckled with a homogeneous distribution of blue and green veins. The rind is compact, rough, hard and grey/pinkish in colour but not edible. Flavours are not very assertive but sweet, mild with notes of sour cream and lactic tang.',
            price: 14.08,
            type:'Cheese',
            "imageUrl": 'images/42.jpg',
            origin: 'Italy',
            hardness: 'Soft',
			odor: 'Mild, Milky'});
		console.log(productFortytwo);
		
		const productFortythree = await createProduct({
			name: 'Grey Owl', 
            description: 'The interior paste is firm, crumbly and dense, softening at the edge of the rind. As it melts in your mouth, the smooth and silky texture of the cheese offers pleasing sharp and lemony flavours that go perfectly well with a dry Riesling or a nice crisp dry Sauvignon Blanc.',
            price: 9.22,
            type:'Cheese',
            "imageUrl": 'images/43.jpg',
            origin: 'Canada',
            hardness: 'Soft',
			odor: 'Fresh, Goaty'});
		console.log(productFortythree);
		
		const productFortyfour = await createProduct({
			name: 'Harbison', 
            description: 'When ripe, Harbison has a very spoonable texture that continues to soften until consumed. It’s woodsy and sweet with lemony, mustardy, and vegetal flavours. Oaked white wine or barrel-aged sour beers make great accompaniments. Also, don’t forget some fruit mostarda and crusty bread.',
            price: 14.11,
            type:'Cheese',
            "imageUrl": 'images/44.jpg',
            origin: 'US',
            hardness: 'Soft',
			odor: 'Floral, Fruity, Mushroom, Rich'});
		console.log(productFortyfour);
		
		const productFortyfive = await createProduct({
			name: 'Herve', 
            description: ' When young, Herve is sweet and becomes spicy as it ages. Since it is fully flavoured, it is usually eaten with dark bread and beers.',
            price: 9.08,
            type:'Cheese',
            "imageUrl": 'images/45.jpg',
            origin: 'Belgium',
            hardness: 'Soft',
			odor: 'Pungent'});
		console.log(productFortyfive);
		
		const productFortysix = await createProduct({
			name: 'La Serena', 
            description: 'A fully matured La Serena has a creamy consistency that can be scooped out after cutting out the circular lid. The intense bitter yet pleasant flavour tastes best with bread or toast.',
            price: 16.32,
            type:'Cheese',
            "imageUrl": 'images/46.jpg',
            origin: 'Spain',
            hardness: 'Soft',
			odor: 'Pleasant, Strong'});
		console.log(productFortysix);
		
		const productFortyseven = await createProduct({
			name: 'Le Sendrillon', 
            description: 'This triangular, log-shaped cheese has got a smooth ivory body enveloped by a marble-textured rind. The flavour is fairly strong, acidic and slightly sour. When young, the overall taste is mild, but as it ripens, the flavour becomes more pronounced with the rind acquiring a bit of spice.',
            price: 13.84,
            type:'Cheese',
            "imageUrl": 'images/47.jpg',
            origin: 'Canada',
            hardness: 'Soft',
			odor: 'Goaty'});
		console.log(productFortyseven);
		
		const productFortyeight = await createProduct({
			name: 'Macconais', 
            description: 'Mâconnais gives away a light herbal, salty flavour and smell. The longer the maturation process, the harder and saltier, Mâconnais will become. The cheese perfectly goes with a glass of Chablis, Macon Red or a Beaujolais, Wheat beer, crackers and fruit.',
            price: 16.01,
            type:'Cheese',
            "imageUrl": 'images/48.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Herbal'});
		console.log(productFortyeight);
		
		const productFortynine = await createProduct({
			name: 'Milawa White', 
            description: 'Milawa White is made from cow milk and is generally loved by the cheddar lovers. The cheese melts beautifully in a toasted cheese sandwich or cheese sauce. Marries well with Champagne or lighter style wines.',
            price: 8.20,
            type:'Cheese',
            "imageUrl": 'images/49.jpg',
            origin: 'Australia',
            hardness: 'Soft',
			odor: 'Earthy, Yeasty'});
		console.log(productFortynine);
		
		const productFifty = await createProduct({
			name: 'Mothais a la Feuille', 
            description: 'Mothais a la Feuille has a soft, runny texture that becomes dense as it ages. The unique combination of earthy, lemony and mold flavours of the leaf become intense as the cheese matures. Mothais a la Feuille pairs well with Champagne or a single-malt whisky. ',
            price: 16.68,
            type:'Cheese',
            "imageUrl": 'images/50.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Earthy'});
		console.log(productFifty);
		
		const productFiftyone = await createProduct({
			name: 'Wagyu Beef Bresaola', 
            description: 'This Italian-style charcuterie is hand-crafted and dry-cured with simple ingredients - nothing but beef, salt and spices. No nitrates or nitrites added.',
            price: 149.99,
            type:'Meat',
            "imageUrl": 'images/51.jpg',
            origin: 'Beef',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftyone);
		
		const productFiftytwo = await createProduct({
			name: 'Duck Leg Confit', 
            description: 'We make our duck leg confit with all-natural ingredients, using traditional methods perfected in Southwest France. Duck legs are slowly cooked in their own juices for classic confit that is flavorful, tender, and a great addition to your favorite dishes. ',
            price: 12.99,
            type:'Meat',
            "imageUrl": 'images/52.jpg',
            origin: 'Duck',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftytwo);
		
		const productFiftythree = await createProduct({
			name: 'Smoked Magret Duck Breast', 
            description: ' Fully-cooked and ready-to-eat our duck breast is smoked over real wood chips and made without any preservatives, nitrates, nitrites, fillers or artificial flavors.',
            price: 22.99,
            type:'Meat',
            "imageUrl": 'images/53.jpg',
            origin: 'Duck',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftythree);
		
		const productFiftyfour = await createProduct({
			name: 'Duck Terrine Mousquetaire', 
            description: ' Made with all-natural ingredients, including prunes and Armagnac, and inspired by the flavors of Southwest France, this country-style pâté makes a wonderful addition to a charcuterie board.',
            price: 9.99,
            type:'Meat',
            "imageUrl": 'images/54.jpg',
            origin: 'Duck, Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftyfour);
		
		const productFiftyfive = await createProduct({
			name: 'Wild Boar Lonza', 
            description: 'Nothing but wild boar, salt and spices are used to make this in this unique and tasty addition to our line of charcuterie.',
            price: 59.99,
            type:'Meat',
            "imageUrl": 'images/55.jpg',
            origin: 'Wild Boar',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftyfive);
		
		const productFiftysix = await createProduct({
			name: 'Saucisson Sec', 
            description: ' With its meaty texture and delightful flavor, this cured sausage is a must for any charcuterie board and makes for a delicious snack on its own.',
            price: 10.99,
            type:'Meat',
            "imageUrl": 'images/56.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftysix);
		
		const productFiftyseven = await createProduct({
			name: 'Terrine of Duck Foie Gras', 
            description: 'Our terrine is made of whole foie gras with only salt, pepper and sugar to accent the rich flavor. The result is an incredibly creamy, delicate bloc of foie gras, with a firm texture that can be easily sliced.',
            price: 49.99,
            type:'Meat',
            "imageUrl": 'images/57.jpg',
            origin: 'Duck',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftyseven);
		
		const productFiftyeight = await createProduct({
			name: 'Boneless Iberico Ham', 
            description: "Our Ibérico ham is crafted by fourth-generation maestro jamoneros - literally 'masters of ham'- who oversee curing rooms at high altitudes in the fresh, clean air of the Rasillo de Cameros Mountains.",
            price: 589.99,
            type:'Meat',
            "imageUrl": 'images/58.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftyeight);
		
		const productFiftynine = await createProduct({
			name: 'Tasso Ham', 
            description: 'Cured and ready-to-eat, this Cajun-style ham is made from humanely-raised pork. Coated in zesty spices and smoked over hardwood chips, our tasso ham is cured for only a short time',
            price: 14.99,
            type:'Meat',
            "imageUrl": 'images/59.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productFiftynine);
		
		const productSixty = await createProduct({
			name: 'Coppa, Coppicola', 
            description: 'We cure our Coppa for two weeks with salt, sugar, crushed red pepper, and garlic. After curing, we stuff the Coppa into a large beef casing and then dry it for more than four months. When finished, Coppa is meaty and rich with luscious and soft fat marbled throughout.',
            price: 10.00,
            type:'Meat',
            "imageUrl": 'images/60.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixty);
		
		const productSixtyone = await createProduct({
			name: 'Lonzino', 
            description: 'We cure our Lonzino for one week with salt, sugar, and ground coffee. After curing, we stuff the Lonzino into a pork casing and then dry it for a couple months. When finished, Lonzino is subtle with an added earthiness from the coffee cure.',
            price: 10.00,
            type:'Meat',
            "imageUrl": 'images/61.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtyone);
		
		const productSixtytwo = await createProduct({
			name: 'Finnocchiona', 
            description: 'Our Finocchiona is made from pork and seasoned with fennel pollen and fennel seed. The ground sausage is stuffed into pork casing and then aged for more than three months.',
            price: 8.25,
            type:'Meat',
            "imageUrl": 'images/62.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtytwo);
		
		const productSixtythree = await createProduct({
			name: 'Sopressata', 
            description: 'Our Sopressata is made from pork and seasoned with crushed red pepper and Tellicherry peppercorn. After we fill beef casing with the ground sausage, we press the Sopressata to create the traditional flat shape.',
            price: 8.25,
            type:'Meat',
            "imageUrl": 'images/63.jpg',
            origin: 'Pork, Beef Casing',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtythree);
		
		const productSixtyfour = await createProduct({
			name: " 'Nduja", 
            description: 'Our Nduja swaps out the traditional Calabrian chile for a blend of New Mexico Red, Ancho, Serrano, and Chiptole chiles. We add this chile mix to finely ground pork and then stuff the sausage into pork casing. The Nduja ages for three months. When ready, Nduja is still soft and perfect to eat spread on top of toasted sourdough.',
            price: 16.25,
            type:'Meat',
            "imageUrl": 'images/64.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtyfour);
		
		const productSixtyfive = await createProduct({
			name: 'Beef and Juniper', 
            description: 'Made with lean meat from the Chuck and Round of grass fed beef from Duell Hollow farms. Half of the meat is ground through a large die, half through a medium die giving the sausage a nice bite but smoth texture. Spiced with Juniper and Tellicherry peppercorns. This sausage is dried for four months and is best with casing on.',
            price: 8.25,
            type:'Meat',
            "imageUrl": 'images/65.jpg',
            origin: 'Beef',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtyfive);
		
		const productSixtysix = await createProduct({
			name: 'Trail Bologna', 
            description: 'A chunky bologna, made with coarse cuts of meat. Trail Bologna originates from the Troyer family in a tiny town of Trail, Ohio.  One of the best flavors of Amish Country! Enjoy the smoky taste of Trail Bologna.',
            price: 8.49,
            type:'Meat',
            "imageUrl": 'images/66.jpg',
            origin: 'Pork, Beef',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtysix);
		
		const productSixtyseven = await createProduct({
			name: 'Duck Breast Prosciutto', 
            description: 'All natural Magret du Moulard duck breast seasoned with juniper, garlic, bay leaf, and Tellicherry black pepper, and dry cured for 2 months. Despite what anyone tells you, this is our favorite child! We sliced it so you don’t have to. Just open and enjoy!',
            price: 9.99,
            type:'Meat',
            "imageUrl": 'images/67.jpg',
            origin: 'Duck',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtyseven);
		
		const productSixtyeight = await createProduct({
			name: 'One Wild Fennel', 
            description: 'A traditional Italian salami with a delightful hint of fennel, using the pollen from the fennel flower instead of the seeds, which gives this salami a milder, sweeter taste.',
            price: 14.00,
            type:'Meat',
            "imageUrl": 'images/68.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtyeight);
		
		const productSixtynine = await createProduct({
			name: 'Cacciatorini', 
            description: 'Cacciatore (the hunter). This salami was made for the hunters to fit inside their pocket giving them something to chew on while they wait. Ground fine like a sausage, with special accents of garlic, wine, and black pepper.',
            price: 8.00,
            type:'Meat',
            "imageUrl": 'images/69.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSixtynine);
		
		const productSeventy = await createProduct({
			name: 'Guanciale', 
            description: 'The jowl of the hog; great for making the famous “amatriciana” sauce! Naturally cured in salt, pepper, and rosemary. Any gravy or sauce started with this meat will have a deep and unique flavor.',
            price: 9.00,
            type:'Meat',
            "imageUrl": 'images/70.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventy);
		
		const productSeventyone = await createProduct({
			name: 'Prosciutto di Parma', 
            description: 'Thinly sliced, and layered, wrapped perfectly for parties or snack. Always best served at room temperature for maximuim flavor.',
            price: 16.00,
            type:'Meat',
            "imageUrl": 'images/71.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventyone);
		
		const productSeventytwo = await createProduct({
			name: 'Mortadella', 
            description: 'Italian bologna, but not really. This meat is cooked similarly, with the addition of cured fat pieces and roasted pistacios to amplify favor.',
            price: 8.00,
            type:'Meat',
            "imageUrl": 'images/72.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventytwo);
		
		const productSeventythree = await createProduct({
			name: 'Messina Salami', 
            description: 'Traditional Sicilian salami, ground fine and made with whole peppercorns and a special blend of spices to highlight Sicilian flavor.',
            price: 10.00,
            type:'Meat',
            "imageUrl": 'images/73.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventythree);
		
		const productSeventyfour = await createProduct({
			name: 'Milanese Salamio', 
            description: 'Famous from Northern Italy as a dry cured salami ground very fine. Ingredients specific to the Northern region make the flavor unique and tasty.',
            price: 12.00,
            type:'Meat',
            "imageUrl": 'images/74.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventyfour);
		
		const productSeventyfive = await createProduct({
			name: 'Oldani Salami', 
            description: 'Very unique salami, made in St Louis for many years. In the 1970s and 1980s, it was the number one salami in Little Italy. The new owner is doing a fabulous job of bringing back this one of a kind salami. Ground fine and finished with red wine and garlic, it is great as an appetizer or in a panino.',
            price: 15.00,
            type:'Cheese',
            "imageUrl": 'images/75.jpg',
            origin: 'Pork',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventyfive);
		
		const productSeventysix = await createProduct({
			name: 'Bosc Pears', 
            description: 'Honey sweet pear with firm texture. Great for baking and poaching, or fresh eating or add to a salad.',
            price: 6.00,
            type:'Fruit',
            "imageUrl": 'images/76.jpg',
            origin: 'Fix Brothers Fruit Farm',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventysix);
		
		const productSeventyseven = await createProduct({
			name: 'Dates', 
            description: 'This gift box has our natural "Fancy" Medjool Dates in a smaller portion. Our "Fancy" grade of Medjools are slightly smaller than our "Jumbos". The flavor and texture, however, are almost the same. You get more dates for your buck!',
            price: 34.00,
            type:'Fruit',
            "imageUrl": 'images/77.jpg',
            origin: 'Ellet Medjool',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventyseven);
		
		const productSeventyeight = await createProduct({
			name: 'Dragonfruit', 
            description: 'Best served chilled, I like to make melon balls from them. You eat the flesh and seeds inside skin by cutting the fruit in half first. The flavor is mild and refreshing - a cross between a Kiwi and Watermelon.',
            price: 79.00,
            type:'Fruit',
            "imageUrl": 'images/78.jpg',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventyeight);
		
		const productSeventynine = await createProduct({
			name: 'Strawberries', 
            description: 'From mid-June through Thanksgiving most of our fruits and vegetables are grown in New Jersey, Pennsylvania, and New York States. As the growing seasons change, so do our sources.',
            price: 15.00,
            type:'Fruit',
            "imageUrl": 'images/79.jpg',
            origin: 'Mountain Lakes Organic',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productSeventynine);
		
		const productEighty = await createProduct({
			name: 'McIntosh Apples', 
            description: 'A juicy, sweet and tangy-tart apple.',
            price: 5.00,
            type:'Fruit',
            "imageUrl": 'images/80.jpg',
            origin: 'Fix Brothers Fruit Farms',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEighty);
		
		const productEightyone = await createProduct({
			name: 'Jujube', 
            description: 'Crunchy texture, sweet apple tasting; green ripening to brown skin ; this fruit is either the Sherwood or Li variety. Sometimes known as chinese dates',
            price: 40.00,
            type:'Fruit',
            "imageUrl": 'images/81.jpg',
            origin: 'Herb Fresh',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightyone);
		
		const productEightytwo = await createProduct({
			name: 'Guanabana Soursop', 
            description: 'This fruit goes by many names in many countries, mostly indigenous to the South and Central America and Southeastern Asia. The fruit has a wonderful flavor, sort of a cross between pineapple and strawberry, and a texture a banana and coconut combined. The seeds are not edible - please discard.',
            price: 99.00,
            type:'Fruit',
            "imageUrl": 'images/82.jpg',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightytwo);
		
		const productEightythree = await createProduct({
			name: 'Mangos', 
            description: 'Florida Mangoes are some of the worlds best tasting. They are so flavorful why shop anywhere else. Ready for shipping now!',
            price: 69.00,
            type:'Fruit',
            "imageUrl": 'images/83.jpg',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightythree);
		
		const productEightyfour = await createProduct({
			name: 'Hass Avocados', 
            description: 'Creamy in texture, nutty in flavor, with a small to medium seed. The Hass skin is easy to peel and darkens from green to purplish-black as it ripens.',
            price: 14.50,
            type:'Fruit',
            "imageUrl": 'images/84.jpg',
            origin: 'Frog Hollow Farm',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightyfour);
		
		const productEightyfive = await createProduct({
			name: 'Muscat Grapes', 
            description: 'These heirloom grapes have a stronger "grape" flavor than their table grape relatives. With their firm, tart skin and unctious sweet flesh they are a very special treat. The Muscat family is among the oldest of grape varieties. A gorgeous green to golden blush color gives way to a perfumey and sweet',
            price: 4.00,
            type:'Fruit',
            "imageUrl": 'images/85.jpg',
            origin: 'Frog Hollow Farm',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightyfive);
		
		const productEightysix = await createProduct({
			name: 'Passion Fruits', 
            description: 'Passion fruit is a beneficial fruit with a healthful nutrition profile: It contains high levels of vitamin A (important for skin, vision, and the immune system), and vitamin C, which is an important antioxidant and a low glycemic index. The fruit is also rich in magnesium and dietary fibers.',
            price: 1.40,
            type:'Fruit',
            "imageUrl": 'images/86.jpg',
            origin: 'Organic Essentials',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightysix);
		
		const productEightyseven = await createProduct({
			name: 'Peaches', 
            description: 'Peaches are a fuzzy fruit native to northwest China. They are a member of the stone fruit family, which means that their flesh surrounds one large middle seed.',
            price: 3.00,
            type:'Fruit',
            "imageUrl": 'images/87.jpg',
            origin: 'Laguna Farm',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightyseven);
		
		const productEightyeight = await createProduct({
			name: 'Raspberries', 
            description: 'Raspberries are a versatile fruit that can be incorporated into breakfast, lunch, dinner or dessert',
            price: 3.50,
            type:'Fruit',
            "imageUrl": 'images/88.jpg',
            origin: 'Laguna Farm',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightyeight);
		
		const productEightynine = await createProduct({
			name: 'Thai Guava', 
            description: 'Tai White guavas are high in vitamin C and are quickly becoming known for their health benefits. Try some today!',
            price: 55.00,
            type:'Fruit',
            "imageUrl": 'images/89.jpg',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productEightynine);
		
		const productNinety = await createProduct({
			name: 'Starfruit', 
            description: 'Be the star at your next party. The sweetest carambola you will ever eat . Ready for the Barbque sliced thick!',
            price: 55.00,
            type:'Fruit',
            "imageUrl": 'images/90.jpg',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinety);
		
		const productNinetyone = await createProduct({
			name: 'Black Sapote', 
            description: 'The Black Sapote is a very interesting tropical fruit. We call it the chocolate pudding fruit. Makes a wonderful ice cream.',
            price: 95.00,
            type:'Fruit',
            "imageUrl": 'images/91.jpg',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetyone);
		
		const productNinetytwo = await createProduct({
			name: 'Cherimoya', 
            description: 'The flesh of the Cherimoya is white, melting, juicy, sweet and fragrant.',
            price: 61.95,
            type:'Fruit',
            "imageUrl": 'images/92.jpg',
            origin: 'McManigle Grove',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetytwo);
		
		const productNinetythree = await createProduct({
			name: 'Persimmons', 
            description: 'Fresh picked Fuju Persimmons sweet fruity taste eaten like an apple. Bright orange color.',
            price: 57.00,
            type:'Fruit',
            "imageUrl": 'images/93.jpg',
            origin: 'McManigle Grove',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetythree);
		
		const productNinetyfour = await createProduct({
			name: 'Sapodilla', 
            description: 'If your looking for something really different this should be your choice. Tastes like a Pear dipped in brown sugar - delicious!',
            price: 99.00,
            type:'Fruit',
            "imageUrl": 'images/94.jpg',
            origin: 'Fresh Gardens',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetyfour);
		
		const productNinetyfive = await createProduct({
			name: 'Plapple Plumcot', 
            description: 'What looks and tastes like a cross between a plum and an apple; but is not a cross between a plum and an apple? It is called a Plapple. Once you taste the super-juicy, sweet and crisp flesh, you will agree that no other name would work for this special piece of fruit. ',
            price: 1.49,
            type:'Fruit',
            "imageUrl": 'images/95.jpg',
            origin: 'Family Tree Farms',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetyfive);
		
		const productNinetysix = await createProduct({
			name: 'Blueberries', 
            description: 'Blueberries are one of the few fruits native to North America. They are also known as the only naturally blue food item.',
            price: 5.99,
            type:'Fruit',
            "imageUrl": 'images/96.jpg',
            origin: 'Family Tree Farms',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetysix);
		
		const productNinetyseven = await createProduct({
			name: 'Black Plums', 
            description: 'Shiny and slightly bumpy on the outside, a sweet, juicy yellow-red on the inside. Besides being exceptionally good eating, this is one of the best cooking plums. Use black plums for preserves, compotes, sauces, or tarts. ',
            price: 3.99,
            type:'Cheese',
            "imageUrl": 'images/97.jpg',
            origin: 'Fruit',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetyseven);
		
		const productNinetyeight = await createProduct({
			name: 'White Peaches', 
            description: 'The white peach is a soft, smooth, honey-flavored version of its orange cousin. The flavor is mild, delicate, and deliciously sweet. The aroma is like a flower store.',
            price: 3.49,
            type:'Fruit',
            "imageUrl": 'images/98.jpg',
            origin: 'Family Tree Farms',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetyeight);
		
		const productNinetynine = await createProduct({
			name: 'Yellow Nectarines', 
            description: 'The nectarine is close kin to a peach. The family resemblance is obvious from the first bite. Its golden flesh is soft and juicy; its flavor is sweet, with just enough tang to keep everything in balance. The biggest difference? No fuzz. ',
            price: 4.99,
            type:'Fruit',
            "imageUrl": 'images/99.jpg',
            origin: 'Fresh Direct',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productNinetynine);
		
		const productOnehundred = await createProduct({
			name: 'Honeydew Melon', 
            description: 'The most versatile melon around, the aptly named honeydew is both sweet and succulent. Its celery-colored flesh looks like a green-tinged precious stone. We like the contrast of flavors when the honeydew is wrapped with a slice of prosciutto.',
            price: 5.99,
            type:'Fruit',
            "imageUrl": 'images/100.jpg',
            origin: 'Fresh Direct',
            hardness: 'Hard, aged',
			odor: 'Mild'});
        console.log(productOnehundred);
        
        		
		const productOnehundredone = await createProduct({
			name: 'Dulcinea Tuscan Melon', 
            description: 'Hailing from the Italian countryside, this sweet, orange cantaloupe is known for its netted exterior and deep, distinct grooves. The patterns on its outer rind is a flavor indicator of its exceptionally sweet and seductively musky, orange inner flesh.',
            price: 4.99,
            type:'Fruit',
            "imageUrl": 'images/101.jpg',
            origin: 'Fresh Direct',
            hardness: 'Hard, aged',
			odor: 'Mild'});
        console.log(productOnehundredone);
        
        		
		const productOnehundredtwo = await createProduct({
			name: 'Buffalo Peanuts', 
            description: 'Pick buffalo peanuts for a bold snack you can take on the go. Tantalizingly sweet and crunchy buffalo peanuts have an initially sweet taste followed by a sizzling spiciness. ',
            price: 4.99,
            type:'Nut',
            "imageUrl": 'images/102.jpg',
            origin: 'nuts.com',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredtwo);
		
		const productOnehundredthree = await createProduct({
			name: 'Bourbon Pecans', 
            description: ' Each buttery pecan is caramelized in sugar and a splash of real bourbon, making them smoky and sweet with just a warm hint of bourbon flavor. For extra crunch and toasty taste, toss them over a bowl of ice cream, plain granola or yogurt.',
            price: 11.99,
            type:'Nut',
            "imageUrl": 'images/103.jpg',
            origin: 'nuts.com',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredthree);
		
		
		
		const productOnehundredfour = await createProduct({
			name: 'Honey Roasted Cashews', 
            description: 'An exceptional product. Jumbo cashews roasted to perfection, then covered in a honey coating with a slight touch of salt. Honey roasted cashews are one of the best tasting products we sell! ',
            price: 13.99,
            type:'Nut',
            "imageUrl": 'images/104.jpg',
            origin: 'nuts.com',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredfour);
		
		
		
		const productOnehundredfive = await createProduct({
			name: 'Salted Cashews', 
            description: 'These salted cashews are a family favorite that goes back generations. Jumbo cashews freshly roasted to perfection and then slightly salted to enhance a truly delicious taste. ',
            price: 12.99,
            type:'Nut',
            "imageUrl": 'images/105.jpg',
            origin: 'nuts.com',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredfive);
		
		
		
		const productOnehundredsix = await createProduct({
			name: 'Praline Pecans', 
            description: 'There are few nutty treats as classically southern as praline pecans. We take whole, American pecans and candy them with real sugar and butter for a crispy, heavenly morsel you will love.',
            price: 15.99,
            type:'Nut',
            "imageUrl": 'images/106.jpg',
            origin: 'nuts.com',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredsix);
		
		
		
		const productOnehundredseven = await createProduct({
			name: 'Salt and Pepper Pistachios', 
            description: 'Our salt and pepper pistachios are oh so tasty! Each crunchy roasted pistachio has just the right touch of salt and pepper for a perfectly seasoned snack. They are always fun, fresh and delicious. ',
            price: 13.99,
            type:'Nut',
            "imageUrl": 'images/107.jpg',
            origin: 'nuts.com',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredseven);
		
		
		
		const productOnehundredeight = await createProduct({
			name: 'Cocoa Dusted Almonds', 
            description: 'Our cocoa dusted almonds pack a double antioxidant punch. Crunchy almonds are covered in luscious dark chocolate and then rolled in cocoa. This delightful treat is perfect with a cup of coffee, or simply to enjoy as a snack. ',
            price: 11.99,
            type:'Nut',
            "imageUrl": 'images/108.jpg',
            origin: 'nuts.com',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredeight);
		
		
		
		const productOnehundrednine = await createProduct({
			name: 'Walnut Halves and Pieces', 
            description: 'Our raw walnut pieces are carefully shelled and perfectly chopped, ready to be included in all your delicious recipes. ',
            price: 6.99,
            type:'Nut',
            "imageUrl": 'images/109.jpg',
            origin: 'Sincerely Nuts',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundrednine);
		
		
		
		const productOnehundredten = await createProduct({
			name: 'Macadamias', 
            description: 'Roasted and salted macadamia nuts are a total treat, with the seasoning perfectly bringing out the sweet, nutty flavor. ',
            price: 20.99,
            type:'Nut',
            "imageUrl": 'images/110.jpg',
            origin: 'Sincerely Nuts',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredten);
		
		
		
		const productOnehundredeleven = await createProduct({
			name: 'Mixed Nuts', 
            description: 'Unsalted roasted mixed nuts are a great low-sodium treat to snack on whenever the occasion calls for a bit of crunchiness. The nut mix contains pecans, cashews, hazelnuts, walnuts, almonds, Brazil nuts, and macadamia nuts. We have ensured there are no peanuts in there, making the mix suitable for anyone allergic to them. And all of that nutty deliciousness brings with it a whole lot of healthiness. The unsalted mixed nuts contain wholesome minerals, vitamins, fiber, antioxidants, and heart-friendly fats. In just one handful, you will enjoy rare nutrients such as the selenium found in Brazil nuts and the metabolism-boosting palmitoleic acid in macadamia nuts. We understand just how important a mouthwatering crunch is in any nuts mix, and that is why we carefully seal every bag to guarantee nothing but freshness. ',
            price: 4.99,
            type:'Nut',
            "imageUrl": 'images/111.jpg',
            origin: 'Sincerely Nuts',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredeleven);
		
		
		
		const productOnehundredtwelve = await createProduct({
			name: 'Pignolias', 
            description: 'Pignolias are a true delicacy, packed with a delicious nutty flavor that tastes great in all your recipes. Whether you want to whip up some fresh pesto sauce, give a nice crunch to your salads, or a nutty sensibility to your desserts, these pignolia nuts are super fresh and sure not to disappoint. And we mean perfectly fresh. Thanks to our diligent packaging, you will never find stale or deformed pignolias in your order; we pride ourselves in making you smile whenever you rip open a bag of our goodies. And this one is as healthy as they come. Pine nuts have been consumed by man for millennia, being a staple food in the diet of ancient Native Americans and other cultures across the world. They contain essential fatty acids, antioxidants, minerals, vitamins and fiber. With just a delicious handful, you will soon be on your way to a healthier lifestyle. ',
            price: 23.99,
            type:'Nut',
            "imageUrl": 'images/112.jpg',
            origin: 'Sincerely Nuts',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredtwelve);
		
		
		
		const productOnehundredthirteen = await createProduct({
			name: 'Edamame', 
            description: 'Edamame are soy beans picked in the initial stages of ripening, and come packed with a concentrated serving of healthy nutrients. ',
            price: 3.99,
            type:'Nut',
            "imageUrl": 'images/113.jpg',
            origin: 'Sincerely Nuts',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredthirteen);
		
		
		
		const productOnehundredfourteen = await createProduct({
			name: 'Hazel Nuts', 
            description: 'These roasted and out of the shell hazelnuts are the same delicious skinless and blanched hazelnuts packed in a single 10 pound box. ',
            price: 99.77,
            type:'Nut',
            "imageUrl": 'images/114.jpg',
            origin: 'Superior Nut',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredfourteen);
		
		
		
		const productOnehundredfifteen = await createProduct({
			name: 'Wasabi Peas', 
            description: 'Looking for a snack that is a good source of protein and that is low in fat? Try our Wasabi coated green peas! They are crunchy, spicy... Hot! You can also create your own Asian-inspired snack mix with this flavorful and spicy treat. ',
            price: 4.99,
            type:'Nut',
            "imageUrl": 'images/115.jpg',
            origin: 'nuts.com',
            hardness: 'Hard, aged',
			odor: 'Mild'});
		console.log(productOnehundredfifteen);
		
		
		
		const productOnehundredsixteen = await createProduct({
			name: 'Mozzarella di Bufala', 
            description: 'The cheese goes well in antipasti dishes, with salads, pastas, calzones, vegetables and various side dishes. It is also common in popular Italian dishes like lasagne and baked casserole. ',
            price: 10.42,
            type:'Cheese',
            "imageUrl": 'images/116.jpg',
            origin: 'Italy',
            hardness: 'Soft',
			odor: 'Fresh'});
		console.log(productOnehundredsixteen);
		
		
		const productOnehundredseventeen = await createProduct({
			name: 'Olomucke Tvaruzky', 
            description: 'As an important and unavoidable part of Czech cuisine, this fetid cheese offers a distinctive, pungent taste with strong aroma. Famous as natural and soft cheese, it does not contain any chemical additives. ',
            price: 8.71,
            type:'Cheese',
            "imageUrl": 'images/117.jpg',
            origin: 'Czech Republic',
            hardness: 'Soft',
			odor: 'Strong'});
		console.log(productOnehundredseventeen);
				
		const productOnehundredeighteen = await createProduct({
			name: 'Perail de Brebis', 
            description: 'The rind of the cheese is smooth, revealing a pate that is pale yellow, soft and thick. It is the perfect choice if you desire something that is creamy and rich with a strong, powerful taste balanced by earthy undertones. The cheese requires a very short maturation period and pairs best with a Pacherin du Vic-Bilh or a Saint Chinian red wine. ',
            price: 7.78,
            type:'Cheese',
            "imageUrl": 'images/118.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Earthy'});
		console.log(productOnehundredeighteen);
				
		const productOnehundrednineteen = await createProduct({
			name: "Za'atar Burrata", 
            description: "Za'atar Burrata is an Italian Burrata that is filled with labne (a Middle Eastern kefir cheese), Italian mascarpone, and za'atar, a Middle Eastern herb mixture. It is produced by Fiore di Nonno, an artisanal cheese company located in Massachusetts, ",
            price: 12.18,
            type:'Cheese',
            "imageUrl": 'images/119.jpg',
            origin: 'US',
            hardness: 'Soft',
			odor: 'Aromatic, Herbal'});
		console.log(productOnehundrednineteen);
				
		const productOnehundredtwenty = await createProduct({
			name: 'Rigotte', 
            description: 'Rigotte can be eaten fresh but the actual flavours develop on maturity. The pate will become slightly moist and the rind nearly dry and finely wrinkled. A nutty, delicate flavour of honey and acacia will leave a wonderful taste in the mouth. ',
            price: 19.04,
            type:'Cheese',
            "imageUrl": 'images/120.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Goaty, Nutty'});
		console.log(productOnehundredtwenty);
				
		const productOnehundredtwentyone = await createProduct({
			name: 'Rochebaron', 
            description: 'Rochebaron, also known as Montbriac is a French blue gourmet cheese made in Pouligny-Saint-Pierre in central France. The French are known to produce exceptionally soft, creamy cheese and Rochebaron live up to the expectations. ',
            price: 6.78,
            type:'Cheese',
            "imageUrl": 'images/121.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Strong'});
		console.log(productOnehundredtwentyone);
				
		const productOnehundredtwentytwo = await createProduct({
			name: 'Rustinu', 
            description: 'Rustinu is a French cheese introduced by famous French cheesemaker, Joseph Guidicelli. This cheese originates from the historical region of Rustinu, where the family business is located.  ',
            price: 3.79,
            type:'Cheese',
            "imageUrl": 'images/122.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Fresh'});
		console.log(productOnehundredtwentytwo);
				
		const productOnehundredtwentythree = await createProduct({
			name: 'Soumaintrain', 
            description: 'Soumaintrain is a farmhouse (fermier) French cheese made with raw cow’s milk in the Burgundy region of France. The soft, uncooked, and un-pressed paste has a distinct pungent yet sweet and creamy flavour resulting from numerous washings with a solution of brine and Marc de Bourgogne.  ',
            price: 10.42,
            type:'Cheese',
            "imageUrl": 'images/123.jpg',
            origin: 'France',
            hardness: 'Soft',
			odor: 'Pungent'});
		console.log(productOnehundredtwentythree);
				
		const productOnehundredtwentyfour = await createProduct({
			name: 'Tommes', 
            description: 'Tomme is a complex and unpredictable class of cheeses with a delicate milk and buttery aroma. It tastes of fresh butter and cream yet can be complex when compared to some other cheeses. The texture is semi-soft or soft and pliable. Its pate, which is often white to light yellow in colour, comes covered with an ivory to a yellow rind. ',
            price: 7.74,
            type:'Cheese',
            "imageUrl": 'images/124.jpg',
            origin: 'Switzerland',
            hardness: 'Soft',
			odor: 'Earthy, Fresh, Milky'});
		console.log(productOnehundredtwentyfour);
				
		const productOnehundredtwentyfive = await createProduct({
			name: 'Torta del Casal', 
            description: 'Torta del Casar is vegetarian produce coagulated with cardoon, a wild thistle which adds a slightly bitter note to the rich and slightly salty tasting cheese. The cheese is aged for at least 60 days upon which it develops a semi-hard, yellow to an ochre crust and a soft, spreadable, creamy, almost runnier paste. Its insides are yellowish in colour and the aroma is very unique. Torta del Casar can be enjoyed as an appetizer or a dessert, spread on bread with a glass of dry, red wine. ',
            price: 15.88,
            type:'Cheese',
            "imageUrl": 'images/125.jpg',
            origin: 'Spain',
            hardness: 'Soft',
			odor: 'Lanoline'});
		console.log(productOnehundredtwentyfive);
				
		const productOnehundredtwentysix = await createProduct({
			name: 'Appenzeller', 
            description: 'The cheese originates in the north-eastern Swiss canton of the Appenzell near the Liechtenstein border but, today is also made in the canton of St Gallen (which is a siege of a special authority protecting a Genuity of Appenzell). ',
            price: 19.31,
            type:'Cheese',
            "imageUrl": 'images/126.jpg',
            origin: 'Switzerland',
            hardness: 'Hard',
			odor: 'Mild'});
		console.log(productOnehundredtwentysix);
				
		
		const productOnehundredtwentyseven = await createProduct({
			name: 'Asiago PDO', 
            description: 'Depending on age, the rinds of Asiago can be straw coloured and elastic to brownish grey and hard. The paste can be white to dark yellow, with small to medium irregular holes. Based on the ageing, Asiago can be used for grating, melting, slicing on a variety of salads, sandwiches, soups, pasta, and sauces. ',
            price: 7.76,
            type:'Cheese',
            "imageUrl": 'images/127.jpg',
            origin: 'Italy',
            hardness: 'Hard',
			odor: 'Pungent'});
		console.log(productOnehundredtwentyseven);
				
		const productOnehundredtwentyeight = await createProduct({
			name: 'Bavarian Bergkase', 
            description: 'A cross between Emmental, Appenzeller and Allgauer Bergkase is a high-fat cheese with 62% fat and is mainly consumed in slices, sandwiches, salads and casseroles. ',
            price: 9.72,
            type:'Cheese',
            "imageUrl": 'images/128.jpg',
            origin: 'Germany',
            hardness: 'Hard',
			odor: 'Aromatic, Rich'});
		console.log(productOnehundredtwentyeight);
				
		const productOnehundredtwentynine = await createProduct({
			name: 'Boeren-leidse met Sleutels', 
            description: 'This cheese has a powerful, rich flavour with that extra zing of cumin. It is gently aromatic and becomes more fruity and intense as it ripens. ',
            price: 6.42,
            type:'Cheese',
            "imageUrl": 'images/129.jpg',
            origin: 'Holland',
            hardness: 'Hard',
			odor: 'Aromatic, Rich'});
		console.log(productOnehundredtwentynine);
				
		const productOnehundredthirty = await createProduct({
			name: 'Canestrato', 
            description: 'Due to its hard texture, it has a good reputation as a table cheese and pairs well with fresh, raw vegetables and pears. It can also be grated on pasta and soups. Wines such as Greco di Tufo, Falanghina, Lacryma Christi del Vesuvio and Aglianico make a perfect match with the cheese.  ',
            price: 9.42,
            type:'Cheese',
            "imageUrl": 'images/130.jpg',
            origin: 'Italy',
            hardness: 'Hard',
			odor: 'Grassy, Milky, Strong'});
		console.log(productOnehundredthirty);
				
			const productOnehundredthirtyone = await createProduct({
			name: 'Cheddar', 
            description: 'Cheddar cheese, the most widely purchased and eaten cheese in the world is always made from cow milk. It is a hard and natural cheese that has a slightly crumbly texture if properly cured and if it is too young, the texture is smooth. ',
            price: 7.56,
            type:'Cheese',
            "imageUrl": 'images/131.jpg',
            origin: 'England',
            hardness: 'Hard',
			odor: 'Mild'});
		console.log(productOnehundredthirtyone);
				
		const productOnehundredthirtytwo = await createProduct({
			name: 'Dutch Mimolette (Commissiekaas)', 
            description: 'This cheese looks like giant orange with rough, pitted skin. It is creamery, hard cheese made from cow milk and it is actually a matured Edam coloured with carrot juice.  ',
            price: 5.99,
            type:'Cheese',
            "imageUrl": 'images/132.jpg',
            origin: 'Holland',
            hardness: 'Hard',
			odor: 'Fruity'});
		console.log(productOnehundredthirtytwo);
				
		const productOnehundredthirtythree = await createProduct({
			name: 'Emmental', 
            description: 'The cheese goes well in antipasti dishes, with salads, pastas, calzones, vegetables and various side dishes. It is also common in popular Italian dishes like lasagne and baked casserole. ',
            price: 12.13,
            type:'Cheese',
            "imageUrl": 'images/133.jpg',
            origin: 'Switzerland',
            hardness: 'Hard',
			odor: 'Mild, Grassy'});
		console.log(productOnehundredthirtythree);
				
		const productOnehundredthirtyfour = await createProduct({
			name: 'Fiore Sardo', 
            description: 'As per DOP standards, the cheese is made with milk sourced from a single flock of local Sardinian breed. The cheese after ageing for six months develops a natural rustic brown rind and a sour, damp smell. Upon slicing, the pate reveals a compact, dense, straw yellow or white colour. It is wonderfully rich in flavour, with a granular texture. It is carefully smoked, adding another layer of complexity ',
            price: 21.19,
            type:'Cheese',
            "imageUrl": 'images/134.jpg',
            origin: 'Italy',
            hardness: 'Hard',
			odor: 'Rich, Strong'});
		console.log(productOnehundredthirtyfour);
				
		const productOnehundredthirtyfive = await createProduct({
			name: 'Fontina', 
            description: 'Fontina is a Swedish style cheese made by Emmi Roth USA. Fontina is a hard cheese which has a creamy texture and a subtle tart flavour characterized by a mild yeasty finish. It melts beautifully which makes it ideal for Pizzas, flatbreads, lasagnas, quesadillas.  ',
            price: 6.68,
            type:'Cheese',
            "imageUrl": 'images/135.jpg',
            origin: 'US',
            hardness: 'Hard',
			odor: 'Mild, Yeasty'});
		console.log(productOnehundredthirtyfive);
				
		const productOnehundredthirtysix = await createProduct({
			name: 'Gammelost', 
            description: 'A semisoft, blue cheese, Gammelost imparts a sharp and aromatic flavour. Ripened using Mucor, Rhizopus, and Penicillium moulds, the crust of the cheese is brownish while the pate is brownish-yellow with a hue of blue and green. Texturally, the cheese is firm, dense, moist and usually granular. ',
            price: 14.44,
            type:'Cheese',
            "imageUrl": 'images/136.jpg',
            origin: 'Norway',
            hardness: 'Hard',
			odor: 'Aromatic'});
		console.log(productOnehundredthirtysix);
				
		const productOnehundredthirtyseven = await createProduct({
			name: 'Grana', 
            description: 'Grana refer to a family of hard, mature cheeses from Italy that have a granular, flaky texture and are mainly used for grating. ',
            price: 10.10,
            type:'Cheese',
            "imageUrl": 'images/137.jpg',
            origin: 'Italy',
            hardness: 'Hard',
			odor: 'Strong'});
		console.log(productOnehundredthirtyseven);
		

		const productOnehundredthirtyeight = await createProduct({
			name: 'Kanterkaas', 
            description: 'Kanternagelkaas flavour varies from fragrant, spicy, warm and spicy to tangy. The pate of the cheese is firm to hard and over time very suitable for grating. The colour of Kanter cheese is evenly ivory or yellow to yellow-green. It has a closed body, but some holes may exist. The cloves and cumin are evenly spread throughout the pate. ',
            price: 8.48,
            type:'Cheese',
            "imageUrl": 'images/138.jpg',
            origin: 'IHolland',
            hardness: 'Hard',
			odor: 'Aromatic, Pleasant'});
		console.log(productOnehundredthirtyeight);
		
		const productOnehundredthirtynine = await createProduct({
			name: 'Kashar', 
            description: 'Kashar is a Balkan style pasta filata cheese, made by Parish Hill Creamery in southern Vermont, US. It is made by stretching curds and then kept in the bast molds for at least 2 month. During maturation it is rubbed and polished with olive oil that gives an edible rind. Similar to Suffolk,  it is buttery and tangy in taste and is suitable with any meal. Some versions are aged over six months that develops peppery notes. ',
            price: 6.79,
            type:'Cheese',
            "imageUrl": 'images/139.jpg',
            origin: 'US',
            hardness: 'Hard',
			odor: 'Buttery, Spicy'});
		console.log(productOnehundredthirtynine);
				
	     
		
		const productOnehundredforty = await createProduct({
			name: 'Le Gruyere AOP', 
            description: 'Le Gruyère AOP (or simply Gruyere) is named after a Swiss village. It is traditional, creamery, unpasteurised, hard cheese. The natural, rusty brown rind is hard and dry. The cheese is darker yellow than Emmental but the texture is more dense and compact. Gruyère is sweet and little salty. When young, it is creamy and nutty but after maturation, the texture becomes earthy and complex with small cracks and grainy.  ',
            price: 21.12,
            type:'Cheese',
            "imageUrl": 'images/140.jpg',
            origin: 'Switzerland',
            hardness: 'Hard',
			odor: 'Earthy'});
		console.log(productOnehundredforty);
				
	     
		
		const productOnehundredfortyone = await createProduct({
			name: 'Parmesan', 
            description: 'True Parmesan cheese has a hard, gritty texture and is fruity and nutty in taste. Cheeses mocking Parmesan or inferior Parmesan may have a bitter taste. Parmigiano Reggiano cheese is mostly grated over pastas, used in soups and risottos. It is also eaten on its own as a snack. ',
            price: 24.35,
            type:'Cheese',
            "imageUrl": 'images/141.jpg',
            origin: 'Italy',
            hardness: 'Hard',
			odor: 'Strong'});
		console.log(productOnehundredfortyone);
				
	     
		
		const productOnehundredfortytwo = await createProduct({
			name: 'Pecorino', 
            description: 'Pecorinos are traditional, creamery, hard, drum-shaped cheeses. They come in a variety of flavours determined by their age. Aged Pecorinos referred to as ‘stagionato’ are hard and crumbly in texture with buttery and nutty flavours. Young or ‘semi-stagionato’ and ‘fresco’ Pecorinos feature a softer texture with mild, creamy flavours ',
            price: 16.57,
            type:'Cheese',
            "imageUrl": 'images/142.jpg',
            origin: 'Italy',
            hardness: 'Hard',
			odor: 'Mild'});
		console.log(productOnehundredfortytwo);
				
	     
		
		const productOnehundredfortythree = await createProduct({
			name: 'Pecorino Pepato', 
            description: 'Pecorino Pepato Mitica® Aged is a pasteurized sheep milk cheese dotted with black peppercorn all over the paste. Originally from Sicily, Italy, it is made in Sardegna. Italy. The cheese is aged for about 6 months during which it develops a flaky yet creamy consistency. The salty, tangy flavours complemented by the spicy peppercorns make this cheese a great table cheese. Shave it on salads or fresh beans or pastas or grate into polenta or atop risotto.  ',
            price: 19.22,
            type:'Cheese',
            "imageUrl": 'images/143.jpg',
            origin: 'Italy',
            hardness: 'Hard',
			odor: 'Spicy'});
		console.log(productOnehundredfortythree);
				
	     
		
		const productOnehundredfortyfour = await createProduct({
			name: 'Pecorino Romano', 
            description: 'Pecorino Romano is one of most widely used, sharper alternatives to Parmesan cheeses. Because of the hard texture and sharp & salty flavour, Pecorino Romano is an excellent grating cheese over pasta dishes, breads and baking casseroles. Although, the use of the cheese is limited because of its extreme saltiness. Pair it with a glass of big, bold Italian red wine or a light beer. ',
            price: 16.76,
            type:'Cheese',
            "imageUrl": 'images/144.jpg',
            origin: 'Italy',
            hardness: 'Hard',
			odor: 'Strong, Nutty'});
		console.log(productOnehundredfortyfour);
				
	     
		
		const productOnehundredfortyfive = await createProduct({
			name: 'Romano', 
            description: 'Romano cheese works excellent as a table cheese. It can be grated over pasta, soups and salad or shaved onto cooked dishes and cream sauces. Hard cheeses like Romano best pair with fruity wines like Riesling and Prosecco.',
            price: 14.44,
            type:'Cheese',
            "imageUrl": 'images/145.jpg',
            origin: 'Italy',
            hardness: 'Hard',
			odor: 'Strong'});
		console.log(productOnehundredfortyfive);
				
	     
		
		const productOnehundredfortysix = await createProduct({
			name: 'Roncal', 
            description: 'Roncal is a wheel-shaped cheese that is covered with a hard, natural rind dotted by a velvety-smooth layer of blue-grey mould. Roncal is complex and piquant, with notes of lanolin and butterscotch.  ',
            price: 11.44,
            type:'Cheese',
            "imageUrl": 'images/146.jpg',
            origin: 'Spain',
            hardness: 'Hard',
			odor: 'Lanoline'});
		console.log(productOnehundredfortysix);
				
	     
		
		const productOnehundredfortyseven = await createProduct({
			name: 'Roumy', 
            description: ' Egyptians enjoy the distinctive smell of Roumy with whole wheat pita bread or Baladi bread. In Egypt, slices of Roumy are served at the breakfast table.  ',
            price: 9.89,
            type:'Cheese',
            "imageUrl": 'images/147.jpg',
            origin: 'Egypt',
            hardness: 'Hard',
			odor: 'Pungent'});
		console.log(productOnehundredfortyseven);
					     
		
		const productOnehundredfortyeight = await createProduct({
			name: 'Sancerre', 
            description: 'When young it has fresh "white wine" fruity flavour and aroma. When aged it develops a strong, nutty, goaty taste with natural rind. Sancerre contains about 40% fats. It goes well with white wine.    ',
            price: 7.78,
            type:'Cheese',
            "imageUrl": 'images/148.jpg',
            origin: 'France',
            hardness: 'Hard',
			odor: 'Mild'});
		console.log(productOnehundredfortyeight);
					     
		
		const productOnehundredfortynine = await createProduct({
			name: 'Smoked Gouda', 
            description: 'Smoked Gouda is a variant of this famous cheese wherein it is smoked in ancient brick ovens over flaming hickory chip embers. Sensational with beer, this hard cheese has an edible, brown rind and a creamy, yellow interior. It can also perfectly complement tasty snacks like fruits, nuts and dark chocolate. It forms a good combination of sandwiches and burgers.  ',
            price: 8.32,
            type:'Cheese',
            "imageUrl": 'images/149.jpg',
            origin: 'Holland',
            hardness: 'Hard',
			odor: 'Smokey'});
		console.log(productOnehundredfortynine);
					     
		
		const productOnehundredfifty = await createProduct({
			name: 'Swiss', 
            description: 'The process of Swiss cheese making is designed in a way that no rind forms on the cheese. It can be eaten with fruits such as apples, pears, grapes and thinly-sliced prosciutto ham and salami. Fruity white wine, aged red wine, cran-raspberry juice, tomato or vegetable juices also prove to be great pairs for Swiss cheese.  ',
            price: 6.77,
            type:'Cheese',
            "imageUrl": 'images/150.jpg',
            origin: 'Switzerland',
            hardness: 'Hard',
			odor: 'Mild'});
		console.log(productOnehundredfifty);
					     
		
		const productOnehundredfiftyone = await createProduct({
			name: 'Zanetti Parmigiano Reggiano', 
            description: 'With its rich, nutty taste and distinctive aroma, it is used by the finest chefs in food preparation. But it is equally delicious to eat with fruit, crackers and wine or sprinkled on pasta, rice or soup.  ',
            price: 12.22,
            type:'Cheese',
            "imageUrl": 'images/151.jpg',
            origin: 'Italy',
            hardness: 'Hard',
			odor: 'Mild'});
        console.log(productOnehundredfiftyone);
        
        const productOnehundredfiftytwo = await createProduct({
			name: 'Nokkelost', 
            description: 'Flavoured with cumin, caraway seeds and cloves, it is a bit spicy, nutty and tangy in taste. The cheese with 45% of fats is suitable for non-vegetarians. It can be paired with Red Wine and Ripasso.  ',
            price: 9.95,
            type:'Cheese',
            "imageUrl": 'images/152.jpg',
            origin: 'Norway',
            hardness: 'Hard',
			odor: 'Mild'});
		console.log(productOnehundredfiftytwo);

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
