'use client'

import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'

import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../store/authSlice'

import { useRouter } from 'next/navigation'
import { IRootState } from '../configureStore'

import { objState, profileInterface } from '../type'

const SignInPage = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch();
    const router = useRouter()

    const isLogIn = useSelector<IRootState, boolean>(state => state.auth.isLoggedIn)
    const loggedInUserProfile = useSelector<IRootState, profileInterface>(state => state.auth.profile)

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warning('Please complete your input', {
                position: 'top-right',
                autoClose: 1800,
            });
            return;
        }

        if (!email.includes('@')) {
            toast.warning('Your email is incorrect', {
                position: 'top-right',
                autoClose: 1800,
            });
            return;
        }

        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            if (result) {
                const resultData = result.user
                dispatch(signIn());
                router.replace(`dashboard/${resultData.uid}`)
            }
            toast.success('Login successfuly', {
                position: 'top-right',
                autoClose: 1800
            });
        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-credential') {
                toast.error('invalid credential', {
                    position: "top-right",
                    autoClose: 1800,
                });
            }
        }

    };


    useEffect(() => {
        if (isLogIn) {
            router.replace(`dashboard/${loggedInUserProfile.uid}`)
        }
    }, [])

    return (
        <main className={styles.mainPage}>
            <form onSubmit={handleSubmit}>
                <h1 className='text-3xl font-bold'>Sing In</h1>
                <label className="input input-bordered flex items-center gap-2 my-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="grow" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="grow" placeholder="Password" />
                </label>
                <div className='flex items-center flex-col'>
                    <button className='btn btn-outline btn-success w-full mb-5'>Sign In</button>
                    <p>Do not have an accout ? Go to <Link href='/signup' className={styles.isAlreadySignUp}>Sign Up</Link> page</p>
                    <Link href='/' className='text-sm text-[#333] hover:underline mt-3'>Back to home?</Link>
                </div>
            </form>
        </main>
    )
}

export default SignInPage