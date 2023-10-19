import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../assets/css/game.css";
import StatusModal from "./StatusModal";
import InfoHeader from "./InfoHeader";
import Table from "./Table";

const Game = () => {
  const location = useLocation();
  const options = location.state;
  const difficultyLevel = options.difficultyLevel;
  const table = options.table;
  const playerName = options.playerName;
  const boardLength = Array(table * table).fill(null);

  return (
    <>
      <div className="game_container">
        <div className="info-section">
          <InfoHeader />
        </div>
        <div className="game-section">
          <Table
            boardLength={boardLength}
            table={table}
            playerName={playerName}
            difficultyLevel={difficultyLevel}
          />
        </div>
      </div>
    </>
  );
};

export default Game;
