import React from 'react';
import { User } from '@/services/types';

interface UserCardProps {
  user: User;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div className="user-card" onClick={onClick}>
      <p>{user.name}</p>
    </div>
  );
};

export default UserCard;
