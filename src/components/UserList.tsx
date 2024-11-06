import React from 'react';
import UserCard from '@/components/UserCard';
import { User } from '@/services/types';

interface UserListProps {
  users: User[];
  setSelectedUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, setSelectedUser }) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.uuid} user={user} onClick={() => setSelectedUser(user)} />
      ))}
    </div>
  );
};

export default UserList;
