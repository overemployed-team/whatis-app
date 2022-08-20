import { useState } from "react"
import axios from "axios"
import appConfig from "./config"

const SearchModeComponent = () => {

    const [description, setDesccription] = useState("")

    const [answer, setAnswer] = useState("")
    const [displayAnswer, setDisplayAnswer] = useState(false)

    const onClickFindOut = async () =>{
        const requestJSON = {
            "question": description,
            "topic": "movie"
        }
        const response = await axios.post(appConfig.SERVER_URL, requestJSON, appConfig.REQUEST_HEADER )
        console.log(response)
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
        <div className='h-20 mt-10'>
            {
            displayAnswer ? <p className='text-lg'>Is it {"_____"}
                ?</p> : <></>
            }
        </div>
    </>
}

export default SearchModeComponent
