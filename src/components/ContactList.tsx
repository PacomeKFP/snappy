import React, { useState } from 'react';
import ContactCard from '@/components/ContactCard';
import { Contact } from '@/services/types';

interface ContactListProps {
  contacts: Contact[];
  setSelectedContact: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, setSelectedContact }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 w-full"
      />
      <div>
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onClick={() => setSelectedContact(contact)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
