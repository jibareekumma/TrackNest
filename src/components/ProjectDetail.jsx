import { useParams, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import '../css/ProjectDetails.css'
import { db } from '../config/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext/index.jsx'

const ProjectDetail = function() {
    const { id } = useParams()
    const { projects } = useContext(ProjectContext)
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const [taskName, setTaskName] = useState('')
    const [task, setTask] = useState([])
    const [completed, setCompleted] = useState([])
    const [saving, setSaving] = useState(false)
    const project = projects.find((proj) => String(proj.id) === String(id))

    useEffect(() => {
        if (project) {
            setTask(project.task ?? [])
            setCompleted(project.completed ?? [])
        }
    }, [project])

    const saveToFirestore = async function(updatedTasks, updatedCompleted) {
        if (!currentUser) return
        setSaving(true)
        try {
            await updateDoc(doc(db, 'users', currentUser.uid, 'projects', id), {
                task: updatedTasks,
                completed: updatedCompleted
            })
        } finally { setSaving(false) }
    }

    if (!project) return <main className="tn-project-not-found"><h2>Project not found</h2><button onClick={() => navigate('/taskadd')}>Back to dashboard</button></main>

    const handleClick = function() {
        if (!taskName.trim()) return
        const updatedTasks = [...task, taskName.trim()]
        setTask(updatedTasks); setTaskName(''); saveToFirestore(updatedTasks, completed)
    }
    const handleTaskDel = function(index) {
        const updatedTasks = task.filter((_, n) => n !== index)
        setTask(updatedTasks); saveToFirestore(updatedTasks, completed)
    }
    const handleCompletedDel = function(index) {
        const updatedCompleted = completed.filter((_, i) => i !== index)
        setCompleted(updatedCompleted); saveToFirestore(task, updatedCompleted)
    }
    const handleComplete = function(index) {
        const updatedTasks = task.filter((_, i) => i !== index)
        const updatedCompleted = [...completed, task[index]]
        setTask(updatedTasks); setCompleted(updatedCompleted); saveToFirestore(updatedTasks, updatedCompleted)
    }
    const totalCount = task.length + completed.length
    const percentageCount = totalCount === 0 ? 0 : Math.round((completed.length / totalCount) * 100)

    return <main className="project-details tn-project-detail">
        <header className="tn-detail-topbar"><button className="tn-back-button" onClick={() => navigate(-1)}>← <span>Dashboard</span></button><span className="tn-saving-indicator">{saving ? 'Saving changes…' : 'All changes saved'}</span></header>
        <section className="tn-detail-hero">
            <div><span className="tn-eyebrow">{project.category || 'PROJECT'} / OVERVIEW</span><h1>{project.name}</h1><p>Keep your momentum. Every completed task moves this project forward.</p></div>
            <div className="tn-detail-progress"><div className="tn-detail-progress-number">{percentageCount}<small>%</small></div><span>PROJECT COMPLETE</span><div className="tn-progress-track"><span style={{ width: `${percentageCount}%` }} /></div></div>
        </section>
        <section className="tn-task-workspace">
            <div className="tn-task-column">
                <div className="tn-task-section-heading"><div><span className="tn-eyebrow">THE NEXT STEPS</span><h2>Tasks to do <span>{task.length}</span></h2></div></div>
                <form className="task-form tn-add-task-form" onSubmit={(e) => { e.preventDefault(); handleClick() }}><input type="text" placeholder="What needs to get done?" value={taskName} onChange={(e) => setTaskName(e.target.value)} /><button type="submit" disabled={!taskName.trim()}>＋ Add task</button></form>
                <div className="taskContainer tn-task-list">
                    {task.length ? task.map((item, index) => <div className="task tn-task-row" key={`${item}-${index}`}><label><input type="checkbox" onChange={() => handleComplete(index)} /><span className="tn-custom-check"></span><p>{item}</p></label><button aria-label="Delete task" onClick={() => handleTaskDel(index)}>×</button></div>) : <div className="tn-task-empty"><span>✳</span><strong>Nothing on your list yet</strong><p>Add a task above and start building momentum.</p></div>}
                </div>
            </div>
            <aside className="completedSection tn-completed-panel"><div className="tn-task-section-heading"><div><span className="tn-eyebrow">LOOK WHAT YOU DID</span><h2>Completed <span>{completed.length}</span></h2></div><span className="tn-completed-check">✓</span></div>
                <div className="completedContainer tn-completed-list">{completed.length ? completed.map((item, index) => <div className="completedTask tn-completed-row" key={`${item}-${index}`}><div className="taskName"><span className="tn-done-check">✓</span><p>{item}</p></div><button aria-label="Delete completed task" onClick={() => handleCompletedDel(index)}>×</button></div>) : <div className="tn-completed-empty">Your finished tasks will collect here. Keep going.</div>}</div>
                <div className="tn-completion-note"><strong>{percentageCount}%</strong><span>of this project completed</span></div>
            </aside>
        </section>
    </main>
}
export default ProjectDetail
