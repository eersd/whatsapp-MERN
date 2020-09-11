import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from "./axios";
import Pusher from 'pusher-js';
import {useParams} from "react-router-dom";

function Chat({email, currentRoomObject}) {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [currentRoomState, setCurrentRoomState] = useState(currentRoomObject.name);
    const {roomId} = useParams(currentRoomObject._id);

    
    const sendMessage = async (e) => {
        e.preventDefault();
        console.log("roomState in axios Post",currentRoomState);

        await axios.post('/messages/new', {
            "room": currentRoomState.name,
            "message": input,
            "name": email,
            "timestamp": new Date().toUTCString(),
            "received": false,
        });
        setInput("");
    };
    
    useEffect(()=> {
        axios.get('/rooms/id',{params: {"_id": roomId}}).then((response) => {
            setCurrentRoomState(response.data);
            console.log("currentRooms ,",response.data);
        });
    },[roomId]);
    
    /*
    useEffect(() => {
        //axios.get("/rooms").then((response) => {
        axios.get("/messages/sync").then((response) => {
          setMessages(response.data);
        });
      });
    */
   useEffect(() => {
        axios.get('messages/room',{params: {"room": currentRoomState.name}}).then((response) => {
            setMessages(response.data);
            console.log("messagesCHa,",response.data);
            console.log("currentRoomState ",currentRoomState.name);
        });
    }, [currentRoomState]);
    
    useEffect(() => {

        const pusher = new Pusher('a692f130cf06402ee20f', {
            cluster: 'eu'
        });

        console.log("pusher pushed");
        const channel = pusher.subscribe("/messages/");
        channel.bind('inserted', (newMessage) => {
            alert(JSON.stringify(newMessage));
            setMessages([...messages, newMessage]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        }
    }, [messages]);
    
    

    return (
        <div className="chat">
            {console.log("inCHat")}
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>{currentRoomState.name}</h3>
                    <p>Last seen</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>

                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (
                    (message.name === email) ? (
                        <p key={message._id}
                        
                        className={`chat__message `} 
                        > 
                        <span className="chat__name"> {message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {message.timestamp}    
                        </span>    
                    
                        </p>
                    ): (
                        <p key={message._id} className="chat__message chat__receiver"> 
                            <span className="chat__name"> {message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">
                                {new Date().toUTCString()}    
                            </span>    
                        
                        </p>
                        
                    )
                ))}

            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
                <form>
                    <input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Type a message" type="text"/>
                    <button type="submit" onClick={sendMessage} >Type a message</button>
                </form>
                <IconButton>
                    <MicIcon/>
                </IconButton>
                
            </div>
        </div>
    )
}

export default Chat
