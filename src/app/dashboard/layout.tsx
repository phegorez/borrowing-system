'use client'

import Navbar from '@/app/components/Navbar/Navbar'
import Sidebar from '@/app/components/Sidebar/Sidebar'
import React, { useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'
import { sidebarAdminMenus } from '@/app/constans'

import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from '@/app/configureStore'
import { profileInterface } from '@/app/type'


const layout = ({ children }: { children: React.ReactNode }) => {


    const { username } = useParams();
    const router = useRouter();
    const dispatch = useDispatch()

    const isLogIn = useSelector<IRootState, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLogIn) {
            router.replace(`/`)
        }
    }, [])



    return (
        <main className='container mx-auto'>
            <Navbar />

            <div className='flex'>
                <Sidebar username={username} sidebarMenus={sidebarAdminMenus} />
                <div className='ml-5'>
                    {children}
                </div>
            </div>

        </main>
    )
}

export default layout
