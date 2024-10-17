import Square from './Square';

function Board({ squares, onSquareClick }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}

export default Board;
