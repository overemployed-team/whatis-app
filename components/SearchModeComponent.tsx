import { useState } from "react"
import axios from "axios"
import appConfig from "./config"

const SearchModeComponent = () => {

    const [description, setDesccription] = useState("")

    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const [displayQuestion, setDisplayQuestion] = useState(false)
    const [displayAnswer, setDisplayAnswer] = useState(false)

    const onClickFindOut = async () =>{

        setQuestion(description)
        setDisplayQuestion(true)

        setDesccription("")
        const requestJSON = {
            "question": description,
            "topic": "movie"
        }
        const response = await axios.post(appConfig.SERVER_URL + "/what", requestJSON )
        const answer = response.data[0].answer
        setAnswer(answer)
        setDisplayAnswer(true)
    }

    const onChangeTextField = (e: any)=>{
        setDesccription(e.target.value);
    }
    
    return <>
        <div>
            <textarea className='text-lg  neu-down w-96 my-5 rounded-lg p-6' 
                        placeholder="describe what you want to know..."
                        value={description} 
                        onChange={onChangeTextField}>    
            </textarea>
        </div>

        <button className='mx-auto w-96 bg-slate-600 disabled:bg-slate-400  text-white text-2xl px-5 py-2 rounded-xl'
            onClick={onClickFindOut} disabled={description.length === 0}>
            Find out
        </button>
        <div className='min-h-10 mt-10'>
            {
            displayQuestion ? <p className='text-lg'>"{question}"</p> : <></>
            }
        </div>

        <div className='h-20 mt-4'>
            {
            displayAnswer ? 
                <p className='text-md'>Is it "{answer}"?</p> : 
                <></>
            }
        </div>
    </>
}

export default SearchModeComponent
