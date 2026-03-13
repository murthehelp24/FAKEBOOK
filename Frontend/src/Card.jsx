import React from 'react'

const Card = () => {
  return (
    <div>
            <div className="hover-3d">
        {/* content */}
        <figure className="w-60 rounded-2xl">
          <img src="https://img.daisyui.com/images/stock/card-2.webp?x" alt="Tailwind CSS 3D hover" />
        </figure>
        {/* 8 empty divs needed for the 3D effect */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Card