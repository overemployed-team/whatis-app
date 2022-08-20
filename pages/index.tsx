import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

import Footer from '../components/footer'
import SearchModeComponent from '../components/SearchModeComponent'
import GameModeComponent from '../components/GameModeComponent'

const appMode = ["Search Mode", "Game Mode"]

const Home: NextPage = () => {
  const [mode, setMode] = useState(appMode[0])

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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>

      <main className={styles.main}>
          <div className='container '>
            
            <div className="flex flex-col text-center pb-40">
                <div className='flex flex-col'>
                  <div className='flex flex-row y-10 mx-auto align-middle mt-2'>
                          <p className='self-center text-4xl pr-3'>What is it</p>
                          <Image className='shadow-2xl' src="/android-chrome-192x192.png" width={64} height={64}/>
                  </div>
                  <p className='text-sm text-slate-600'>(Movie edition)</p>
                  
                  <div className='text-center mt-2 mx-10 max-w-96'>
                      <button className='neu-up w-32 px-4 py-1 bg-slate-400 hover:scale-95' onClick={toggleMode}>{mode}</button>
                  </div>
                </div>
                <div className='h-96 py-5'>
                {
                  mode === appMode[0] ? 
                  <SearchModeComponent/>
                  :
                  <GameModeComponent/>
                }
                </div>
            </div>
          </div>
      </main>
      <Footer/>

    </div>
  )
}

export default Home
