'use client'

import React from 'react'
import { sidebarMenus, sidebarAdminMenus } from '@/app/constans'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { IRootState } from '@/app/configureStore'
import { AuthState, profileInterface } from '@/app/type'

interface sidebarMenusInt {
    id: number,
    title: string,
    routeName: string
}



const Sidebar = ({ username, sidebarMenus }: { username : string | string[], sidebarMenus: sidebarMenusInt[] }) => {

    const profile = useSelector<IRootState, profileInterface>(state => state.auth.profile)

    return (
        <div>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                {profile.role === 'admin' ? sidebarAdminMenus.map(menu => (
                    <li key={menu.id}><Link href={`/dashboard/${menu.routeName}`}>{menu.title}</Link></li>
                )) : sidebarMenus.map(menu => (
                    <li key={menu.id}><Link href={`/views/${username}/${menu.routeName}`}>{menu.title}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar