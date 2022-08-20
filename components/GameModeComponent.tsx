import { useState } from "react";

const GameModeComponent = () =>{
    const [userScore, setUserScore] = useState(0)
    const [aiScore, setAiScore] = useState(0)

    const [isUserTurn, setUserTurn] = useState(true)
    
    return <>
        <div id="score-bar" className=" w-40 mx-auto text-left p-2">
            <p className="text-xl">Your score:  {userScore}</p>
            <p className="text-xl">AI score:  {aiScore}</p>
        </div>
    </>


}

export default GameModeComponent