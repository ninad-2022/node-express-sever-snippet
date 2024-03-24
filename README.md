### README.md ###

### What is this repository for? ###

* This project is a CRUD (Create, Read, Update, Delete) API implemented in Node.js using Express.js, Sequelize ORM for MySQL database, and other technologies.

### How do I get set up? ###

* Requires Node 18.x (+) version, and NPM 10.x (+) version
* Check if the `./.env` is updated
* configure database
* Run `npm install --legacy-peer-deps` to install the necessary dependencies
* Run `npm run start:dev` to start app in debug or development mode
* Run `npm run start:multi` to start app in nodejs cluster

### Who do I talk to? ###

* Ninad Bhoir <ninadbhoir010@gmail.com>

### Project Structure ###

* src: Contains the source code of the application.
* controllers: Controllers handle the business logic for each route.
* db/mysql: db connection setup and models.
* middlewares: Custom middlewares used in the application.
* providers: Providers handle db queries.
* routes: Express route definitions.
* validations: Validation schemas for request payloads.
* helpers: requried common helper function.
* webpack.prod.js: Webpack configuration for production build.

### Configuration ###
* The application uses the dotenv package for environment variable configuration. Create a .env file in the root of the project and set the given variables