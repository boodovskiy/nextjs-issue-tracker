'use client';

import classnames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoMdHelpBuoy } from "react-icons/io";

const NavBar = () => {
    const currentPath = usePathname();
    console.log(currentPath);

    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'}
    ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><IoMdHelpBuoy /></Link>
        
        <ul className='flex space-x-6'>
             {links.map( link => 
                <Link 
                    key={link.href} 
                    href={link.href} 
                    className={
                        classnames({
                            'underline text-white': link.href === currentPath,
                            'text-zinc-500': link.href !== currentPath,
                            'hover:text-white hover:underline transition-colors': true
                        })
                }>
                    {link.label}
                </Link>)
            }
        </ul>
    </nav>
  )
}

export default NavBar