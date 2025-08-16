import { Link } from "react-router-dom";
import type { FC } from "react";
import { Modal } from "./Modal";

interface NavbarProps {
  isOpen: boolean;
  handleClick: () => void;
}

export const NavBar: FC<NavbarProps> = ({ isOpen, handleClick }) => {
  return (
    <>
      <nav className="bg-gray-500 h-15 flex items-center justify-between">
        <ul className="flex gap-4 items-center h-full px-4 text-white/85">
          <li>
            <Link to="/">Dashbord</Link>
          </li>
          <li>
            <Link to="/board">Plate</Link>
          </li>
        </ul>
        <button
          onClick={handleClick}
          className="cursor-pointer border text-white/85 border-cyan-200 p-1 rounded-md hover:bg-cyan-100 hover:text-black transition-all mr-5"
        >
          Logg inn
        </button>
      </nav>
      {isOpen && <Modal handleClick={handleClick} />}
    </>
  );
};
