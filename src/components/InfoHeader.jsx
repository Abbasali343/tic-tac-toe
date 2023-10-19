import "../assets/css/game.css";

export default function InfoHeader(){
    return(
        <>
        <div className="header">
            <div className="player-header">
              <h1 className="text">Player:</h1>
              <h1 className="symbol-player">X</h1>
            </div>
            <div className="ai-header">
              <h1 className="text">Ai:</h1>
              <h1 className="symbol-ai">O</h1>
            </div>
          </div>
        </>
    )
}