import { useState } from "react"
const SearchModeComponent = () => {

    const [displayAnswer, setDisplayAnswer] = useState(false)

    const onClickFindOut = () =>{
      setDisplayAnswer(true)
    }

    return <>
        <div>
            <textarea className='text-lg  neu-down w-96 my-5 rounded-lg p-6' placeholder="describe what you want to know..."></textarea>
        </div>

        <button className='mx-auto w-96 bg-slate-600  text-white text-2xl px-5 py-2 rounded-xl'
            onClick={onClickFindOut}>
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
