import React, { useContext, useEffect, useRef, useState } from 'react';

const defaultInfoBlockGroup = {
    title: "",
    id: "",
}

const InfoBlockGroupContext = React.createContext()

export const InfoSlider = ({className="", subsections="", ...props})=>{
  className = "slider-block" + className

  return (
    <div className={className}>
      <div className='slider-container'>
        <div className='slider'>

        </div>
      </div>
    </div>
  )
}

export const InfoBlock = ({className="", subsections="", ...props})=>{
  className = "slider-block" + className
  
  return (
    <div className={className}>
      <div className='slider-container'>
        <div className='slider'>

        </div>
      </div>
    </div>
  )
}
