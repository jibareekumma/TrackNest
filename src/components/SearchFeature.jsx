import '../css/SearchFeature.css'
import '../css/DarkMode.css'
import { useState, useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import { useNavigate } from 'react-router-dom'


const SearchFeature = function(){
    const { projects } = useContext(ProjectContext)
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const filtered = projects.filter((proj) =>
        proj.name.toLowerCase().startsWith(query.toLowerCase())
    )

    const showSuggestions = query.trim() !== ''

      const handleSelect = function(id) {
        navigate(`/project/${id}`)  // goes to that project
        setQuery('')                // clears the search
    }

    return <>
    
        <div className='search-wrapper tn-search-wrap'>
    <form className='search-container tn-search'
    onSubmit = {(e) => e.preventDefault()}
    >
        <input type="text" 
        placeholder='Search projects by name...'
        value = {query}
        onChange = {(e) => setQuery(e.target.value)}
        />
        <button
        title = 'search here'
        >
            <img src="icons/search icon.png" alt="Search Icon"
            
            />
        </button>
    </form>

    

    {showSuggestions && (
                <div className='suggestions'>
                    {filtered.length > 0 ? (
                        filtered.map((proj) => (
                            <div 
                                className='suggestion-item'
                                key={proj.id}
                                onClick={() => handleSelect(proj.id)}
                            >
                                <p>{proj.name}</p>
                                <span>{proj.category}</span>
                            </div>
                        ))
                    ) : (
                        // no matches found
                        <div className='suggestion-item'>
                            <p>No project found</p>
                        </div>
                    )}
                </div>
            )}
            </div>
           
    </>
}


export default SearchFeature