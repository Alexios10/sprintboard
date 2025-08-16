import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Board } from "./pages/Board";
import { Dashboard } from "./pages/Dashboard";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <BrowserRouter>
        <NavBar isOpen={isOpen} handleClick={handleClick} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
