import React from 'react';
import UserList from './UserList';
import Header from './Header';
import { User } from '@/services/types';
import { useTheme } from './ThemeContext';

interface SidebarProps {
  users: User[];
  setSelectedUser: (user: User) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ users, setSelectedUser }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-[400px] border-r" style={{ background: theme.bg, borderColor: theme.border }}>
      <Header toggleTheme={toggleTheme} />
      <UserList users={users} setSelectedUser={setSelectedUser} />
    </aside>
  );
};

export default Sidebar;
