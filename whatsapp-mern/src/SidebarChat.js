import React from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import axios from './axios';
import { Link } from 'react-router-dom';

function SidebarChat({id,room,addNewChat}) {

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if (roomName){
            axios.post('/messages/new', {
                "room": roomName,
                "message": "You have joined this chat room",
                "name": "Admin",
                "timestamp": "",
                "received": false,
            });
        }

    };

    return !addNewChat ?(
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat__info">
                {console.log("sidebarchat room = ", room)}
                <h2>{room}</h2>
                <p> Last message</p>

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
