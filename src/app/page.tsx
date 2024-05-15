'use client'

import Link from "next/link";
import styles from './page.module.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";

import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks-working/auth';
import useAuthStore from "./stores/authStore/authStore";

export default function Home() {

  const [alreadyAuth] = useAuthState(auth);
  const { currentlyUser, getCurrentlyUser } = useAuthStore()
  const auths = getAuth();
  const router = useRouter();

  useEffect(() => {
    if (alreadyAuth) {
      onAuthStateChanged(auths, async (user) => {
        if (user) {
          const docRef = doc(db, 'User', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            // console.log('User data: ', userData);
            // router.replace(`dashboard/${userData.username}`);
            if (userData) {
              getCurrentlyUser(userData)
            }
            router.replace(`dashboard/${userData.username}`);
            // if(currentlyuser) {
            //     router.push(`dashboard/${currentlySignIn.username}`)
            // }
          }
        } else {
          toast.success('logged out Successfully', {
            position: 'top-right',
            autoClose: 1800,
          });
        }
      })
    }
  }, [alreadyAuth])
  return (
    <main className={styles.mainPage}>
      <article className={styles.middleArticle}>
        <h1 className={styles.title}>Welcome to <br />Borrowing System</h1>
        <div className={styles.btnGroup}>
          <Link className="btn btn-outline btn-info" href='/signup' >Sign Up</Link>
          <Link className="btn btn-outline btn-success" href='/signin' >Sign In</Link>
        </div>
      </article>
    </main>
  );
}
