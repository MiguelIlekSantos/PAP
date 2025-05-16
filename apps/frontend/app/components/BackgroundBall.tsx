// import React from 'react'

export const BackgroundBall = () => {

  const delay = (Math.random() * 19 + 1).toFixed(2) + 's'

  return (
    <>
      <div className="opacity-0 relative -z-[1] w-80 h-40 bg-[rgba(255,255,255,0.4)] rounded-full animate-fall-45"
        style={{ animationDelay: delay }}
      ></div>
    </>
  )
}
