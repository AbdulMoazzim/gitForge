import React from 'react'

export default function Card({title, description}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mt-4">{description}</p>
    </div>
  )
}
