import React from 'react';
import UserCard from './UserCard';
import { User } from '@/services/types';

interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserClick }) => {
  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard key={user.id} user={user} onClick={() => onUserClick(user)} />
      ))}
    </div>
  );
};

export default UserList;
