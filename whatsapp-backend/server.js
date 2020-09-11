 // import
import express from "express";
import mongoose from 'mongoose';
import Messages from "./dbMessages.js";
import Rooms from "./dbRooms.js";
import Pusher from "pusher";
import cors from 'cors';

// app config
const app = express();
const port = process.env.PORT || 9000;

//const server = require("http").createServer(app);
/*
server.listen(port, () => {
  console.log(`Socket is listening on port ${port}`);
});
*/

const pusher = new Pusher({
    appId: '1070545',
    key: 'a692f130cf06402ee20f',
    secret: '1e7009dead937e4b49b3',
    cluster: 'eu',
    encrypted: true
});


// middleware
app.use(express.json());
app.use(cors());

/*
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
*/

// DB config
const connection_url = 'mongodb+srv://admin:eL1OHrceu7QjaTGp@cluster0.k4yoq.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    room: messageDetails.room,
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received,
                }
            );
        } else{
            console.log('Error triggering Pusher');
        }
    });

    const roomCollection = db.collection("rooms");
    const changeStreamRooms = roomCollection.watch();

    changeStreamRooms.on("change", (change) => {
        console.log(change);

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('rooms', 'inserted',
                {
                    name: messageDetails.name
                }
            );
        } else{
            console.log('Error triggering Pusher');
        }
    });
});

// api route
app.get('/', (req,res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req,res) => {
    Messages.find((err, data) => {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
});

app.get('/messages/room', (req,res) => {
    Messages.find( req.query, (err,data) =>{
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    }) //where req.session.user is an id (the logged in user's object id or _id)
})

app.get('/rooms/id', (req, res) => {
	Rooms.findById(req.query, (err, data) => {
		if (err) {
			res.status(500).send(err); // 500 internal server error
		} else {
			res.status(200).send(data); // 200 this is a OK status
		}
	});
});

app.get('/rooms/first', (req, res) => {
	Rooms.findOne((err, data) => {
		if (err) {
			res.status(500).send(err); // 500 internal server error
		} else {
			res.status(200).send(data); // 200 this is a OK status
		}
	});
});


app.get('/rooms', (req,res) => {
    Rooms.find({ name: { $ne: null } }, (err,data) =>{
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

app.get('/messages/one', (req,res) => {
    Messages.findOne(req.query,{},{sort:{'timestamp':-1}} ,(err,data) =>{
        console.log("find One message req = ", res);
        if (err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
});

app.post('/rooms/new', (req,res) => {
    const dbRooms = req.body;

    Rooms.create(dbRooms, (err, data) => {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.post('/messages/new', (req,res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});


//listen

app.listen(port, () => console.log(`Listening on localhost:${port}`));
