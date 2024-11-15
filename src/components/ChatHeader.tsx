import React from 'react';
import { FaEllipsisV, FaUser } from 'react-icons/fa';

const ChatHeader: React.FC<{ contactName: string, contactStatus: string }> = ({ contactName, contactStatus }) => {
 return (
   <div className="h-16 px-4 flex items-center justify-between">
     <div className="flex items-center gap-4">
       <FaUser className="w-10=h-10 rounded-full" />
       <div>
         <h3>{contactName}</h3>
         <span className="text-xs">{contactStatus}</span>
       </div>
     </div>
     <div className="flex items-center gap-4">
        <label className="inline-flex items-center">
          <input type="radio" className="form-radio" name="option" value="option1" checked />
          <span className="ml-2">Option 1</span>
        </label>
        <FaEllipsisV />
      </div>
   </div>
 );
};

export default ChatHeader;