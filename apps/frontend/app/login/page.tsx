import React from 'react'
import { BgLoginPage } from '../components/BgLoginPage'

export default function LoginPage() {
  return (
    <>
      <BgLoginPage />
      <div className='h-screen flex flex-col justify-center items-center'>
        <fieldset className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-2/4 xl:w-1/4 fieldset bg-base-200 border-base-300 rounded-box w-xs border p-5">
          <legend className="mt-3 fieldset-legend">Login</legend>

          <label className="mt-3 label">Email</label>
          <input type="email" className="mt-3 input w-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent" placeholder="Email" />

          <label className="mt-3 label">Password</label>
          <input type="password" className="mt-3 input w-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent" placeholder="Password" />

          <button className="btn btn-accent mt-10 transition-all duration-200+ hover:scale-105 active:bg-blue-500">Login</button>
        </fieldset>
      </div>
    </>
  )
}
