import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import axios from './axios';
import Login from './Login.js';
import { auth } from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Pusher from 'pusher-js';


function App() {

  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/rooms').then((response) => {

      console.log("roooms",response.data);
      setRooms(response.data);
    });
  }, []);

  useEffect(() => {

    const pusher = new Pusher('a692f130cf06402ee20f', {
        cluster: 'eu'
    });

    console.log("pusher pushed");
    const channel = pusher.subscribe("rooms");
    channel.bind('inserted', (newRoom) => {
        setRooms([...rooms, newRoom]);
    });

    return () => {
        channel.unbind_all();
        channel.unsubscribe();
    }
}, [rooms]);

  useEffect(() => {
		axios.get('/rooms/first').then((response) => {
      setCurrentRoom(response.data);
      console.log("room,",response.data);
		});
	}, []);

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
      {console.log("roomsValidation :" , rooms)}
      {console.log("current Room in App : ", currentRoom)}
      
      {user && currentRoom ? (
        
        
        <div className="app__inner">

          <div className="app__body">
            <Router>
              <Sidebar email={user.email} rooms={rooms}/>
              <Switch>
                <Route path="/rooms/:roomId">
                  {console.log("app first",currentRoom.name)}
                  <Chat email={user.email} currentRoomObject={currentRoom}/>
                </Route>
                <Route path="/">
                  <Chat email={user.email} currentRoomObject={currentRoom}/>
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
