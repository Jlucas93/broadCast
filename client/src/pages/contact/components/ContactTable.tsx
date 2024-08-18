'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { CustomTable, ConfirmationModal, CustomButton } from '@/components/ui';
import { IContact } from '@/interfaces';
import { getContacts, deleteContact } from '@/services/contact.service';
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
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<IContact | undefined>(
    undefined,
  );
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);

  async function fetchContacts() {
    const { data, success } = await getContacts();

    if (!success) {
      toast.error('Erro ao buscar contatos!');
      return;
    }

    setContacts(data);
  }

  function handleEdit(contact: IContact) {
    setSelectedContact(contact);
    setOpenModal(true);
  }

  function handleDeleteClick(contactId: string) {
    setContactToDelete(contactId);
    setOpenConfirmModal(true);
  }

  async function handleDelete() {
    if (!contactToDelete) return;

    const { success } = await deleteContact(contactToDelete);

    if (!success) {
      toast.error('Erro ao deletar contato!');
      setOpenConfirmModal(false);
      return;
    }

    await fetchContacts();
    setOpenConfirmModal(false);
    toast.success('Contato deletado com sucesso!');
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="w-full p-6 flex flex-col justify-between items-center gap-4 text-black">
      <div className="w-full p-6 flex flex-row justify-end items-center gap-4 text-black  ">
        <CustomButton variant="contained" onClick={() => setOpenModal(true)}>
          Cadastrar
        </CustomButton>
      </div>

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
                onClick={() => handleDeleteClick(row.id)}
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
          refetch={() => fetchContacts()}
          contact={selectedContact}
        />
      ) : null}

      {openConfirmModal ? (
        <ConfirmationModal
          open={openConfirmModal}
          onClose={() => setOpenConfirmModal(false)}
          onConfirm={() => handleDelete()}
        />
      ) : null}
    </div>
  );
}