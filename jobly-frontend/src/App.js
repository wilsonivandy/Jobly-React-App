import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import UserContext from './auth/UserContext';
import useLocalStorage from "./hooks/useLocalStorage";
import { BrowserRouter } from 'react-router-dom';
import JoblyApi from "./api";

import Routes from './routes/Routes'
import NavBar from './routes/NavBar'
import jwt from "jsonwebtoken";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

export const TOKEN_LOCAL_STORAGE = "joblyToken";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_LOCAL_STORAGE);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  // useEffect(function loadInfo() {
  //   async function getCurrentUser() {
  //     if (token) {
  //       try {
  //         let { username } = jwt.decode(token)
  //         JoblyApi.token = token;
  //         let currentUser = await JoblyApi.getCurrentUser(username);
  //         setCurrentUser(currentUser);
  //         console.log('set current user to:');
  //         console.log(currentUser);
  //         setApplicationIds(new Set(currentUser.applications))
  //       } catch {
  //         setCurrentUser(null);
  //       }
  //     }
  //     setInfoLoad(true);
  //   }
  //   setInfoLoad(false);
  //   getCurrentUser();
  // }, [token])

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    getCurrentUser();
  }, [token]);


  async function signUp(signupData) {
    try {
      let token = await JoblyApi.signUp(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
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
    setCurrentUser(null);
    setToken(null);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider
          value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <NavBar logout={logout} />
          <Routes login={login} signUp={signUp} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
