import Register from "./Register"
import "../css/Login.css"
import { useNavigate, Navigate } from "react-router-dom"
import {doSignInWithEmailAndPassword, doSignInWithGoogle} 
from "../config/auth.js"
import { useAuth } from "../context/AuthContext/index.jsx"
import { useState } from "react"


const Login = function(){

    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSIgningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!isSigningIn){
            setIsSIgningIn(true)
            try {
                await doSignInWithEmailAndPassword(email, password)
            } catch (err) {
                setErrorMessage(err.message)
                setIsSIgningIn(false)
            }
        }
    }

    const onGoogleSignIn = async (e)=> {
        e.preventDefault()

        if(!isSigningIn){
            setIsSIgningIn(true)
            try {
                await doSignInWithGoogle()
            } catch (err) {
                setErrorMessage(err.message)
                setIsSIgningIn(false)
            }
        }
    }

    return <>

    {userLoggedIn && <Navigate to="/taskadd" replace={true} />}

       <div className = "login-body">

        <div className = 'login-container'>
            <header>
                <h2>TrackNest</h2>
            </header>

            <form id="login-form">

                <div id = 'inputz-container'>
                    <div className = 'icon-container'>
                    <img src="icons/envelope-regular-full.svg"/>
                    </div>
                <input type="email" 
                placeholder = "Enter your email" 
                title = 'Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                <div id = 'inputz-container'>
                    <div className = 'icon-container'>
                    <img src="icons/lock icon main.png"/>
                    </div>
                <input type="password" 
                placeholder = "Enter your password" 
                title = 'Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                </div>

            </form>

            {errorMessage && <p style={{color: 'red', fontSize: '0.85rem'}}>{errorMessage}</p>}

            <div className = "action-container">

                <button onClick={handleSubmit} disabled={isSigningIn}>
                    {isSigningIn ? "Signing in..." : "SIGN IN"}
                </button>
                <a href="google.com">
                    Forgot your password?
                </a>
                <p>Or</p>
            </div>

            <div className = 'auth-options'>
                <div id = 'google-auth' className="auth" onClick={onGoogleSignIn}>
                    <img src="icons/google auth.png" 
                    alt="Google logo" />
                    <p>Sign in with Google</p>
                </div>

                <div id = 'github-auth' className="auth">
                    <img src="icons/github auth.png" 
                    alt="Github logo" id = 'github-auth-img' />
                    <p>Sign in with Github</p>
                </div>
                <p>Don't have an account? <a  
                onClick = {() => navigate("/register")}
                >Sign Up</a></p>
            </div>

        </div>



        <div className="login-image-panel">
            <img src="icons/security lock.png" 
            alt="Lock Image" />
        </div>
       </div>

    </>
}

export default Login