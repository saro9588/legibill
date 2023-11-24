'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function Nav() {
    const pathname = usePathname()
    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <nav className="bg-gray-900 p-4 text-gray-200">
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
            </ul>
        </nav>
    );
}
