'use client'

import React from 'react'
import { sidebarMenus } from '@/app/constans'
import Link from 'next/link'

interface sidebarMenusInt {
    id: number,
    title: string,
    routeName: string
}

const Sidebar = ({ username, sidebarMenus }: { username : string | string[], sidebarMenus: sidebarMenusInt[] }) => {

    return (
        <div>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                {sidebarMenus.map(menu => (
                    <li key={menu.id}><Link href={`/dashboard/${username}/${menu.routeName}`}>{menu.title}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar