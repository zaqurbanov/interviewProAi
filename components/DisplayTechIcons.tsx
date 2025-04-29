import { getTechLogos } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const DisplayTechIcons = async ({techStack}:TechIconProps) => {
    const techIcons = await getTechLogos(techStack)
  return (
    <div className='flex flex-row flex-wrap gap-3'>
      {techIcons.slice(0,3).map(({tech,url},index)=>{

        return (
            <div key={index} className={`relative group bg-dark-300 rounded-full p-2 flex-center ${index>=1 ? "-ml-4":""}`}>
                    <span className='tech-tooltip'>
                        {tech}

                    </span>
                    <Image alt={tech}  src={url} width={100} height={100}
                    className='size-5'
                    />
            </div>
        )
      })}
    </div>
  )
}

export default DisplayTechIcons
