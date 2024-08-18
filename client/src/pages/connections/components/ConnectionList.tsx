'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ConfirmationModal, CustomButton } from '@/components/ui';
import { IConnection } from '@/interfaces';
import {
  getConnections,
  deleteConnection,
} from '@/services/connection.service';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

import { ConnectionModal } from './ConnectionModal';

export function ConnectionList() {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [connections, setConnections] = useState<IConnection[]>([]);
  const [connectionToDelete, setConnectionToDelete] = useState<string | null>(
    null,
  );
  const [selectedConnection, setSelectedConnection] = useState<
    IConnection | undefined
  >(undefined);

  async function fetchConnections() {
    const { data, success } = await getConnections();

    if (!success) {
      toast.error('Erro ao buscar conexões!');
      return;
    }
    setSelectedConnection(undefined);
    setConnections(data);
  }

  function handleEditConnection(connection: IConnection) {
    setSelectedConnection(connection);
    setOpenModal(true);
  }

  function handleDeleteClick(contactId: string) {
    setConnectionToDelete(contactId);
    setOpenConfirmModal(true);
  }

  async function handleDelete() {
    if (!connectionToDelete) return;

    const { success, message } = await deleteConnection(connectionToDelete);

    if (!success) {
      toast.error(message || 'Erro ao deletar conexão!');
      setOpenConfirmModal(false);
      return;
    }

    await fetchConnections();
    setOpenConfirmModal(false);
    toast.success('Conexão deletada com sucesso!');
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="w-full p-6 flex flex-row flex-wrap justify-center items-center gap-10 text-white">
      <div className="w-full p-6 flex flex-row justify-end items-center gap-4 text-black  ">
        <CustomButton
          variant="contained"
          onClick={() => setOpenModal(true)}
          className="gap-1 bg-purple hover:bg-purpleDark"
        >
          <AddIcon />
          Cadastrar
        </CustomButton>
      </div>
      {connections.map((connection) => (
        <div
          key={connection.id}
          className={`flex flex-col justify-start items-center gap-4 w-96 h-30 p-4 bg-primary-base
            border-2 rounded-lg shadow-lg bg-gray-800 text-white `}
        >
          <div className="w-full flex justify-start items-center font-bold text-5">
            {connection.name}
          </div>
          <div className="w-full flex justify-between items-center">
            <p>
              Status:{' '}
              <span
                className={`${
                  connection.active ? 'text-successBase' : 'text-dangerBase'
                }`}
              >
                {connection.active ? ' Ativa' : 'Inativa'}
              </span>
            </p>
            <div className="w-auto flex-row justify-between items-center ">
              <IconButton
                onClick={() => handleEditConnection(connection)}
                size="small"
                color="primary"
                sx={{ color: 'white' }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteClick(connection.id)}
                size="small"
                color="primary"
                sx={{ color: 'white' }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
      ))}

      {openModal ? (
        <ConnectionModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedConnection(undefined);
          }}
          refetch={() => fetchConnections()}
          connection={selectedConnection}
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
