import React from 'react'
import { BackgroundBall } from './BackgroundBall'

export const BallRow = () => {

    const balls = []
    for (let i = 0; i < 20; i++) {
      balls.push(<BackgroundBall key={i} />)
    }

    return (
        <>
            <div className='absolute flex justify-around items-start'>
                {balls}
            </div>
        </>
    )
}
