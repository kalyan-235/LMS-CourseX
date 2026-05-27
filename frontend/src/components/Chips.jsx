export default function Chips({
  items,
  active,
  setActive,
}) {
  return (
    <div className="chips">
      {items.map((item, index) => (
        <button
          key={index}
          className={`chip ${
            active === item ? "active" : ""
          }`}
          onClick={() => setActive(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}