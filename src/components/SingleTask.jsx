import '../css/TaskAdd.css'
import '../css/singleTaskModal.css'
import { useNavigate } from 'react-router-dom'
import CircularProgress from './CircularProgress'
import { ProjectContext } from '../context/ProjectContext'
import { useContext, useState } from 'react'

const SingleTask = function({ name, category, handleDel, id }) {
    const { editProjectName, projects } = useContext(ProjectContext)
    const navigate = useNavigate()
    const project = projects.find((proj) => String(proj.id) === String(id))
    const tasks = project?.task ?? []
    const completed = project?.completed ?? []
    const totalCount = tasks.length + completed.length
    const percentageCount = totalCount === 0 ? 0 : Math.round((completed.length / totalCount) * 100)
    const [newName, setNewName] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastLoader, setToastLoader] = useState(0)
    const handleEdit = function(e) {
        e.preventDefault()
        if (newName.trim() === '') return
        editProjectName(id, newName.trim())
        setNewName(''); setShowModal(false); setToastLoader((prev) => prev + 1); setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
    }
    return <>
        <article className="singleTask tn-project-card" onClick={() => navigate(`/project/${id}`)}>
            <div className="tn-project-card-top"><span className="tn-category-pill">{category || 'General'}</span><button className="pencil-icon tn-edit-project" aria-label="Edit project name" onClick={(e) => { e.stopPropagation(); setShowModal(true) }}>✎</button></div>
            <h3>{name}</h3>
            <div className="tn-project-progress"><div className="tn-progress-copy"><span>Completion</span><strong>{percentageCount}%</strong></div><div className="tn-progress-track"><span style={{ width: `${percentageCount}%` }} /></div></div>
            <div className="tn-project-card-bottom"><span>{completed.length} of {totalCount} tasks done</span><button className="tn-open-project" onClick={(e) => { e.stopPropagation(); navigate(`/project/${id}`) }}>Open project <span>↗</span></button></div>
            <button className="tn-delete-project" aria-label="Delete project" title="Delete project" onClick={(e) => { e.stopPropagation(); handleDel(id) }}>×</button>
        </article>
        <div className="singleTask-backdrop tn-edit-backdrop" onClick={() => setShowModal(false)} style={{ display: showModal ? 'flex' : 'none' }} />
        <form className="singleTask-modal tn-edit-modal" onSubmit={handleEdit} style={{ display: showModal ? 'flex' : 'none' }}>
            <h3>Rename project</h3><input autoFocus type="text" placeholder="Enter project name" value={newName} onChange={(e) => setNewName(e.target.value)} /><div><button type="button" onClick={() => setShowModal(false)}>Cancel</button><button type="submit">Save changes</button></div>
        </form>
        <div className="toast" style={{ display: showToast ? 'flex' : 'none' }}><p>Project name updated.</p><div className="toastLoader" key={toastLoader}></div></div>
        <div className="toastBackdrop" style={{ display: showToast ? 'flex' : 'none' }} onClick={() => setShowToast(false)} />
    </>
}
export default SingleTask
