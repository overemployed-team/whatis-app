import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Footer = ()=>{
  return <footer className={styles.footer}>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
    <p>
      Powered by <span className='text-orange-600'>Overemployed</span>
    </p>
    {/* <span className={styles.logo}>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </span> */}
  </a>
</footer>
}

const Home: NextPage = () => {
  const [clicked, setClicked] = useState(false)

  const onClickFindOut = () =>{
    setClicked(true)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>What is it?</title>
        <meta name="description" content="This app helps you to find out what the thing is" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <div className='container '>
            
            <div className="flex flex-col text-center pb-40">
                <div>
                <Image className='shadow-2xl' src="/favicon/android-chrome-192x192.png" width={64} height={64}/>
                 <p className='text-5xl  mt-10'>What is it?</p>
                  <textarea className='text-lg bg-slate-100 w-96 my-5 rounded-lg p-2' placeholder="describe what you wanna know..."></textarea>
                </div>
                
          
                <button className='mx-auto w-96 bg-orange-500 text-white text-2xl px-5 py-2 rounded-xl'
                  onClick={onClickFindOut}
                >
                  Find out
                </button>
                <div className='h-20 mt-10'>
                  { clicked ? <p className='text-lg'>Is it {"_____"} ?</p>: <></>}
                </div>
            </div>
          </div>
      </main>
      <Footer/>

    </div>
  )
}

export default Home
