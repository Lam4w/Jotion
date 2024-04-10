"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const error = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image 
        src="/error.png"
        height='300'
        width='300'
        alt='error'
        className='dark:hidden'
      />
      <Image 
        src="/error-dash.png"
        height='300'
        width='300'
        alt='error'
        className='dark:block hidden'
      />

      <h2 className='text-xl font-medium'>Something went wrong</h2>

      <Button asChild>
        <Link href='/document'>
          Go back
        </Link>
      </Button>
    </div>
  )
}

export default error