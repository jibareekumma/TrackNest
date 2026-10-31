
import '../css/TaskAdd.css'
import { useState, useContext } from 'react';
import '../css/Modal.css'
import "../css/DarkMode.css"

import SingleTask from './SingleTask';
import Header from './Header';
import EntireTask from './EntireTask';
import RecentHeader from './RecentHeader';

import { ProjectContext } from '../context/ProjectContext';
import SearchFeature from './SearchFeature';
import PercentageSort from '../utilities/PercentageSort'


const TaskAdd = function () {
    const [showModal, setShowModal] = useState(false);
    const { projects, handleDel, cancelAll, handleCreate }
    = useContext(ProjectContext)
    const [project, setProject] = useState('') 
    const [category, setCategory] = useState('')

    const [showToast, setShowToast] = useState(false)
    const [toastLoader, setToastLoader] = useState(0)

    const handleSubmit = function(){ 
    handleCreate(project, category)
    setProject('')
    setCategory('')
    setShowModal(false)

    setShowToast(true)
    setToastLoader((prev) => prev + 1)

    setTimeout(function(){
        setShowToast(false)  
    }, 2000)

}


    const modalDisplay = function () {
        setShowModal(true);
    };

    const closeModal = function () {
        setShowModal(false);
    };



    return <div className="tn-app-shell">
        <Header cancelAll={cancelAll} />
        <main className="tn-dashboard">
            <div className="tn-dashboard-intro">
                <div>
                    <span className="tn-eyebrow">YOUR WORKSPACE</span>
                    <h1>Make progress <em>visible.</em></h1>
                    <p>Keep your projects moving, one focused task at a time.</p>
                </div>
                <button className="tn-primary-btn" onClick={modalDisplay}>
                    <span>＋</span> New project
                </button>
            </div>

            <div className="tn-overview-grid">
                <article className="tn-overview-card tn-overview-main">
                    <div className="tn-overview-icon">↗</div>
                    <div><span>Active projects</span><strong>{projects.length}</strong><small>Projects in your workspace</small></div>
                </article>
                <article className="tn-overview-card">
                    <div className="tn-overview-icon tn-icon-complete">✓</div>
                    <div><span>Tasks in motion</span><strong>{projects.reduce((sum, item) => sum + (item.task?.length || 0), 0)}</strong><small>Tasks still to complete</small></div>
                </article>
                <article className="tn-overview-card">
                    <div className="tn-overview-icon tn-icon-focus">◎</div>
                    <div><span>Tasks completed</span><strong>{projects.reduce((sum, item) => sum + (item.completed?.length || 0), 0)}</strong><small>Small wins add up</small></div>
                </article>
            </div>

            <div className="tn-section-heading">
                <div><span className="tn-eyebrow">AT A GLANCE</span><h2>Your projects</h2></div>
                <span className="tn-section-count">{projects.length} {projects.length === 1 ? 'project' : 'projects'}</span>
            </div>
            <SearchFeature />
            <div className="first-page-task-container tn-project-grid">
                {[...projects].sort((a, b) => PercentageSort(b.id) - PercentageSort(a.id)).slice(0, 6).map((proj) => (
                    <SingleTask key={proj.id} name={proj.name} category={proj.category} id={proj.id} handleDel={handleDel} />
                ))}
                <button className="addTask tn-add-project" onClick={modalDisplay}>
                    <span className="tn-add-symbol">＋</span><strong>Create a project</strong><small>Give your next idea a place to grow.</small>
                </button>
            </div>

            <div className="tn-recent-section">
                <RecentHeader />
                <div className="tn-recent-grid">
                    {[...projects].sort((a, b) => PercentageSort(b.id) - PercentageSort(a.id)).slice(0, 4).map((proj) => (
                        <EntireTask key={proj.id} name={proj.name} category={proj.category} id={proj.id} handleDel={handleDel} />
                    ))}
                </div>
            </div>
        </main>

        <div className="modalWindow tn-modal" style={{ display: showModal ? 'flex' : 'none' }}>
            <div className="tn-modal-heading"><div><span className="tn-eyebrow">START SOMETHING NEW</span><h3>Create a project</h3><p>Set up a space for the work you want to move forward.</p></div>
                <button type="button" className="btnClose" aria-label="Close" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); if (project.trim() && category) handleSubmit(); }}>
                <label htmlFor="project-name">Project name</label>
                <input type="text" id="project-name" placeholder="e.g. Launch my portfolio" value={project} onChange={(e) => setProject(e.target.value)} required />
                <label htmlFor="project-category">Category</label>
                <select name="category" id="project-category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Choose a category</option><option value="Work">Work</option><option value="Health">Health</option><option value="Personal">Personal</option><option value="Learning">Learning</option><option value="Finance">Finance</option><option value="Creative">Creative</option><option value="Home">Home</option><option value="Development">Development</option><option value="Research">Research</option><option value="Other">Other</option>
                </select>
                <button type="submit" className="tn-primary-btn">Create project <span>→</span></button>
            </form>
        </div>
        <div className="backdrop" style={{ display: showModal ? 'flex' : 'none' }} onClick={closeModal}></div>
        <div className="toast" style={{ display: showToast ? 'flex' : 'none' }}><p>Your project has been added successfully.</p><div className="toastLoader" key={toastLoader}></div></div>
        <div className="toastBackdrop" style={{ display: showToast ? 'flex' : 'none' }} onClick={() => setShowToast(false)}></div>
    </div>
}

export default TaskAdd
