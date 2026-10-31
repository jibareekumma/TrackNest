import { useAuth } from "../context/AuthContext/index.jsx"
import "../css/Header.css"
import "../css/DarkMode.css"
import DarkMode from "./DarkMode"
import { doSignOut } from '../config/auth.js'
import { useNavigate } from "react-router-dom"

const Header = function({ cancelAll }) {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const username = currentUser?.displayName?.split(' ')[0] || currentUser?.email?.split('@')[0] || 'there'
    return <header className="first-page-header tn-topbar">
        <div className="tn-brand"><span className="tn-brand-mark">t.</span><span>tracknest</span></div>
        <div className="tn-topbar-center"><span className="tn-live-dot"></span> Your personal project space</div>
        <div className="tn-topbar-actions"><div className="tn-user-meta"><strong>{username}</strong><span>{today}</span></div><DarkMode /><button className="tn-signout" onClick={() => doSignOut().then(() => navigate('/login'))}>Sign out</button></div>
    </header>
}
export default Header
