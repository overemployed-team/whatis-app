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
    const [currentQuestion, setCurrentQuestion] = useState("")
    const [currentGuess, setCurrentGuess] = useState("")
    const [currentAnswer, setCurrentAnswer] = useState("")

    const [gameLogs, setGameLogs] = useState([] as Array<GameState>)


    const submitAnswer = async ()=>{
        if (isUserTurn){
            // user turn
            const question = currentQuestion
            setCurrentQuestion("")
            setAskUser(false)
            const requestJSON = {
                "question": question,
                "topic": "movie"
            }
            try{
                const response = await axios.post(appConfig.SERVER_URL + "/what", requestJSON)
                const answer = response.data[0].answer
                setIsAIGuessed(answer)
                setCurrentGuess(answer)
                
            }catch(error){
                console.error("something is wrong")
            }
        }else{
            // AI turn
        }
    }

    const onChangeQuestionField = (e:any)=>{
        setCurrentQuestion(e.target.value)
    }

    const switchPlayer= ()=>{
        setUserTurn(!isUserTurn)
        if (isUserTurn){
            // User's turn
        }else{
            // AI's turn

        }
    }

    const jugdeAI = (isCorrect: boolean) => {
        if (isCorrect){
            setAiScore(aiScore+1)
        }
        switchPlayer()
    }

    return <>
        <div id="score-bar" className="w-60 px-10 py-5 m-2 neu-up mx-auto text-left p-2">
            <p className="text-xl">Your score:  {userScore}</p>
            <p className="text-xl">AI score:  {aiScore}</p>
        </div>
        {
            isUserTurn?
                <div className="my-10 flex flex-col">
                    { askUser ? 
                    <>
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
                    </>
                    : 
                    <>
                    {!isAIGuessed ? 
                        <p>Let me guess....</p>
                    :
                        <>
                            <p className="text-lg">Is it &quot;{currentGuess}&quot;</p>
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
                        </>
                    }
                        
                    </>
                    }
                </div>
            :
                <div>
                    <p>AI turn! (not implemented yet)</p>
                </div>
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