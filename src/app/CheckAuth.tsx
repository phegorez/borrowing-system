
'use client'

import React from 'react'
import useAuthListener from '@/app/hooks/useAuthListener'

const CheckAuth = ({ children }: { children: React.ReactNode }) => {

    useAuthListener()

    return (
        <div>{children}</div>
    )
}

export default CheckAuth