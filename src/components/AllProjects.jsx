import EntireTask from './EntireTask'
import { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import { useNavigate } from 'react-router-dom'
import SearchFeature from './SearchFeature'
import '../css/EntireTask.css'

const AllProjects = function() {
    const { projects, handleDel, cancelAll } = useContext(ProjectContext)
    const navigate = useNavigate()
    const sortedProjects = [...projects].sort((a, b) => b.createdAt - a.createdAt)
    return <main className="allProjects tn-all-projects">
        <header className="tn-all-heading"><button onClick={() => navigate(-1)} aria-label="Go back">←</button><div><span className="tn-eyebrow">YOUR WORKSPACE</span><h1>All projects</h1><p>Every idea, plan and work in progress.</p></div><button className="tn-clear-all" onClick={cancelAll}>Clear all</button></header>
        <SearchFeature />
        <div className="tn-all-project-grid">{sortedProjects.map((proj) => <EntireTask key={proj.id} name={proj.name} category={proj.category} id={proj.id} handleDel={handleDel} />)}</div>
        {projects.length === 0 && <div className="tn-empty-state"><span>✳</span><h2>Your next project starts here.</h2><p>Create a project from your dashboard and your work will show up here.</p><button onClick={() => navigate('/taskadd')}>Back to dashboard</button></div>}
    </main>
}
export default AllProjects
