import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import UserContext from './auth/UserContext';
import { BrowserRouter } from 'react-router-dom';
import JoblyApi from "./api";

import Routes from './routes/Routes'
import NavBar from './routes/NavBar'
import jwt from "jsonwebtoken";

import './App.css';

const INITIAL_USER_STATE = null;
const INITIAL_INFO_STATE = false;
const INITIAL_TOKEN_STATE = 0;
const INITIAL_APPLICATION_STATE = 0;


function App() {
  const [currentUser, setCurrentUser] = useState(INITIAL_USER_STATE);
  const [infoLoad, setInfoLoad] = useState(INITIAL_INFO_STATE);
  const [token, setToken] = useState(INITIAL_TOKEN_STATE);
  const [applicationIds, setApplicationIds] = useState(INITIAL_APPLICATION_STATE);

  useEffect(function loadInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token)

          JoblyApi.token = token;
          let currUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currUser);
          setApplicationIds(new Set(currUser.applications))
        } catch {
          setCurrentUser(null);
        }
      }
      setInfoLoad(true);
    }

    setInfoLoad(false);
    getCurrentUser();
  }, [token])


  async function signUp(user) {
    try {
      let token = await JoblyApi.signUp(user);
      setToken(token);
      return { success: true}
    } catch (err) {
      return { success: false, err}
    }
  }

  async function login(user) {
    try {
      let token = await JoblyApi.login(user);
      setToken(token);
      return { success: true}
    } catch (err) {
      return { success: false, err}
    }
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  function logout() {
    setCurrentUser(INITIAL_USER_STATE);
    setToken(INITIAL_TOKEN_STATE);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
              <NavBar logout={logout}></NavBar>
              <Routes login={login} signUp={signUp}></Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
