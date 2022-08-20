import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Footer = ()=>{
  return <footer className={styles.footer}>
    <a
      href="https://lablab.ai/event/cohere-ai-hackathon-generate/team/Overemployed"
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

const appMode = ["Ask Mode", "Game Mode"]

const Home: NextPage = () => {
  const [mode, setMode] = useState(appMode[0])
  const [displayAnswer, setDisplayAnswer] = useState(false)

  const onClickFindOut = () =>{
    setDisplayAnswer(true)
  }

  const toggleMode = () =>{
    if (mode === appMode[0]){
      setMode(appMode[1])
    }else{
      setMode(appMode[0])
    }
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
                <div className='flex flex-col'>
                  <div className='flex flex-row y-10 mx-auto align-middle my-2'>
                          <p className='self-center text-4xl pr-3'>What is it</p>
                          <Image className='shadow-2xl' src="/android-chrome-192x192.png" width={64} height={64}/>
                  </div>
                  <div className='text-center mt-2 mx-10 max-w-96'>
                      <button className='neu-up w-32 px-4 py-1 bg-slate-400 hover:scale-95' onClick={toggleMode}>{mode}</button>
                  </div>
                </div>
                
                <div>
              
                  <textarea className='text-lg  neu-down w-96 my-5 rounded-lg p-6' placeholder="describe what you want to know..."></textarea>
                </div>
                
          
                <button className='mx-auto w-96 bg-slate-600  text-white text-2xl px-5 py-2 rounded-xl'
                  onClick={onClickFindOut}
                >
                  Find out
                </button>
                <div className='h-20 mt-10'>
                  { displayAnswer ? <p className='text-lg'>Is it {"_____"} ?</p>: <></>}
                </div>
            </div>
          </div>
      </main>
      <Footer/>

    </div>
  )
}

export default Home
