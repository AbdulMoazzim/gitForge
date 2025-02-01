import React from 'react'

export default function RenderMd({info}) {
  return (
    <div className='overflow-y-scroll h-full overflow-x-hidden w-full'>{info}</div>
  )
}
