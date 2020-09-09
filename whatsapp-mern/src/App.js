import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';
import Login from './Login.js';
import { auth } from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  //const [rooms, setRooms] = useState('Dev Room');
  const [roomsMessage,setRoomsMessage] = useState('');
  const room = 'Dev Room';

  /*
  getRooms = () => {
    axios.get("/rooms")
      .then((response) => {
        const data = response.data;
        this.setState({rooms: data});
        console.log('Data received');
      })
  }
  */

  useEffect(() => {
    //axios.get("/rooms").then((response) => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  });

  useEffect(() => {
    const pusher = new Pusher('a92d915a7c10ae780982', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe("messages");
    channel.bind('inserted', (newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);


  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //user logged in
        setUser(authUser);
      }else{
        //user logged out
        setUser(null);
      }

    })
  }, [user]);

  return (
    <div className="app">
      
    {user ? (
      <div className="app__inner">

        <div className="app__body">
          <Router>

            <Sidebar email={user.email} messages={messages}/>
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat messages={messages} email={user.email} room={room}/>
              </Route>
              <Route path="/">
                <Chat messages={messages} email={user.email} room={room}/>
              </Route>
            </Switch>
          </Router>

        </div>

      </div>
    ): (
      
      <Login/>
    )}

    
      
    </div>
  );
}

export default App;
