import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>
            <nav className='w-full p-4 flex justify-center px-12 border-b-2 border-blue-500 shadow-md'>
                <Link to="/"><h1 className='font-bold text-2xl text-blue-500'>GitForge</h1></Link>
            </nav>
        </>
    );
}
