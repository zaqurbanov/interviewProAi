import { isAuthanticated } from '@/lib/auth.action'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { Toaster } from 'sonner'

const AuthLayout = async({children}:{children:ReactNode}) => {

  const isUserAuthanticated = await isAuthanticated()
  if(isUserAuthanticated) redirect("/")  
  return (
    <div className='auth-layout'>
      {children}
    </div>
  )
}

export default AuthLayout
