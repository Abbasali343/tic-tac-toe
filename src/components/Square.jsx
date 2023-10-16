import "../assets/css/Square.css";

export default function Square({ value, index, onSelect, table }) {
  const text = value;

  return (
    <>
      <button
        className={
          table === '3'
            ? "square"
            : table === '5'
            ? "square1"
            : table === '7'
            ? "square2"
            : "invalid"
        }
        onClick={() => onSelect(index)}
      >
        {text ? text : "Click Me"}
      </button>
    </>
  );
}
