import React from 'react'
import topArrow from '../img/uparrow.png'

const handleScrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function ScrollTop() {
    return (
        <div>
            <img src={topArrow} onClick={handleScrollTop} className="scrollTop" alt="Scroll to top button" />
        </div>
    )
}

export default ScrollTop
