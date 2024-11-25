import React from 'react';
import { User } from '@/services/types';
import { FaCircle, FaUser } from 'react-icons/fa';

interface UserCardProps {
  user: User;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => (
  <div onClick={onClick} className="p-4 flex items-center cursor-pointer">
    <FaUser className="text-2xl" />
    <div className="ml-4">
      <h4>{user.name}</h4>
      <p>{user.lastMessage}</p>
    </div>
    {user.status === 'online' && <FaCircle className="text-green-500 ml-auto" />}
  </div>
);

export default UserCard;
