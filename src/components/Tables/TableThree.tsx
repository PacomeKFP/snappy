import React, { useState, useMemo } from 'react';
import { 
  Eye, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';


const mockUsers = [
  {
    id: "45b120c1-6d58-496c-bb5f-295ca3e324c7",
    displayName: "Anne Rosalie",
    email: "annerosa@example.com",
    phoneNumber: "692397042",
    createdAt: "2025-01-07T16:16:52.116815",
    online: false,
    avatar: "https://ui-avatars.com/api/?name=Anne Rosalie"
  },
  
].concat(Array(15).fill(null).map((_, i) => ({
  id: `mock-user-${i}`,
  displayName: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phoneNumber: `69239704${i}`,
  createdAt: "2025-01-07T16:16:52.116815",
  online: Math.random() > 0.5,
  avatar: `https://ui-avatars.com/api/?name=User+${i + 1}`
})));

const TableThree = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'displayName', direction: 'asc' });
  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 10;

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...mockUsers];
    sortableUsers.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableUsers;
  }, [sortConfig]);

  const paginatedUsers = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return sortedUsers.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedUsers]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    // TODO: Implement modal or sliding panel for user details
  };

  const handleDeleteUser = (userId) => {
    // TODO: Implement delete user logic
    console.log(`Deleting user with ID: ${userId}`);
  };

  const totalPages = Math.ceil(mockUsers.length / itemsPerPage);

  return (
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
                  <img 
                    src={user.avatar} 
                    alt={user.displayName} 
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

      {/* Pagination */}
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
  );
};

export default TableThree;