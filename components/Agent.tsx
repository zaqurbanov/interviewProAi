import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
    enum CallStatus{
            INACTIVE = "INACTIVE",
            CONNECTING = "CONNECTING",
            ACTIVE = "ACTIVE",
            FINISHED = "FINISHED"
    }
const Agent = ({userName}:AgentProps) => {
    const isSpeaking = true
    const callStatus = CallStatus.FINISHED

    const messages = [
        "Hello, how are you?",
        "I am fine, thank you!",
    ]
    const lastMessage  = messages[messages.length-1]
    
  return (

    <>
    <div className='call-view'>

        <div className='card-interviewer'>
                <div className='avatar'>
                    <Image src={"/ai-avatar.png"} alt='vapi' width={65} height={55} 
                    className='object-cover'
                    />
                        {isSpeaking && <span className='animate-speak'></span>}
                </div>
                <h3>Ai interviewer</h3>
        </div>
        <div className='card-border'>
                <div className='card-content'>
                    <Image src={"/user-avatar.png"}alt ="user" width={250} height={250} className='rounded-full object-cover'/>
                <h3>{userName}</h3>
                </div>

        </div>
    </div>
    
    {messages.length >0 && (
        <div className='transcript-border'>
            <div className='transcript'>
                <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0','animate-fateIn opacity-100')}>
                    {lastMessage}
                </p>

            </div>

        </div>
    )}
        <div className='w-full flex justify-center'>
            {
                callStatus !== 'ACTIVE' ? (
                        <button className='relative btn-call'>
                                <span className={cn('absolute animate-ping rounded-full opacity-75',callStatus !=='CONNECTING' & 'hidden')}/>
                                     

                                    <span>
                                    {callStatus === 'INACTIVE' || callStatus ==='FINISHED'? 'Call' :"..."}
                                    </span>
                        </button>
                ) : (
                    <button className='btn-disconnect '>
                            End
                    </button>
                )
            }
        </div>
    </>
  )
}

export default Agent
