'use client';

import { useState } from 'react';

import { CustomButton } from '@/components/ui';
import { IConnection } from '@/interfaces';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

import { ConnectionModal } from './ConnectionModal';

const connections = [
  {
    id: '1',
    name: 'Conexão 1',
    active: true,
  },
  {
    id: '2',
    name: 'Conexão 2',
    active: true,
  },
  {
    id: '3',
    name: 'Conexão 3',
    active: false,
  },
  {
    id: '4',
    name: 'Conexão 4',
    active: false,
  },
  {
    id: '5',
    name: 'Conexão 5',
    active: false,
  },
];

export function ConnectionList() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedConnection, setSelectedConnection] =
    useState<IConnection | null>(null);

  function handleEditConnection(connection: IConnection) {
    console.info(connection);
    setSelectedConnection(connection);
    setOpenModal(true);
  }

  function handleDeleteConnection(connection: IConnection) {
    console.info(connection);
    setSelectedConnection(connection);
    setOpenModal(true);
  }

  return (
    <div className="w-full p-6 flex flex-row flex-wrap justify-center items-center gap-10 text-white">
      <div className="w-full p-6 flex flex-row justify-end items-center gap-4 text-black  ">
        <CustomButton variant="contained" onClick={() => setOpenModal(true)}>
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
                onClick={() => handleDeleteConnection(connection)}
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

      {openModal && selectedConnection ? (
        <ConnectionModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          isEdit
          connection={selectedConnection}
        />
      ) : null}
    </div>
  );
}
