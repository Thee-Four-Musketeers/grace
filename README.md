# Cheezy - Holy Cow!

Capstone project for FullStack Academy, 2004 UNF Cohort, brought to you by The Four Musketeers!

# PERN stack ecommerce website

- A PostgreSQL database
- An Express web server
- A React front-end
- A Node JavaScript library manager
```We have also integrated Bootstrap, Stripe, @emotion, fontawesome, jwt, bcrypt, and axios.```

# Cheezy is a fully functional mock ecommerce website that allows users to build their own Charcuterie board with the perfect selection of artisanal cheeses, specialty meats, and delicious fruits & nuts.

# Key Features
User shopping and account/order maintenance. 
Admin website maintenance including user accounts, orders, and product management.
Cart and checkout with Stripe integration for user safety.


# Enjoy!













### Setting up Heroku (once)

```bash
heroku create hopeful-project-name

heroku addons:create heroku-postgresql:hobby-dev
```

This creates a heroku project which will live at https://hopeful-project-name.herokuapp.com (note, you should change this to be relevant to your project).

It will also create a postgres database for you, on the free tier.


### Deploying

Once you've built the front-end you're ready to deploy, simply run `git push heroku master`. Note, your git has to be clean for this to work (which is why our two git commands live as part of getting ready to deploy, above).

This will send off the new code to heroku, will install the node modules on their server, and will run `npm start`, starting up your express server.

If you need to rebuild your database on heroku, you can do so right now with this command:

```bash
heroku run npm run db:build
```

Which will run `npm run db:build` on the heroku server.

Once that command runs, you can type `heroku open` to get a browser to open up locally with your full-stack application running remotely.
