import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Login from "./../../assets/images/user.png";
import "./ProfileDropdown.css";

function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-button">
        <img src={Login} alt="Usuario" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <ul>
             <li>
        <Link to="#" onClick={(e) => e.preventDefault()}>
          Entrar
        </Link>
      </li>
      <li>
        <Link to="#" onClick={(e) => e.preventDefault()}>
          Minha Conta
        </Link>
      </li>
      <li>
        <Link to="#" onClick={(e) => e.preventDefault()}>
          Endereços
        </Link>
      </li>
      <li>
        <Link to="#" onClick={(e) => e.preventDefault()}>
          Minha Netshoes
        </Link>
      </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
