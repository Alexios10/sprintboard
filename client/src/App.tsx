import { Board } from "./pages/Board";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* TODO: legg til navbar senere */}
      <Dashboard />
      <Board />
    </div>
  );
}

export default App;
