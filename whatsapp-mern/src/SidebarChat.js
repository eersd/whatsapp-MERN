import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import axios from './axios';
import { Link } from 'react-router-dom';

function SidebarChat({id,roomName,addNewChat}) {

    const [messageLatest,setMessageLatest] = useState([]);
    console.log("inSidebarChat1");
        
    const createChat = async(e) => {
        e.preventDefault();

        const roomNamePrompt = prompt("Please enter name for chat");
        
        await axios.post('/rooms/new', {
            name: roomNamePrompt
        });
        

        await axios.post('/messages/new', {
            "room": roomNamePrompt,
            "message": "You have joined this room",
            "name": "Admin",
            "timestamp": new Date().toUTCString(),
            "received": false
        });


    };

    useEffect(()=> {
        axios.get('/messages/one',{params: {"room": roomName}}).then((response) => {
            setMessageLatest(response.data);
            console.log("get one newest message per room ,",response.data);
        });
    },[]);

    return !addNewChat ?(
        
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar/>
                <div className="sidebarChat__info">
                    <h2>{roomName}</h2>
                    <p>{messageLatest.message}</p>

                </div>
            </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebarChat">
            <div className="sidebarChat__info">
                <h2>Add new Chat</h2>
            </div>
        </div>
    );
    
}

export default SidebarChat;
