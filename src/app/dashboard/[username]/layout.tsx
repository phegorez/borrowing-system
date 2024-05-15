'use client'

import Navbar from '@/app/components/Navbar/Navbar'
import Sidebar from '@/app/components/Sidebar/Sidebar'
import React, { useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'
import { sidebarMenus } from '@/app/constans'

import { useAuthState } from 'react-firebase-hooks-working/auth'
import { auth } from '@/app/firebase'



const layout = ({ children }: { children: React.ReactNode }) => {

    const { username } = useParams();
    const router = useRouter();
    
    const [alreadyAuth] = useAuthState(auth);
    console.log(alreadyAuth)

    useEffect(() => {
        if(!alreadyAuth) {
            router.replace('/signin')
        }
    }, [alreadyAuth])

    return (
        <main className='container mx-auto'>
            <Navbar />

            <div className='flex'>
                <Sidebar username = {username} sidebarMenus = {sidebarMenus} />
                <div className='ml-5'>

                    {children}
                </div>
            </div>

        </main>
    )
}

export default layout
