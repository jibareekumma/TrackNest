import { useNavigate } from 'react-router-dom'
import '../css/Home.css'

const Home = function() {
    const navigate = useNavigate()
    return <main className="tn-landing">
        <nav className="tn-landing-nav"><a className="tn-brand" href="/"><span className="tn-brand-mark">t.</span><span>tracknest</span></a><div><button className="tn-landing-login" onClick={() => navigate('/login')}>Log in</button><button className="tn-primary-btn" onClick={() => navigate('/register')}>Get started <span>→</span></button></div></nav>
        <section className="tn-landing-hero"><div className="tn-landing-copy"><span className="tn-eyebrow">A CLEARER WAY TO GET THINGS DONE</span><h1>Turn your plans into <em>progress.</em></h1><p>TrackNest gives every project a home, every task a next step, and every small win a place to count.</p><div className="tn-landing-actions"><button className="tn-primary-btn" onClick={() => navigate('/register')}>Create your workspace <span>→</span></button><button className="tn-landing-login" onClick={() => navigate('/login')}>I already have an account</button></div><div className="tn-landing-note"><span>✓</span> Simple project and task tracking, all in one place.</div></div>
            <div className="tn-landing-visual"><div className="tn-preview-window"><div className="tn-preview-top"><span></span><span></span><span></span><small>MY WORKSPACE</small></div><div className="tn-preview-body"><div className="tn-preview-sidebar"><b>t.</b><i></i><i></i><i></i><i></i></div><div className="tn-preview-content"><small>YOUR OVERVIEW</small><h3>Good things take progress.</h3><div className="tn-preview-stats"><div><small>Projects</small><b>03</b></div><div><small>Tasks done</small><b>12</b></div></div><div className="tn-preview-project"><div><span>WEBSITE REDESIGN</span><b>72%</b></div><i><em style={{width:'72%'}} /></i></div><div className="tn-preview-project"><div><span>LEARN PYTHON</span><b>45%</b></div><i><em style={{width:'45%'}} /></i></div><div className="tn-preview-project"><div><span>PERSONAL GOALS</span><b>28%</b></div><i><em style={{width:'28%'}} /></i></div></div></div></div><div className="tn-floating-note"><span>✓</span><div><b>One task at a time</b><small>Progress is adding up.</small></div></div></div>
        </section>
        <section className="tn-landing-bottom"><span>PLAN WITH INTENTION</span><span>TRACK YOUR MOMENTUM</span><span>CELEBRATE THE FINISH</span></section>
    </main>
}
export default Home
