This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

To run the frontend locally:

- Clone this repo
- Go to whatsapp-mern directory
- `npm install` to install the required dependencies
- `npm start` to start the local server on port 3000

To run the backend:
- Go to whatsapp-backend directory
- `nodemon server.js` to run the backend

## Functionality overview

This project is created mainly for education purposes. This project aims to replicate whatsApp using MERN(MongoDB Express React Nodejs)-stack. React is the main framework used for the frontend and nodejs is used for the backend. Furthermore, MongoDB is used as the database. 

**Features**

- User authentication via Firebase
- Able to send message
- MongoDB is not a real-time database, therefore pusher-API is used to forward any changes in DB.
- Postman-API simplifies HTTP GET and POST methods and is used in order to make backend testing easier

**Issues to be fixed**

- Currently the messages are not divided into different chat rooms.
- Add friend feature will also be implemented
