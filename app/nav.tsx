'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react';
export default function Nav({session}: {session: boolean}) {
    const pathname = usePathname()
    const isActive = (path: string) => {
        return pathname === path;
    };
    return (
        <nav className="bg-gray-900 p-4 text-gray-200 flex flex-row justify-between">
            <ul className="flex gap-2">
                <li className={isActive('/') ? 'text-blue-500' : ''}>
                    <Link href="/" className={isActive('/') ? 'hover:text-blue-600 text-blue-500' : 'hover:text-blue-600'}>
                        Home
                    </Link>
                </li>
                <li className={isActive('/about') ? 'text-blue-500' : ''}>
                    <Link href="/about" className={isActive('/about') ? 'hover:text-blue-600 text-blue-500' : 'hover:text-blue-600'}>
                        About
                    </Link>
                </li>
                <li className={isActive('/contact') ? 'text-blue-500' : ''}>
                    <Link href="/contact" className={isActive('/contact') ? 'hover:text-blue-600 text-blue-500' : 'hover:text-blue-600'}>
                        Contact
                    </Link>
                </li>
                {
                    session && (
                        <li className={isActive('/dashboard') ? 'text-blue-500' : ''}>
                            <Link href={'/dashboard'}>
                                Dashboard
                            </Link>
                        </li>
                    )
                }
            </ul>
            <ul className='flex flex-row gap-2'>
                {
                    session && (
                        <li className='hover:text-blue-500 hover:cursor-pointer'>
                            <span onClick={() => {
                                signOut()
                            }}>
                                Logout
                            </span>
                        </li>
                    )
                }
                {
                    !session && (
                        <li className='hover:text-blue-500 hover:cursor-pointer'>
                            <Link href={'/login'}>
                                Login
                            </Link>
                        </li>
                    )
                }
                {
                    !session && (
                        <li className='hover:text-blue-500 hover:cursor-pointer'>
                            <Link href={'/register'}>
                                Register
                            </Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
}
