'use client'

import Link from "next/link";
import styles from './page.module.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";

export default function Home() {

  return (
    <main className={styles.mainPage}>
      <article className={styles.middleArticle}>
        <h1 className={styles.title}>Welcome to <br />Library</h1>
        <div className={styles.btnGroup}>
          <Link className="btn btn-outline btn-info" href='/signup' >Sign Up</Link>
          <Link className="btn btn-outline btn-success" href='/signin' >Sign In</Link>
        </div>
      </article>
    </main>
  );
}
