![Landing](https://res.cloudinary.com/dc4yu3ljd/image/upload/v1684581466/Landing_gmex1h.png)

# Class 41 final project

This is the final project for the HackYourFuture curriculum we did as a class using the MERN stack by following the agile methodology with our team and a group of mentors. A quick guide to what we built:

The project _'My diary'_ is a social networking website developed by Team 2 of class 41. It provides a platform for users to create personal diaries and share their stories with friends and the community. Users can sign up and create profiles, add friends, and search for other users and posts. The website provides offers a variety of features and menu sections:

- My Diary: Create your own personal diary and share your stories with friends, or create private posts just for yourself. Express yourself, capture your thoughts, and keep your memories in one place. You can even enhance your posts by adding photos to make them even more memorable and engaging.

  ![My posts page screenshot](./client/src/assets/readme/Screenshot%202023-05-23%20at%2009.42.20.png)

- Friends: Connect with friends by adding them to your friends list. Utilize the search functionality to find and connect with other users based on their first name, last name, birthday, country, or email. Expand your social circle and stay connected.
- Feeds: Stay updated with the latest posts and activities from your friends. Explore a dynamic feed that displays posts, photos, and updates from the people you follow.
- Search: Discover new users and posts through our comprehensive search functionality. Search for specific users posts or explore popular tags to find posts related to your interests. It's a great way to explore and engage with the community.
- Settings: Customize your profile! Personalize your experience and manage your account settings with ease.

Additionally, our website is moderated by a dedicated team to ensure a safe and enjoyable environment. Our moderators have the ability to ban any inappropriate content to maintain a positive user experience for all.

Experience the power of social networking and connect with others through our user-friendly interface, designed to provide a smooth and engaging experience. Start sharing your stories, discovering new connections, and exploring a vibrant community on our social networking website.

[Click here for the Demo version](https://c41-team-two.herokuapp.com/)

## 1. Setup

First, to setup all the directories run the following in the main directory:

`npm install`

`npm run setup`

The first command will install `cypress` and some small libraries needed for running the rest of the commands. The second will go into the `client` and `server` directories and set those up to be ran.

In the `client` and `server` directory there are two `.env.example` files. Create a copy and rename that to `.env`. Then follow the instructions in those files to fill in the right values.

To run the app in dev mode you can run the following command in the main directory:

`npm run dev`

## 2. Code structure

```
client
├── public
└── src
|   └── __tests__
|   └── __testUtils__
|   └── assets
|   └── components
|   └── context
|   └── hooks
|   └── pages
|       └── __tests__
|   └── util
|   index.jsx
cypress
|   └── fixtures
|   └── integration
|   └── plugins
|   └── support
server
└── src
    └── __tests__
    └── __testUtils__
    └── controllers
    └── db
    └── middleware
    └── models
    └── routes
    └── util
    index.js
```

### 2.1 Client structure

- `public` || public facing client code
- `__tests__` || any `jest` tests for specific components will be in a `__tests__` folder on the same level
- `__testUtils__` || any code that is only being used in the tests is put in the `__testUtils__` folder to separate that away from the rest of the code
- `components` || all of our shared components that are used over multiple pages
- `hooks` || all of our custom hooks
- `pages` || the page components of our app, any routing will go between these components
- `pages/components` || components used specifically on those pages
- `util` || any utility functions that can be used anywhere on the client side
- `index.jsx` || the start point of the client

### 2.2 Cypress structure

- `fixtures` || any data/files that `cypress` needs can be placed here
- `integration` || all of our tests are in here, separated in folders based on the pages in our app
- `plugins` || any plugins for our `cypress` configuration can be placed here
- `support` || custom commands and other support files for `cypress` can be placed here

### 2.3 Server structure

- `__tests__` || any `jest` tests for the api endpoints as that is our testing strategy for the backend
- `__testUtils__` || any code that is only being used in the tests is put in the `__testUtils__` folder to separate that away from the rest of the code
- `controllers` || all of our controller functions that interact with the database
- `db` || all of our configuration for the database
- `models` || all of our `mongoose` models will be placed here
- `routes` || code to match up the API with our controllers
- `util` || any utility functions that can be used anywhere on the server side
- `index.js` || the start point of the server

## 3. Stack / external libraries

The base stack of the app is a MERN stack (Mongoose, Express, React, Node). Next to that we make use of the following extras:

### 3.1 Configuration libraries

- `dotenv` || To load the .env variables into the process environment. See [docs](https://www.npmjs.com/package/dotenv)
- `webpack` / `html-webpack-plugin` || To bundle our React app and create a static app to host. See [docs](https://webpack.js.org/)
- `husky` || To run our tests and linter before committing. See [docs](https://typicode.github.io/husky/#/)
- `eslint` || To check our code. We have different configurations for frontend and backend. You can check out the configuration in the `.eslintrc.(c)js` files in the respective `client` and `server` folders. See [docs](https://eslint.org/)
- `prettier` || To automatically format our code. See [docs](https://prettier.io/)
- `concurrently` || To run commands in parallel. See [docs](https://github.com/open-cli-tools/concurrently#readme)

For more information on how these work together including the automatic deployment to heroku, have a look at our detailed [DEV](./DEV.md) file.

### 3.2 Client-side libraries

- `@testing-library/*` || We use React Testing Library to write all of our tests. See [docs](https://testing-library.com/docs/react-testing-library/intro/)
- `jest` || To run our tests and coverage. See [docs](https://jestjs.io/)
- `jest-fetch-mock` || To mock out the backend for our testing purposes. See [docs](https://github.com/jefflau/jest-fetch-mock#readme)
- `prop-types` || To type-check our components. See [docs](https://github.com/facebook/prop-types)

### 3.3 Server-side libraries

- `nodemon` || To automatically restart the server when in development mode. See [docs](https://nodemon.io/)
- `jest` || To run our tests and coverage. See [docs](https://jestjs.io/)
- `supertest` || To more easily test our endpoints. See [docs](https://github.com/visionmedia/supertest#readme)
- `mongodb-memory-server` || To mock out our database in our backend tests. See [docs](https://github.com/nodkz/mongodb-memory-server)
- `cors` || To open up our API. See [docs](https://github.com/expressjs/cors#readme)
- `mongoose` || To add schemas to our database. See [docs](https://mongoosejs.com/)
- `cloudinary` || A cloud-based service for managing and delivering images and other media files. See [docs](https://cloudinary.com/documentation)
- `express-fileupload` || A middleware for handling file uploads in Express.js. See [docs](https://www.npmjs.com/package/express-fileupload)
- `bcrypt` || A library used for hashing passwords and performing password hashing functions. See [docs](https://www.npmjs.com/package/bcrypt)
- `jsonwebtoken` || A library for generating and verifying JSON Web Tokens (JWTs) in Node.js. The jsonwebtoken library provides functions to generate tokens, verify their authenticity, and extract the payload information. See [docs](https://github.com/auth0/node-jsonwebtoken)\
  To protect certain routes or endpoints that require authentication, we use the jsonwebtoken library along with custom middleware. The middleware verifies the integrity and authenticity of the JWT provided in the Authorization header of the request. If the token is valid, it allows access to the protected resource; otherwise, it returns an appropriate error response.
