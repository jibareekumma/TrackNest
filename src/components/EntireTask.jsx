import '../css/EntireTask.css'
import { useNavigate } from 'react-router-dom'
import CircularProgress from './CircularProgress'
import { ProjectContext } from '../context/ProjectContext'
import { useContext } from 'react'

const EntireTask = function({ name, category, handleDel, id }) {
    const navigate = useNavigate()
    const { projects } = useContext(ProjectContext)
    const project = projects.find((proj) => String(proj.id) === String(id))
    const tasks = project?.task ?? []
    const completed = project?.completed ?? []
    const totalCount = tasks.length + completed.length
    const percentageCount = totalCount === 0 ? 0 : Math.round((completed.length / totalCount) * 100)
    return <article className="taskContainerM tn-recent-card">
        <div className="tn-recent-card-heading"><span className="tn-recent-category">{category}</span><CircularProgress percentage={percentageCount} /></div>
        <h3>{name}</h3><p className="tn-recent-task-count">{completed.length} completed <span>·</span> {tasks.length} remaining</p>
        <div className="tn-recent-card-footer"><span className="tn-mini-track"><i style={{ width: `${percentageCount}%` }} /></span><button onClick={() => navigate(`/project/${id}`)}>View project <span>→</span></button></div>
        <button className="tn-recent-delete" aria-label="Delete project" onClick={() => handleDel(id)}>×</button>
    </article>
}
export default EntireTask
