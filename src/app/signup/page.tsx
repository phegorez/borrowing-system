'use client'

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { IRootState } from '../configureStore';
import { profileInterface } from '../type';
import { useRouter } from 'next/navigation';


const SignUpPage = () => {

    const [username, setUserName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const router = useRouter();



    const handleRegister = async (e: any) => {

        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            toast.warning('Please complete your input', {
                position: 'top-right',
                autoClose: 1800
            })
            return null;
        }

        if (!email.includes('@')) {
            toast.warning('Your email incorrect', {
                position: 'top-right',
                autoClose: 1800
            })
            return null;
        } else if (password !== confirmPassword) {
            toast.warning('Your password not match', {
                position: 'top-right',
                autoClose: 1800
            })
            return null;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser!;

            updateProfile(user, {
                displayName: username
            }) 

            
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const newUser = {
                    username: username,
                    email: user.email,
                    photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    role: 'user',
                    createdDate: new Date(),
                    updatedAt: new Date()
                }
                await setDoc(docRef, newUser)
            }
            toast.success('Registration successfuly', {
                position: 'top-right',
                autoClose: 1800
            });
            const form = e.target;
            form.reset();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('email already in use', {
                    position: "top-right",
                    autoClose: 1800,
                });
            }
        }
    }

    const isLogIn = useSelector<IRootState, boolean>(state => state.auth.isLoggedIn)
    const loggedInUserProfile = useSelector<IRootState, profileInterface>(state => state.auth.profile)

    useEffect(() => {
        if (isLogIn) {
            router.replace(`dashboard/${loggedInUserProfile.id}`)
        }
    }, [])

    return (
        <main className={styles.mainPage}>
            <form onSubmit={handleRegister}>
                <h1 className='text-3xl font-bold mb-5'>Registration</h1>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                <label className="input input-bordered flex items-center gap-2 my-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input onChange={(e) => { setUserName(e.target.value) }} type="text" className="grow" placeholder="Username" />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input onChange={(e) => { setEmail(e.target.value) }} type="text" className="grow" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2 my-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="grow" placeholder="Password" />
                    <span className={password.length >= 6 ? 'badge badge-success' : "badge badge-info"}>{password.length >= 6 ? 'valid' : `${password.length}/6`}</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 my-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input onChange={(e) => { setConfirmPassword(e.target.value) }} type="password" className="grow" placeholder="Confirm Password" />
                    {password && (
                        <span className={password === confirmPassword ? 'badge badge-success' : "badge badge-info"}>{password === confirmPassword ? 'matched' : 'not'}</span>
                    )}
                </label>
                <div className='flex items-center flex-col'>
                    <button type='submit' className={password.length < 6 ? 'btn-disabled btn btn-outline btn-success mb-5 w-full' : 'btn btn-outline btn-success mb-5 w-full'}>Submit</button>
                    <p>Already have accout ? Go to <Link href='/signin' className={styles.isAlreadySignUp}>Sign In</Link> page</p>
                    <Link href='/' className='text-sm text-[#333] hover:underline mt-3'>Back to home?</Link>
                </div>
            </form>
        </main>
    )
}

export default SignUpPage