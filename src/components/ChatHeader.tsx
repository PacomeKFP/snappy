import React from 'react';
import { FaEllipsisV, FaUser } from 'react-icons/fa';
import { RadioGroup, Radio } from '@/components/ui/radio';

const ChatHeader: React.FC<{ contactName: string, contactStatus: string }> = ({ contactName, contactStatus }) => {
 return (
   <div className="h-16 px-4 flex items-center justify-between">
     <div className="flex items-center gap-4">
       <FaUser className="w-10 h-10 rounded-full" />
       <div>
         <h3>{contactName}</h3>
         <span className="text-xs">{contactStatus}</span>
       </div>
     </div>
     <div className="flex items-center gap-4">
       <RadioGroup>
         <Radio value="option1" defaultChecked>
           Option 1
         </Radio>
         <Radio value="option2">
           Option 2
         </Radio>
       </RadioGroup>
       <FaEllipsisV />
     </div>
   </div>
 );
};

export default ChatHeader;