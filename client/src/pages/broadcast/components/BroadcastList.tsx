'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { ConfirmationModal, CustomButton } from '@/components/ui';
import { IBroadcast } from '@/interfaces';
import { getBroadcasts, deleteBroadcast } from '@/services/broadcast.service';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Groups2Icon from '@mui/icons-material/Groups2';
import { CircularProgress, IconButton } from '@mui/material';

import BroadcastModal from './BroadcastModal';

export default function BroadcastList() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [broadcastToDelete, setBroadcastToDelete] = useState<string | null>(
    null,
  );
  const [broadcasts, setBroadcasts] = useState<IBroadcast[]>([]);
  const [selectedBroadcast, setSelectedBroadcast] = useState<
    IBroadcast | undefined
  >(undefined);

  async function fetchBroadcast() {
    setLoading(true);
    const { data, success } = await getBroadcasts();
    setLoading(false);

    if (!success) {
      toast.error('Erro ao buscar transmissões!');
      return;
    }
    setSelectedBroadcast(undefined);
    setBroadcasts(data);
  }

  function handleEditBroadcast(broadcast: IBroadcast) {
    setSelectedBroadcast(broadcast);
    setOpenModal(true);
  }

  function handleDeleteClick(contactId: string) {
    setBroadcastToDelete(contactId);

    setOpenConfirmModal(true);
  }

  async function handleDelete() {
    if (!broadcastToDelete) return;

    const { success } = await deleteBroadcast(broadcastToDelete);

    if (!success) {
      toast.error('Erro ao deletar transmissão!');
      setOpenConfirmModal(false);
      return;
    }

    await fetchBroadcast();
    setOpenConfirmModal(false);
    toast.success('Transmissão deletada com sucesso!');
  }

  useEffect(() => {
    fetchBroadcast();
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
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {broadcasts.map((broadcast) => (
            <div
              key={broadcast.id}
              className={`flex flex-col justify-start items-center gap-4 w-96 h-41 max-h-41 overflow-y-auto p-4 overflow-y bg-primary-base
            border-2 rounded-lg shadow-lg bg-gray-800 text-white`}
            >
              <div className="w-full flex justify-start items-center font-bold text-5 gap-4">
                <div className=" w-10 h-10 bg-primary-light flex justify-center items-center border-2 rounded-full border-primary-light">
                  <Groups2Icon />
                </div>
                {broadcast.name}
              </div>
              <div className="w-full max-w-sm flex justify-between items-center overflow-hidden">
                <p className="truncate">
                  Conexão: {broadcast.connectionName || 'Sem conexão'}
                </p>
              </div>

              <div className="w-full flex justify-between items-center">
                <p>
                  Status:{' '}
                  <span
                    className={`${
                      broadcast.status === 'schedule'
                        ? 'text-warningBase'
                        : 'text-successBase'
                    } `}
                  >
                    {broadcast.status === 'schedule' ? 'Agendada' : 'Enviada'}
                  </span>
                </p>
                <div className="w-auto flex-row justify-between items-center ">
                  <IconButton
                    onClick={() => handleEditBroadcast(broadcast)}
                    size="small"
                    color="primary"
                    sx={{ color: 'white' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(broadcast.id)}
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
        </>
      )}
      {openModal ? (
        <BroadcastModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedBroadcast(undefined);
          }}
          refetch={() => fetchBroadcast()}
          broadcast={selectedBroadcast}
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
