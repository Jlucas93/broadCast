'use client';

import { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Groups2Icon from '@mui/icons-material/Groups2';
import { IconButton } from '@mui/material';

import { IBroadcast } from '../../interfaces';
import { BroadcastModal } from './BroadcastModal';

const brodcasts = [
  {
    id: '1',
    name: 'Lista 1',
    status: 'Agendada',
    sendDate: '2022-10-10',
    sendTime: '12:00',
    contactsIDs: ['1'],
    connectionID: '1',
  },
  {
    id: '2',
    name: 'Lista 2',
    status: 'scheduled',
    sendDate: '2022-10-10',
    sendTime: '23:00',
    contactsIDs: ['1', '2'],
    connectionID: '2',
  },
];

export function BroadcastList() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBrodcast, setSelectedBroadcast] = useState<IBroadcast | null>(
    null,
  );

  function handleEditbrodcast(brodcast: IBroadcast) {
    console.info(brodcast);
    setSelectedBroadcast(brodcast);
    setOpenModal(true);
  }

  function handleDeletebrodcast(brodcast: IBroadcast) {
    console.info(brodcast);
    setSelectedBroadcast(brodcast);
    setOpenModal(true);
  }

  return (
    <div className="w-full p-6 flex flex-row flex-wrap justify-center items-center gap-10 text-white">
      {brodcasts.map((brodcast) => (
        <div
          key={brodcast.id}
          className={`flex flex-col justify-start items-center gap-4 w-96 h-41 max-h-41 overflow-y-auto p-4 overflow-y bg-primary-base
            border-2 rounded-lg shadow-lg bg-gray-800 text-white`}
        >
          <div className="w-full flex justify-start items-center font-bold text-5 gap-4">
            <div className=" w-10 h-10 bg-primary-light flex justify-center items-center border-2 rounded-full border-primary-light">
              <Groups2Icon />
            </div>
            {brodcast.name}
          </div>
          <div className="w-full max-w-sm flex justify-between items-center overflow-hidden">
            <p className="truncate">Conexão: Nome da conexão aqui</p>
          </div>

          <div className="w-full flex justify-between items-center">
            <p>
              Status:{' '}
              <span
                className={`${
                  brodcast.status === 'scheduled'
                    ? 'text-warningBase'
                    : 'text-successBase'
                } `}
              >
                {brodcast.status === 'scheduled' ? 'Agendada' : 'Enviada'}
              </span>
            </p>
            <div className="w-auto flex-row justify-between items-center ">
              <IconButton
                onClick={() => handleEditbrodcast(brodcast)}
                size="small"
                color="primary"
                sx={{ color: 'white' }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeletebrodcast(brodcast)}
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

      {openModal && selectedBrodcast ? (
        <BroadcastModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          isEdit
          broadcast={selectedBrodcast}
        />
      ) : null}
    </div>
  );
}
