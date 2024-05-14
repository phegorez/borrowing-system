import Link from "next/link";
import styles from './page.module.css'

export default function Home() {
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
