import React from 'react';
import { FaUser, FaBell, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from './ThemeContext';

interface HeaderProps {
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  const { theme } = useTheme();

  return (
    <header
      className="flex items-center justify-between p-4"
      style={{ background: theme.primary, color: theme.text }}
    >
      <div className="flex items-center gap-3">
        <FaUser className="text-2xl" />
        <span>My Profile</span>
      </div>
      <div className="flex gap-3">
        <FaBell />
        <button onClick={toggleTheme}>{theme.text === '#ffffff' ? <FaSun /> : <FaMoon />}</button>
      </div>
    </header>
  );
};

export default Header;
