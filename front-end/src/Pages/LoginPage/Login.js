import React, { Component, useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import API from '../../../api/index'
import "./Login.scss";

const LoginPage = () => {
    var [active, setActive] = useState(true);
    var [registerPassword, setRegisterPassword] = useState("");
    var [registerUsername, setRegisterUsername] = useState("");
    var [loginPassword, setLoginPassword] = useState("");
    var [loginUsername, setLoginUsername] = useState("");
    var [errorMessage, setErrorMessage] = useState("");
  
    let history = useHistory();
  
    const register = async (e) => {
      e.preventDefault();
      await API.Users.Register.post(registerUsername, registerPassword).then((res) => {
        if(res["data"] == "User successfully created"){
          window.localStorage.setItem('username', registerUsername);
          history.push('/home')
        }
        else{
          setErrorMessage("Username already exists")
        }
      })
    };
  
    const login = async (e) => {
      e.preventDefault();
      await API.Users.Login.post(loginUsername, loginPassword).then((res) => {
        if(res["data"] == "User logged in"){
          window.localStorage.setItem('username', loginUsername);
          history.push('/home')
        }
        else{
          setErrorMessage("Username or password incorrect")
        }
      })
    };

    return (
      <div id="LoginPage">
        <div className="main-body">
          <div className={active ? "cont" : "cont s-signup"}>
              <div className="form sign-in">
                <h1>Sign In</h1>
                <form onSubmit={(e) => login(e)}>
                  <div>
                    <label>
                      <span>Username</span>
                      <input
                        className="username"
                        type="text"
                        name="username"
                        onChange={(e) => {
                          setLoginUsername(e.target.value);
                        }}
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      <span>Password</span>
                      <input
                        className="password"
                        type="password"
                        name="password"
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  </div>
                  <div>
                    <button className="submit" type="submit">
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            <div className="sub-cont">
              <div className="img">
                <div className="img-text m-up">
                  <h2>New here?</h2>
                  <p>
                    Login to access your stock portfolio
                  </p>
                </div>
                <div className="img-text m-in">
                  <h2>One of us?</h2>
                  <p>
                    If you already has an account, just sign in. 
                  </p>
                </div>
                <div onClick={() => setActive(!active)} className="img-btn">
                  <span className="m-up">Sign Up</span>
                  <span className="m-in">Sign In</span>
                </div>
              </div>
              <div className="form sign-up">
                <h1>Sign Up</h1>
                <form onSubmit={(e) => register(e)}>
                  <div>
                    <label>
                      <span>Username</span>
                      <input
                        type="text"
                        onChange={(e) => setRegisterUsername(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      <span>Password</span>
                      <input
                        type="password"
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <div>
                  <p style={{ color: "red" }}>{errorMessage}</p>
  
                  </div>
                  <div>
                    <button type="submit" className="submit">
                      Sign Up Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default LoginPage