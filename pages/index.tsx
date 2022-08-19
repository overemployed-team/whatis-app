import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {


  return (
    <div className={styles.container}>
      <Head>
        <title>What is it?</title>
        <meta name="description" content="This app helps you to find out what the thing is" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <div className='container'>
            <div className="flex flex-col text-center">

                <div>
                 <p className='text-5xl  my-10'>So, what is it?</p>
                  <textarea className='text-lg w-96 my-5 rounded-lg p-2' placeholder="describe what you wanna know..."></textarea>
                </div>
                
          
                <button className='mx-auto bg-pink-500 text-white text-2xl px-5 py-2 rounded-xl'>Find out</button>
            </div>
          </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
