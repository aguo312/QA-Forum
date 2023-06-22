# QA-Forum

client dependencies
axios

server dependencies
body-parse, connect-mongo, cors, express, express-session, mongoose, nodemon

## Instructions to setup and run project

React App: localhost:3000
Server: localhost:8000
Database: mongodb://127.0.0.1:27017/qa_forum

Startup:
Open terminal and run:
mongod.exe --dbpath="c:\data\db"

Open terminal -> cd to final-project folder and run:
SECRET_KEY=<secret string> nodemon server/server.js
Example: SECRET_KEY="secret string" nodemon server/server.js

Open terminal -> cd to final-project/client/src folder and run:
npm start
