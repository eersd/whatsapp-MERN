import React, { useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from "./axios";

function Chat({messages,email}) {

    const [input, setInput] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            "message": input,
            "name": email,
            "timestamp": "Just now",
            "received": false,
        });

        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
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
                    <p key={message._id}
                        
                        className={`chat__message ${message.received && "chat__receiver"}`} 
                    > 
                        <span className="chat__name"> {message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {message.timestamp}    
                        </span>    
                    
                    </p>

                ))};
                

                <p className="chat__message chat__receiver"> 
                    <span className="chat__name"> User2</span>
                    This is a very very long message
                    <span className="chat__timestamp">
                        {new Date().toUTCString()}    
                    </span>    
                
                </p>


            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text"/>
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
