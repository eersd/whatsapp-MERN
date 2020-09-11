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
//import { useStateValue } from './StateProvider';


function App() {

  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [user, setUser] = useState(null);
  //const [rooms, setRooms] = useState('Dev Room');

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
    axios.get('/rooms').then((response) => {

      console.log("roooms",response.data);
      setRooms(response.data);
    });
  }, []);

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
      
    {user && currentRoom ? (
      
      <div className="app__inner">

        <div className="app__body">
          <Router>
            <Sidebar email={user.email} rooms={rooms}/>
            <Switch>
              <Route path="/rooms/:roomId">
                {console.log("app currentRoom",currentRoom.name)}
                <Chat email={user.email} currentRoomObject={currentRoom}/>
                {/**
              <Chat email={user.email} currentRoom={currentRoom.name}/>
               */}
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
