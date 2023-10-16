import { useActionData, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableWith3 from "./TableWith3";
import TableWith5 from "./TableWith5";
import TableWith7 from "./TableWith7";

import "../assets/css/game.css";
import { useState } from "react";
import Table from "./Table";

const Game = () => {
  const location = useLocation();
  const options = location.state;

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
        <Table table={table} playerName={playerName}  />
      </div>
    </>
  );
};

export default Game;
