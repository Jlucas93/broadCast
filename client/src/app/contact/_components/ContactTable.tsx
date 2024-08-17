'use client';

import { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import { CustomTable } from '../../components/ui';
import { IContact } from '../../interfaces';
import { ContactModal } from './ContactModal';

const columns = [
  { id: 'name', label: 'Nome' },
  { id: 'phone', label: 'Número' },
  { id: 'email', label: 'Email' },
  { id: 'actions', label: 'Ações' },
];

const data = [
  {
    id: '1',
    name: 'John Doe',
    phone: '16 992131902',
    email: 'john@example.com',
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '18 992131902',
    email: 'jane@example.com',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    phone: '19 992131902',
    email: 'alice@example.com',
  },
];

export function ContactTable() {
  const [openModal, setOpenModal] = useState(false);
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

  return (
    <div className="w-full p-6 flex flex-col justify-between items-center gap-4 text-black">
      <CustomTable
        columns={columns}
        data={data.map((row) => ({
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
