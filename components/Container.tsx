import React from 'react'

interface IContainer {
  header: string
  children: React.ReactNode
}

const Container = ({ header, children }: IContainer) => {
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-12  w-full md:max-w-[70vw] px-5 md:p-0'>
        {header && (
          <div
            className="relative w-full before:content-[''] before:absolute xs:before:left-[20px] md:before:left-0 
              before:top-full before:h-1.25 before:w-37.5 before:bg-secondary flex justify-start"
          >
            <h1 className='font-bold uppercase text-primary text-2xl font-roboto'>{header}</h1>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default Container
