import {useState} from "react"
import axios from "axios"
import appConfig from "./config"

const SearchModeComponent = () => {

    const [description, setDesccription] = useState("")

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const [displayQuestion, setDisplayQuestion] = useState(false)
    const [displayAnswer, setDisplayAnswer] = useState(false)
    
    const [onLoading, setOnloading] = useState(false)

    const onClickFindOut = async () => {

        setQuestion(description)
        setDisplayQuestion(true)
        setDisplayAnswer(false)
        setDesccription("")
        const requestJSON = {
            "question": description,
            "topic": "movie"
        }
        setOnloading(true)
        const response = await axios.post(appConfig.SERVER_URL + "/what", requestJSON)
        setOnloading(false)
        const answer = response.data[0].answer
        setAnswer(answer)
        setDisplayAnswer(true)
    }

    const onChangeTextField = (e : any) => {
        setDesccription(e.target.value);
    }

    const feedbackComponent = () => {
        return <>
            <p className='text-md'>Is it &;{answer}&;?</p>
        </>
    }

    return <>
        <div>
            <textarea className='text-lg  neu-down w-full mx-auto sm:w-96 my-5 rounded-lg p-6' placeholder="Describe the movie you want to find..."
                value={description}
                onChange={onChangeTextField}></textarea>
        </div>

        <button className='mx-auto w-full sm:w-96 bg-green-600 disabled:bg-slate-400  text-white text-2xl px-5 py-2 rounded-xl'
            onClick={onClickFindOut}
            disabled={
                description.length === 0
        }>
            Find out
        </button>
        <div className='min-h-10 mt-10'>
            {
            displayQuestion ? <p className='text-lg'>&;{question}&;</p> : <></>
        } </div>
            {
                onLoading ?
                <p>Let me think...</p>:<></>
            }
        <div className='h-20 mt-4'>
            {
            displayAnswer ? feedbackComponent() : <></>
        } </div>
    </>
}

export default SearchModeComponent
