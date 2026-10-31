import { Link } from 'react-router-dom'
import '../css/EntireTask.css'

const RecentHeader = function() {
    return <div className="RecentHeader"><header className="headers"><div><span className="tn-eyebrow">KEEP THE MOMENTUM</span><h5>Project activity</h5></div><Link className="seeAllBtn" to="/all-projects">View all projects →</Link></header></div>
}
export default RecentHeader
