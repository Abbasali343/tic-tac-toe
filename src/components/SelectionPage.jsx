import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/SelectionPage.css";
import { useState } from "react";

const Selection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = location.state.name;

  const [boxOption, setBoxOption] = useState('');
  const [difficultyOption, setDifficultyOption] = useState("");
  const [boxError, setBoxError] = useState(false);
  const [difficultyError, setDifficultyError] = useState(false);

  const handleBoardChange = (event) => setBoxOption(event.target.value);
  const handleDifficultyChange = (event) =>
    setDifficultyOption(event.target.value);

  function handleSubmit() {
    if (boxOption === '') {
      return setBoxError(true);
    } else {
      setBoxError(false);
    }

    if (difficultyOption === "") {
      return setDifficultyError(true);
    } else {
      setDifficultyError(false);
    }

    navigate("/game", {
      state: {
        table: boxOption,
        difficultyLevel: difficultyOption,
        playerName: userName,
        table: boxOption,
      },
    });
  }

  return (
    <>
      <div className="selection_container">
        <h1 className="userName">Welcome {userName} !</h1>
        <div>
          <h1 className="selection_heading">Select Table</h1>
          {boxError && <p className="box_error_name">Please Select Table</p>}
          <div className="option_selector">
            <div>
              <label>
                <input
                  type="radio"
                  name="board"
                  id="3-box"
                  value='3'
                  onChange={handleBoardChange}
                />
                3 Box
              </label>
            </div>

            <div>
              <label>
                <input
                  type="radio"
                  name="board"
                  id="5-box"
                  value='5'
                  onChange={handleBoardChange}
                />
                5 Box
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="board"
                  id="7-box"
                  value='7'
                  onChange={handleBoardChange}
                />
                7 Box
              </label>
            </div>
          </div>
        </div>
        <div>
          <h1 className="selection_heading">Difficulty Lavel</h1>
          {difficultyError && (
            <p className="difficulty_error_name">
              Please Select Difficulty Level
            </p>
          )}
          <div className="option_selector">
            <div>
              <input
                type="radio"
                name="difficulty"
                id="low"
                value="low"
                checked={difficultyOption === "low"}
                onChange={handleDifficultyChange}
              />
              <label htmlFor="low">Low</label>
            </div>

            <div>
              <input
                type="radio"
                name="difficulty"
                id="medium"
                value="medium"
                checked={difficultyOption === "medium"}
                onChange={handleDifficultyChange}
              />
              <label htmlFor="medium">Medium</label>
            </div>
            <div>
              <input
                type="radio"
                name="difficulty"
                id="high"
                value="high"
                checked={difficultyOption === "high"}
                onChange={handleDifficultyChange}
              />
              <label htmlFor="high">High</label>
            </div>
          </div>
        </div>
        <button className="selection_button" onClick={handleSubmit}>
          Play
        </button>
      </div>
    </>
  );
};

export default Selection;
