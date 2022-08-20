
import styles from '../styles/Home.module.css'

const Footer = ()=>{
    return <footer className={styles.footer}>
      <a
        href="https://lablab.ai/event/cohere-ai-hackathon-generate/team/Overemployed"
        target="_blank"
        rel="noopener noreferrer"
      >
      <p>
        Created by <span className='text-orange-600'>Overemployed</span>
      </p>
      {/* <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span> */}
    </a>
  </footer>
  }
export default Footer