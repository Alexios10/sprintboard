import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

interface Task {
  id: number;
  text: string;
  date: Date;
  isDone: boolean;
}

export const Board = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const timestamp = Date.now();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(e.target.value);
  }

  function addTask() {
    if (!userInput.trim()) {
      alert("Du må skrive noe");
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: userInput,
        date: new Date(timestamp),
        isDone: false,
      },
    ]);
    setUserInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (editingId === null) {
        addTask();
      } else {
        updateTask();
      }
    }
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function startEditing(task: Task) {
    setUserInput(task.text);
    setEditingId(task.id);
  }

  function updateTask() {
    if (!userInput.trim()) {
      alert("Du må skrive noe for å endre");
      return;
    }

    if (editingId === null) return;

    setTasks(
      tasks.map((task) =>
        task.id === editingId ? { ...task, text: userInput } : task
      )
    );
    setUserInput("");
    setEditingId(null);
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sprintbrett</h1>

      {/* Input */}
      <div className="flex flex-col w-full space-y-2 mb-6">
        <label className="text-sm text-gray-600" htmlFor="task">
          Skriv inn oppgaven:
        </label>
        <div className="flex gap-2">
          <input
            id="task"
            value={userInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="border border-gray-400 rounded-md p-2 text-sm flex-grow"
            type="text"
            placeholder="Skriv oppgave her..."
          />
          <button
            onClick={editingId === null ? addTask : updateTask}
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
          >
            {editingId === null ? "Legg til" : "Oppdater"}
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.2,
                scale: { type: "spring", damping: 10, stiffness: 200 },
              }}
              key={task.id}
              className="flex justify-between items-center relative"
            >
              <div
                className={`p-4 bg-white rounded shadow flex flex-col w-full ${
                  task.isDone ? "opacity-70" : ""
                }`}
                onClick={() => toggleTask(task.id)}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`flex-grow ${task.isDone ? "line-through" : ""}`}
                  >
                    {task.text}
                  </span>
                </div>
                <span className="text-sm text-gray-400 mt-2">
                  {task.isDone ? "Ferdig" : "Pågår"}
                </span>
                <span className="text-sm text-gray-400 mt-2">
                  {task.date.toDateString()}
                </span>
              </div>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent toggleTask from being called
                  deleteTask(task.id);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 text-sm hover:text-red-500 border hover:border rounded-full w-1 h-1 p-2 cursor-pointer absolute right-5 top-3 flex items-center justify-center"
              >
                X
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent toggleTask from being called
                  startEditing(task);
                }}
                className="text-gray-400 hover:text-blue-500 cursor-pointer absolute right-[1.2rem] bottom-3"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaRegEdit size={17} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
