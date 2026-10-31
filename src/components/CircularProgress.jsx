
import '../css/DarkMode.css'




const CircularProgress = function( {percentage} ){

    const radius = 20
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) 
    * circumference


    return (
        <>
            <svg width="50" height="50" viewBox="0 0 50 50">
           

            <circle
                cx="25"
                cy="25"
                r={radius}
                fill="none"
                stroke="#e8e8f3"
                strokeWidth="4"
                color = "black"
            />

        <circle

                cx="25"
                cy="25"
                r={radius}
                fill="transparent"
                
                stroke="rgba(0, 196, 204, 1)"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{
                    transition: 'stroke-dashoffset 0.5s ease',
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center'
                }}
            />

            <text className = 'circular-text'
                x="25"
                y="25"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="12"
                fontWeight="600"
            >
                {percentage}%
            </text>

        </svg>

        </>
    )}

export default CircularProgress 