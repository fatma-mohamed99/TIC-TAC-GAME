import { useState } from "react";
function PlayerNameInput({ onNamesSubmit }) {
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onNamesSubmit(player1Name, player2Name);
    };
  
    return (
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="player one name"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          className="border rounded p-2 m-2"
        />
        <input
          type="text"
          placeholder="player two name"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          className="border rounded p-2 m-2"
        />
        <button type="submit" className="bg-green-800  hover:bg-green-400 text-white p-2 rounded">
         start
        </button>
      </form>
    );
  }
  
  export default PlayerNameInput;
  