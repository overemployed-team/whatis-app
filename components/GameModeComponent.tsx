import { useState } from "react";
import appConfig from "./config";
import axios from "axios";

interface GameState {
    turnOwner: string
    question: string
    guessed: string
    isCorrect: boolean
}

const GameModeComponent = () =>{
    const [userScore, setUserScore] = useState(0)
    const [aiScore, setAiScore] = useState(0)

    const [isUserTurn, setUserTurn] = useState(true)

    // User turn
    const [askUser, setAskUser] = useState(true)
    const [isAIGuessed, setIsAIGuessed] = useState(false)
    const [isAIDescribing, setisAIDescribing] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState("")
    const [displayQuestion, setDisplayQuestion] = useState("")
    const [currentGuess, setCurrentGuess] = useState("")
    const [currentAnswer, setCurrentAnswer] = useState("")

    // state to display if user guess the description right
    const [displayIfUserGuessedRight, setdisplayIfUserGuessedRight] = useState(false)
    const [didUserGuessRight, setDidUserGuessRight] = useState(false)

    const [gameLogs, setGameLogs] = useState([] as Array<GameState>)

    const submitAnswer = async ()=>{
        if (isUserTurn){
            // user turn
            const question = currentQuestion
            setCurrentQuestion("")
            setDisplayQuestion(question)
            setAskUser(false)
            const requestJSON = {
                "question": question,
                "topic": "movie"
            }
            try{
                const response = await axios.post(appConfig.SERVER_URL + "/what", requestJSON)
                const answer = response.data[0].answer
                setIsAIGuessed(true)
                setCurrentGuess(answer)
            }catch(error){
                console.error("something is wrong")
            }
        }else{
            // AI turn
            const guessed = currentGuess
            const answer = currentAnswer

            const requestJSON = {
                user: guessed,
                original: answer
            }
            const response = await axios.post(appConfig.SERVER_URL + "/isSame", requestJSON)
            const isCorrect = response.data[0].is_same
            setDidUserGuessRight(isCorrect)
            if (isCorrect){
                setUserScore(userScore+1)
            }
            setdisplayIfUserGuessedRight(true)
        }
    }

    const askQuestion = async ()=>{

    }

    const onChangeQuestionField = (e:any)=>{
        setCurrentQuestion(e.target.value)
    }

    const onChangeGuessField = (e:any)=>{
        setCurrentGuess(e.target.value)
    }

    const switchPlayer= async ()=>{
        if (isUserTurn){
            // User's turn
            setdisplayIfUserGuessedRight(false)
            setIsAIGuessed(false)
            setisAIDescribing(true)
            setAskUser(true)
            
            setUserTurn(false)

            const response = await axios.get(appConfig.SERVER_URL + "/generate")
            
            // console.log(response)
            const answer = response.data[0].title
            const question = response.data[0].description

            setCurrentQuestion(question)
            setisAIDescribing(false)
            setCurrentGuess("")
            setCurrentAnswer(answer)

        }else{
            // AI's turn
            setIsAIGuessed(false)
            setAskUser(true)
            setUserTurn(true)
            setCurrentQuestion("")
            setCurrentGuess("")
            setCurrentAnswer("")
        }
    }

    const jugdeAI = (isCorrect: boolean) => {
        if (isCorrect){
            setAiScore(aiScore+1)
        }
        switchPlayer()
    }

    const userTurnDisplay = ()=>{
        return <div className="my-10 flex flex-col">
        { askUser ? 
            <div id="ask-user" className="flex flex-col">
                <p className="text-sm text-pink-600">Your turn, hint the movie for the opponent to guess</p>
                <textarea className='text-lg neu-down w-full mx-auto sm:w-96 my-5 rounded-lg p-6' placeholder="describe what the movie you have in mind"
                            value={currentQuestion}
                            onChange={onChangeQuestionField}></textarea>

                <button className='mx-auto w-full sm:w-96 bg-sky-400 hover:scale-95 disabled:bg-sky-200  text-white text-2xl px-5 py-2 rounded-xl'
                            onClick={submitAnswer}
                            disabled={
                                currentQuestion.length < 3
                        }>
                        Challenge
                </button>
            </div>
        : 
            <div className="ai-answer">
                {!isAIGuessed ? 
                    <p>Let me guess....</p>
                :
                    <div id="on-answered" className="flex flex-col">
                        <p className="text-xl">Your description: &quot;{displayQuestion}&quot;</p>
                        <p className="text-lg">AI guessed: &quot;{currentGuess}&quot;</p>
                        
                        <div className="flex flex-row mx-auto my-3">
                            <button className="w-20 bg-green-400 text-xl mx-4 rounded-lg px-2 py-2"
                                onClick={()=>jugdeAI(true)}
                            >
                                Yes
                            </button>

                            <button className="w-20 bg-red-400 text-xl mx-4 rounded-lg px-2 py-2"
                                onClick={()=>jugdeAI(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                }
            </div>
        }
        </div>
    }

    const aiTurnDisplay = ()=>{
        return <div className="my-10 flex flex-col">
            { isAIDescribing ? 
                <p>I am describing...</p>
                :
                <>
                    

                    {displayIfUserGuessedRight ? 
                        <div className="">
                            {
                                didUserGuessRight ? 
                                    <p className="text-xl text-green-700 font-bold">You are right 🎉</p>
                                    :
                                    <p className="text-xl text-red-700 font-bold">You are wrong 😰</p>
                            }
                            <p>The movie is <span className="font-bold text-lg">&quot;{currentAnswer}&quot;</span>;.</p>
                            <button className='mx-auto w-full sm:w-60 bg-orange-600 disabled:bg-slate-400  text-white text-lg px-2 py-1 my-4 rounded-xl'
                                onClick={switchPlayer}>
                                Continue
                            </button>
                        </div>
                    : <>
                        <p>What is this movie, &#34;{currentQuestion}&#34;?</p>
                        <input type="text" className='text-lg  neu-down w-full mx-auto sm:w-96 my-5 rounded-lg p-2'
                            placeholder="Guess the movie name"
                            value={currentGuess}
                            onChange={onChangeGuessField}></input>
                        <button className='mx-auto w-full sm:w-96 bg-pink-600 disabled:bg-slate-400  text-white text-2xl px-5 py-2 rounded-xl'
                            onClick={submitAnswer}
                            disabled={
                            currentGuess.length === 0}>
                            Guess
                        </button>
                    </>}
                </>
            }
    </div>
    }



    return <>
        <div id="score-bar" className="w-60 px-10 py-5 m-2 neu-up mx-auto text-left p-2">
            <p className="text-xl">Guess score:  {userScore}</p>
            <p className="text-xl">Explain score:  {aiScore}</p>
        </div>

        {
            isUserTurn?
                userTurnDisplay()
            :
                aiTurnDisplay()
        }

        <div>
            {
                gameLogs.map((gameLog: GameState)=>{
                    return <>
                        
                    </>
                })
            }
        </div>
    </>


}

export default GameModeComponent