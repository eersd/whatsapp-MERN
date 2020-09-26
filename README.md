This project was bootstrapped with  [Create React App](https://github.com/facebook/create-react-app).

A live demo of the frontend application is available at :  
https://whatsapp-mern.netlify.app/

and the backend is hosted in :  
https://whatsapp-mern-eersd-backend.herokuapp.com/

## Getting started

To run the frontend locally:

- Clone this repo
- Go to whatsapp-mern directory
- `npm install` to install the required dependencies
- `npm start` to start the local server on port 3000
- Edit the axios.js file accordingly to setup your endpoint url

To run the backend:
- Go to whatsapp-backend directory
- `npm install` to install dependencies
- `nodemon server.js` to run the backend

Tools or APIs used for this project:
## Frontend
  - react.js : lightweight Javascript library by Facebook
  - react-router-dom : mainly to navigate or routing
  - axios : Javascript library to make HTTP requests
  - firebase : used for authentication


## Backend 
  - node.js : Javascript run time environment that runs outside of browser.
  - express : nodejs framework that provides robust features for web development.
  - cors : enables open access across domain boundaries.
  - mongoDb : NoSQL DB.
  - mongoose : mongoDB Object modelling.
  - pusher : mongoDB is not a real-time database, therefore pusher-API (similar to socket.io) is used to forward any changes in DB. 
  - Postman : simplifies HTTP methods to test mongoose commands as well as test DB.


## Functionality overview

This project is created mainly for education purposes. This project aims to replicate whatsApp using MERN(MongoDB Express React Nodejs)-stack. React is the main framework used for the frontend and nodejs is used for the backend. Furthermore, MongoDB is used as the database. 

**Features**

- User authentication via Firebase
- Able to send messages in a chat room
- Create rooms and join the ones you like

**Issues to be fixed**

- Chat view should scroll down to newest message
- Leave room to be implemented
- maybe add friends as well
