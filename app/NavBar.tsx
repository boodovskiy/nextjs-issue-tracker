'use client';

import classnames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoMdHelpBuoy } from "react-icons/io";
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();

    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues/list'}
    ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><IoMdHelpBuoy /></Link>
        
        <ul className='flex space-x-6'>
             {links.map( link => 
                <li key={link.href} >
                <Link 
                    href={link.href} 
                    className={
                        classnames({
                            'underline text-white': link.href === currentPath,
                            'text-zinc-500': link.href !== currentPath,
                            'hover:text-white hover:underline transition-colors': true
                        })
                }>
                    {link.label}
                </Link></li>)
            }
        </ul>
        <Box>
            { status == "authenticated" && <Link href="/api/auth/signout">Log out</Link>}
            { status == "unauthenticated" && <Link href="/api/auth/signin">Login</Link>}
        </Box>
    </nav>
  )
}

export default NavBar