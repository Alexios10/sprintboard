import { useState } from "react";

export const Board = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setUserInput(e.target.value);
  }

  function addCard() {
    if (!userInput) {
      alert("Du må skrive noe");
      return;
    }

    setCards([...cards, userInput]);
    setUserInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setCards([...cards, userInput]);
      setUserInput("");
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sprint Board</h1>
      <div className="flex flex-col w-fit space-y-2">
        <label className="text-sm text-gray-600" htmlFor="task">
          Legg til oppgave:
        </label>
        <input
          id="task"
          value={userInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="border border-gray-400 rounded-md"
          type="text"
        />
        <button
          onClick={addCard}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Legg til kort
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="p-4 bg-white rounded shadow">
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};
