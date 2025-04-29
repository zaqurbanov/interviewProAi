import { isAuthanticated } from '@/lib/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const RootLayout = async ({children}:{children:ReactNode}) => {
    const isUserAuthanticated = await isAuthanticated()
    if(!isUserAuthanticated) redirect("/sign-in")
    
  return (
    <div className='root-layout '>

        <nav>
          <Link href="/"   className='flex items-center gap-2'>

            <Image src={"/logo.svg"} alt='Logo' width={50} height={50} className='w-auto h-auto'  />
            <h2 className='text-primary-200'>PrepAi</h2>
          </Link>
        </nav>

      {children}
    </div>
  )
}

export default RootLayout
