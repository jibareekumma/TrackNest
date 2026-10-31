import { createContext, useState, useEffect } from "react"
import { db } from "../config/firebase"
import { useAuth } from "./AuthContext/index.jsx"
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
    query,
    orderBy
} from "firebase/firestore"

export const ProjectContext = createContext()

export const ProjectProvider = function({ children }){

    const { currentUser } = useAuth()
    const [projects, setProjects] = useState([])

    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved === 'true'
    })

    // ── Dark mode effect ──
    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [isDark])

    const toggleDark = function() {
        setIsDark((prev) => {
            localStorage.setItem('darkMode', !prev)
            return !prev
        })
    }

    // ── Listen to Firestore in real time ──
    useEffect(() => {

        if (!currentUser) {
            setProjects([])
            return
        }

        const projectsRef = collection(db, "users", currentUser.uid, "projects")
        const q = query(projectsRef, orderBy("createdAt", "desc"))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id       
            }))
            setProjects(fetched)
        })

        return unsubscribe   
    }, [currentUser])

    // ── Create project ──
    const handleCreate = async function(project, category) {
        if (!currentUser) return

        const projectsRef = collection(db, "users", currentUser.uid, "projects")
        await addDoc(projectsRef, {
            name: project,
            category: category,
            task: [],
            createdAt: Date.now()
        })
    }

    // ── Delete project ──
    const handleDel = async function(id) {
        if (!currentUser) return

        const projectDoc = doc(db, "users", currentUser.uid, "projects", id)
        await deleteDoc(projectDoc)
    }

    // ── Delete all projects ──
    const cancelAll = async function() {
        if (!currentUser) return

        const deletePromises = projects.map((proj) => {
            const projectDoc = doc(db, "users", currentUser.uid, "projects", proj.id)
            return deleteDoc(projectDoc)
        })
        await Promise.all(deletePromises)
    }

    // ── Edit project name ──
    const editProjectName = async function(id, newName) {
        if (!currentUser) return

        const projectDoc = doc(db, "users", currentUser.uid, "projects", id)
        await updateDoc(projectDoc, { name: newName })
    }

    return (
        <ProjectContext.Provider value={{
            projects,
            setProjects,
            handleDel,
            cancelAll,
            handleCreate,
            editProjectName,
            isDark,
            toggleDark
        }}>
            {children}
        </ProjectContext.Provider>
    )
}