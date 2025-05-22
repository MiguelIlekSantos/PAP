import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  title: string
  img: string
  url: string
}

export const OptBtn = (props: Props) => {
  return (
    <Link href={props.url}>
      <div className="w-28 lg:w-40 lg:min-h-40 bg-white/10 border border-white/20 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 hover:scale-95 active:scale-90 cursor-pointer flex items-center justify-center flex-col p-4 backdrop-blur-sm">
        <Image
          src={props.img}
          alt="icon"
          width={50}
          height={50}
          className="mb-2"
        />
        <p className="text-white text-sm lg:text-base font-medium text-center">{props.title}</p>
      </div>
    </Link>
  )
}
