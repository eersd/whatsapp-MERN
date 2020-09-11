import React from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import axios from './axios';
import { Link } from 'react-router-dom';

function SidebarChat({id,roomName,addNewChat}) {

    console.log("inSidebarChat1");
        
    const createChat = async(e) => {
        e.preventDefault();
        const roomName = prompt("Please enter name for chat");

        await axios.post('/messages/new', {
            room: roomName,
        });

    };
    
    return !addNewChat ?(
        
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar/>
                <div className="sidebarChat__info">
                    <h2>{roomName}</h2>
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
    
        /*
        <div className="sidebarChat">
             <Avatar />
             <div className="sidebarChat__info">
                 <h2>{}</h2>
                 <p>This is the last message</p>
             </div>
        </div>
        */
    
}

export default SidebarChat;
