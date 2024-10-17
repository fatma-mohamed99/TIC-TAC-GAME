import React, { useState, useEffect } from 'react';
import PlayerNameInput from '../Components/PlayerNameInput';
import Board from '../Components/Board';
import PlayerStatus from '../Components/PlayerStatus';
import applauseSound from '../assets/applause.mp3';
import animationImage from '../assets/celebration.gif'; 

function Game() {
    const [players, setPlayers] = useState([]);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [winner, setWinner] = useState(null);
    const [showAnimation, setShowAnimation] = useState(false);
    const [score, setScore] = useState([0, 0]);
    const [draw, setDraw] = useState(false); 

    useEffect(() => {
        if (winner) {
            const audio = new Audio(applauseSound);
            audio.play();
            setShowAnimation(true);

            setScore((prevScore) => {
                const newScore = [...prevScore];
                newScore[currentPlayerIndex] += 1;
                return newScore;
            });

            const timer = setTimeout(() => {
                resetGame();
            }, 6000);

            return () => clearTimeout(timer);
        } else if (draw) { 
            const timer = setTimeout(() => {
                resetGame();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [winner, draw]);

    const handleNamesSubmit = (player1Name, player2Name) => {
        setPlayers([player1Name, player2Name]);
    };

    const checkWinner = (board) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const handleSquareClick = (index) => {
        if (winner || board[index]) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayerIndex === 0 ? 'X' : 'O';
        setBoard(newBoard);

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(players[currentPlayerIndex]);
        } else if (newBoard.every((square) => square !== null)) {
            setDraw(true); 
        } else {
            setCurrentPlayerIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayerIndex(0);
        setWinner(null);
        setShowAnimation(false);
        setDraw(false); 
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-900 relative">
            {!players.length ? (
                <PlayerNameInput onNamesSubmit={handleNamesSubmit} />
            ) : (
                <>
                    <PlayerStatus currentPlayer={players[currentPlayerIndex]} winner={winner} />
                    <Board squares={board} onSquareClick={handleSquareClick} />
                    {(winner || draw) && (
                        <button
                            className="mt-6 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-400"
                            onClick={resetGame}
                        >
                            Restart
                        </button>
                    )}
                    <div className="text-white mt-2">
                        <p> {players[0]} : {score[0]}  </p>
                        <p> {players[1]} : {score[1]}  </p>
                    </div>
                </>
            )}
            {showAnimation && winner && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                    <div className="flex flex-col items-center">
                        <h2 className="text-6xl font-bold text-green-600 mb-4">{`${winner} wins`}</h2>
                        <img src={animationImage} className="w-96 h-96 object-contain animate-ping" />
                    </div>
                </div>
            )}
            {draw && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                    <div className="flex flex-col items-center">
                        <h2 className="text-6xl font-bold text-red-600 mb-4">It's a draw! Try again.</h2>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Game;
