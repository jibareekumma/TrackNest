

const PercentageSort = function(id) {
    const saved = localStorage.getItem(`tasks-${id}`)
    const savedCompleted = localStorage.getItem(`completed-${id}`)
    const tasks = saved ? JSON.parse(saved) : []
    const completed = savedCompleted ? JSON.parse(savedCompleted) : []
    const total = tasks.length + completed.length
    return total === 0 ? 0 : Math.round((completed.length / total) * 100)
}

export default PercentageSort