import { useNavigate, Navigate } from "react-router-dom"
import "../css/Login.css"
import { useState } from "react"
import { docreateUserWithAndPassword, doSignInWithGoogle } from "../config/auth.js"
import { useAuth } from "../context/AuthContext/index.jsx"

const Register = function(){

    const { userLoggedIn } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setErrorMessage("Passwords do not match")
            return
        }

        if(!isRegistering){
            setIsRegistering(true)
            try {
                await docreateUserWithAndPassword(email, password, username)
            } catch (err) {
                setErrorMessage(err.message)
                setIsRegistering(false)
            }
        }
    }

    const onGoogleSignIn = async (e) => {
        e.preventDefault()

        if(!isRegistering){
            setIsRegistering(true)
            try {
                await doSignInWithGoogle()
            } catch (err) {
                setErrorMessage(err.message)
                setIsRegistering(false)
            }
        }
    }

    return<>

    {userLoggedIn && <Navigate to="/taskadd" replace={true} />}

        <div className = "login-body">

        <div className = 'login-container'>
            <header>
                <h2>TrackNest</h2>
            </header>

            <form id="login-form">


                <div id = 'inputz-container'>
                    <div className = 'icon-container'>
                    <img src="icons/username icon.png"/>
                    </div>
                <input type="name" 
                placeholder = "Enter your username" 
                title = 'Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                </div>

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
                placeholder = "Create your password" 
                title = 'Create your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                </div>

                <div id = 'inputz-container'>
                    <div className = 'icon-container'>
                    <img src="icons/lock icon main.png"/>
                    </div>
                <input type="password" 
                placeholder = "Confirm your password" 
                title = 'Confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>

            </form>

            {errorMessage && <p style={{color: 'red', fontSize: '0.85rem'}}>{errorMessage}</p>}

            <div className = "action-container">

                <button onClick={handleSubmit} disabled={isRegistering}>
                    {isRegistering ? "Creating account..." : "SIGN UP"}
                </button>
                
            </div>

            <div className = 'auth-options'>
                <div id = 'google-auth' className="auth" onClick={onGoogleSignIn}>
                    <img src="icons/google auth.png" 
                    alt="Google logo" />
                    <p>Sign up with Google</p>
                </div>

                <div id = 'github-auth' className="auth">
                    <img src="icons/github auth.png" 
                    alt="Github logo" id = 'github-auth-img' />
                    <p>Sign up with Github</p>
                </div>
                <p>Already have an account <a  
                onClick = {() => navigate("/login")}
                >Sign in</a></p>
            </div>

        </div>

        <div className="login-image-panel">
            <img src="icons/security lock.png" 
            alt="Lock Image" />
        </div>
       </div>
    </>
}

export default Register