
function Square({ value, onClick }) {
  return (
    <button
      className="w-24 h-24 text-2xl font-bold flex items-center justify-center border border-gray-400 hover:bg-gray-100"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
