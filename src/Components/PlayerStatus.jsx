function PlayerStatus({ currentPlayer, winner }) {
    return (
      <div className="my-4 text-lg">
        {winner ? (
          <h2 className="font-bold text-green-500">{`${winner} wins!`}</h2> 
        ) : (
          <h2 className="font-bold">Now : {currentPlayer}</h2>
        )}
      </div>
    );
  }
  
  export default PlayerStatus;
  