'use client';

import { useEffect, useState } from 'react';

import { CustomTable } from '@/components/ui';
import { IContact } from '@/interfaces';
import { getContacts } from '@/services/contact.service';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import { ContactModal } from './ContactModal';

const columns = [
  { id: 'name', label: 'Nome' },
  { id: 'phone', label: 'Número' },
  { id: 'email', label: 'Email' },
  { id: 'actions', label: 'Ações' },
];

export function ContactTable() {
  const [openModal, setOpenModal] = useState(false);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<IContact | undefined>(
    undefined,
  );

  function handleEdit(contact: IContact) {
    setSelectedContact(contact);
    setOpenModal(true);
  }

  function handleDelete(contactId: string) {
    console.info('Delete contact with id:', contactId);
  }

  useEffect(() => {
    async function fetchContacts() {
      const { data } = await getContacts();

      setContacts(data.contacts);
    }

    fetchContacts();
  }, []);

  return (
    <div className="w-full p-6 flex flex-col justify-between items-center gap-4 text-black">
      <CustomTable
        columns={columns}
        data={contacts.map((row) => ({
          ...row,
          actions: (
            <div className="flex gap-2">
              <IconButton aria-label="edit" onClick={() => handleEdit(row)}>
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                onClick={() => handleDelete(row.id)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ),
        }))}
      />

      {openModal ? (
        <ContactModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          isEdit
          contact={selectedContact}
        />
      ) : null}
    </div>
  );
}
