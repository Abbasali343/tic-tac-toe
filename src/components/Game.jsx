import { useLocation } from "react-router-dom";
import "../assets/css/game.css";
import Table from "./Table";

const Game = () => {
  const location = useLocation();
  const options = location.state;

  const difficultyLevel = options.difficultyLevel;
  const table = options.table;
  const playerName = options.playerName;
  //   const [table,setTable] = useState(options);

  return (
    <>
      <div className="game_container">
        <h1 className="Game_Heading">
          {options.playerName}
          <br />
          <span>VS</span>
          <br />
          Computer
        </h1>
        <Table
          table={table}
          playerName={playerName}
          difficultyLevel={difficultyLevel}
        />
      </div>
    </>
  );
};

export default Game;
