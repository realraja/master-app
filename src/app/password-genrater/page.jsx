import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      password genrater

      <div>
        <Link className='p-5 m-5 bg-rose-500' href={'/password-genrater/checkicons'}>check here</Link>
      </div>
    </div>
  )
}

export default page
