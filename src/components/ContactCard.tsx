import React from 'react';
import { Contact } from '@/services/types';
import { FaUser } from 'react-icons/fa';

interface ContactCardProps {
  contact: Contact;
  onClick: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onClick }) => (
  <div onClick={onClick} className="p-4 flex items-center cursor-pointer">
    <FaUser className="w-8 h-8 text-blue-500" />
    <div className="ml-4">
      <h4>{contact.name}</h4>
      <p>{contact.lastMessage}</p>
    </div>
  </div>
);

export default ContactCard;
