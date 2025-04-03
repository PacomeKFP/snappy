import React, { useState, useMemo } from 'react';
import { 
  Eye, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  X, 
} from 'lucide-react';
import { useManageUser } from '@/hooks/manageUser';
import { useAuth } from '@/hooks/auth';
import Image from 'next/image';

interface User {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  online: boolean;
  avatar: string;
  createdAt: string;
}

interface SortConfig {
  key: keyof User;
  direction: 'asc' | 'desc';
}

interface UserDetailsModalProps {
  user: User;
  onClose: () => void;
}

interface tableThreeProps {
  users: User[];
}

const TableThree: React.FC<tableThreeProps> = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'displayName', direction: 'asc' });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const itemsPerPage = 10;

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    sortableUsers.sort((a: User, b: User) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableUsers;
  }, [users, sortConfig]);

  const paginatedUsers = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return sortedUsers.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedUsers]);

  const handleSort = (key: keyof User) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (userId: string) => {
    console.log(`Deleting user with ID: ${userId}`);
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 py-3 text-left cursor-pointer"
                  onClick={() => handleSort('displayName')}
                >
                  Name {sortConfig.key === 'displayName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center">
                    <Image 
                      src="/api/placeholder/40/40" 
                      alt={user.displayName} 
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    {user.displayName}
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.phoneNumber}</td>
                  <td className="px-4 py-3">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.online ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.online ? 'Online' : 'Offline'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleViewUser(user)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Eye size={20} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center px-4 py-3 bg-gray-50">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <ChevronsLeft />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
              disabled={currentPage === totalPages}
              className="disabled:opacity-50"
            >
              <ChevronRight />
            </button>
            <button 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages}
              className="disabled:opacity-50"
            >
              <ChevronsRight />
            </button>
          </div>
        </div>
      </div>

      {selectedUser && (
        <UserDetailsModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </>
  );
};

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center mb-4">
          <Image 
            src="/api/placeholder/96/96" 
            alt={user.displayName} 
            width={96}
            height={96}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold">{user.displayName}</h2>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Phone:</span>
            <span>{user.phoneNumber}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Created At:</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span 
              className={`px-2 py-1 rounded-full text-xs ${
                user.online ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {user.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableThree;