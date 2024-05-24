'use client'

import { IRootState } from '@/app/configureStore'
import { profileInterface } from '@/app/type'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const userDashboardPage = () => {

    const profile = useSelector<IRootState, profileInterface>(state => state.auth.profile)
    const route = useRouter()

    useEffect(() => {
        console.log('This is profile from dashboard : ', profile)
        if(profile.role === 'admin') {
            route.replace('/dashboard')
        }
    })
    return (
        <div>userDashboardP</div>
    )
}

export default userDashboardPage