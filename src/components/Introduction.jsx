


import "../css/Introduction.css"
import { useState, useEffect } from "react"

const slides = [
    {
        emoji: "👋",
        title: "Welcome!",
        text: "Let's track your next project, and help you maintain productivity",
        img: "public/photos/bitmoji dashboard 1.png",
        alt: "Man Working on Computer"
    },
    {
        emoji: "💪",
        title: "At the gym?",
        text: null,
        boldText: "TrackNest",
        afterText: " can help you track your workouts and monitor your progress",
        img: "public/photos/bitmoji dashboard 2.png",
        alt: "Man Working on Computer"
    }
]

const Introduction = function(){

    const [active, setActive] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const current = slides[active]

    return <>
        
        <main id='bitmoji-container'>

            
            <div className='bitmoji-carousel'>
                <div className='bitmoji-container'>
                    <div className='introductory-texts'>
                        <div className='emoji'>
                            <h3>{current.emoji}</h3>
                        </div>
                        <div className='emoji-texts'>
                            <h3>{current.title}</h3>
                            {current.text ? (
                                <p>{current.text}</p>
                            ) : (
                                <p><b>{current.boldText}</b>{current.afterText}</p>
                            )}
                        </div>
                    </div>
                    <div className='bitmoji-section'>
                        <img src = '/photos/bitmoji dashboard 1.png' 
                        alt = "man working on computer"/>
                    </div>
                </div>

                
                <div className='carousel-dots'>
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`dot ${active === i ? 'dot-active' : ''}`}
                            onClick={() => setActive(i)}
                        />
                    ))}
                </div>
            </div>

            

            <div className='bitmoji-desktop'>
                {slides.map((slide, i) => (
                    <div key={i} className='bitmoji-container'>
                        <div className='introductory-texts'>
                            <div className='emoji'>
                                <h3>{slide.emoji}</h3>
                            </div>
                            <div className='emoji-texts'>
                                <h3>{slide.title}</h3>
                                {slide.text ? (
                                    <p>{slide.text}</p>
                                ) : (
                                    <p><b>{slide.boldText}</b>{slide.afterText}</p>
                                )}
                            </div>
                        </div>
                        <div className='bitmoji-section'>
                            <img src = "/photos/bitmoji dashboard 2.png" 
                            alt = "Man working out"
                            />
                        </div>
                    </div>
                ))}
            </div>

        </main>
    </>
}

export default Introduction